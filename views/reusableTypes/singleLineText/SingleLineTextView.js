var SingleLineTextView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView, singleLineTextTpl) {
    SingleLineTextView = ReusableTypeLayoutView.extend({
        template: singleLineTextTpl,
        templateContext: function () {
            var self = this;

            return {
                dataField: self.dataField,
                value: self.value,
                placeholderTxt: self.placeholderTxt,
                disabled: self.disabled
            };
        },
        getValue: function () {
            return this.$el.val();
        },
        setValue: function (val) {
            this.$el.val(val);
        }
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView, this['Templates']['singleLineTextTemplate']);
