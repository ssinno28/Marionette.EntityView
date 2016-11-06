var ToastSuccessView;
(function ($, _, Backbone, Marionette) {
    ToastSuccessView = Marionette.ToastItemView.extend({
        className: 'toast-pf toast-pf-max-width toast-pf-top-right alert alert-success alert-dismissable',
        templateContext: function () {
            var context = {
                iconClass: 'pficon-ok'
            };

            return _.extend(context, Marionette.ToastItemView.prototype.templateContext.call(this));
        }
    });

})(jQuery, _, Backbone, Marionette);
