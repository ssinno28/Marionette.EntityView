var SuccessView;
(function ($, _, Backbone, Marionette) {
    SuccessView = Marionette.BaseValidationView.extend({
        className: 'alert alert-success alert-dismissable',
        templateHelpers: {
            iconClass: 'pficon-ok'
        }
    });

})(jQuery, _, Backbone, Marionette);
