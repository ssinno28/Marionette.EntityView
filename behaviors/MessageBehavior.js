var MessageBehavior;
(function (_, Backbone, Marionette, SuccessView, ErrorView, InfoView) {
    MessageBehavior = Marionette.Behavior.extend({
        defaults: {
            duration: 3000
        },
        onShowMessages: function (type, messages) {
            switch (type) {
                case 'error':
                    this.view.showChildView('messagesRegion', new ErrorView(messages));
                    break;
                case 'success':
                    this.view.showChildView('messagesRegion', new SuccessView(messages));
                    break;
                case 'info':
                    this.view.showChildView('messagesRegion', new InfoView(messages));
                    break;
            }

            var view = this.view;
            setTimeout(function () {
                if (view.isDestroyed) {
                    return;
                }

                var messagesRegion = this.view.getRegion('messagesRegion');
                messagesRegion.$el.fadeOut("slow", function () {
                    if (view.isDestroyed) {
                        return;
                    }

                    messagesRegion.reset();
                });

            }, this.options.duration);
        }
    });
})(_, Backbone, Marionette, SuccessView, ErrorView, InfoView);