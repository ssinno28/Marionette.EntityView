var DocumentView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView) {
    DocumentView = ReusableTypeLayoutView.extend({
        onRender: function () {
            var docField = this.getOption('docField'),
                id = this.getOption('id'),
                type = this.getOption('type'),
                channel = this.getOption('channel');

            channel.request('document:' + type, docField);
            channel.request('document:' + type + ':' + id, docField);
        },
        template: function () {
            return _.template('<script id="empty-template" type="text/template"></script>');
        },
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
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView);
