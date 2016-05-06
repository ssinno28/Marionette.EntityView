var MultiSelectListView;
(function ($, _, Backbone, Marionette, EntityListView, MultiSelectOptionView, EventAggregator) {
    MultiSelectListView = EntityListView.extend({
        tagName: 'ul',
        childView: MultiSelectOptionView
    });
})(jQuery, _, Backbone, Marionette, EntityListView, MultiSelectOptionView, EventAggregator);
