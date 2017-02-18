var EntityCollection;
(function (_, Backbone, $, App, lunr, Filters) {
    var addIndexFields = function (indexFields) {
        for (var j = 0; j < indexFields.length; j++) {
            var indexField = indexFields[j];
            this.field(indexField.name);
        }

        this.ref('id');
    };

    var getOrCondition = function (model, leftConditions, rightConditions) {
        var left = this._predicate(model, leftConditions);
        var right = this._predicate(model, rightConditions);

        return left || right;
    };

    var getAndCondition = function (model, leftConditions, rightConditions) {
        var left = this._predicate(model, leftConditions);
        var right = this._predicate(model, rightConditions);

        return left && right;
    };

    EntityCollection = Backbone.EntityCollection = Backbone.Collection.extend({
        defaults: {
            currentPage: 0
        },
        initialize: function () {
            this._filters = this.getFilters();
        },
        baseUrl: function () {
            return _.isUndefined(App.API_URL) ? '' : App.API_URL;
        },
        setAttributes: function (model, data) {

        },
        getHeaders: function () {
            return {};
        },
        getFilters: function () {
            return new Filters();
        },
        /**
         * Description
         * @method addModelsToCollection
         * @param {} models
         * @return
         */
        addRange: function (models, data) {
            console.log(models);

            if (_.isNull(models)) {
                return [];
            }

            var range = [],
                numOfResults = models.length;

            for (var i = numOfResults; i--;) {
                var currentModel = this.get(models[i].id);

                if (!_.isUndefined(currentModel)) {
                    range.push(currentModel);
                    continue;
                }

                var model = new this.model(models[i]);
                model.url = this.getUrl(data);

                this.setAttributes(model, data);

                this.add(model);
                range.push(model);

                if (!_.isUndefined(this.indexFields)) {
                    if (_.isUndefined(this.searchIndex)) {
                        this.searchIndex =
                            lunr(addIndexFields(this.indexFields));
                    }

                    var indexObject = {};
                    for (var j = 0; j < this.indexFields.length; j++) {
                        var indexField = this.indexFields[j];
                        indexObject[indexField.name] = model.get(indexField.name);
                        indexObject.id = model.get('id');
                    }

                    this.searchIndex.add(indexObject);
                }
            }

            return range;
        },
        _addModelIndexes: function (key, models, data, count) {
            var modelIds = _.pluck(models, 'id');

            if (_.isUndefined(App.indexes)) {
                App.indexes = {};
            }

            if (_.isUndefined(App.indexes[key]) && _.isNumber(count)) {
                App.indexes[key] = count;
            }

            _.each(models, function (model) {
                if (_.isUndefined(model.indexes)) {
                    model.indexes = {};
                }

                var currentIndex = modelIds.indexOf(model.id);

                if ((!_.isUndefined(data.params) && data.params.page && data.params.pageSize) || (data.page && data.pageSize)) {
                    var page = null,
                        pageSize = null;

                    if (data.params) {
                        page = data.params.page;
                        pageSize = data.params.pageSize;
                    } else {
                        page = data.page;
                        pageSize = data.pageSize;
                    }

                    var startingIndex = (page - 1) * pageSize;
                    currentIndex = currentIndex + startingIndex;
                }

                model.indexes[key] = currentIndex;
            });
        },
        /**
         * Description
         * @method fetch
         * @return CallExpression
         */
        fetch: function (track, data) {
            if (_.isUndefined(data)) {
                data = {};
            }

            var self = this,
                params = data.params,
                url = this.getUrl(data, true);

            if (track) {
                var cachedDeferred = window.getCache(url);
                if (!_.isUndefined(cachedDeferred)) {
                    return cachedDeferred;
                }
            }

            /**
             * Description
             * @method getCollection
             * @return result
             */
            var getCollection =
                new $.Deferred(function (defer) {
                    var result = $.ajax({
                        type: 'GET',
                        url: url,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: params,
                        headers: self.getHeaders(),
                        /**
                         * Description
                         * @method success
                         * @param {} response
                         * @return
                         */
                        success: function (response) {
                            var entities = [],
                                isArray = response instanceof Array;

                            if (!isArray) {
                                entities = response.entities;
                            } else {
                                entities = response;
                            }

                            var models = self.addRange(entities);
                            self._addModelIndexes(url, models, data, parseInt(response.count));

                            var result;
                            if (track) {
                                result = self._getSubCollection(data, url);

                                result.child.on('remove', function (removedModel) {
                                    self._alignIndexes(removedModel, url);
                                    App.indexes[url]--;
                                });

                                result.child.on('add', function () {
                                    App.indexes[url]++;
                                });

                                defer.resolve(result, url);
                            } else {
                                result = new Backbone.Collection(models);

                                result.on('remove', function (removedModel) {
                                    self._alignIndexes(removedModel, url);
                                    App.indexes[url]--;
                                });

                                result.on('add', function () {
                                    App.indexes[url]++;
                                });

                                defer.resolve(result, url);
                            }
                        },
                        /**
                         * Description
                         * @method error
                         * @param {} errorResponse
                         * @return
                         */
                        error: function (errorResponse) {
                            console.log("Inside Failure");
                            console.log(errorResponse.responseText);
                        }
                    });

                    return result;
                });

            if (track) {
                App.setCache(url, getCollection);
            }

            return getCollection;
        },
        _alignIndexes: function (removedModel, key) {
            var index = removedModel.indexes[key];

            if (_.isUndefined(index)) {
                return;
            }

            index++;
            var models =
                this.filter(function (entity) {
                    var entityIndex = entity.indexes[key];
                    return !_.isUndefined(entityIndex) && entityIndex >= index;
                });

            _.each(models, function (model) {
                model.indexes[key]--;
            });
        },
        _getKeyWithOutPage: function (data) {
            var dataCopy = _.extend({}, data);
            if ((!_.isUndefined(data.params) && data.params.page && data.params.pageSize) || (data.page && data.pageSize)) {
                if (data.params) {
                    delete dataCopy.params.page;
                    delete dataCopy.params.pageSize;
                } else {
                    delete dataCopy.page;
                    delete dataCopy.pageSize;
                }
            }

            return this._getQueryKey(dataCopy);
        },
        /**
         * Description
         * @method fetch
         * @return CallExpression
         */
        query: function (track, data, force) {
            if (_.isUndefined(data)) {
                data = {};
            }

            var self = this,
                url = this.getUrl(data, false) + '/query';

            var key = this._getQueryKey(data),
                pageKey = this._getKeyWithOutPage(data);

            if (_.isUndefined(force) || (!_.isUndefined(force) && !force)) {
                var cachedDeferred = window.getCache(key);
                if (!_.isUndefined(cachedDeferred)) {
                    return cachedDeferred;
                }
            }

            if (data && data.conditions) {
                //make sure we turn arrays into comma delimited string
                for (var i = data.conditions.length; i--;) {
                    if (data.conditions[i].value instanceof Array) {
                        data.conditions[i].value = data.conditions[i].value.toString();
                    }
                }
            }

            var queryData = JSON.parse(JSON.stringify(data)),
                indexes = [];

            _.each(queryData.conditions, function (condition) {
                if (condition.excludeFromQuery) {
                    var index = queryData.conditions.indexOf(condition);
                    indexes.push(index);
                }
            });

            queryData.conditions = _.filter(queryData.conditions, function (condition) {
                var index = queryData.conditions.indexOf(condition);
                return indexes.indexOf(index) === -1;
            });

            /**
             * Description
             * @method getCollection
             * @return result
             */
            var getCollection =
                new $.Deferred(function (defer) {
                    var result = $.ajax({
                        type: 'POST',
                        url: url,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify(queryData),
                        headers: self.getHeaders(),
                        /**
                         * Description
                         * @method success
                         * @param {} response
                         * @return
                         */
                        success: function (response) {
                            var entities = [],
                                isArray = response instanceof Array;

                            if (!isArray) {
                                entities = response.entities;
                            } else {
                                entities = response;
                            }

                            var models = self.addRange(entities, data);
                            self._addModelIndexes(pageKey, models, data, parseInt(response.count));

                            var result;
                            if (track) {
                                result = self._getSubCollection(data, pageKey);

                                result.child.on('add', function () {
                                    App.indexes[pageKey]++;
                                });

                                result.child.on('remove', function (removedModel) {
                                    self._alignIndexes(removedModel, pageKey);
                                    App.indexes[pageKey]--;
                                });

                                defer.resolve(result, pageKey);
                            } else {
                                result = new Backbone.Collection(models);

                                result.on('add', function () {
                                    App.indexes[pageKey]++;
                                });

                                result.on('remove', function (removedModel) {
                                    self._alignIndexes(removedModel, pageKey);
                                    App.indexes[pageKey]--;
                                });

                                defer.resolve(result, pageKey);
                            }
                        },
                        /**
                         * Description
                         * @method error
                         * @param {} errorResponse
                         * @return
                         */
                        error: function (errorResponse) {
                            console.log("Inside Failure");
                            console.log(errorResponse.responseText);
                        }
                    });

                    return result;
                });


            if (_.isUndefined(force) || (!_.isUndefined(force) && !force)) {
                App.setCache(key, getCollection);
            }

            return getCollection;
        },
        /**
         * Description
         * @method getSubCollection
         * @param {} id
         * @param {} includeEntity
         * @return MemberExpression
         */
        _getSubCollection: function (data, key) {
            var self = this,
                conditionals = [];

            if (data.conditions) {
                //get the filter from the _filters object by name and set the criterion so
                //backbone.subcollection knows how to filter the collection.
                for (var i = 0; i < data.conditions.length; i++) {
                    var currentCondition = data.conditions[i];
                    currentCondition.criterion = this._filters[currentCondition.searchType];
                }

                if (_.isUndefined(data.groupJoins)) {
                    _.each(data.conditions, function (condition) {
                        conditionals.push(condition);
                    });
                } else {

                    var index = 0;
                    _.each(data.groupJoins, function (groupJoin) {
                        if (parseInt(groupJoin)) {
                            index++;
                            return;
                        }

                        var leftConditions =
                            _.pluck(_.filter(data.conditions, function (condition) {
                                return condition.group == data.groupJoins[j - 1];
                            }), 'criterion');

                        var rightConditions =
                            _.pluck(_.filter(data.conditions, function (condition) {
                                return condition.group == data.groupJoins[j + 1];
                            }), 'criterion');

                        if (groupJoin === 'or') {
                            conditionals.push(getOrCondition(model, leftConditions, rightConditions));
                        }

                        if (groupJoin === 'and') {
                            conditionals.push(getAndCondition(model, leftConditions, rightConditions));
                        }

                        index++;
                    });
                }
            }

            var collection = new Backbone.CollectionSubset({
                parent: self,
                /**
                 * Description
                 * @method filter
                 * @param {} model
                 * @return boolean
                 */
                filter: function (model) {
                    return self._predicate(model, conditionals);
                }
            });

            if (!_.isUndefined(data.params) && data.params.page && data.params.pageSize) {
                collection.child.currentPage = data.params.page;
            }

            if ((!_.isUndefined(data.params) && data.params.page && data.params.pageSize) || (data.page && data.pageSize)) {
                var page = null,
                    pageSize = null;

                if (data.params) {
                    page = data.params.page;
                    pageSize = data.params.pageSize;
                } else {
                    page = data.page;
                    pageSize = data.pageSize;
                }

                var pagingFilter =
                    function (model) {
                        var firstResult = (page - 1) * App.pageSize,
                            maxResults = firstResult + App.pageSize;

                        if (_.isUndefined(model.indexes)) {
                            model.indexes = {};
                        }

                        var index = model.indexes[key];

                        if (_.isUndefined(index)) {
                            index = collection.child.length - 1;
                            model.indexes[key] = index;
                        }

                        return index >= firstResult && index <= maxResults - 1;
                    };


                var pagedCollection = new Backbone.CollectionSubset({
                    parent: collection.child,
                    /**
                     * Description
                     * @method filter
                     * @param {} model
                     * @return boolean
                     */
                    filter: function (model) {
                        return pagingFilter(model);
                    }
                });

                return pagedCollection;
            }

            return collection;
        },
        _predicate: function (model, conditionals) {
            for (var i = 0; i < conditionals.length; i++) {
                var criterion = _.bind(conditionals[i].criterion, this);
                if ((_.isUndefined(criterion) && !conditionals[i](model)) || (!_.isUndefined(criterion) && !criterion(model, conditionals[i]))) {
                    return false;
                }
            }

            return true;
        },
        /**
         * The get url method is designed to create urls
         * with the variable name followed by its value separated by forward slashes (ex. /page/1/pageSize/10)
         *
         * @method getUrl
         * @return string
         */
        getUrl: function (data, appendPath) {
            var relativePath = '';

            if (data && appendPath) {
                for (var key in data) {
                    if (key === 'params' || key === 'conditions') {
                        continue;
                    }

                    var value = '';
                    if (data[key] instanceof Array) {
                        value = data[key].toString();
                    } else {
                        value = data[key];
                    }

                    relativePath = relativePath + '/' + key + '/' + value;
                }
            }

            return (!_.isUndefined(this.baseUrl) ? this.baseUrl() : "") +
                (_.isFunction(this.url) ? this.url(data) : this.url) +
                relativePath;
        },
        _getQueryKey: function (data) {
            var conditions = data.conditions,
                groupJoins = data.groupJoins;

            var key = this.getUrl(data) + '/query';
            if (data.page && data.pageSize) {
                key = key + '/page/' + data.page + '/pageSize/' + data.pageSize;
            }

            if (groupJoins) {
                key = key + '/groupJoins/' + groupJoins.toString();
            }

            _.each(conditions, function (condition) {
                key = key + '/searchType/' + condition.searchType;
                key = key + '/field/' + condition.field;
                key = key + '/value/' + condition.value;

                if (condition.junction) {
                    key = key + '/junction/' + condition.junction;
                }

                if (condition.group) {
                    key = key + '/group/' + condition.group;
                } else {
                    key = key + '/group/' + 0;
                }
            });

            return key;
        },
        /**
         * Description
         * @method deleteByIds
         * @param {} ids
         * @return CallExpression
         */
        deleteByIds: function (ids) {
            var url = this.getUrl({ids: ids}),
                self = this;

            /**
             * Description
             * @method deleteModels
             * @return result
             */
            var deleteModels = function () {
                var result = $.ajax({
                    type: 'DELETE',
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    headers: self.getHeaders(),
                    /**
                     * Description
                     * @method success
                     * @param {} response
                     * @return
                     */
                    success: function (response) {
                        if (response) {
                            _.each(ids, function (id) {
                                self.remove(id);
                            });
                        }
                    },
                    /**
                     * Description
                     * @method error
                     * @param {} errorResponse
                     * @return
                     */
                    error: function (errorResponse) {
                        console.log("Inside Failure");
                        console.log(errorResponse.responseText);
                    }
                });

                return result;
            };

            return deleteModels();
        },
        /**
         * Description
         * @method getById
         * @param {} id
         * @return CallExpression
         */
        getById: function (id, async) {
            var self = this;

            if (_.isUndefined(async)) {
                async = true;
            }

            var deferred =
                $.Deferred(function (defer) {
                    var entity = self.get(id);

                    if (_.isUndefined(entity)) {
                        entity = new self.model({id: id});
                        entity.setUrl(self.getUrl());

                        entity.fetch({
                                url: entity.url + '/' + id,
                                async: async,
                                headers: self.getHeaders()
                            })
                            .done(function () {
                                self.add(entity);
                                defer.resolve(entity);
                            });
                    } else {
                        defer.resolve(entity);
                    }
                });

            return deferred;
        }
    });
})(_, Backbone, jQuery, App, lunr, EntityFilters);
