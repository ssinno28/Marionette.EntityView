var DocumentView;
(function (_, Backbone, Marionette) {
    DocumentView = Marionette.NativeView.extend({
        onDomRefresh: function () {
            var formView = this.getOption('formView'),
                id = this.getOption('id'),
                type = this.getOption('type'),
                channel = this.getOption('channel'),
                currentField = this.getOption('currentField'),
                val = this.getOption('value'),
                self = this;

            var docField = _.bind(function (name) {
                return this.field(name, true, currentField).el(self.$el);
            }, formView);

            channel.request('document:' + type, docField);
            channel.request('document:' + type + ':' + id, docField);

            if (!_.isUndefined(val) && val !== '' && !_.isNull(val)) {
                this.setValue(val);
            }
        },
        template: false,
        getValue: function () {
            var val = {},
                field = this.getOption('field');

            this.$el.find('[data-property]').each(function () {
                var elem = $(this);
                var prop = elem.attr('data-property');
                val[prop] = field.properties[prop].view.getValue();
            });

            return JSON.stringify(val);
        },
        setValue: function (val) {
            val = JSON.parse(val);

            var field = this.getOption('field');

            this.$el.find('[data-property]').each(function () {
                var elem = $(this);
                var prop = elem.attr('data-property');
                val[prop] = field.properties[prop].view.setValue(val[prop]);
            });
        }
    });
})(_, Backbone, Marionette);
