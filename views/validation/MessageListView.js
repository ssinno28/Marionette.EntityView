var MessageListView;
(function (_, Backbone, Marionette, MessageView, MessagesCollection) {
    MessageListView = Backbone.Marionette.NativeCollectionView.extend({
        tagName: 'ul',
        childView: MessageView,
        collection: MessagesCollection
    });

})(_, Backbone, Marionette, MessageView, MessagesCollection);