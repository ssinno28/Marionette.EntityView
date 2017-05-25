var ReusableTypeLayoutView;
(function ($, _, Backbone, Marionette) {
    ReusableTypeLayoutView = Marionette.ReusableTypeLayoutView = Marionette.View.extend({
        constructor: function (options) {
            //make sure to do work first then call contrctor on class
            _.extend(this, options);

            this._channel = Backbone.Radio.channel(this.dataField);
            this.on('destroy', this._destroyRadio);
            this.on('render', this.runRenderers);

            Marionette.View.prototype.constructor.call(this, options);
        },
        runRenderers: function () {
            // Get rid of that pesky wrapping-div.
            // Assumes 1 child element present in template.
            this.$el = this.$el.children();
            // Unwrap the element to prevent infinitely
            // nesting elements during re-render.
            this.$el.unwrap();
            this.setElement(this.$el);

            var $dataField = this.getDataField();
            if (this.getOption('isDocProp')) {
                $dataField.attr('data-property', this.getOption('dataField'));
            } else {
                $dataField.attr('data-field', this.getOption('dataField'));
            }

    /*        if (!_.isUndefined(this.setValue)) {
                this.setValue(this.getOption('value'));
            }*/
        },
        templateContext: function () {
            var self = this;

            return {
                dataField: self.dataField,
                value: self.value
            };
        },
        getDataField: function () {
            return !_.isUndefined(this.dataFieldSelector) ? this.$el.find(this.dataFieldSelector) : this.$el;
        },
        getChannel: function () {
            return this._channel;
        },
        _destroyRadio: function () {
            this._channel.stopReplying(null, null, this);
        }
    });
})(jQuery, _, Backbone, Marionette);
