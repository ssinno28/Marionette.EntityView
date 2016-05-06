var MultiSelectService;
(function ($, _, Backbone, Marionette, EntityService, App, MultiSelectListView) {
    MultiSelectService = (function () {
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
            this.model = null;
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

        return ctor;
    });

})(jQuery, _, Backbone, Marionette, EntityService, App, MultiSelectListView);