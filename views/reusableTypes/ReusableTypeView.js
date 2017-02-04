var ReusableTypeView;
(function ($, _, Backbone, Marionette) {
    ReusableTypeView = Marionette.ReusableTypeView = Backbone.Marionette.View.extend({
        initialize: function (options) {
            _.extend(this, options);
            this.isSelected();
        },
        isSelected: function () {
            this.checked = "";
            if (_.isUndefined(this.selectedId)) {
                if (!_.isUndefined(this.model.get('value')) && this.model.get('value') === true) {
                    this.checked = "checked";
                }

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
        templateContext: function () {
            var self = this;

            return {
                dataField: self.dataField,
                checked: self.checked
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
