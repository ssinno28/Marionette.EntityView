define([
        'app',
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'event.aggregator',
        'views/EntityLayoutView',
        'text!templates/headerTemplate.html',
        'util/timeoutUtil',
        'services/entityService'
    ],
    function (App, $, _, Backbone, Marionette, EventAggregator, EntityLayoutView, headerTemplate, TimeoutUtil, EntityService) {
        var EntityController = Backbone.Marionette.Controller.extend({
            initialize: function (options) {
                this.getEntityService(options);
            },
            onActionExecuting: function (name, path, arguments) {
                App.route = this.route;

                var $mainMenuRegion = $('#mainMenuRegion');
                if (path === 'network') {
                    $mainMenuRegion.removeClass('large-offset-3');
                    $mainMenuRegion.removeClass('large-9');
                    $mainMenuRegion.addClass('large-12');
                } else {
                    $mainMenuRegion.addClass('large-offset-3');
                    $mainMenuRegion.addClass('large-9');
                    $mainMenuRegion.removeClass('large-12');
                }
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

        return EntityController;
    });