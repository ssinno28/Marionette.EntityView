var EntityService;
(function ($, _, Backbone, Marionette, App, EntityLayoutView, headerTemplate, EventAggregator) {
    EntityService = Marionette.EntityService = (function () {

        var ctor = function () {

        };

        ctor.initialize = function (options) {
            _.extend(this, options);

            this._entityLayoutView = null;
            var self = this;

            if (!_.isUndefined(options.allowableOperations)) {
                this.allowableOperations = options.allowableOperations;
            } else {
                this.allowableOperations = ['create', 'delete', 'edit', 'delete-all', 'publish-all', 'view-live'];
            }

            if (_.isUndefined(options.routing)) {
                this.routing = true;
            }

            if (_.isUndefined(this.entityLayoutViewType)) {
                this.entityLayoutViewType = EntityLayoutView;
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
                }
            }

            EventAggregator.on(this.route + '.create', function () {
                self.create();
            });

            EventAggregator.on(this.route + '.edit', function (id) {
                self.edit(id);
            });

            EventAggregator.on(this.route + '.delete', function (id) {
                self.delete(id);
            });

            EventAggregator.on(this.route + '.getAll', function (page, force) {
                self.getAll(page, force);
            });

            EventAggregator.on(this.route + '.getType', function (page, force) {
                self.getType(page, force);
            });

            EventAggregator.on(this.route + '.textSearch', function (startsWith, field) {
                self.textSearch(startsWith, field);
            });

            EventAggregator.on(this.route + '.destroy', function () {
                self.destroy();
            });
        };

        ctor.destroy = function () {
            EventAggregator.off(this.route + '.create');
            EventAggregator.off(this.route + '.edit');
            EventAggregator.off(this.route + '.delete');
            EventAggregator.off(this.route + '.getAll');
            EventAggregator.off(this.route + '.getType');
            EventAggregator.off(this.route + '.textSearch');
            EventAggregator.off(this.route + '.destroy');
        };

        ctor.entityLayoutView =
            function (entities) {
                if (_.isNull(this._entityLayoutView) || this._entityLayoutView.isDestroyed()) {
                    this._entityLayoutView = this.getEntityLayoutView(entities);
                }

                return this._entityLayoutView;
            };

        ctor.getEntityLayoutView = function (entities) {
            var listView =
                new this.listView
                ({
                    collection: entities === undefined ? this.collection : entities,
                    baseClassIds: this.baseClassIds
                });

            listView.currentPage = entities === undefined ? 1 : entities.currentPage;

            return new this.entityLayoutViewType
            ({
                allowableOperations: this.allowableOperations,
                route: this.route,
                listView: listView,
                header: this.getHeader(),
                model: new Backbone.Model(),
                btnClass: this.getBtnClass(),
                routing: this.routing
            });
        };

        ctor.getHeader = function () {
            return {params: {title: this.title}, template: headerTemplate};
        };

        ctor.getBtnClass = function () {
            return '';
        };

        ctor.getNewModel = function () {
            return new this.model();
        };

        ctor.getFormOptions = function () {
            return {};
        };

        ctor.create = function () {
            var entity = this.getNewModel();
            App.currentRoute = 'create';

            if (this.region.currentView !== this.entityLayoutView()) {
                this.region.show(this.entityLayoutView());
            }

            var form = new this.formView
            ({
                model: entity,
                collection: this._entityLayoutView.listView.collection,
                parentViewCid: this.entityLayoutView().cid,
                btnClass: this.getBtnClass(),
                formOptions: this.getFormOptions()
            });

            this.entityLayoutView().showChildView('entityRegion', form);
        };

        ctor.edit = function (id) {
            App.currentRoute = 'edit';

            if (this.region.currentView !== this.entityLayoutView()) {
                this.region.show(this.entityLayoutView());
            }

            this.collection.getById(id)
                .done(_.bind(function (entity) {
                    var form = new this.formView
                    ({
                        model: entity,
                        collection: this._entityLayoutView.listView.collection,
                        parentViewCid: this.entityLayoutView().cid,
                        btnClass: this.getBtnClass(),
                        formOptions: this.getFormOptions()
                    });

                    this.entityLayoutView().showChildView('entityRegion', form);
                }, this));
        };

        ctor.delete = function (id) {
            var self = this;

            if (this.region.currentView !== this.entityLayoutView()) {
                this.region.show(this.entityLayoutView());
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
        };

        ctor.textSearch = function (startsWith, field) {
            var data = {
                conditions: [
                    {
                        searchType: 'like',
                        field: field,
                        value: startsWith
                    }
                ],
                page: 1,
                pageSize: window.pageSize
            };

            this.collection.query(this.track, data)
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
                            baseClassIds: this.baseClassIds
                        });

                    listView.route = this.route;
                    listView.allowableOperations = this.allowableOperations;

                    this.entityLayoutView().key = key;
                    EventAggregator.trigger(self.route + '.subcollection', models);
                    this.entityLayoutView().showChildView('entityRegion', listView);
                }, this));
        };

        ctor.getAll = function (page, force) {
            var self = this;

            if (isNaN(page)) {
                page = 0;
            }

            var data = this.getData(page);

            this.collection.query(this.track, data, force)
                .done(function (entities, key) {
                    var models = null;

                    if (_.isUndefined(entities.child)) {
                        models = entities;
                    } else {
                        models = entities.child;
                    }


                    var listView =
                        new self.listView
                        ({
                            collection: models,
                            parentViewCid: self.entityLayoutView().cid,
                            baseClassIds: self.baseClassIds
                        });

                    listView.currentPage = page;
                    listView.route = self.route;
                    listView.allowableOperations = self.allowableOperations;

                    self.entityLayoutView().key = key;
                    self.entityLayoutView().listView = listView;

                    EventAggregator.trigger(self.route + '.subcollection', models);
                    self.entityLayoutView().showChildView('entityRegion', listView);
                });
        };

        ctor.getType = function (page, force) {
            var self = this;

            if (isNaN(page)) {
                page = 0;
            }

            if (this.region.currentView === this._entityLayoutView) {
                this.getAll(page);
                return;
            }

            var data = this.getData(page);

            this.collection.query(this.track, data, force)
                .done(function (entities, key) {
                    var models = null;

                    if (_.isUndefined(entities.child)) {
                        models = entities;
                    } else {
                        models = entities.child;
                    }

                    self.region.reset();
                    models.currentPage = page;

                    EventAggregator.trigger(self.route + '.subcollection', models);
                    var entityLayoutView = self.entityLayoutView(models);
                    entityLayoutView.key = key;

                    self.region.show(entityLayoutView);
                });
        };

        ctor.getData = function (page) {
            return {
                page: parseInt(page),
                pageSize: parseInt(window.pageSize)
            };
        };

        //set the context for all of the functions
        for (var key in ctor) {
            if (typeof(ctor[key]) === "function") {
                _.bind(ctor[key], ctor);
            }
        }

        return ctor;
    });
})(jQuery, _, Backbone, Marionette, App, EntityLayoutView, this['EntityView']['Templates']['./templates/headerTemplate.html'], EventAggregator);
