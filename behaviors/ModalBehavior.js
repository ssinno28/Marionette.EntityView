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

                var modalView = new ModalView({model: model, choices: modal.choices});
                this.view.showChildView(modal.name, modalView);
            }, this));
        }
    });
})(jQuery, _, Backbone, Marionette, ModalView, ModalModel);
