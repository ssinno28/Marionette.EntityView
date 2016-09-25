var WarningView;
(function ($, _, Backbone, Marionette) {
    WarningView = Marionette.BaseValidationView.extend({
        className: 'alert alert-warning alert-dismissable',
        templateHelpers: {
            iconClass: 'pficon-warning-triangle-o'
        }
    });
})(jQuery, _, Backbone, Marionette);
