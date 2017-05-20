
var PagerItemView;
(function ($, _, Backbone, Marionette, pagerItemTemplate) {
    PagerItemView = Marionette.View.extend({
        template: pagerItemTemplate,
        tagName: 'li',
        className: function () {
            var isCurrent = this.model.get('currentPage'),
                current = '';

            if (isCurrent) {
                current = 'active';
            }

            return current;
        }
    });

})($, _, Backbone, Marionette, this['Templates']['pagerItemTemplate']);
