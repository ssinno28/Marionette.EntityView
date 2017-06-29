var AutoCompleteView;
(function (_, Backbone, Marionette, ReusableTypeListView, liAutoCompleteTemplate) {
    AutoCompleteView = Marionette.View.extend({
        tagName: 'li',
        template: liAutoCompleteTemplate,
        triggers: {
            'click': {
                event: 'autoCompleteSelected',
                preventDefault: true,
                stopPropagation: true
            }
        }
    });
})(_, Backbone, Marionette, ReusableTypeListView, this['Templates']['liAutoCompleteTemplate']);
