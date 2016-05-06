var MessageModel;
(function ($, _, Backbone, Marionette, App) {
    MessageModel = Backbone.Model.extend({
        defaults: {
            message: '',
            className: ''
        }
    });

})(jQuery, _, Backbone, Marionette, App);