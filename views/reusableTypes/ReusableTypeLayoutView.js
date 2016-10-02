
var ReusableTypeLayoutView;
(function ($, _, Backbone, Marionette) {
    ReusableTypeLayoutView = Marionette.ReusableTypeLayoutView = Backbone.Marionette.View.extend({
        initialize: function (options) {
            _.extend(this, options);
        },
        templateHelpers: function () {
            var self = this;

            return {
                dataField: self.dataField
            };
        }
    });
})(jQuery, _, Backbone, Marionette);