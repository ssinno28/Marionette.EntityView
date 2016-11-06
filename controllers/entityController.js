var EntityController;
(function (App, $, _, Backbone, Marionette, EventAggregator, EntityLayoutView, headerTemplate, TimeoutUtil, EntityService) {
    EntityController = Marionette.EntityController = Marionette.Object.extend({
        initialize: function (options) {
            this.getEntityService(options);
        },
        onActionExecuting: function (name, path) {
            App.route = this.route;
        },
        getEntityService: function (options) {
            this.entityService = new EntityService();
            this.entityService.initialize(options);
        },
        create: function () {
            EventAggregator.trigger(this.entityService.route + '.create');
        },
        edit: function (id) {
            EventAggregator.trigger(this.entityService.route + '.edit', id);
        },
        textSearch: function (startsWith, field) {
            EventAggregator.trigger(this.entityService.route + '.textSearch', startsWith, field);
        },
        getAll: function (page) {
            EventAggregator.trigger(this.entityService.route + '.getAll', page);
        },
        getType: function (page) {
            EventAggregator.trigger(this.entityService.route + '.getType', page);
        }
    });
})(App, jQuery, _, Backbone, Marionette, EventAggregator, EntityLayoutView, this['FastTrack']['Templates']['./templates/headerTemplate.html'], TimeoutUtil, EntityService);