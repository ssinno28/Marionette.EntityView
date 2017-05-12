var CheckBoxView;
(function ($, _, Backbone, Marionette, checkBoxTemplate, ReusableTypeView) {
    CheckBoxView = ReusableTypeView.extend({
        onRender: function () {
            if (!_.isUndefined(this.model.get('id'))) {
                this.$el.find('input').val(this.model.get('id'));
            }
        },
        tagName: 'div',
        className: 'col-sm-6',
        template: checkBoxTemplate,
        events: {
            'click input[type=checkbox]': 'itemChecked'
        },
        itemChecked: function (e) {
            this.getChannel().trigger(this.dataField + ':checked', this.model);
        }
    });
})(jQuery, _, Backbone, Marionette, this['Templates']['checkBoxTemplate'], ReusableTypeView);
