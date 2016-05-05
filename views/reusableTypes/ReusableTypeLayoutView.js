define([
    'jquery',
    'underscore',
    'backbone',
    'marionette'
], function ($, _, Backbone, Marionette) {
    var reusableTypeLayoutView = Backbone.Marionette.LayoutView.extend({
        initialize: function (options) {
            _.extend(this, options);
        },
        templateHelpers: function () {
            var self = this;

            return {
                dataField: self.dataField
            }
        }
    });

    return reusableTypeLayoutView;
});