define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'views/reusableTypes/ReusableTypeListView',
    'views/reusableTypes/autoComplete/AutoCompleteView',
    'event.aggregator'
], function ($, _, Backbone, Marionette, ReusableTypeListView, AutoCompleteView, EventAggregator) {
    var dropDownListView = ReusableTypeListView.extend({
        className: 'f-dropdown',
        tagName: 'ul',
        childView: AutoCompleteView,
        onRender: function () {
            this.$el.attr('id', this.dataField);
        },
        onShow: function () {
            EventAggregator.trigger('auto-complete:list:complete:' + this.dataField);
        },
        events: {
            'click .autocomplete-item': 'autoCompleteSelected'
        },
        autoCompleteSelected: function (e) {
            EventAggregator.trigger('auto-complete:selected:' + this.dataField, e);
        }
    });

    return dropDownListView;
});