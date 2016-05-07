var SingleLineTextView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView, singleLineTextTemplate) {
    SingleLineTextView = ReusableTypeLayoutView.extend({
        tag: 'input',
        template:singleLineTextTemplate
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView, this['FastTrack']['Templates']['./templates/reusableTypes/singleLineTextTemplate.html']);