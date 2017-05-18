var SingleLineTextView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView, singleLineTextTpl) {
    SingleLineTextView = ReusableTypeLayoutView.extend({
        template: singleLineTextTpl,
        templateContext: function () {
            var self = this;

            return {
                dataField: self.dataField,
                value: self.value,
                placeholderTxt: self.placeholderTxt
            };
        }
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView, this['Templates']['singleLineTextTemplate']);
