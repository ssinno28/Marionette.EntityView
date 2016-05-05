// Filename: router.js
//The router will load the correct dependencies depending on the current URL.
define([
    'jquery',
    'underscore',
    'backbone',
    'marionette'
], function ($, _, Backbone, Marionette) {
    return Backbone.Marionette.AppRouter.extend({
        onRoute: function (name, path, arguments) {
            if (_.isFunction(this.options.controller.onActionExecuting)) {
                this.options.controller.onActionExecuting(name, path, arguments);
            }
        },
        //Root path for all routes defined by this router. Override this in a deriving
        //class for keeping route table DRY.
        urlRoot: undefined,

        //override the route method to prefix the route URL
        route: function (route, name, callback) {
            if (this.urlRoot) {
                route = (route === '' ? this.urlRoot : this.urlRoot + "/" + route);
            }

            //define route
            Backbone.Router.prototype.route.call(this, route, name, callback);

            //also support URLs with trailing slashes
            Backbone.Router.prototype.route.call(this, route + "/", name, callback);
        },
        appRoutes: {
            'create/*actions': 'create',
            'edit/:id/*actions': 'edit',
            ':page/*actions': 'getType',
            'startsWith/:startsWith/field/:field/*actions': 'textSearch'
        }
    });
});