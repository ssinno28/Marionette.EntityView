
var EntityCollection;
(function (_, Backbone, $, App) {
    /**
     * Base Collection used for all entity types
     *
     * @class EntityCollection
     * @type {Backbone.CollectionSubset.extend|*|dst|target|Object|a}
     */
    EntityCollection = Backbone.EntityCollection = Backbone.PagedCollection.extend({
        baseUrl: function () {
            return App.API_URL;
        }
    });
})(_, Backbone, jQuery, App);