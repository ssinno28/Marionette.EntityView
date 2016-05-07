var IconMenuItemView;
(function ($, _, Backbone, Marionette, iconMenuItemTemplate, EventAggregator) {
    IconMenuItemView = Marionette.ItemView.extend({
        template: iconMenuItemTemplate,
        tagName: 'li',
        events: {
            'click .item': 'listItemClick'
        },
        listItemClick: function (e) {
            e.stopPropagation();
            var $target = $(e.target);
            EventAggregator.trigger('icon-menu:click:' + $target.data('type'), this.model, e, $target.attr('href'));
        },
        templateHelpers: function () {
            var outerScope = this,
                routeUrl = _.isUndefined(outerScope.model.get('route')) ? '#' : '#' + outerScope.model.get('route'),
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
})(jQuery, _, Backbone, Marionette, this['FastTrack']['Templates']['./templates/iconMenu/iconMenuItemTemplate.html'], EventAggregator);
