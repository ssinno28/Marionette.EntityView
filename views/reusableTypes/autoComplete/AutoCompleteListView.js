var AutoCompleteListView;
(function ($, _, Backbone, Marionette, ReusableTypeListView, AutoCompleteView) {
    AutoCompleteListView = ReusableTypeListView.extend({
        className: 'dropdown-menu',
        tagName: 'ul',
        childView: AutoCompleteView,
        onRender: function () {
            this.$el.attr('id', this.dataField);
        },
        onDomRefresh: function () {
            this.getChannel().trigger('auto-complete:list:complete:' + this.dataField);
            this.$el.dropdown('toggle');
        }
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeListView, AutoCompleteView);