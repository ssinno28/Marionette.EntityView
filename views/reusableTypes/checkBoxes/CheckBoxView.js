var CheckBoxView;
(function ($, _, Backbone, Marionette, checkBoxTemplate, ReusableTypeView, EventAggregator) {
    CheckBoxView = ReusableTypeView.extend({
        tagName: 'div',
        className: 'large-6 columns',
        template: Backbone.Marionette.TemplateCache.get(checkBoxTemplate),
        events: {
            'click input[type=checkbox]': 'itemChecked'
        },
        itemChecked: function (e) {
            EventAggregator.trigger(this.dataField + ':checked', this.model);
        }
    });
})(jQuery, _, Backbone, Marionette, this['FastTrack']['Templates']['./templates/reusableTypes/checkBoxTemplate.html'], ReusableTypeView, EventAggregator);
