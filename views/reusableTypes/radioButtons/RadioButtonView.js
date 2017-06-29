var RadioButtonView;
(function (_, Backbone, Marionette, radioButtonTemplate, ReusableTypeView) {
    RadioButtonView = ReusableTypeView.extend({
        tagName: 'div',
        className: 'col-sm-6',
        template: radioButtonTemplate
    });

})(_, Backbone, Marionette, this['Templates']['radioButtonTemplate'], ReusableTypeView);
