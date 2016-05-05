// Filename: views/facets/FacetListView
define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!templates/reusableTypes/radioButtonTemplate.html',
    'views/reusableTypes/ReusableTypeView'
], function ($, _, Backbone, Marionette, radioButtonTemplate, ReusableTypeView) {
    var RadioButtonView = ReusableTypeView.extend({
        tagName: 'div',
        className: 'large-6 columns',
        template: Backbone.Marionette.TemplateCache.get(radioButtonTemplate)
    });
    // Our module now returns our view
    return RadioButtonView;
});
