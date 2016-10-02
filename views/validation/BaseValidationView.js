var BaseValidationView;
(function ($, _, Backbone, Marionette, ValidationModel, validationTemplate, MessageCollection, MessageListView) {
    BaseValidationView = Marionette.BaseValidationView = Backbone.Marionette.View.extend({
        tagName: 'div',
        template: validationTemplate,
        regions: {
            validationMessages: '.validationMessages'
        },
        onRender: function () {
            this.$el.attr('data-alert', '');
            var messageCollection = new MessageCollection();
            messageCollection.setMessages(this.options);

            this.validationMessages.show(new MessageListView({collection: messageCollection}));
        }
    });

})(jQuery, _, Backbone, Marionette, ValidationModel, this['FastTrack']['Templates']['./templates/validation/validationTemplate.html'], MessagesCollection, MessageListView);