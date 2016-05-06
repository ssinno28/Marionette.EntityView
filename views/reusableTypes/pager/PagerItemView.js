
var PagerItemView;
(function ($, _, Backbone, Marionette, pagerItemTemplate) {
    PagerItemView = Marionette.ItemView.extend({
        template: Marionette.TemplateCache.get(pagerItemTemplate),
        tagName: 'li',
        className: function () {
            var isCurrent = this.model.get('currentPage'),
                current = '';

            if (isCurrent) {
                current = 'current';
            }

            return current;
        }
    });

})($, _, Backbone, Marionette, pagerItemTemplate);