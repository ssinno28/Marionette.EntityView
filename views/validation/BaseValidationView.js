define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'models/validation/ValidationModel',
    'text!templates/validation/validationTemplate.html',
    'collections/validation/MessagesCollection',
    'views/validation/MessageListView'
], function ($, _, Backbone, Marionette, ValidationModel, validationTemplate, MessageCollection, MessageListView) {
    var BaseValidationView = Backbone.Marionette.LayoutView.extend({
        tagName: 'div',
        template: Backbone.Marionette.TemplateCache.get(validationTemplate),
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
// Our module now returns our view
    return BaseValidationView;
});