// Filename: models/project
define([
    'underscore',
    'backbone',
    'jquery',
    'app',
    'util/uriUtil',
    'collections/EntityCollection'
], function (_, Backbone, $, App, UriUtil, EntityCollection) {
    /**
     * This collection is used for hierarchical entites
     *
     * @class HierarchicalEntityCollection
     * @type {Backbone.CollectionSubset.extend|*|dst|target|Object|a}
     */
    var HierarchicalEntityCollection = EntityCollection.extend({
        /**
         * Description
         * @method initialize
         * @return 
         */
        initialize: function () {
            EntityCollection.prototype.initialize.apply(this);
        },
        /**
         * Description
         * @method getChildren
         * @param {} parentId
         * @param {} limit
         * @return CallExpression
         */
        getChildren: function (parentId, limit, includeEntity) {
            var outerScope = this,
                data = {parentId: parentId, limit: limit},
                url = this.getUrl(),
                key = url + UriUtil.getUriHash(data);

            var cachedDeferred = window.getCache(key);
            if (!_.isUndefined(cachedDeferred)) {
                return cachedDeferred;
            }

            /**
             * Description
             * @method getCollection
             * @return result
             */
            var getCollection = $.Deferred(function (defer) {
                var result = $.ajax({
                    type: 'GET',
                    url: url + '/GetChildren',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: data,
                    /**
                     * Description
                     * @method success
                     * @param {} response
                     * @return 
                     */
                    success: function (response) {
                        outerScope.addModelsToCollection(response);
                        defer.resolve(outerScope.getChildrenCollection(parentId, includeEntity));
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
                        defer.reject();
                    }
                });

                return result;
            });

            window.setCache(key, getCollection);
            return getCollection;
        },
        /**
         * Description
         * @method getParents
         * @param {} id
         * @param {} limit
         * @param {} includeEntity
         * @return CallExpression
         */
        getParents: function (id, limit, includeEntity) {
            var outerScope = this,
                url = this.getUrl() + '/GetParents',
                data = {id: id, limit: limit},
                key = url + UriUtil.getUriHash(data);

            var cachedDeferred = window.getCache(key);
            if (!_.isUndefined(cachedDeferred)) {
                return cachedDeferred;
            }

            var getCollection = $.Deferred(function (defer) {
                var result = $.ajax({
                    type: 'GET',
                    url: url,
                    data: data,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    /**
                     * Description
                     * @method success
                     * @param {} response
                     * @return 
                     */
                    success: function (response) {
                        outerScope.addModelsToCollection(response);
                        defer.resolve(outerScope.getParentsCollection(id, includeEntity));
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
                        defer.reject();
                    }
                });

                return result;
            });

            window.setCache(key, getCollection);
            return getCollection;
        },
        /**
         * Description
         * @method getParentIds
         * @param {} entity
         * @return uniqueParentIds
         */
        getParentIds: function (entity) {
            var currentParentIds = entity.get('parentIds'),
                allParentIds = [],
                collectionContext = this;

            allParentIds = allParentIds.concat(currentParentIds);

            _.each(currentParentIds, function (parentId) {
                var parentEntity = collectionContext.get(parentId);

                if (parentEntity.get('parentIds').length > 0) {
                    allParentIds.concat(collectionContext.getParents(parentEntity));
                }
            });

            var uniqueParentIds = _.uniq(allParentIds, function (item, key, a) {
                return item;
            });

            return uniqueParentIds;
        },
        getChildrenIds: function (entity) {
            var children = this.filter(function(profile){
               return profile.get('parentIds').indexOf(entity.get('id')) > -1;
            });

            return _.pluck(children, 'id');
        },
        /**
         * Description
         * @method getParentsCollection
         * @param {} id
         * @param {} includeEntity
         * @return MemberExpression
         */
        getParentsCollection: function (id, includeEntity) {
            var collectionContext = this,
                entity = this.get(id);

            var parentIds = this.getParentIds(entity);

            if (includeEntity) {
                parentIds.push(id);
            }

            var collection = new Backbone.CollectionSubset({
                parent: collectionContext,
                /**
                 * Description
                 * @method filter
                 * @param {} node
                 * @return BinaryExpression
                 */
                filter: function (node) {
                    var modelId = node.get('id');
                    return  parentIds.indexOf(modelId) > -1;
                }
            });

            return collection.child;
        },
        /**
         * Description
         * @method getChildrenCollection
         * @param {} id
         * @param {} includeEntity
         * @return MemberExpression
         */
        getChildrenCollection: function (id, includeEntity) {
            var collectionContext = this,
                entity = this.get(id);

            var childrenIds = this.getChildrenIds(entity);

            if (includeEntity) {
                childrenIds.push(id);
            }

            var collection = new Backbone.CollectionSubset({
                parent: collectionContext,
                /**
                 * Description
                 * @method filter
                 * @param {} node
                 * @return BinaryExpression
                 */
                filter: function (node) {
                    var modelId = node.get('id');
                    return  childrenIds.indexOf(modelId) > -1;
                }
            });

            return collection.child;
        },
        /**
         * Description
         * @method getTopLevel
         * @return CallExpression
         */
        getTopLevel: function (track) {
            var outerScope = this,
                url = this.getUrl() + '/GetTopLevel';

            /**
             * Description
             * @method getCollection
             * @return result
             */
            var getCollection = $.Deferred(function (defer) {
                var result = $.ajax({
                    type: 'GET',
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    /**
                     * Description
                     * @method success
                     * @param {} response
                     * @return 
                     */
                    success: function (response) {
                        var models = outerScope.addModelsToCollection(response);

                        if (track) {
                            defer.resolve(outerScope.getSubCollection(response));
                        } else {
                            defer.resolve(new Backbone.Collection(models));
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

            return window.getCache(url, getCollection);
        }
    });
    // Return the model for the module
    return HierarchicalEntityCollection;
});