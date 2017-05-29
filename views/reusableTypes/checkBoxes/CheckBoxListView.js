var CheckBoxListView;
(function ($, _, Backbone, Marionette, CheckBoxView, ReusableTypeListView) {
    CheckBoxListView = ReusableTypeListView.extend({
        childView: CheckBoxView,
        getValue: function () {
            var $checked = this.$el.find(':checked'),
                values = [];

            _.each($checked, function ($item) {
                values.push($item.data('id'));
            });

            return values;
        },
        setValue: function (val) {
            var $checked = this.$el.find('input[type=checkbox]');

            $checked.removeAttr('checked');
            _.each($checked, function ($item) {
                var currentId = _.find(val, function (value) {
                    return $item.data('id') === value;
                });

                if (!_.isUndefined(currentId)) {
                    $item.attr('checked', '');
                }
            });
        }
    });
})(jQuery, _, Backbone, Marionette, CheckBoxView, ReusableTypeListView);
