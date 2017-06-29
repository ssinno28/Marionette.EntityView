var BaseValidationView;
(function (_, Backbone, Marionette, ValidationModel, validationTemplate, MessageCollection, MessageListView) {
    BaseValidationView = Marionette.BaseValidationView = Marionette.NativeView.extend({
        tagName: 'div',
        template: validationTemplate,
        regions: {
            validationMessages: '.validation-messages'
        },
        onRender: function () {
            this.$el.attr('data-alert', '');
            var messageCollection = new MessageCollection();
            messageCollection.setMessages(this.options);

            this.showChildView('validationMessages', new MessageListView({collection: messageCollection}));
        }
    });

})( _, Backbone, Marionette, ValidationModel, this['Templates']['validationTemplate'], MessagesCollection, MessageListView);
