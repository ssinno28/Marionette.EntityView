// Filename: views/facets/FacetListView
define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!templates/reusableTypes/checkBoxTemplate.html',
    'views/reusableTypes/ReusableTypeView',
    'event.aggregator'
], function ($, _, Backbone, Marionette, checkBoxTemplate, ReusableTypeView, EventAggregator) {
    var CheckBoxView = ReusableTypeView.extend({
        tagName: 'div',
        className: 'large-6 columns',
        template: Backbone.Marionette.TemplateCache.get(checkBoxTemplate),
        events: {
            'click input[type=checkbox]': 'itemChecked'
        },
        itemChecked: function (e) {
            EventAggregator.trigger(this.dataField + ':checked', this.model);
        }
    });
    // Our module now returns our view
    return CheckBoxView;
});
