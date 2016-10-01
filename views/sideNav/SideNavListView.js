
var SideNavListView;
(function ($, _, Backbone, Marionette, SideNavItemView) {
    SideNavListView = Marionette.SideNavListView = Backbone.Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'list-group',
        events: {
            'click a': 'setActiveElement'
        },
        ui: {
            '$listElements': 'li'
        },
        setActiveElement: function (e) {
            this.$el.find('li').removeClass('active');
            var $target = $(e.target).parent();
            $target.addClass('active');
        },
        childView: SideNavItemView
    });
})(jQuery, _, Backbone, Marionette, SideNavItemView);