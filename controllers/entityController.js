var EntityController;
(function (App, $, _, Backbone, Marionette, EntityLayoutView, headerTemplate, TimeoutUtil, EntityService) {
    EntityController = Marionette.EntityController = Marionette.Object.extend({
        initialize: function (options) {
            this.channel = Backbone.Radio.channel(options.route);
            this.getEntityService(options);
        },
        onActionExecuting: function (name, path) {
            App.route = this.route;
        },
        getEntityService: function (options) {
            var Definition = _.isUndefined(options.service) ? EntityService : options.service;
            this.entityService = new Definition(options);
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
