// Filename: views/facets/FacetListView
define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'app',
    'views/reusableTypes/radioButtons/RadioButtonView',
    'views/reusableTypes/ReusableTypeListView'
], function ($, _, Backbone, Marionette, App, RadioButtonView, ReusableTypeListView) {
    var RadioButtonListView = ReusableTypeListView.extend({
        childView: RadioButtonView
    });

    // Our module now returns our view
    return RadioButtonListView;
});
