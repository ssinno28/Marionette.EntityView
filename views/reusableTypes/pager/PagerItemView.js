define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'text!templates/reusableTypes/pager/pagerItemTemplate.html'
], function ($, _, Backbone, Marionette, template) {
    var PagerItemView = Marionette.ItemView.extend({
        template: Marionette.TemplateCache.get(template),
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

    return PagerItemView;
});