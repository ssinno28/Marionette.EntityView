var ModalMixin;
(function ($, _, Backbone, Marionette) {
    ModalMixin = {
        addModal: function (name) {
            var modal = {name: name};

            var triggerAddFunc = _.bind(function () {
                this.triggerMethod('addModal', modal);
            }, this);

            var choiceFunc = function (text, type, dismiss) {
                if (_.isUndefined(modal.choices)) {
                    modal.choices = [];
                }

                modal.choices.push({
                    dismiss: dismiss,
                    text: text,
                    type: type
                });

                return {
                    choice: choiceFunc,
                    triggerAdd: triggerAddFunc
                };
            };

            var messageFunc = function (message) {
                modal.message = message;

                return {
                    title: titleFunc,
                    choice: choiceFunc
                };
            };

            var titleFunc = function (title) {
                modal.title = title;

                return {
                    message: messageFunc,
                    choice: choiceFunc
                };
            };

            return {
                title: titleFunc,
                message: messageFunc
            };
        }
    }
})(jQuery, _, Backbone, Marionette);