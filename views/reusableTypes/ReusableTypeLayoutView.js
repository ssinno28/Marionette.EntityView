var ReusableTypeLayoutView;
(function ($, _, Backbone, Marionette) {
    ReusableTypeLayoutView = Marionette.ReusableTypeLayoutView = Backbone.Marionette.View.extend({
        initialize: function (options) {
            _.extend(this, options);

            this._channel = Backbone.Radio.channel(this.dataField);
            this.on('destroy', this._destroyRadio);
        },
        templateContext: function () {
            var self = this;

            return {
                dataField: self.dataField
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
