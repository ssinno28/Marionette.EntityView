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

                var $modalBtn = this.view.$el.find('.' + className + '-show');
                if ($modalBtn.length === 0) {
                    $modalBtn = this.view.$el.find('.' + className + '-show:hidden');
                }

                if ($modalBtn.length > 0) {
                    $modalBtn.on('click', function () {
                        modalView.triggerMethod('show:modal');
                    });

                    this.view.on('destroy', function () {
                        $modalBtn.off('click');
                    });
                }
            }, this));
        }
    });
})(jQuery, _, Backbone, Marionette, ModalView, ModalModel);
