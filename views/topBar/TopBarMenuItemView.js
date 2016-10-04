var TopBarMenuItemView;
(function ($, _, Backbone, Marionette, topBarMenuItemTemplate, EventAggregator) {
    TopBarMenuItemView = Marionette.View.extend({
        template: topBarMenuItemTemplate,
        tagName: 'li',
        events: {
            'click .item': 'listItemClick'
        },
        listItemClick: function (e) {
            e.stopPropagation();
            var $target = $(e.target).closest('a');
            EventAggregator.trigger('top-bar:click:' + $target.data('type'), this.model, e, $target.attr('href'));
        },
        templateContext: function () {
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
})(jQuery, _, Backbone, Marionette, this['FastTrack']['Templates']['./templates/topBar/iconMenuItemTemplate.html'], EventAggregator);
