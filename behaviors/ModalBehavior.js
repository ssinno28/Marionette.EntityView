var ModalBehavior;
(function ($, _, Backbone, Marionette, ModalView, ModalModel) {
    ModalBehavior = Marionette.Behavior.extend({
        defaults: function () {
            return {
                modals: []
            };
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
                this.view.addRegion(modal.name, {
                    el: '.' + className,
                    replaceElement: true
                });

                var modalView = new ModalView({model: model, choices: modal.choices, safeName: className});
                this.view.showChildView(modal.name, modalView);
            }, this));
        }
    });
})(jQuery, _, Backbone, Marionette, ModalView, ModalModel);
