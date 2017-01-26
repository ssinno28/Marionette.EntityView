var MultiSelectService;
(function ($, _, Backbone, Marionette, EntityService, App, MultiSelectListView) {
    MultiSelectService = Marionette.EntityService.extend({
        getData: function (page) {
            var data = {
                conditions: [],
                page: page,
                pageSize: window.pageSize
            };

            data.conditions = data.conditions.concat(this.conditions);
            return data;
        },
        initialize: function (options) {
            this.model = null;
            this.listView = MultiSelectListView;
            this.formView = null;

            Marionette.EntityService.prototype.initialize.call(this, options);
        },
        getHeader: function () {
            return this.header;
        },
        getBtnClass: function () {
            return 'tiny round';
        }
    });
})(jQuery, _, Backbone, Marionette, EntityService, App, MultiSelectListView);