var MessageModel;
(function (_, Backbone, Marionette, App) {
    MessageModel = Backbone.Model.extend({
        defaults: {
            message: '',
            className: ''
        }
    });

})(_, Backbone, Marionette, App);