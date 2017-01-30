var EntityController;
(function (App, $, _, Backbone, Marionette, EntityLayoutView, headerTemplate, TimeoutUtil, EntityService) {
    EntityController = Marionette.EntityController = Marionette.Object.extend({
        initialize: function (options) {
            this.getEntityService(options);
            this.channel = Backbone.Radio.Channel(this.entityService.route);
        },
        onActionExecuting: function (name, path) {
            App.route = this.route;
        },
        getEntityService: function (options) {
            this.entityService = new EntityService(options);
        },
        create: function () {
            this.channel.trigger('create');
        },
        edit: function (id) {
            this.channel.trigger('edit', id);
        },
        textSearch: function (startsWith, field) {
            this.channel.trigger('textSearch', startsWith, field);
        },
        getAll: function (page) {
            this.channel.trigger('getAll', page);
        },
        getType: function (page) {
            this.channel.trigger('getType', page);
        }
    });
})(App, jQuery, _, Backbone, Marionette, EntityLayoutView, this['Templates']['headerTemplate'], TimeoutUtil, EntityService);
