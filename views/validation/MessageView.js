var MessageView;
(function ($, _, Backbone, Marionette, MessageModel, messageTemplate) {
    MessageView = Marionette.MessageView = Backbone.Marionette.ItemView.extend({
        model: MessageModel,
        tagName: 'li',
        template: Backbone.Marionette.TemplateCache.get(messageTemplate)
    });
})(jQuery, _, Backbone, Marionette, MessageModel, messageTemplate);