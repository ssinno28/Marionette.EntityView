var EntityService;
(function ($, _, Backbone, Marionette, App, EntityLayoutView, headerTemplate, EntityListItemView, EntityListView) {
    EntityService = Marionette.EntityService = Marionette.MnObject.extend({
        initialize: function (options) {
            _.extend(this, options);

            this._entityLayoutView = null;

            if (!_.isUndefined(options.allowableOperations)) {
                this.allowableOperations = options.allowableOperations;
            } else {
                this.allowableOperations = ['create', 'delete', 'edit', 'delete-all'];
            }

            if (_.isUndefined(options.routing)) {
                this.routing = true;
            }

            if (_.isUndefined(this.entityLayoutViewType)) {
                this.entityLayoutViewType = EntityLayoutView;
            }

            if (_.isUndefined(this.listView)) {
                var ItemView = EntityListItemView.extend({
                    model: this.model
                });

                this.listView = EntityListView.extend({
                    childView: ItemView
                });
            }

            if (_.isUndefined(this.baseClassIds)) {
                this.baseClassIds = [];
            }

            if (_.isUndefined(this.track)) {
                this.track = true;
            }

            if (!_.isUndefined(this.header)) {
                this.getHeader = function () {
                    return this.header;
                };
            }

            if (_.isUndefined(this.channelName)) {
                this.channelName = this.route;
                this._initRadio();

                this._channel.reply('getPageSize', _.bind(function () {
                    return _.isUndefined(this.pageSize) ? parseInt(App.pageSize) : this.pageSize;
                }, this));
            }

            if (_.isUndefined(this.filterField)) {
                this.filterField = 'name';
            }

            if (_.isUndefined(this.embedded)) {
                this.embedded = false;
            }

            if (_.isUndefined(this.pageSizes)) {
                this.pageSizes = [5, 10, 15, 20];
            }
        },
        radioEvents: {
            'create': 'create',
            'edit': 'edit',
            'delete': 'delete',
            'getAll': 'getAll',
            'getType': 'getType',
            'textSearch': 'textSearch',
            'changePageSize': 'changePageSize'
        },
        entityLayoutView: function (entities) {
            if (_.isNull(this._entityLayoutView) || this._entityLayoutView.isDestroyed()) {
                this._entityLayoutView = this.getEntityLayoutView(entities);
            }

            return this._entityLayoutView;
        },
        getEntityLayoutView: function (entities) {
            var listView =
                new this.listView
                ({
                    collection: _.isUndefined(entities) ? this.collection : entities,
                    baseClassIds: this.baseClassIds,
                    route: this.route,
                    sortable: this.sortable,
                    embedded: this.embedded,
                    routing: this.routing
                });

            listView.currentPage = _.isUndefined(entities) ? 1 : entities.currentPage;

            return new this.entityLayoutViewType
            ({
                allowableOperations: this.allowableOperations,
                route: this.route,
                listView: listView,
                header: this.getHeader(),
                model: new Backbone.Model(),
                btnClass: this.getBtnClass(),
                routing: this.routing,
                filterField: this.filterField,
                embedded: this.embedded,
                pageSizes: this.pageSizes
            });
        },
        getHeader: function () {
            return {params: {title: this.title}, template: headerTemplate};
        },
        getFormHeader: function (name) {
            if (_.isUndefined(name)) {
                return {params: {title: 'Create'}, template: _.template('<h2><%= title %></h2>')};
            }

            return {params: {title: 'Edit ' + name}, template: _.template('<h2><%= title %></h2>')};
        },
        getBtnClass: function () {
            return '';
        },
        getNewModel: function () {
            return new this.model();
        },
        getFormOptions: function () {
            return {};
        },
        changePageSize: function (pageSize) {
            this.pageSize = pageSize;
            this.getAll(1);
        },
        create: function () {
            var entity = this.getNewModel(),
                region = _.isFunction(this.region) ? this.region() : this.region,
                formRegion = _.isFunction(this.formRegion) ? this.formRegion() : this.formRegion;

            if (region.currentView !== this.entityLayoutView()) {
                region.show(this.entityLayoutView());

                if (!_.isUndefined(formRegion)) {
                    this.getAll(1);
                }
            }

            var form = new this.formView
            ({
                model: entity,
                collection: this._entityLayoutView.listView.collection,
                parentViewCid: this.entityLayoutView().cid,
                btnClass: this.getBtnClass(),
                formOptions: this.getFormOptions(),
                channelName: this.route,
                header: this.getFormHeader(),
                embedded: this.embedded
            });

            if (_.isUndefined(formRegion)) {
                var entityRegion = this.entityLayoutView().getRegion('entityRegion');
                entityRegion.on('show', _.bind(function () {
                    this._channel.trigger('view.form.activated');
                }, this));
                this.entityLayoutView().showChildView('entityRegion', form);
            } else {
                formRegion.on('show', _.bind(function () {
                    this._channel.trigger('view.form.activated');
                }, this));
                formRegion.show(form);
            }
        },
        edit: function (id) {
            var region = _.isFunction(this.region) ? this.region() : this.region,
                formRegion = _.isFunction(this.formRegion) ? this.formRegion() : this.formRegion;

            if (region.currentView !== this.entityLayoutView()) {
                region.show(this.entityLayoutView());

                if (!_.isUndefined(formRegion)) {
                    this.getAll(1);
                }
            }

            this.collection.getById(id)
                .done(_.bind(function (entity) {
                    var form = new this.formView
                    ({
                        model: entity,
                        collection: this._entityLayoutView.listView.collection,
                        parentViewCid: this.entityLayoutView().cid,
                        btnClass: this.getBtnClass(),
                        formOptions: this.getFormOptions(),
                        channelName: this.channelName,
                        header: this.getFormHeader(entity.get('name')),
                        embedded: this.embedded
                    });

                    if (_.isUndefined(formRegion)) {
                        var entityRegion = this.entityLayoutView().getRegion('entityRegion');
                        entityRegion.on('show', _.bind(function () {
                            this._channel.trigger('view.form.activated');
                        }, this));
                        this.entityLayoutView().showChildView('entityRegion', form);
                    } else {
                        formRegion.on('show', _.bind(function () {
                            this._channel.trigger('view.form.activated');
                        }, this));
                        formRegion.show(form);
                    }
                }, this));
        },
        delete: function (id) {
            var self = this,
                region = _.isFunction(this.region) ? this.region() : this.region;

            if (region.currentView !== this.entityLayoutView()) {
                region.show(this.entityLayoutView());
            }

            this.collection.getById(id)
                .done(function (entityToDelete) {
                    entityToDelete.destroy({
                        type: "DELETE",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: entityToDelete.url + '/' + id,
                        success: function (response) {
                            console.log("Inside success");
                            console.log(response);

                            var currentCollection = self.entityLayoutView().listView.collection;
                            currentCollection.remove(id);

                            self.entityLayoutView().triggerMethod("ShowPager", currentCollection);
                        },
                        error: function (errorResponse) {
                            console.log("Inside Failure");
                            console.log(errorResponse.responseText);
                        }
                    });
                });
        },
        textSearch: function (startsWith, field) {
            var data =
                this.data(1, this.getPageSize())
                    .condition(field, 'like', startsWith);

            this.collection.query(this.track, data.result)
                .done(_.bind(function (entities, key) {
                    var models = null;

                    if (_.isUndefined(entities.child)) {
                        models = entities;
                    } else {
                        models = entities.child;
                    }

                    var listView =
                        new this.listView
                        ({
                            collection: models,
                            parentViewCid: this.entityLayoutView().cid,
                            baseClassIds: this.baseClassIds,
                            route: this.route,
                            sortable: this.sortable,
                            routing: this.routing,
                            embedded: this.embedded
                        });

                    listView.route = this.route;
                    listView.allowableOperations = this.allowableOperations;

                    this.entityLayoutView().key = key;

                    var channel = this.getChannel();
                    channel.trigger('subcollection', models);

                    this.entityLayoutView().showChildView('entityRegion', listView);
                }, this));
        },
        getAll: function (page, force) {
            var region = _.isFunction(this.region) ? this.region() : this.region;
            if (region.currentView !== this._entityLayoutView) {
                throw new Error('You need to call getType on this service before calling get all!!');
            }

            if (isNaN(page)) {
                page = 0;
            }

            var data = this.getData(page);

            this.collection.query(this.track, data, force)
                .done(_.bind(function (entities, key) {
                    var models = null;

                    if (_.isUndefined(entities.child)) {
                        models = entities;
                    } else {
                        models = entities.child;
                    }

                    var listView =
                        new this.listView
                        ({
                            collection: models,
                            parentViewCid: this.entityLayoutView().cid,
                            baseClassIds: this.baseClassIds,
                            route: this.route,
                            sortable: this.sortable,
                            routing: this.routing,
                            embedded: this.embedded
                        });

                    listView.currentPage = page;
                    listView.route = this.route;
                    listView.allowableOperations = this.allowableOperations;

                    this.entityLayoutView().key = key;
                    this.entityLayoutView().listView = listView;

                    var channel = this.getChannel();
                    channel.trigger('subcollection', models);

                    var region = this.entityLayoutView().getRegion('entityRegion');
                    region.on('show', _.bind(function () {
                        this._channel.trigger('view.list.activated');
                    }, this));
                    this.entityLayoutView().showChildView('entityRegion', listView);
                }, this));
        },
        getType: function (page, force) {
            var region = _.isFunction(this.region) ? this.region() : this.region;

            if (isNaN(page)) {
                page = 0;
            }

            if (region.currentView === this._entityLayoutView) {
                this.getAll(page);
                return;
            }

            var data = this.getData(page);

            this.collection.query(this.track, data, force)
                .done(_.bind(function (entities, key) {
                    var models = null;

                    if (_.isUndefined(entities.child)) {
                        models = entities;
                    } else {
                        models = entities.child;
                    }

                    region.reset();
                    models.currentPage = page;

                    var channel = this.getChannel();
                    channel.trigger('subcollection', models);

                    var entityLayoutView = this.entityLayoutView(models);
                    entityLayoutView.key = key;

                    region.show(entityLayoutView);

                    var listViewRegion = this.entityLayoutView().getRegion('entityRegion');
                    listViewRegion.on('show', _.bind(function () {
                        this._channel.trigger('view.list.activated');
                    }, this));
                    this.entityLayoutView().showChildView('entityRegion', entityLayoutView.listView);
                }, this));
        },
        getData: function (page) {
            if (this.sortable) {
                return {};
            }

            return {
                page: parseInt(page),
                pageSize: this.getPageSize()
            };
        },
        getPageSize: function () {
            return _.isUndefined(this.pageSize) ? parseInt(App.pageSize) : this.pageSize;
        }
    });
})(jQuery, _, Backbone, Marionette, App, EntityLayoutView, this['Templates']['headerTemplate'], EntityListItemView, EntityListView);
