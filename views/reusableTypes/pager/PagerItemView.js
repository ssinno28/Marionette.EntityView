
var PagerItemView;
(function ($, _, Backbone, Marionette, pagerItemTemplate) {
    PagerItemView = Marionette.View.extend({
        template: pagerItemTemplate,
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

})($, _, Backbone, Marionette, this['FastTrack']['Templates']['./templates/reusableTypes/pager/pagerItemTemplate.html']);