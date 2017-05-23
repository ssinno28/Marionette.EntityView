var SingleCheckBoxView;
(function ($, _, Backbone, Marionette, singleCheckBoxTpl, ReusableTypeLayoutView) {
    SingleCheckBoxView = ReusableTypeLayoutView.extend({
        template: singleCheckBoxTpl,
        triggers: function () {
            var triggers = {};
            triggers['click'] = {
                event: 'checkbox:' + this.dataField + ':checked',
                preventDefault: false,
                stopPropagation: true
            };

            return triggers;
        },
        templateContext: function () {
            var self = this;

            return {
                dataField: self.dataField,
                value: self.value,
                checked: this.getOption('value') ? 'checked' : ''
            };
        },
        getValue: function () {
            var $el = this.getDataField();
            return $el.is(':checked');
        }
    });
})(jQuery, _, Backbone, Marionette, this['Templates']['singleCheckBoxTpl'], ReusableTypeLayoutView);
