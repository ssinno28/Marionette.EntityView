define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'app'
], function($, _, Backbone, Marionette, App){
    var MessageModel = Backbone.Model.extend({
        defaults:{
            message: '',
            className: ''
        }
    });
    return MessageModel;
});