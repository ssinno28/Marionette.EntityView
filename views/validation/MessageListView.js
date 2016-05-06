var MessageListView;
(function ($, _, Backbone, Marionette, MessageView, MessagesCollection) {
    MessageListView = Backbone.Marionette.CollectionView.extend({
        tagName: 'ul',
        childView: MessageView,
        collection: MessagesCollection
    });

})(jQuery, _, Backbone, Marionette, MessageView, MessagesColllection);