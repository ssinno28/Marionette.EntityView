var FilterFormView;
(function ($, _, Backbone, Marionette) {
    FilterFormView = Marionette.FormView.extend({
        fieldWrapperTpl: this["Templates"]["filterFieldTpl"],
        template: _.template('<div></div>'),
        constructor: function () {
            Marionette.FormView.prototype.constructor.apply(this, arguments);
            this.on('render', this.runRenderers, this);
        },
        className: '',
        runRenderers: function () {
        }
    });
})(jQuery, _, Backbone, Marionette);