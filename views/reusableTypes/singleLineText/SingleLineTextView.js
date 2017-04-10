var SingleLineTextView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView, singleLineTextTpl) {
    SingleLineTextView = ReusableTypeLayoutView.extend({
        tag: 'input',
        template: singleLineTextTpl,
        onRender: function () {
            // Get rid of that pesky wrapping-div.
            // Assumes 1 child element present in template.
            this.$el = this.$el.children();
            // Unwrap the element to prevent infinitely
            // nesting elements during re-render.
            this.$el.unwrap();
            this.setElement(this.$el);
        }
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView, this['Templates']['singleLineTextTemplate']);
