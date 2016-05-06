var ReusableTypeView;
(function ($, _, Backbone, Marionette) {
    ReusableTypeView = Marionette.ReusableTypeView = Backbone.Marionette.LayoutView.extend({
        initialize: function (options) {
            _.extend(this, options);
            this.isSelected();
        },
        isSelected: function () {
            this.checked = "";
            if (_.isUndefined(this.selectedId)) {
                return;
            }

            var id = this.model.get('id');
            if ((isNaN(this.selectedId) && this.selectedId.indexOf(id) > -1) || id === parseInt(this.selectedId)) {
                this.checked = "checked";
            }
        },
        template: function () {
            return _.template('<script id="empty-template" type="text/template"></script>');
        },
        templateHelpers: function () {
            var self = this;

            return {
                dataField: self.dataField,
                checked: self.checked
            };
        }
    });

})(jQuery, _, Backbone, Marionette);
