var CheckBoxListView;
(function (_, Backbone, Marionette, CheckBoxView, ReusableTypeListView) {
    CheckBoxListView = ReusableTypeListView.extend({
        childView: CheckBoxView,
        getValue: function () {
            var $checked = this.$el.find(':checked'),
                values = [];

            _.each($checked, function (item) {
                var $item = $(item);
                values.push($item.data('id'));
            });

            return values;
        },
        setValue: function (val) {
            var $checkboxes = this.$el.find('input[type=checkbox]');

            $checkboxes.removeAttr('checked');
            _.each($checkboxes, function (item) {
                var $item = $(item),
                    currentId =
                        _.find(val, function (value) {
                            return $item.data('id') === value;
                        });

                if (!_.isUndefined(currentId)) {
                    $item.attr('checked', '');
                }
            });
        }
    });
})(_, Backbone, Marionette, CheckBoxView, ReusableTypeListView);
