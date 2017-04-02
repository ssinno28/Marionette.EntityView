var ModalModel;
(function ($, _, Backbone) {
    ModalModel = Backbone.Model.extend({
        defaults: {
            title: '',
            message: ''
        }
    });
})(jQuery, _, Backbone);
