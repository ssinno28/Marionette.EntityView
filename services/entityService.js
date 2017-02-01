var EntityService;
(function ($, _, Backbone, Marionette, App, EntityLayoutView, headerTemplate) {
    EntityService = Marionette.EntityService = Marionette.Object.extend({
        initialize: function (options) {
            _.extend(this, options);

            this._entityLayoutView = null;

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
                };
            }

            this.channelName = this.route;
        },
        radioEvents: function () {
            var radioEvents = {};
            radioEvents['create'] = this.create;
            radioEvents['edit'] = this.edit;
            radioEvents['delete'] = this.delete;
            radioEvents['getAll'] = this.getAll;
            radioEvents['getType'] = this.getType;
            radioEvents['textSearch'] = this.textSearch;
            radioEvents['destroy'] = this.destroy;

            return radioEvents;
        },
        destroy: function () {
            this.getChannel().reset();
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
                    collection: entities === undefined ? this.collection : entities,
                    baseClassIds: this.baseClassIds
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
                routing: this.routing
            });
        },
        getHeader: function () {
            return {params: {title: this.title}, template: headerTemplate};
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
        create: function () {
            var entity = this.getNewModel();

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
        },
        edit: function () {
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
                        formOptions: this.getFormOptions(),
                        channelName: this.channelName
                    });

                    this.entityLayoutView().showChildView('entityRegion', form);
                }, this));
        },
        delete: function () {
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
        },
        textSearch: function (startsWith, field) {
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

                    var channel = this.getChannel();
                    channel.trigger('subcollection', models);

                    this.entityLayoutView().showChildView('entityRegion', listView);
                }, this));
        },
        getAll: function (page, force) {
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

                    var channel = this.getChannel();
                    channel.trigger('subcollection', models);

                    self.entityLayoutView().showChildView('entityRegion', listView);
                });
        },
        getType: function (page, force) {
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

                    var channel = this.getChannel();
                    channel.trigger('subcollection', models);

                    var entityLayoutView = self.entityLayoutView(models);
                    entityLayoutView.key = key;

                    self.region.show(entityLayoutView);
                });
        },
        getData: function (page) {
            return {
                page: parseInt(page),
                pageSize: parseInt(window.pageSize)
            };
        }
    });
})(jQuery, _, Backbone, Marionette, App, EntityLayoutView, this['Templates']['headerTemplate']);
