var MessageView;
(function ($, _, Backbone, Marionette, MessageModel, messageTemplate) {
    MessageView = Marionette.MessageView = Backbone.Marionette.ItemView.extend({
        model: MessageModel,
        tagName: 'li',
        template: messageTemplate
    });
})(jQuery, _, Backbone, Marionette, MessageModel, this['FastTrack']['Templates']['./templates/validation/messageTemplate.html']);