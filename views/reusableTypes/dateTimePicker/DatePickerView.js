var DatePickerView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView, datePickerTemplate, moment) {
    DatePickerView = ReusableTypeLayoutView.extend({
        className: 'col-sm-10',
        initialize: function (options) {
            ReusableTypeLayoutView.prototype.initialize.call(this, options);

            this.model = new Backbone.Model({value: this.getOption('value')});
            if(_.isUndefined(this.dateFormat)){
                this.dateFormat = 'mm/dd/yyyy'
            }
        },
        ui: {
            $datePicker: '.bootstrap-datepicker'
        },
        template: datePickerTemplate,
        onDomRefresh: function () {
            this.ui.$datePicker.datepicker({
                    format: this.dateFormat,
                    pickTime: false
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
        }
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView, this['Templates']['dateTimePickerTpl'], moment);
