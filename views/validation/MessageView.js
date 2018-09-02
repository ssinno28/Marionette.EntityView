var MessageView;
(function ($, _, Backbone, Marionette, MessageModel, messageTemplate) {
    MessageView = Marionette.MessageView = Marionette.View.extend({
        model: MessageModel,
        tagName: 'li',
        template: messageTemplate
    });
})(jQuery, _, Backbone, Marionette, MessageModel, this['Templates']['messageTemplate']);
