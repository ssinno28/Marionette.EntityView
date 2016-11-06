var RadioButtonView;
(function ($, _, Backbone, Marionette, radioButtonTemplate, ReusableTypeView) {
    RadioButtonView = ReusableTypeView.extend({
        tagName: 'div',
        className: 'col-sm-6',
        template: radioButtonTemplate
    });

})(jQuery, _, Backbone, Marionette, this['FastTrack']['Templates']['./templates/reusableTypes/radioButtonTemplate.html'], ReusableTypeView);
