define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'app',
    'models/validation/MessageModel'
], function ($, _, Backbone, Marionette, App, MessageModel) {
    /**
     * @class MessagesCollection
     * @type {Backbone.CollectionSubset.extend|*|dst|target|Object|a}
     */
    var MessagesCollection = Backbone.Collection.extend({
        defaults: {
            model: MessageModel
        },
        /**
         * Description
         * @method setMessages
         * @param {} messages
         * @return 
         */
        setMessages: function (messages) {
            var outerScope = this;
            this.reset();
            _.each(messages, function (message) {
                var messageModel = new MessageModel({message: message});
                outerScope.add(messageModel);
            });
        }
    });
    return MessagesCollection;
});
/**
 * Created by ssinno on 12/2/13.
 */
