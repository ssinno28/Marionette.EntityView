var MultiSelectListView;
(function ($, _, Backbone, Marionette, EntityListView, MultiSelectOptionView) {
    MultiSelectListView = EntityListView.extend({
        tagName: 'ul',
        childView: MultiSelectOptionView,
        className: 'multi-select-listings'
    });
})(jQuery, _, Backbone, Marionette, EntityListView, MultiSelectOptionView);
