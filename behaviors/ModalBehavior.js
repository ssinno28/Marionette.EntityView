var ModalBehavior;
(function ($, _, Backbone, Marionette, ModalView, ModalModel) {
    ModalBehavior = Marionette.Behavior.extend({
        defaults: {
            modals: []
        },
        onAddModal: function (modal) {
            this.options.modals.push(modal);
        },
        events: function () {
            var events = {};
            _.each(this.options.modals, _.bind(function (modal) {
                var className = this._formatRegionName(modal.name),
                    showFuncName = 'show' + modal.name;

                events['click .' + className + '-show'] = showFuncName;
            }, this));

            return events;
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

                var showFuncName = 'show' + modal.name;
                this[showFuncName] =
                    _.bind(function () {
                        modalView.triggerMethod('show:modal');
                    }, this);
            }, this));
        },
        _formatRegionName: function (name) {
            return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        }
    });
})(jQuery, _, Backbone, Marionette, ModalView, ModalModel);
