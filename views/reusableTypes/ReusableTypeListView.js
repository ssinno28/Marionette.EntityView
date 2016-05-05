// Filename: views/facets/FacetListView
define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'app'
], function ($, _, Backbone, Marionette, App) {
    var ReusableTypeListView = Backbone.Marionette.CollectionView.extend({
        initialize: function (options) {
            _.extend(this, options);
        },
        childViewOptions: function () {
            var self = this;
            return {
                dataField: self.dataField,
                selectedId: self.selectedId
            }
        }
    });

    // Our module now returns our view
    return ReusableTypeListView;
});
