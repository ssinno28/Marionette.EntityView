var ModalBehavior;
(function ($, _, Backbone, Marionette, ModalView, ModalModel) {
    ModalBehavior = Marionette.Behavior.extend({
        defaults: {
            modals: []
        },
        onAddModal: function (modal) {
            this.options.modals.push(modal);
        },
        onRender: function () {
            _.each(this.options.modals, _.bind(function (modal) {
                var model = new ModalModel({
                    message: modal.message,
                    title: modal.title
                });

                this.view.$el.append('<div class="' + modal.name + '"></div>');
                this.view.addRegion(modal.name, '.' + modal.name);

                this.view.showChildView(modal.name, new ModalView({model: model, choices: modal.choices, channel: this.view.getChannel()}));
            }, this));
        }
    });
})(jQuery, _, Backbone, Marionette, ModalView, ModalModel);