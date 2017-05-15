var ActionView;
(function ($, _, Backbone, Marionette) {
    ActionView = Marionette.View.extend({
        triggers: {
            'click $el': {
                event: 'action:' + this.getOption('safeName'),
                preventDefault: true,
                stopPropagation: true
            }
        },
        template: function () {
            return _.template('<script id="empty-template" type="text/template"></script>');
        }
    });
})(jQuery, _, Backbone, Marionette);