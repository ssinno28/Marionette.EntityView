define([
    'jquery',
    'underscore',
    'backbone',
    'marionette'
], function($, _, Backbone, Marionette){
    var EntityLayoutModel = Backbone.Model.extend({
        defaults: {
            title : '',
            listView : new Backbone.Marionette.CollectionView(),
            route: '',
            additionalParams: ''
        }
    });

    return EntityLayoutModel;
});