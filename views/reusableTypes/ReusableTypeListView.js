var ReusableTypeListView;
(function ($, _, Backbone, Marionette) {
    ReusableTypeListView = Marionette.ReusableTypeListView = Backbone.Marionette.CollectionView.extend({
        initialize: function (options) {
            _.extend(this, options);

            var channel = this._channel = Backbone.Radio.channel(this.dataField);
            this.on('destroy', this._destroyRadio);
        },
        childViewOptions: function () {
            var self = this;
            return {
                dataField: self.dataField,
                selectedId: self.selectedId,
                isDocProp: self.isDocProp
            };
        },
        getChannel: function () {
            return this._channel;
        },
        _destroyRadio: function _destroyRadio() {
            this._channel.stopReplying(null, null, this);
        }
    });
})(jQuery, _, Backbone, Marionette);
