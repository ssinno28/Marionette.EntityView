var MessageBehavior;
(function ($, _, Backbone, Marionette, SuccessView, ErrorView, InfoView) {
    MessageBehavior = Marionette.Behavior.extend({
        defaults: {
            duration: 3000
        },
        onShowMessages: function (type, messages) {
            switch (type) {
                case 'error':
                    this.view.messagesRegion.show(new ErrorView(messages));
                    break;
                case 'success':
                    this.view.messagesRegion.show(new SuccessView(messages));
                    break;
                case 'info':
                    this.view.messagesRegion.show(new InfoView(messages));
                    break;
            }

            var view = this.view;
            setTimeout(function () {
                if (view.isDestroyed) {
                    return;
                }

                view.messagesRegion.$el.fadeOut("slow", function () {
                    if (view.isDestroyed) {
                        return;
                    }

                    view.messagesRegion.reset();
                });

            }, this.options.duration)
        }
    });
})(jQuery, _, Backbone, Marionette, SuccessView, ErrorView, InfoView);