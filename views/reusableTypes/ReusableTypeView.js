var ReusableTypeView;
(function ($, _, Backbone, Marionette) {
    ReusableTypeView = Marionette.ReusableTypeView = Backbone.Marionette.View.extend({
        initialize: function (options) {
            _.extend(this, options);
            var channel = this._channel = Backbone.Radio.channel(this.dataField);

            this.isSelected();
            this.on('destroy', this._destroyRadio);
            this.on('render', this.runRenderers);
        },
        runRenderers: function () {
            if (this.getOption('isDocProp')) {
                this.$el.attr('data-property', this.getOption('dataField'));
            } else {
                this.$el.attr('data-field', this.getOption('dataField'));
            }
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
            return this._channel;
        },
        _destroyRadio: function _destroyRadio() {
            this._channel.stopReplying(null, null, this);
        }
    });

})(jQuery, _, Backbone, Marionette);
