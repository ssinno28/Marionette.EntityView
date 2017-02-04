var ReusableTypeLayoutView;
(function ($, _, Backbone, Marionette) {
    ReusableTypeLayoutView = Marionette.ReusableTypeLayoutView = Backbone.Marionette.View.extend({
        initialize: function (options) {
            _.extend(this, options);
        },
        templateContext: function () {
            var self = this;

            return {
                dataField: self.dataField
            };
        },
        getChannel: function () {
            return Backbone.Radio.Channel(this.dataField);
        },
        onDestroy: function () {
            this.getChannel().reset();
        }
    });
})(jQuery, _, Backbone, Marionette);