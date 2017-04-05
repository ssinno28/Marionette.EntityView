var DateTimePickerView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView, datePickerTemplate, moment) {
    DateTimePickerView = ReusableTypeLayoutView.extend({
        className: 'col-sm-10',
        initialize: function (options) {
            ReusableTypeLayoutView.prototype.initialize.call(this, options);

            this.model = new Backbone.Model();

            var value = this.getOption('value'),
                timeFormat = !_.isUndefined(this.timeFormat) ? this.timeFormat : 'hh:mm:ss A',
                dateFormat = !_.isUndefined(this.dateFormat) ? this.dateFormat : 'MM/DD/YYYY',
                date = moment(value).format(dateFormat),
                time = moment(value).format(timeFormat);

            if (date !== 'Invalid date') {
                this.model.set({date: date});
            } else {
                this.model.set({date: ''});
            }

            if (time !== 'Invalid date') {
                this.model.set({time: time});
            } else {
                this.model.set({time: ''});
            }

            this.model.set({value: this.model.get('date') + ' ' + this.model.get('time')});
        },
        ui: {
            $datePicker: '.bootstrap-datepicker',
            $timePicker: '.time-picker input',
            $inputVal: '.inputVal'
        },
        template: datePickerTemplate,
        onDomRefresh: function () {
            this.ui.$datePicker.datepicker()
                .on('changeDate', _.bind(function (e) {
                    this._channel.trigger('change:date:' + this.dataField, e);
                    this.ui.$inputVal.val(this.getDateTime());
                }, this));

            this.ui.$timePicker.datetimepicker({
                format: 'LT',
                keyBinds: {
                    enter: function () {
                        this.hide();
                    }
                }
            });

            var $date = this.$el.find('.date'),
                $time = this.$el.find('.time');

            if (this.dateType === 'Date') {
                $time.hide();
            } else if (this.dateType === 'Time') {
                $date.hide();
                $time.attr('style', 'float:left');
            }
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
        getDateTime: function () {
            var $date = $('[data-field="' + this.dataField + '-date"]'),
                $time = $('[data-field="' + this.dataField + '-time"]');

            if (this.dateType === 'Date') {
                $date.val();
            } else if (this.dateType === 'Time') {
                $time.val();
            }

            return $date.val() + ' ' + $time.val();
        }
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView, this['Templates']['datePickerTemplate'], moment);
