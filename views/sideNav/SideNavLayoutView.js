define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'views/sideNav/SideNavListView',
    'text!templates/sideNav/sideNavLayoutTemplate.html'
], function ($, _, Backbone, Marionette, SideNavListView, template) {
    var sideNavLayoutView = Marionette.LayoutView.extend({
        template: Marionette.TemplateCache.get(template),
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
    return sideNavLayoutView;
});