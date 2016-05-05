// Filename: views/facets/FacetListView
define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'app',
    'views/EntityListView',
    'views/reusableTypes/multiSelectLists/MultiSelectOptionView',
    'event.aggregator'
], function ($, _, Backbone, Marionette, App, EntityListView, MultiSelectOptionView, EventAggregator) {
    var multiSelectListView = EntityListView.extend({
        tagName: 'ul',
        childView: MultiSelectOptionView
    });

    // Our module now returns our view
    return multiSelectListView;
});
