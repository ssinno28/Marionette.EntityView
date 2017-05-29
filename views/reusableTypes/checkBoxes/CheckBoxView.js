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
        triggers: {
            'click input[type=checkbox]': {
                event: 'itemChecked',
                preventDefault: false,
                stopPropagation: true
            }
        }
    });
})(jQuery, _, Backbone, Marionette, this['Templates']['checkBoxTemplate'], ReusableTypeView);
