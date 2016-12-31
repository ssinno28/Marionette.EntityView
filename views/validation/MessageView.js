var MessageView;
(function ($, _, Backbone, Marionette, MessageModel, messageTemplate) {
    MessageView = Marionette.MessageView = Backbone.Marionette.View.extend({
        model: MessageModel,
        tagName: 'li',
        template: messageTemplate
    });
})(jQuery, _, Backbone, Marionette, MessageModel, this['EntityView']['Templates']['./templates/validation/messageTemplate.html']);
