var EntityController;
(function (App, _, Backbone, Marionette, EntityLayoutView, headerTemplate, TimeoutUtil, EntityService) {
    EntityController = Marionette.EntityController = Marionette.Object.extend({
        initialize: function (options) {
            this._channel = Backbone.Radio.channel(options.route);
            this.getEntityService(options);
        },
        onActionExecuting: function (name, path) {
            App.route = this.route;
        },
        getEntityService: function (options) {
            this.entityService = new EntityService(options);
        },
        create: function () {
            this._channel.trigger('create');
        },
        edit: function (id) {
            this._channel.trigger('edit', id);
        },
        textSearch: function (startsWith, field) {
            this._channel.trigger('textSearch', startsWith, field);
        },
        getAll: function (page) {
            this._channel.trigger('getAll', page);
        },
        getType: function (page) {
            this._channel.trigger('getType', page);
        }
    });
})(App, _, Backbone, Marionette, EntityLayoutView, this['Templates']['headerTemplate'], TimeoutUtil, EntityService);
