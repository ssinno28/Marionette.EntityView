var ReusableTypeLayoutView;
(function ($, _, Backbone, Marionette) {
    ReusableTypeLayoutView = Marionette.ReusableTypeLayoutView = Backbone.Marionette.View.extend({
        initialize: function (options) {
            _.extend(this, options);

            this._channel = Backbone.Radio.channel(this.dataField);
            this.on('destroy', this._destroyRadio);
            this.on('render', this.runRenderers);
        },
        runRenderers: function () {
            // Get rid of that pesky wrapping-div.
            // Assumes 1 child element present in template.
            this.$el = this.$el.children();
            // Unwrap the element to prevent infinitely
            // nesting elements during re-render.
            this.$el.unwrap();
            this.setElement(this.$el);
        },
        templateContext: function () {
            var self = this;

            return {
                dataField: self.dataField,
                value: self.value
            };
        },
        getChannel: function () {
            return this._channel;
        },
        _destroyRadio: function () {
            this._channel.stopReplying(null, null, this);
        }
    });
})(jQuery, _, Backbone, Marionette);
