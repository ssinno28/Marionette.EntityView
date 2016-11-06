var ErrorView;
(function ($, _, Backbone, Marionette) {
    ErrorView = Marionette.BaseValidationView.extend({
        className: 'alert alert-danger alert-dismissable',
        templateContext: {
            iconClass: 'pficon-error-circle-o'
        }
    });
})(jQuery, _, Backbone, Marionette);
