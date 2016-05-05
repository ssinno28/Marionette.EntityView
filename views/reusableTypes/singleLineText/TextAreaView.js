define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'views/reusableTypes/ReusableTypeLayoutView',
    'text!templates/reusableTypes/textAreaTemplate.html'
], function ($, _, Backbone, Marionette, ReusableTypeLayoutView, textAreaTemplate) {
    var textAreaView = ReusableTypeLayoutView.extend({
        template: Marionette.TemplateCache.get(textAreaTemplate)
    });

    return textAreaView;
});