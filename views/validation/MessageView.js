var MessageView;
(function (_, Backbone, Marionette, MessageModel, messageTemplate) {
    MessageView = Marionette.MessageView = Backbone.Marionette.NativeView.extend({
        model: MessageModel,
        tagName: 'li',
        template: messageTemplate
    });
})( _, Backbone, Marionette, MessageModel, this['Templates']['messageTemplate']);
