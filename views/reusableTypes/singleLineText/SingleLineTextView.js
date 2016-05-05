define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'views/reusableTypes/ReusableTypeLayoutView',
    'text!templates/reusableTypes/singleLineTextTemplate.html'
], function ($, _, Backbone, Marionette, ReusableTypeLayoutView, singleLineTextTemplate) {
    var singleLineTextView = ReusableTypeLayoutView.extend({
        tag: 'input',
        template: Marionette.TemplateCache.get(singleLineTextTemplate)
    });

    return singleLineTextView;
});