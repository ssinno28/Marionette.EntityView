var CheckBoxListView;
(function ($, _, Backbone, Marionette, CheckBoxView, ReusableTypeListView) {
    CheckBoxListView = ReusableTypeListView.extend({
        childView: CheckBoxView
    });
})(jQuery, _, Backbone, Marionette, CheckBoxView, ReusableTypeListView);
