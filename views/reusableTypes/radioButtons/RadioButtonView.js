var RadioButtonView;
(function ($, _, Backbone, Marionette, radioButtonTemplate, ReusableTypeView) {
    RadioButtonView = ReusableTypeView.extend({
        tagName: 'div',
        className: 'large-6 columns',
        template: radioButtonTemplate
    });

})(jQuery, _, Backbone, Marionette, this['FastTrack']['Templates']['./templates/reusableTypes/radioButtonTemplate.html'], ReusableTypeView);
