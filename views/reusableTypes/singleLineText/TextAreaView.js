var TextAreaView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView, textAreaTemplate) {
    TextAreaView = ReusableTypeLayoutView.extend({
        template: textAreaTemplate
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView, this['FastTrack']['Templates']['./templates/reusableTypes/textAreaTemplate.html']);