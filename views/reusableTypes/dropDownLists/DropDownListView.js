// Filename: views/facets/FacetListView
define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'app',
    'views/reusableTypes/dropDownLists/OptionView',
    'views/reusableTypes/ReusableTypeListView'
], function ($, _, Backbone, Marionette, App, OptionView, ReusableTypeListView) {
    var DropDownListView = ReusableTypeListView.extend({
        childView: OptionView,
        tagName: 'select',
        className: '',
        onRender: function(options){
            var dataField = options.dataField;
            this.$el.attr('data-field', dataField);
        }
    });

    // Our module now returns our view
    return DropDownListView;
});
