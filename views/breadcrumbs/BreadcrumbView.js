define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'text!template/breadcrumbs/breadcrumbItemTemplate.html'
], function ($, _, Backbone, Marionette, breadcrumbTemplate) {
    var BreadcrumbsView = Marionette.ItemView.extend({
        className: 'li',
        template: Marionette.TemplateCache.get(breadcrumbTemplate)
    });

    return BreadcrumbsView;
});