var MessagesCollection;
(function (_, Backbone, Marionette, App, MessageModel) {
    MessagesCollection = Backbone.Collection.extend({
        model: MessageModel,
        setMessages: function (messages) {
            this.reset();
            _.each(messages, _.bind(function (message) {
                var messageModel = new MessageModel({message: message});
                this.add(messageModel);
            }, this));
        }
    });
})(_, Backbone, Marionette, App, MessageModel);

