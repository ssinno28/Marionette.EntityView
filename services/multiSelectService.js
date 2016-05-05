define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'services/entityService',
    'app',
    'models/entryitems/EntryItemModel',
    'views/reusableTypes/multiSelectLists/MultiSelectListView'
], function ($, _, Backbone, Marionette, EntityService, App, EntryItemModel, MultiSelectListView) {
    var ctor = function () {

    };

    ctor.prototype = new EntityService();
    ctor.prototype.$super = new EntityService();

    ctor.prototype.getData = function (page) {
        var data = {
            conditions: [],
            page: page,
            pageSize: window.pageSize
        };

        data.conditions = data.conditions.concat(this.conditions);

        return data;
    };

    ctor.prototype.initialize = function (options) {
        this.model = EntryItemModel;
        this.listView = MultiSelectListView;
        this.formView = null;

        this.$super.initialize.call(this, options);
    };

    ctor.prototype.getHeader = function () {
        return this.header;
    };

    ctor.prototype.getBtnClass = function () {
        return 'tiny round';
    };

    ctor.prototype.getNewModel = function () {
        var entity = new this.model();
        entity.set({entryTypeId: this.entryTypeId});
        return entity;
    };

    return ctor;
});