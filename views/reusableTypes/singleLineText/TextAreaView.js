var TextAreaView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView, textAreaTemplate) {
    TextAreaView = ReusableTypeLayoutView.extend({
        template: textAreaTemplate
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView, this['Templates']['textAreaTemplate']);
