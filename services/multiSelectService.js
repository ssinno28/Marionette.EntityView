var MultiSelectService;
(function ($, _, Backbone, Marionette, EntityService, App, MultiSelectListView) {
    MultiSelectService = Marionette.EntityService.extend({
        getData: function (page) {
            var data = {
                conditions: [],
                page: page,
                pageSize: App.pageSize
            };

            data.conditions = data.conditions.concat(this.conditions);
            return data;
        },
        initialize: function (options) {
            this.model = null;
            this.listView = MultiSelectListView.extend({
                displayField: _.isUndefined(options.displayField) ? 'name' : options.displayField
            });

            this.formView = null;
            Marionette.EntityService.prototype.initialize.call(this, options);
        },
        getBtnClass: function () {
            return 'tiny round';
        }
    });
})(jQuery, _, Backbone, Marionette, EntityService, App, MultiSelectListView);