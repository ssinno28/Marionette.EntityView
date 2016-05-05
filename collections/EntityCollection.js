// Filename: models/project
define([
    'underscore',
    'backbone',
    'jquery',
    'app',
    'backbone.pagedcollection'
], function (_, Backbone, $, App) {
    /**
     * Base Collection used for all entity types
     *
     * @class EntityCollection
     * @type {Backbone.CollectionSubset.extend|*|dst|target|Object|a}
     */
    var EntityCollection = Backbone.PagedCollection.extend({
        baseUrl: function () {
            return App.API_URL;
        }
    });

    // Return the model for the module
    return EntityCollection;
});