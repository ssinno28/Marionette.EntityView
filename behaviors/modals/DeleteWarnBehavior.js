var DeleteWarnBehavior;
(function ($, _, Backbone, Marionette, ConfirmModalBehavior) {
    DeleteWarnBehavior = ConfirmModalBehavior.extend({
        events: {
            "click .delete": "showWarningModal"
        },
        getModal: function () {
            return $('.deleteModal');
        }
    });
})(jQuery, _, Backbone, Marionette, ConfirmModalBehavior);