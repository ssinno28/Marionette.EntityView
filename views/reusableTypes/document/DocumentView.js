var DocumentView;
(function ($, _, Backbone, Marionette) {
    DocumentView = Marionette.View.extend({
        onRender: function () {
            var formView = this.getOption('formView'),
                id = this.getOption('id'),
                type = this.getOption('type'),
                channel = this.getOption('channel'),
                currentField = this.getOption('currentField');

            var docField = _.bind(function (name) {
                return this.field(name, true, currentField);
            }, formView);

            channel.request('document:' + type, docField);
            channel.request('document:' + type + ':' + id, docField);
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
})(jQuery, _, Backbone, Marionette);
