var EntityLayoutView;
(function ($, _, Backbone, Marionette, entityListLayoutTpl, EntityLayoutModel, EventAggregator, TimeoutUtil, PagerBehavior) {
    EntityLayoutView = Marionette.EntityLayoutView = Backbone.Marionette.View.extend({
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
            this.timeoutUtil = new TimeoutUtil();

            _.extend(this, options);

            if (options.additionalParams) {
                this.additionalParams = options.additionalParams;
            } else {
                this.additionalParams = '';
            }

            this.listView.allowableOperations = this.allowableOperations;
            this.listView.route = this.route;
            this.listView.parentViewCid = this.cid;

            EventAggregator.on('list.view.activated.' + this.cid, _.bind(this.listViewActivated, this));
            EventAggregator.on('form.view.activated.' + this.cid, _.bind(this.formViewActivated, this));
        },
        className: function () {
            var entityLayoutClass = ' entity-layout';
            if (!this.routing) {
                entityLayoutClass = ' entity-layout-nested';
            }

            return 'entity-layout-view-' + this.cid + entityLayoutClass;
        },
        model: EntityLayoutModel,
        events: {
            'click .sub-nav button': 'subNavClick',
            'click .edit': 'editClick',
            'keyup .nameFilter': 'filterByName',
            'click .multi-action': 'showMultiActions',
            'click .delete-all': 'deleteAll',
            'click .publish-all': 'publishAll',
            'click .add-all': 'addAll'
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
        onDestroy: function () {
            EventAggregator.off('list.view.activated.' + this.cid);
            EventAggregator.off('form.view.activated.' + this.cid);
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
            this.ui.$subNavElements.removeClass('active');

            if (App.currentRoute === 'create') {
                this.ui.$createBtn.parent().addClass('active');
            }

            this.ui.$nameFilter.hide();
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
                EventAggregator.trigger('publish-all', ids);
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

                    EventAggregator.trigger(this.route + '.addAll', models);
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
                name = $target.val();

            this.timeoutUtil.suspendOperation(400, _.bind(function () {
                if (name.length === 0) {
                    EventAggregator.trigger(this.route + '.getAll', 1);
                    return;
                }

                EventAggregator.trigger(this.route + '.textSearch', name, 'name');
            }, this));
        },
        showListView: function () {
            this.showChildView('entityRegion', this.listView);
        },
        renderHeader: function () {
            if (!this.header) {
                return;
            }

            var html = Marionette.Renderer.render(this.header.template, this.header.params);
            this.ui.$header.append(html);
        },
        subNavClick: function (e) {
            e.preventDefault();
            e.stopPropagation();

            var $target = $(e.target);

            var collection = this.listView.collection,
                page = 1;

            if (!_.isUndefined(this.listView.currentPage) && this.listView.currentPage !== 0) {
                page = this.listView.currentPage;
            }

            var route = $target.attr('href');
            if ($target.hasClass('get-all')) {
                route = this.route + '/' + page + '/';

                if (!this.routing) {
                    EventAggregator.trigger(this.route + '.getAll', page);
                }
            } else if ($target.hasClass('create')) {
                route = this.route + '/create/';

                if (!this.routing) {
                    EventAggregator.trigger(this.route + '.create');
                }
            } else if ($target.hasClass('get-tree')) {
                route = this.route + '/tree-view/';
            }

            if (this.routing) {
                EventAggregator.trigger('toggle-options', route);
            }
        },
        editClick: function (e) {
            e.preventDefault();
            e.stopPropagation();

            var $target = $(e.target),
                id = $target.data('id');

            if (this.routing) {
                EventAggregator.trigger('toggle-options', this.route + '/edit/' + id + '/');
            } else {
                EventAggregator.trigger(this.route + '.edit', id);
            }
        }
    });
})(jQuery, _, Backbone, Marionette, this['Templates']['entityLayoutTemplate'], EntityLayoutModel, EventAggregator, TimeoutUtil, PagerBehavior);
