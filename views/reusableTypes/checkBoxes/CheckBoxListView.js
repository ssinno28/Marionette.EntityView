// Filename: views/facets/FacetListView
define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'app',
    'views/reusableTypes/checkBoxes/CheckBoxView',
    'views/reusableTypes/ReusableTypeListView'
], function ($, _, Backbone, Marionette, App, CheckBoxView, ReusableTypeListView) {
    var CheckBoxListView = ReusableTypeListView.extend({
        childView: CheckBoxView
    });

    // Our module now returns our view
    return CheckBoxListView;
});
