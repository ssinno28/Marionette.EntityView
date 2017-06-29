var TextAreaView;
(function (_, Backbone, Marionette, ReusableTypeLayoutView, textAreaTemplate) {
    TextAreaView = ReusableTypeLayoutView.extend({
        template: textAreaTemplate,
        getValue: function () {
            return this.$el.val();
        },
        setValue: function (val) {
            this.$el.val(val);
        }
    });
})(_, Backbone, Marionette, ReusableTypeLayoutView, this['Templates']['textAreaTemplate']);
