var ModalMixin;
(function ($, _, Backbone, Marionette) {
    ModalMixin = {
        modal: function (name) {
            var modal = {name: name};

            var addFunc = _.bind(function () {
                if(_.isUndefined(modal.message) || _.isUndefined(modal.title)){
                    throw 'You need to specify both a message and a title!'
                }
                
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
                    add: addFunc
                };
            };

            var messageFunc = function (message) {
                modal.message = message;

                return {
                    title: titleFunc,
                    choice: choiceFunc,
                    add: addFunc
                };
            };

            var titleFunc = function (title) {
                modal.title = title;

                return {
                    message: messageFunc,
                    choice: choiceFunc,
                    add: addFunc
                };
            };

            return {
                title: titleFunc,
                message: messageFunc
            };
        }
    }
})(jQuery, _, Backbone, Marionette);
