define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'services/entityService',
    'app',
    'views/entryItems/EntryItemLayoutView',
    'text!templates/reusableTypes/documents/headerTemplate.html',
    'models/entryItems/EntryItemModel',
    'views/entryItems/EntryItemListView',
    'views/entryItems/EntryItemFormView'
], function ($, _, Backbone, Marionette, EntityService, App, EntryItemLayoutView, headerTemplate, EntryItemModel, EntryItemListView, EntryItemFormView) {
    var ctor = function () {

    };

    ctor.prototype = new EntityService();
    ctor.prototype.$super = new EntityService();

    ctor.prototype.getData = function (page) {
        var data = {
            conditions: this.conditions,
            page: page,
            pageSize: window.pageSize
        };

        return data;
    };

    ctor.prototype.initialize = function (options) {
        this.model = EntryItemModel;
        this.listView = EntryItemListView;
        this.formView = EntryItemFormView;
        this.collection = App.EntryItem.collection;

        this.$super.initialize.call(this, options);
    };

    ctor.prototype.getHeader = function () {
        return undefined;
    };

    ctor.prototype.getBtnClass = function () {
        return 'tiny round';
    };

    ctor.prototype.getEntityLayoutView = function (entities) {
        var listView =
            new this.listView
            ({
                collection: entities === undefined ? this.collection : entities
            });

        listView.currentPage = entities === undefined ? 1 : entities.currentPage;

        return new EntryItemLayoutView
        ({
            listView: listView,
            header: {params: {title: this.title}, template: headerTemplate},
            route: this.route,
            allowableOperations: this.allowableOperations,
            model: new Backbone.Model(),
            routing: this.routing,
            btnClass: this.getBtnClass(),
            additionalParams: App.additionalParams
        });
    };

    return ctor;
});