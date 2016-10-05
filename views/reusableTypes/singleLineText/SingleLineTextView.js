var SingleLineTextView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView, singleLineTextTpl) {
    SingleLineTextView = ReusableTypeLayoutView.extend({
        tag: 'input',
        template:singleLineTextTpl
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView, this['FastTrack']['Templates']['./templates/reusableTypes/singleLineTextTemplate.html']);