define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'views/reusableTypes/ReusableTypeListView',
    'views/reusableTypes/autoComplete/AutoCompleteView',
    'text!templates/reusableTypes/autoComplete/liAutoCompleteTemplate.html',
    'event.aggregator'
], function ($, _, Backbone, Marionette, ReusableTypeListView, AutoCompleteView, liAutoCompleteTemplate, EventAggregator) {
    var autoCompleteView = Marionette.ItemView.extend({
        tagName: 'li',
        template: Marionette.TemplateCache.get(liAutoCompleteTemplate)
    });

    return autoCompleteView;
});