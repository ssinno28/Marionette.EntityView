var DropDownListView;
(function ($, _, Backbone, Marionette, OptionView, ReusableTypeListView) {
    DropDownListView = ReusableTypeListView.extend({
        childView: OptionView,
        tagName: 'selectpicker',
        className: '',
        onRender: function(options){
            var dataField = options.dataField;
            this.$el.attr('data-field', dataField);
        }
    });
})($, _, Backbone, Marionette, OptionView, ReusableTypeListView);
