var TimePickerView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView, timePickerTpl, moment) {
    TimePickerView = ReusableTypeLayoutView.extend({
        initialize: function (options) {
            ReusableTypeLayoutView.prototype.initialize.call(this, options);

            if(_.isUndefined(this.dateFormat)){
                this.dateFormat = 'HH:mm:ss A'
            }
        },
        ui: {
            $datePicker: '.bootstrap-datepicker'
        },
        template: timePickerTpl,
		dataFieldSelector: '.bootstrap-datepicker',
        onDomRefresh: function () {
            this.ui.$datePicker.datetimepicker({
                    format: this.dateFormat
                })
                .on('changeDate', _.bind(function (e) {
                    this._channel.trigger('change:date:' + this.dataField, e);
                }, this));
        },
        show: function () {
            this.$el.datepicker('show');
        },
        hide: function () {
            this.$el.datepicker('hide');
        },
        update: function (value) {
            this.$el.datepicker('update', value);
        },
        getValue: function () {
            return this.getDataField().val();
        },
        setValue: function (val) {
            this.getDataField().val(val);
        }
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView, this['Templates']['dateTimePickerTpl'], moment);
