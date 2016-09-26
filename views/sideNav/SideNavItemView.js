var SideNavItemView;
(function ($, _, Backbone, Marionette, sideNavItemTemplate, EventAggregator, TreeCompositeView) {
    SideNavItemView = Marionette.SideNavItemView = TreeCompositeView.extend({
        template: sideNavItemTemplate,
        tagName: 'li',
        onRender: function () {
            this.$el.data('target', 'toggle-' + this.model.get('id'));
        },
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

})(jQuery, _, Backbone, Marionette, this['FastTrack']['Templates']['./templates/sideNav/sideNavItemTemplate.html'], EventAggregator, TreeCompositeView);
