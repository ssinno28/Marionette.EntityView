var MarkdownEditorView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView) {
    MarkdownEditorView = ReusableTypeLayoutView.extend({
        template: _.template('<textarea></textarea>'),
        onDomRefresh: function () {
            var mdeOptions = this.getOption('mdeOptions');
            if (_.isUndefined(mdeOptions)) {
                this.simplemde = new SimpleMDE({
                    element: this.$el[0]
                });
            } else {
                mdeOptions.element = this.$el[0];
                this.simplemde = new SimpleMDE(mdeOptions);
            }

            this.setValue(this.getOption('value'));
        },
        getValue: function () {
            return this.simplemde.value();
        },
        setValue: function (val) {
            this.simplemde.value(val);
        }
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView);
