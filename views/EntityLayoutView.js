define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'text!templates/entityLayoutTemplate.html',
    'models/EntityLayoutModel',
    'event.aggregator',
    'util/timeoutUtil',
    'app',
    'behaviors/pager/PagerBehavior',
    'services/externalService'
], function ($, _, Backbone, Marionette, entityListLayoutTemplate, EntityLayoutModel, EventAggregator, TimeoutUtil, App, PagerBehavior, externalService) {
    var EntityListLayoutView = Backbone.Marionette.LayoutView.extend({
        template: entityListLayoutTemplate,
        regions: {
            'entityRegion': '.entityRegion',
            'pagerRegion': '.pagerRegion'
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

            App.viewContainer.add(this);
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
            'click .sub-nav a': 'subNavClick',
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
        templateHelpers: function () {
            var showSubNav = this.allowableOperations.indexOf('create') > -1,
                allowDeleteAll = this.allowableOperations.indexOf('delete-all') > -1,
                allowPublishAll = this.allowableOperations.indexOf('publish-all') > -1,
                allowAddAll = this.allowableOperations.indexOf('add-all') > -1,
                route = this.route,
                btnClass = this.btnClass;

            return {
                showSubNav: showSubNav,
                allowDeleteAll: allowDeleteAll,
                allowPublishAll: allowPublishAll,
                allowAddAll: allowAddAll,
                route: route,
                btnClass: btnClass
            };
        },
        onShow: function () {
            this.showListView();
            this.renderHeader();
        },
        onDestroy: function () {
            EventAggregator.off('list.view.activated.' + this.cid);
            EventAggregator.off('form.view.activated.' + this.cid);
        },
        onDomRefresh: function () {
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
            e.stopPropagation();

            var itemsSelected = this.$el.find('.multi-action:checked'),
                self = this,
                ids = [];

            _.each(itemsSelected, function (item) {
                var id = $(item).data('id');
                ids.push(id);
            });

            this.ui.$publishAllModal.foundation('reveal', 'open');

            this.ui.$publishAllModal.on('click', '.no', function (e) {
                e.preventDefault();
                self.ui.$publishAllModal.foundation('reveal', 'close');
            });

            this.ui.$publishAllModal.on('click', '.yes', function (e) {
                e.preventDefault();

                var getEntryType = App.EntryType.collection.getById(App.Network.currentEntryType),
                    getProfile = App.Profile.collection.getById(App.Network.currentProfile);

                $.when(getEntryType, getProfile)
                    .done(_.bind(function (entryType, profile) {
                        var service = new externalService();
                        service.initialize({entryType: entryType, profile: profile});

                        service.publishEntities(ids)
                            .done(function (response) {
                                self.ui.$publishAllModal.foundation('reveal', 'close');
                                itemsSelected.prop('checked', false);
                            })
                    }, this));
            });
        },
        addAll: function (e) {
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
            e.stopPropagation();

            var itemsSelected = this.$el.find('.multi-action:checked'),
                ids = [],
                viewContext = this,
                fullCollection = this.listView.collection;

            _.each(itemsSelected, function (item) {
                ids.push($(item).data('id'));
            });

            this.ui.$deleteAllModal.foundation('reveal', 'open');

            this.ui.$deleteAllModal.on('click', '.no', function (e) {
                e.preventDefault();
                viewContext.ui.$deleteAllModal.foundation('reveal', 'close');
            });

            this.ui.$deleteAllModal.on('click', '.yes', function (e) {
                e.preventDefault();
                fullCollection.deleteByIds(ids)
                    .done(function () {
                        viewContext.ui.$deleteAllModal.foundation('reveal', 'close');
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

            if (_.isUndefined(App.Network.currentEntryType) || _.isNull(App.Network.currentEntryType)) {
                this.$el.find('.publish-all').hide();
            } else {
                this.$el.find('.publish-all').show();
            }
        },
        filterByName: function (e) {
            e.stopPropagation();

            var $target = $(e.target),
                name = $target.val();

            this.timeoutUtil.suspendOperation(400, _.bind(function () {
                if (name.length === 0) {
                    EventAggregator.trigger(this.route + '.getAll', 1);
                    /*  if (!this.routing) {
                     } else {
                     EventAggregator.trigger('toggle-options', this.route + '/1/');
                     }*/
                    return;
                }

                EventAggregator.trigger(this.route + '.textSearch', name, 'name');
                /*          if (!this.routing) {

                 } else {
                 EventAggregator.trigger('toggle-options', this.route + '/startsWith/' + name + '/field/name/');
                 }*/

            }, this))
        },
        showListView: function () {
            this.entityRegion.show(this.listView);
        },
        renderHeader: function () {
            if (!this.header) {
                return;
            }

            var template = Marionette.TemplateCache.get(this.header.template);
            var html = Marionette.Renderer.render(template, this.header.params);
            this.ui.$header.append(html);
        },
        subNavClick: function (e) {
            e.preventDefault();
            e.stopPropagation();

            var $target = $(e.target);

            var collection = this.listView.collection;

            var page = 1;

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

    return EntityListLayoutView;
});