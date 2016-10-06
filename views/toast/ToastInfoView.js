var ToastInfoView;
(function ($, _, Backbone, Marionette) {
    ToastInfoView = Marionette.ToastItemView.extend({
        className: 'toast-pf toast-pf-max-width toast-pf-top-right alert alert-info alert-dismissable',
        templateContext: function () {
            var context = {
                iconClass: 'pficon-info'
            };

            return _.extend(context, Marionette.ToastItemView.prototype.templateContext.call(this));
        }
    });
})(jQuery, _, Backbone, Marionette);