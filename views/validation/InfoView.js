var InfoView;
(function ($, _, Backbone, Marionette) {
    InfoView = Marionette.BaseValidationView.extend({
        className: 'alert alert-info alert-dismissable',
        templateContext: {
            iconClass: 'pficon-info'
        }
    });
})(jQuery, _, Backbone, Marionette);