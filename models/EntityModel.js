var EntityModel;
(function (_, Backbone) {
    EntityModel = Backbone.EntityModel = Backbone.Model.extend({
        setUrl: function (base) {
            this.url = base;
            /*this.url = base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;*/
        },
        save: function (key, val, options) {
            this.beforeSave(key, val, options);
            return Backbone.Model.prototype.save.call(this, key, val, options);
        },
        beforeSave: function (key, val, options) {

        }
    });
})(_, Backbone);
