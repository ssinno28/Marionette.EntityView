var FilterFormView;
(function ($, _, Backbone, Marionette) {
    FilterFormView = Marionette.FormView.extend({
        fieldWrapperTpl: this["Templates"]["filterFieldTpl"],
        constructor: function () {
            Marionette.FormView.prototype.constructor.apply(this, arguments);
            this.on('render', this.runRenderers, this);
        },
        className: '',
        runRenderers: function () {
            // Get rid of that pesky wrapping-div.
            // Assumes 1 child element present in template.
            this.$el = this.$el.children();
            // Unwrap the element to prevent infinitely
            // nesting elements during re-render.
            this.$el.unwrap();
            this.setElement(this.$el);
        }
    });
})(jQuery, _, Backbone, Marionette);