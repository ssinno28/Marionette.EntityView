var SingleLineTextView;
(function (_, Backbone, Marionette, ReusableTypeLayoutView, singleLineTextTpl) {
    SingleLineTextView = ReusableTypeLayoutView.extend({
        template: singleLineTextTpl,
        templateContext: function () {
            var self = this;

            return {
                dataField: self.dataField,
                value: self.value,
                placeholderTxt: self.placeholderTxt
            };
        },
        getValue: function () {
            return this.$el.val();
        },
        setValue: function (val) {
            this.$el.val(val);
        }
    });
})(_, Backbone, Marionette, ReusableTypeLayoutView, this['Templates']['singleLineTextTemplate']);
