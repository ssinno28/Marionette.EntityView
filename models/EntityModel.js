var EntityModel;
(function ($, _, Backbone) {
    EntityModel = Marionette.EntityModel = Backbone.Model.extend({
        setUrl: function (base) {
            this.url = base;
            /*this.url = base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;*/
        }
    });
})(jQuery, _, Backbone);
