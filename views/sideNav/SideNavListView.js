
var SideNavListView;
(function ($, _, Backbone, Marionette, SideNavItemView) {
    SideNavListView = Marionette.SideNavListView = Backbone.Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'list-group',
        childViewEvents: function(){
            // This callback will be called whenever a child is rendered or emits a `render` event
            return {
                'item-clicked': 'setActiveElement'
            }
        },
        ui: {
            '$listElements': 'li'
        },
        setActiveElement: function ($target) {
      /*      this.$el.find('li').removeClass('active');
            $target.closest('li').addClass('active'); */
        },
        childView: SideNavItemView,
        onDomRefresh: function () {
            $().setupVerticalNavigation(true);
        }
    });
})(jQuery, _, Backbone, Marionette, SideNavItemView);