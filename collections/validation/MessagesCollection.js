var MessagesCollection;
(function ($, _, Backbone, Marionette, App, MessageModel) {
    /**
     * @class MessagesCollection
     * @type {Backbone.CollectionSubset.extend|*|dst|target|Object|a}
     */
    MessagesCollection = Backbone.Collection.extend({
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
})(jQuery, _, Backbone, Marionette, App, MessageModel);
/**
 * Created by ssinno on 12/2/13.
 */
