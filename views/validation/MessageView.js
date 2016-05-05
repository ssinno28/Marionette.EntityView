define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'app',
    'models/validation/MessageModel',
    'text!templates/validation/messageTemplate.html'
], function($, _, Backbone, Marionette, App, MessageModel, messageTemplate){
    var MessageView = Backbone.Marionette.ItemView.extend({
        model: MessageModel,
        tagName: 'li',
        template: Backbone.Marionette.TemplateCache.get(messageTemplate)
    });
    return MessageView;
});