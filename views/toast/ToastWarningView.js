var ToastWarningView;
(function ($, _, Backbone, Marionette) {
    ToastWarningView = Marionette.ToastItemView.extend({
        className: 'toast-pf toast-pf-max-width toast-pf-top-right alert alert-warning alert-dismissable',
        templateContext: function () {
            var context = {
                iconClass: 'pficon-warning-triangle-o'
            };

            return _.extend(context, Marionette.ToastItemView.prototype.templateContext.call(this));
        }
    });
})(jQuery, _, Backbone, Marionette);
