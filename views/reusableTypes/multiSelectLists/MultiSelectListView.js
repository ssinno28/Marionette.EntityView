var MultiSelectListView;
(function ($, _, Backbone, Marionette, EntityListView, MultiSelectOptionView) {
    MultiSelectListView = EntityListView.extend({
        tagName: 'ul',
        childView: MultiSelectOptionView,
        className: 'multi-select-listings',
        childViewOptions: function () {
            var options = EntityListView.prototype.childViewOptions.call(this);
            return _.extend(options, {displayField: this.displayField});
        }
    });
})(jQuery, _, Backbone, Marionette, EntityListView, MultiSelectOptionView);
