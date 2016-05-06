var RadioButtonView;
(function ($, _, Backbone, Marionette, radioButtonTemplate, ReusableTypeView) {
    RadioButtonView = ReusableTypeView.extend({
        tagName: 'div',
        className: 'large-6 columns',
        template: Backbone.Marionette.TemplateCache.get(radioButtonTemplate)
    });

})(jQuery, _, Backbone, Marionette, radioButtonTemplate, ReusableTypeView);
