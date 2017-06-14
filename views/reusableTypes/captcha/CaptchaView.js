var CaptchaView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView) {
    CaptchaView = ReusableTypeLayoutView.extend({
        template: _.template('<div id="recaptcha-<%= cid %>"></div>'),
        onDomRefresh: function () {
            if (!_.isUndefined(App.grecaptcha)) {
                grecaptcha.reset(App.grecaptcha);
            }

            var widgetId = grecaptcha.render(this.$el[0], {
                sitekey: this.getOption('sitekey')
            });

            App.grecaptcha = widgetId;
        },
        getValue: function () {
            return grecaptcha.getResponse(App.grecaptcha);
        },
        setValue: function () {
        },
        templateContext: function () {
            return {
                sitekey: this.getOption('sitekey'),
                dataField: this.getOption('dataField'),
                cid: this.cid
            };
        }
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView);