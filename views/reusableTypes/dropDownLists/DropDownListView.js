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
        }
    });
})($, _, Backbone, Marionette, OptionView, ReusableTypeListView);
