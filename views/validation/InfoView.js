define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'app',
    'views/validation/BaseValidationView'
], function($, _, Backbone, Marionette, App, BaseValidationView){
    var InfoView = BaseValidationView.extend({
        className: 'info alert-box radius'
    });
    return InfoView;
});/**
 * Created by ssinno on 12/2/13.
 */
