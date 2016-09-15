var CheckBoxView;
(function ($, _, Backbone, Marionette, checkBoxTemplate, ReusableTypeView, EventAggregator) {
    CheckBoxView = ReusableTypeView.extend({
        onShow: function () {
            if (!_.isUndefined(this.model.get('id'))) {
                this.$el.find('input').val(this.model.get('id'));
            }
        },
        tagName: 'div',
        className: 'large-6 columns',
        template: checkBoxTemplate,
        events: {
            'click input[type=checkbox]': 'itemChecked'
        },
        itemChecked: function (e) {
            EventAggregator.trigger(this.dataField + ':checked', this.model);
        }
    });
})(jQuery, _, Backbone, Marionette, this['FastTrack']['Templates']['./templates/reusableTypes/checkBoxTemplate.html'], ReusableTypeView, EventAggregator);
