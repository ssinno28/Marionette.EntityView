var WarningView;
(function ($, _, Backbone, Marionette) {
    WarningView = Marionette.WarningView = Marionette.BaseValidationView.extend({
        className: 'warning alert-box radius'
    });
})(jQuery, _, Backbone, Marionette);
