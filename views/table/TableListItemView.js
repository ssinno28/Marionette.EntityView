var TableListItemView;
(function ($, _, Backbone, Marionette, EntityListItemView, listItemTpl) {
    TableListItemView =  Marionette.TableListItemView = EntityListItemView.extend({
        template: listItemTpl,
        tagName: 'tr'
    });
})(jQuery, _, Backbone, Marionette, EntityListItemView, this['EntityView']['Templates']['./templates/table/tableListItemTpl.html']);
