
var ConfirmModalBehavior;
(function ($, _, Backbone, Marionette) {
    ConfirmModalBehavior = Marionette.Behavior.extend({
        defaults: {
            message: "Are you sure you want to do this?",
            yesFunc: function (e) {
            },
            noFunc: function (e) {
            }
        },
        showWarningModal: function (e) {
            e.preventDefault();

            var $confirmModal = this.getModal();
            //update the message
            $confirmModal.find('.message').html(this.options.message);

            //show modal
            $confirmModal.modal('show');

            $confirmModal.on('click', '.no', _.bind(function (e) {
                e.preventDefault();
                _.bind(this.options.noFunc, this)(e);
                $confirmModal.modal('hide');
            }, this));

            $confirmModal.on('click', '.yes', _.bind(function (e) {
                e.preventDefault();
                _.bind(this.options.yesFunc, this)(e);
                $confirmModal.modal('hide');
            }, this));
        }
    });
})(jQuery, _, Backbone, Marionette);