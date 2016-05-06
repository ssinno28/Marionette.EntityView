var OptionView;
(function ($, _, Backbone, Marionette, ReusableTypeView) {
    OptionView = ReusableTypeView.extend({
        tagName: 'option',
        onRender: function () {
            this.$el.val(this.model.get('id'));
            this.$el.text(this.model.get('name'));
        },
        onDomRefresh: function () {
            var dataField = this.dataField;
            if (this.model.get('id') === this.selectedId) {
                var $selector = $('select[data-field="' + dataField + '"]');
                $selector.val(this.model.get('id'));
            }
        }
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeView);
