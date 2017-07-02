var DropDownListView;
(function ($, _, Backbone, Marionette, OptionView, ReusableTypeListView) {
    DropDownListView = ReusableTypeListView.extend({
        childView: OptionView,
        tagName: 'select',
        className: 'combobox form-control',
        onRender: function (options) {
            var dataField = options.dataField;
            this.$el.attr('data-field', dataField);
        },
        onDomRefresh: function () {
            this.$el.combobox();
            this.$el.on('change', _.bind(function () {
                this._channel.trigger('change', this.$el.val());
            }, this));
        },
        getValue: function () {
            return this.$el.val();
        },
        setValue: function (val) {
            this.$el.val(val);
            this.$el.data('combobox').refresh();
        }
    });
})(jQuery, _, Backbone, Marionette, OptionView, ReusableTypeListView);
