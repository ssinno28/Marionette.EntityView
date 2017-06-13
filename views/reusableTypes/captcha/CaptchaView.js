var CaptchaView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView) {
    CaptchaView = ReusableTypeLayoutView.extend({
        template: _.template('<div id="recaptcha"></div>'),
        onDomRefresh: function () {
            grecaptcha.render("recaptcha", {
                sitekey: this.getOption('sitekey')
            });
        },
        getValue: function () {
            return grecaptcha.getResponse();
        },
        setValue: function () {
        },
        templateContext: function () {
            return {
                sitekey: this.getOption('sitekey'),
                dataField: this.getOption('dataField')
            };
        }
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView);