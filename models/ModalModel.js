var ModalModel;
(function ($, _, Backbone) {
    ModalModel = Backbone.Model.extend({
        defaults: {
            name: 'default',
            options: [],
            eventName: 'default',
            message: ''
        }
    });
})(jQuery, _, Backbone);
