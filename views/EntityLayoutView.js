var EntityLayoutView;
(function ($, _, Backbone, Marionette, entityListLayoutTpl, EntityLayoutModel, TimeoutUtil, PagerBehavior) {
    EntityLayoutView = Marionette.EntityLayoutView = Marionette.View.extend({
        template: entityListLayoutTpl,
        regions: {
            'entityRegion': {
                el: '.entityRegion',
                replaceElement: true
            },
            'pagerRegion': {
                el: '.pagerRegion',
                replaceElement: true
            }
        },
        behaviors: {
            Pager: {
                behaviorClass: PagerBehavior
            }
        },
        initialize: function (options) {
            _.extend(this, options);

            this._timeoutUtil = new TimeoutUtil();

            if (options.additionalParams) {
                this.additionalParams = options.additionalParams;
            } else {
                this.additionalParams = '';
            }

            this.listView.allowableOperations = this.allowableOperations;
            this.listView.route = this.route;
            this.listView.parentViewCid = this.cid;

            this._channel = Backbone.Radio.channel(this.route);
            Marionette.bindEvents(this, this._channel, this.radioEvents);
        },
        className: function () {
            var entityLayoutClass = ' entity-layout';
            if (!this.routing) {
                entityLayoutClass = ' entity-layout-nested';
            }

            return 'entity-layout-view-' + this.cid + entityLayoutClass;
        },
        model: EntityLayoutModel,
        radioEvents: {
            'view.list.activated': 'listViewActivated',
            'view.form.activated': 'formViewActivated'
        },
        events: {
            'click .sub-nav button': 'subNavClick',
            'click .edit': 'editClick',
            'keyup .nameFilter': 'filterByName',
            'click .multi-action': 'showMultiActions',
            'click .delete-all': 'deleteAll',
            'click .publish-all': 'publishAll',
            'click .add-all': 'addAll',
            'click .sub-nav .create': 'createClick',
            'click .sub-nav .get-all': 'getAllClick'
        },
        ui: {
            '$subNav': '.sub-nav',
            '$nameFilter': '.filterEntities',
            '$createBtn': '.create',
            '$listBtn': '.get-all',
            '$subNavElements': '.sub-nav > dd',
            '$multiActionRequests': '.multi-action-requests',
            '$deleteAllModal': '.delete-all-modal',
            '$publishAllModal': '.publish-all-modal',
            '$treeBtn': '.get-tree',
            '$header': '.entity-header'
        },
        templateContext: function () {
            var showCreate = this.allowableOperations.indexOf('create') > -1,
                allowDeleteAll = this.allowableOperations.indexOf('delete-all') > -1,
                allowPublishAll = this.allowableOperations.indexOf('publish-all') > -1,
                allowAddAll = this.allowableOperations.indexOf('add-all') > -1,
                route = this.route,
                btnClass = this.btnClass;

            return {
                showCreate: showCreate,
                allowDeleteAll: allowDeleteAll,
                allowPublishAll: allowPublishAll,
                allowAddAll: allowAddAll,
                route: route,
                btnClass: btnClass
            };
        },
        createClick: function () {
            this.ui.$subNavElements.removeClass('active');
            this.ui.$createBtn.parent().addClass('active');

            this.ui.$nameFilter.hide();
            
            if (!this.routing) 
            {
               this._channel.trigger('create');
            } else {
                var route = this.route + '/create/';
                location.hash = route;
            }
        },
        onDomRefresh: function () {
            this.showListView();
            this.renderHeader();
            this.showMultiActions();
        },
        listViewActivated: function () {
            this.ui.$subNavElements.removeClass('active');
            this.ui.$listBtn.parent().addClass('active');
            this.ui.$nameFilter.show();
            this.triggerMethod("ShowPager", this.listView.collection);
            this.showMultiActions();
        },
        formViewActivated: function () {
        },
        publishAll: function (e) {
            e.preventDefault();
            e.stopPropagation();

            var itemsSelected = this.$el.find('.multi-action:checked'),
                self = this,
                ids = [];

            _.each(itemsSelected, function (item) {
                var id = $(item).data('id');
                ids.push(id);
            });

            this.ui.$publishAllModal.modal('show');

            this.ui.$publishAllModal.on('click', '.no', function (e) {
                e.preventDefault();
                self.ui.$publishAllModal.modal('hide');
            });

            this.ui.$publishAllModal.on('click', '.yes', function (e) {
                e.preventDefault();
                this.getChannel().trigger('publish-all', ids);
                self.ui.$publishAllModal.modal('hide');
            });
        },
        addAll: function (e) {
            e.preventDefault();
            e.stopPropagation();

            var itemsSelected = this.$el.find('.multi-action:checked'),
                deferreds = [],
                fullCollection = this.listView.collection;

            _.each(itemsSelected, function (item) {
                var id = $(item).data('id');
                deferreds.push(fullCollection.getById(id));
            });

            $.when.apply($, deferreds)
                .then(_.bind(function () {
                    var models = [];
                    _.each(arguments, function (entity) {
                        models.push(entity);
                    });

                    this.getChannel().trigger('addAll', models);
                    itemsSelected.attr('checked', false);
                    this.showMultiActions();
                }, this));
        },
        deleteAll: function (e) {
            e.preventDefault();
            e.stopPropagation();

            var itemsSelected = this.$el.find('.multi-action:checked'),
                ids = [],
                self = this,
                fullCollection = this.listView.collection;

            _.each(itemsSelected, function (item) {
                ids.push($(item).data('id'));
            });

            this.ui.$deleteAllModal.modal('show');

            this.ui.$deleteAllModal.on('click', '.no', function (e) {
                e.preventDefault();
                self.ui.$deleteAllModal.modal('hide');
            });

            this.ui.$deleteAllModal.on('click', '.yes', function (e) {
                e.preventDefault();
                fullCollection.deleteByIds(ids)
                    .done(function () {
                        self.ui.$deleteAllModal.modal('hide');
                    });
            });
        },
        showMultiActions: function (e) {
            if (e) {
                e.stopPropagation();
            }

            var allowDeleteAll = this.allowableOperations.indexOf('delete-all') > -1,
                allowPublishAll = this.allowableOperations.indexOf('publish-all') > -1,
                allowAddAll = this.allowableOperations.indexOf('add-all') > -1;

            if (!allowPublishAll && !allowDeleteAll && !allowAddAll) {
                return;
            }

            var itemsSelected = this.$el.find('.multi-action:checked');

            if (itemsSelected.length > 0) {
                this.ui.$multiActionRequests.show();
            } else {
                this.ui.$multiActionRequests.hide();
            }
        },
        filterByName: function (e) {
            e.stopPropagation();

            var $target = $(e.target),
                name = $target.val(),
                filterField = _.isUndefined(this.filterField) ? 'name' : this.filterField;

            this._timeoutUtil.suspendOperation(400, _.bind(function () {
                if (name.length === 0) {
                    this.getChannel().trigger('getAll', 1);
                    return;
                }

                this.getChannel().trigger('textSearch', name, filterField);
            }, this));
        },
        showListView: function () {
            this.showChildView('entityRegion', this.listView);
        },
        renderHeader: function () {
            if (_.isUndefined(this.header)) {
                return;
            }

            var html = Marionette.Renderer.render(this.header.template, this.header.params);
            this.ui.$header.append(html);
        },
        getAllClick: function (e) {
            e.preventDefault();
            e.stopPropagation();

            var collection = this.listView.collection,
                page = 1;

            if (!_.isUndefined(this.listView.currentPage) && this.listView.currentPage !== 0) {
                page = this.listView.currentPage;
            }

            var route = this.route + '/' + page + '/';
            if (!this.routing) {
                this._channel.trigger('getAll', page);
            } else {
                location.hash = route;
            }
        },
        editClick: function (e) {
            e.preventDefault();
            e.stopPropagation();

            var $target = $(e.target),
                id = $target.data('id');

            if (this.routing) {
                location.hash = this.route + '/edit/' + id + '/';
            } else {
                this._channel.trigger('edit', id);
            }
        },
        getChannel: function () {
            return this._channel;
        }
    });
})(jQuery, _, Backbone, Marionette, this['Templates']['entityLayoutTemplate'], EntityLayoutModel, TimeoutUtil, PagerBehavior);
