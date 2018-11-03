var EntityLayoutView;
(function ($, _, Backbone, Marionette, entityListLayoutTpl, EntityLayoutModel, PagerBehavior, FilterFormView) {
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
            },
            'pageSizeRegion': {
                el: '.page-size-region',
                replaceElement: true
            },
            'filterRegion': {
                el: '.filter-region',
                replaceElement: true
            }
        },
        behaviors: {
            Pager: {
                behaviorClass: PagerBehavior
            }
        },
        constructor: function (options) {
            _.extend(this, options);

            Marionette.View.prototype.constructor.apply(this, arguments);

            this.listView.allowableOperations = this.allowableOperations;
            this.listView.route = this.route;
            this.listView.parentViewCid = this.cid;

            this._channel = Backbone.Radio.channel(this.route);
            Marionette.bindEvents(this, this._channel, this.radioEvents);

            this.on('render', this.runRenderers, this);
            this.on('dom:refresh', this.runInitializers, this);
        },
        className: function () {
            var entityLayoutClass = ' entity-layout';
            if (this.getOption('embedded')) {
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
            'click .edit': 'editClick',
            'click .multi-action': 'showMultiActions'
        },
        childViewEvents: function () {
            var events = {};
            if (this.getOption('embedded')) {
                events['modal:delete-all-modal-embedded:yes'] = 'deleteAllYes';
                events['modal:delete-item-modal-embedded:yes'] = 'deleteItemYes';
            } else {
                events['modal:delete-all-modal:yes'] = 'deleteAllYes';
                events['modal:delete-item-modal:yes'] = 'deleteItemYes';
            }

            return events;
        },
        ui: {
            '$subNav': '.sub-nav',
            '$filters': '.filterEntities',
            '$multiActionRequests': '.multi-action-requests',
            '$treeBtn': '.get-tree',
            '$header': '.entity-header',
            '$actions': '.actions',
            '$filterForm': '.filter-form'
        },
        templateContext: function () {
            var route = this.route,
                btnClass = this.btnClass;

            return {
                route: route,
                btnClass: btnClass
            };
        },
        createClick: function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (!this.routing) {
                this._channel.trigger('create');
            } else {
                location.hash = this.route + '/create/';
            }
        },
        runInitializers: function () {
            this.showMultiActions();
        },
        runRenderers: function () {
            this.renderHeader();
            this.renderFilters();
            this.renderModals();
            this.renderActions();

            if (this.getOption('embedded')) {
                this.ui.$filterForm.addClass('form-inline');
            }

            this.bindUIElements();
        },
        renderModals: function () {
            var embedded = this.getOption('embedded') ? 'Embedded' : '';
            this.modal('deleteAllModal' + embedded)
                .message('Are you sure you want to delete these items?')
                .title('Delete All?')
                .choice('Yes', 'yes')
                .choice('No', 'no', true)
                .add();

            this.modal('deleteItemModal' + embedded)
                .message('Are you sure you want to delete this item?')
                .title('Delete Item?')
                .choice('Yes', 'yes')
                .choice('No', 'no', true)
                .add();
        },
        renderActions: function () {
            var embedded = this.getOption('embedded') ? 'Embedded' : '',
                btnClass = embedded !== '' ? 'btn-sm ' : 'btn ';

            this.action('getAll')
                .text('All')
                .className(btnClass + 'btn-outline-primary')
                .callBack(this.getAllClick)
                .add(true);

            this.action('create', false)
                .text('Create')
                .className(btnClass + 'btn-outline-secondary')
                .callBack(this.createClick)
                .add();

            this.action('deleteAll', true)
                .text('Delete All')
                .className(btnClass + 'btn-outline-danger')
                .withModal('deleteAllModal' + embedded)
                .add();
        },
        renderFilters: function () {
            var FiltersView = FilterFormView.extend({
                events: {
                    'keyup .name': 'filterByName'
                },
                onRender: function () {
                    this.field('name')
                        .label('Filter By Name', true)
                        .singleLine('Filter By Name');
                },
                filterByName: function (e) {
                    var $target = $(e.target),
                        name = $target.val(),
                        channel = this.getOption('channel');

                    _.debounce(_.bind(function () {
                        if (name.length === 0) {
                            channel.trigger('getAll', 1);
                            return;
                        }

                        channel.trigger('textSearch', name, 'name');
                    }, this), 400)();
                }
            });

            this.showChildView('filterRegion', new FiltersView({channel: this._channel}));
        },
        listViewActivated: function () {
            this.ui.$filters.show();
            this.showMultiActions();
        },
        formViewActivated: function () {
            this.ui.$filters.hide();
        },
        deleteAllYes: function (view, e) {
            var itemsSelected = this.$el.find('.multi-action:checked'),
                ids = [],
                fullCollection = this.listView.collection;

            _.each(itemsSelected, function (item) {
                ids.push($(item).data('id'));
            });

            fullCollection.deleteByIds(ids)
                .done(function () {
                    view.$el.modal('hide');
                });
        },
        deleteItemYes: function (view, e) {
            var data = view.modalData;
            this._channel.trigger('delete', data.id);
            view.$el.modal('hide');
        },
        showMultiActions: function (e) {
            if (e) {
                e.stopPropagation();
            }

            var itemsSelected = this.$el.find('.multi-action:checked');
            if (itemsSelected.length > 0) {
                this.ui.$multiActionRequests.show();
            } else {
                this.ui.$multiActionRequests.hide();
            }
        },
        renderHeader: function () {
            if (_.isUndefined(this.header)) {
                return;
            }

            var html = this.header.template(this.header.params);
            this.ui.$header.append(html);
        },
        action: function (name, isMultiAction) {
            var options = {},
                returnObj = {};

            options.name = name;
            options.isMultiAction = isMultiAction;
            options.withModal = false;
            options.safeName = this._formatRegionName(options.name);

            var text = function (text) {
                options.text = text;
                return returnObj;
            };

            var className = function (className) {
                options.className = className;
                return returnObj;
            };

            var callBack = function (callBack) {
                options.callBack = callBack;
                return returnObj;
            };

            var template = function (template) {
                options.template = template;
            };

            var withModal = _.bind(function (modalName) {
                var modalSafeName = this._formatRegionName(modalName);
                options.withModal = true;
                options.template = _.template('<button  data-toggle="modal" data-target="#' + modalSafeName + '" type="button" class="<%= safeName %> ' +
                    '<% if(isMultiAction) { %> multi-action-requests <% } %>' +
                    ' <%= className %>">' +
                    '<%= text %>' +
                    '</button>');

                return returnObj;
            }, this);

            var add = _.bind(function (forceShow) {
                if (this.allowableOperations.indexOf(options.safeName) === -1 && !forceShow) {
                    return;
                }

                var template = null;
                if (!_.isUndefined(options.template)) {
                    template = options.template;
                } else {
                    template = _.template('<button type="button" class="<%= safeName %> <% if(isMultiAction) { %> multi-action-requests <% } %>' +
                        ' <%= className %>">' +
                        '<%= text %>' +
                        '</button>');
                }

                var html = template(options);
                this.ui.$actions.append(html);

                if (!_.isUndefined(options.callBack) && !options.withModal) {
                    var $el = this.ui.$actions.find('.' + options.safeName);
                    $el.on('click', _.bind(function (e) {
                        e.preventDefault();
                        e.stopPropagation();

                        _.bind(options.callBack, this)(e)
                    }, this));
                    this.on('destroy', function () {
                        $el.off('click');
                    });
                }
            }, this);

            returnObj = _.extend(returnObj, {
                text: text,
                className: className,
                callBack: callBack,
                template: template,
                withModal: withModal,
                add: add
            });

            return returnObj;
        },
        getAllClick: function (e) {
            var page = 1;
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
        getChannel: function () {
            return this._channel;
        }
    });
})(jQuery, _, Backbone, Marionette, this['Templates']['entityLayoutTemplate'], EntityLayoutModel, PagerBehavior, FilterFormView);
