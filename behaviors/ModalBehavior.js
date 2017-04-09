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
                    }),
                    className = this._formatRegionName(modal.name);

                this.view.$el.append('<div class="' + className + '"></div>');
                this.view.addRegion(modal.name, '.' + className);

                var modalView = new ModalView({model: model, choices: modal.choices, safeName: className});
                this.view.showChildView(modal.name, modalView);

                this.view.on('modal:' + className + ':show', function () {
                    modalView.triggerMethod('show:modal');
                });
            }, this));
        }
    });
})(jQuery, _, Backbone, Marionette, ModalView, ModalModel);
