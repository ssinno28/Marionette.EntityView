// Filename: views/facets/FacetListView
define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'views/EntityListItemView',
    'text!templates/reusableTypes/multiSelectLists/multiSelectLiTemplate.html'
], function ($, _, Backbone, Marionette, EntityListItemView, multiSelectLiTemplate) {
    var MultiSelectOptionView = EntityListItemView.extend({
        tagName: 'li',
        className: 'row',
        onRender: function () {
            EntityListItemView.prototype.onRender.call(this, multiSelectLiTemplate);
        }
    });
    // Our module now returns our view
    return MultiSelectOptionView;
});
