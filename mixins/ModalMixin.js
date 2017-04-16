var ModalMixin;
(function ($, _, Backbone, Marionette, ModalModel) {
    ModalMixin = {
        modal: function (name) {
            var modal = {name: name};

            var addFunc = _.bind(function ($el, text) {
                if (_.isUndefined(modal.message) || _.isUndefined(modal.title)) {
                    throw 'You need to specify both a message and a title!'
                }

                var model = new ModalModel({
                        message: modal.message,
                        title: modal.title
                    }),
                    className = this._formatRegionName(modal.name);

                this.$el.append('<div class="' + className + '"></div>');
                this.addRegion(modal.name, {
                    el: '.' + className,
                    replaceElement: true
                });

                var modalView = new ModalView({model: model, choices: modal.choices, safeName: className});
                this.showChildView(modal.name, modalView);

                if (!_.isUndefined($el) && $el.length > 0 && !_.isUndefined(text)) {
                    $el.append('<button data-toggle="modal" data-target="#' + className + '" class="' + className + '-show btn btn-default">' +
                        text +
                        '</button>');
                }
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
})(jQuery, _, Backbone, Marionette, ModalModel);
