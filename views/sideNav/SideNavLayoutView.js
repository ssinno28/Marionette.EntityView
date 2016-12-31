var SideNavLayoutView;
(function ($, _, Backbone, Marionette, SideNavListView, sideNavLayoutTemplate) {
    SideNavLayoutView = Marionette.View.extend({
        template: sideNavLayoutTemplate,
        className: 'nav-pf-vertical nav-pf-vertical-with-sub-menus nav-pf-persistent-secondary',
        regions: {
            listingsRegion: {
                el: '.listingsRegion',
                replaceElement: true
            }
        },
        onDomRefresh: function () {
            var sideNavListView = new SideNavListView({listings: this.model.get('listings')});
            if (!_.isUndefined(this.options.itemView)) {
                sideNavListView.childView = this.options.itemView;
            }

            this.listingsRegion.show(sideNavListView);
        }
    });

})(jQuery, _, Backbone, Marionette, SideNavListView, this['EntityView']['Templates']['./templates/sideNav/sideNavLayoutTemplate.html']);
