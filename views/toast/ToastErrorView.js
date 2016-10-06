var ToastErrorView;
(function ($, _, Backbone, Marionette) {
    ToastErrorView = Marionette.ToastItemView.extend({
        className: 'toast-pf toast-pf-max-width toast-pf-top-right alert alert-danger alert-dismissable',
        templateContext: function () {
            var context = {
                iconClass: 'pficon-error-circle-o'
            };

            return _.extend(context, Marionette.ToastItemView.prototype.templateContext.call(this));
        }
    });
})(jQuery, _, Backbone, Marionette);
