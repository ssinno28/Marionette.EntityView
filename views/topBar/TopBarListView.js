var TopBarListView;
(function ($, _, Backbone, Marionette, TopBarMenuItemView, EventAggregator) {
    TopBarListView = Backbone.Marionette.CollectionView.extend({
        childView: TopBarMenuItemView,
        tagName: 'ul',
        className: 'cr-icon-bar inline-list'
    });
})(jQuery, _, Backbone, Marionette, TopBarMenuItemView, EventAggregator);