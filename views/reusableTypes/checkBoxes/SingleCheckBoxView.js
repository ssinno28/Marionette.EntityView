var SingleCheckBoxView;
(function ($, _, Backbone, Marionette, singleCheckBoxTpl, ReusableTypeLayoutView) {
    SingleCheckBoxView = ReusableTypeLayoutView.extend({
        template: singleCheckBoxTpl,
        events: {
            'click input[type=checkbox]': 'itemChecked'
        },
        itemChecked: function (e) {
            this.getChannel().trigger(this.dataField + ':checked', this.model);
        },
        templateContext: function () {
            var self = this;

            return {
                dataField: self.dataField,
                value: self.value,
                checked: this.getOption('value') ? 'checked' : ''
            };
        },
    });
})(jQuery, _, Backbone, Marionette, this['Templates']['singleCheckBoxTpl'], ReusableTypeLayoutView);
