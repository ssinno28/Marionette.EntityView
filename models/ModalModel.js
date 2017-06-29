var ModalModel;
(function (_, Backbone) {
    ModalModel = Backbone.Model.extend({
        defaults: {
            title: '',
            message: ''
        }
    });
})(_, Backbone);
