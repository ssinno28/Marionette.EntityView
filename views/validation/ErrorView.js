var ErrorView;
(function ($, _, Backbone, Marionette) {
    ErrorView = Marionette.BaseValidationView.extend({
        className: 'alert alert-danger alert-dismissable',
        templateHelpers: {
            iconClass: 'pficon-error-circle-o'
        }
    });
})(jQuery, _, Backbone, Marionette);
