var TextAreaView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView, textAreaTemplate) {
    TextAreaView = ReusableTypeLayoutView.extend({
        template: Marionette.TemplateCache.get(textAreaTemplate)
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView, textAreaTemplate);