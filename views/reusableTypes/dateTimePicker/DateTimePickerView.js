define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'views/reusableTypes/ReusableTypeLayoutView',
    'text!templates/reusableTypes/datePickerTemplate.html',
    'event.aggregator',
    'moment'
], function ($, _, Backbone, Marionette, ReusableTypeLayoutView, datePickerTemplate, EventAggregator, Moment) {
    var datePickerView = ReusableTypeLayoutView.extend({
        initialize: function (options) {
            ReusableTypeLayoutView.prototype.initialize.call(this, options);

            var value = this.model.get('value'),
                date = Moment(value).format('MM/DD/YYYY'),
                time = Moment(value).format('hh:mm:ss A');

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
        },
        ui: {
            $datePicker: '.fdatepicker'
        },
        template: Marionette.TemplateCache.get(datePickerTemplate),
        onDomRefresh: function () {
            this.ui.$datePicker.fdatepicker()
                .on('changeDate', function (e) {
                    EventAggregator.trigger('change:date:' + this.dataField, e);
                });

            var $date = $('[data-field="' + this.dataField + '_date"]'),
                $time = $('[data-field="' + this.dataField + '_time"]');

            if(this.extensionType === 'Date'){
                $time.hide();
            } else if(this.extensionType === 'Time'){
                $date.hide();
            }
        },
        show: function () {
            this.$el.fdatepicker('show');
        },
        hide: function () {
            this.$el.fdatepicker('hide');
        },
        update: function (value) {
            this.$el.fdatepicker('update', value);
        },
        getDateTime: function () {
            var $date = $('[data-field="' + this.dataField + '_date"]'),
                $time = $('[data-field="' + this.dataField + '_time"]');

            return $date.val() + ' ' + $time.val();
        }
    });

    return datePickerView;
});