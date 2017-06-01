var TagsInputView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView) {
    TagsInputView = ReusableTypeLayoutView.extend({
        template: _.template('<select multiple ></select>'),
        onDomRefresh: function () {
            var tagsInputOptions = this.getOption('tagsInputOptions'),
                self = this,
                defaultOptions = {
                    itemValue: 'id',
                    itemText: 'name',
                    typeahead: {
                        source: function (query) {
                            if (query.length < 2) {
                                return;
                            }

                            var data = {
                                conditions: [
                                    {
                                        searchType: 'like',
                                        field: 'name',
                                        value: query
                                    }
                                ]
                            };

                            return self.collection.query(false, data, false, true);
                        }
                    }
                };

            if (!_.isUndefined(tagsInputOptions)) {
                defaultOptions = _.extend(defaultOptions, tagsInputOptions);
            }

            this.$el.tagsinput(defaultOptions);
            this.setValue(this.getOption('value'));
        },
        getValue: function () {
            return this.$el.val();
        },
        setValue: function (val) {
            var data = {
                conditions: [
                    {
                        searchType: 'in',
                        field: 'id',
                        value: val
                    }
                ]
            };

            this.collection.query(false, data, false, true)
                .done(_.bind(function (items) {
                    _.each(items, _.bind(function (item) {
                        this.$el.tagsinput('add', item);
                    }, this));
                }, this));
        }
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView);
