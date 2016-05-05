define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'app'
], function ($, _, Backbone, Marionette, App) {
    var ValidationModel = Backbone.Model.extend({
        defaults: {
            messagesCollection: new Backbone.Collection()
        },
        setMessages: function (messages) {
            var messagesCollection = this.get('messagesCollection');
            messagesCollection.reset();
            _.each(messages, function (message) {
                var messageModel = new Backbone.Model({message: message});
                messagesCollection.add(messageModel);
            });
        }
    });
    return ValidationModel;
});