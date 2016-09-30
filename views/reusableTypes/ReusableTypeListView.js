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
        }
    });
})(jQuery, _, Backbone, Marionette);
