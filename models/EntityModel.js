define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    var EntityModel = Backbone.Model.extend({
        initialize: function () {
            var memento = new Backbone.Memento(this);
            _.extend(this, memento);
        },
        setUrl: function (base) {
            this.url = base;
            /*this.url = base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;*/
        }
    });
    // Return the model for the module
    return EntityModel;
});
