var RadioButtonListView;
(function ($, _, Backbone, Marionette, RadioButtonView, ReusableTypeListView) {
    RadioButtonListView = ReusableTypeListView.extend({
        childView: RadioButtonView
    });
})(jQuery, _, Backbone, Marionette, RadioButtonView, ReusableTypeListView);
