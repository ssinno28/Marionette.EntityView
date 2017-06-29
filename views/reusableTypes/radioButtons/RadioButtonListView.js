var RadioButtonListView;
(function (_, Backbone, Marionette, RadioButtonView, ReusableTypeListView) {
    RadioButtonListView = ReusableTypeListView.extend({
        childView: RadioButtonView,
        getValue: function () {
            return this.$el.find('input[type=radio]:checked').val();
        },
        setValue: function (val) {
            var $checked = this.$el.find('input[type=radio]');
            $checked.removeAttr('checked');
            _.each($checked, function (item) {
                var $item = $(item);
                if ($item.val() === val) {
                    $item.attr('checked', '');
                }
            });
        }
    });
})(_, Backbone, Marionette, RadioButtonView, ReusableTypeListView);
