var IconMenuListView;
(function ($, _, Backbone, Marionette, IconMenuItemView, EventAggregator) {
    IconMenuListView = Backbone.Marionette.CollectionView.extend({
        childView: IconMenuItemView,
        tagName: 'ul',
        className: 'cr-icon-bar inline-list'
    });
})(jQuery, _, Backbone, Marionette, IconMenuItemView, EventAggregator);