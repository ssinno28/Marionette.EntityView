
var SideNavLayoutView;
(function ($, _, Backbone, Marionette, SideNavListView, sideNavLayoutTemplate) {
    SideNavLayoutView = Marionette.LayoutView.extend({
        template: sideNavLayoutTemplate,
        regions: {
            listingsRegion: '.listingsRegion'
        },
        onDomRefresh: function () {
            var sideNavListView = new SideNavListView({listings: this.model.get('listings')});
            if (!_.isUndefined(this.options.itemView)) {
                sideNavListView.childView = this.options.itemView;
            }

            this.listingsRegion.show(sideNavListView);
        }
    });

})(jQuery, _, Backbone, Marionette, SideNavListView, this['FastTrack']['Templates']['./templates/sideNav/sideNavLayoutTemplate.html']);