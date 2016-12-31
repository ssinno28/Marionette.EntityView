var TableLayoutView;
(function ($, _, Backbone, Marionette, EntityLayoutView, tableLayoutTpl) {
    TableLayoutView = Marionette.TableLayoutView = EntityLayoutView.extend({
        tagName: 'table',
        className: 'datatable table table-striped table-bordered',
        template: tableLayoutTpl,
        onDomRefresh: function () {
            EntityLayoutView.prototype.onDomRefresh.call(this);
            this.$el.dataTable();
        }
    });
})(jQuery, _, Backbone, Marionette, EntityLayoutView, this['EntityView']['Templates']['./templates/table/tableLayoutTpl.html']);