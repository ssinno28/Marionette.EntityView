// Filename: views/facets/FacetListView
define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'text!templates/sideNav/sideNavItemTemplate.html',
    'event.aggregator',
    'views/tree/TreeCompositeView'
], function ($, _, Backbone, Marionette, sideNavItemTemplate, EventAggregator, TreeCompositeView) {
    var SideNavItemView = TreeCompositeView.extend({
        template: Marionette.TemplateCache.get(sideNavItemTemplate),
        tagName: 'li',
        events: function () {
            var events = {
                'click .item': 'listItemClick'
            };

            var newEvents = _.extend(TreeCompositeView.prototype.events.call(this), events);
            return newEvents;
        },
        listItemClick: function (e) {
            e.stopPropagation();
            var $target = $(e.target);
            EventAggregator.trigger('side-nav:click:' + $target.data('type'), this.model, e, $target.attr('href'));
        },
        templateHelpers: function () {
            var outerScope = this,
                routeUrl = _.isUndefined(outerScope.model.get('route')) ? '#' : outerScope.model.get('route'),
                type = this.model.collection.type;

            if (_.isUndefined(type) || _.isNull(type)) {
                type = this.model.get('type');
            }

            return {
                routeUrl: routeUrl,
                type: type
            };
        }
    });
    // Our module now returns our view
    return SideNavItemView;
});
