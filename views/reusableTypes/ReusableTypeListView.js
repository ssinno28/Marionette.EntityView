var ReusableTypeListView;
(function ($, _, Backbone, Marionette) {
    ReusableTypeListView = Marionette.ReusableTypeListView = Backbone.Marionette.CollectionView.extend({
        initialize: function (options) {
            _.extend(this, options);
        },
        childViewOptions: function () {
            var self = this;
            return {
                dataField: self.dataField,
                selectedId: self.selectedId
            };
        },
        getChannel: function () {
            return Backbone.Radio.channel(this.dataField);
        },
        onDestroy: function () {
            this.getChannel().reset();
        }
    });
})(jQuery, _, Backbone, Marionette);
