var SingleLineTextView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView, singleLineTextTemplate) {
    SingleLineTextView = ReusableTypeLayoutView.extend({
        tag: 'input',
        template: Marionette.TemplateCache.get(singleLineTextTemplate)
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView, this['FastTrack']['Templates']['./templates/reusableTypes/singleLineTextTemplate.html']);