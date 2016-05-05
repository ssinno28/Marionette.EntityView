define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'behaviors/modals/ConfirmModalBehavior'
], function ($, _, Backbone, Marionette, ConfirmModalBehavior) {
    var deleteWarnBehavior = ConfirmModalBehavior.extend({
        events: {
            "click .delete": "showWarningModal"
        },
        getModal: function(){
            return $('.deleteModal');
        }
    });

    return deleteWarnBehavior;
});