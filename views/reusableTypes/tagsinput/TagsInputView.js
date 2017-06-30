var TagsInputView;
(function (_, Backbone, Marionette, ReusableTypeLayoutView, Taggle) {
    TagsInputView = ReusableTypeLayoutView.extend({
        initialize: function () {
            var tagsInputOptions = this.getOption('tagsInputOptions'),
                defaultOptions = {
                    onBeforeTagAdd: _.bind(this.beforeItemAdd, this),
                    allowDuplicates: false
                };

            if (!_.isUndefined(tagsInputOptions)) {
                defaultOptions = _.extend(defaultOptions, tagsInputOptions);
            }

            this.taggle = new Taggle(this.$el, defaultOptions);
        },
        template: _.template('<div></div>'),
        ui: {
            '$tagsInput': 'input'
        },
        events: {
            'keyup ui.$tagsInput': function () {
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

                this.collection.query(false, data, true, true)
                    .done(function (entities) {
                        defer.resolve(_.pluck(entities, 'name'));
                    });
            }
        },
        onDomRefresh: function () {
            this.setValue(this.getOption('selectedId'));
        },
        beforeItemAdd: function (e, tag) {
            var modelType = this.collection.model,
                model = new modelType({name: tag}),
                collection = this.collection,
                checkExists = collection.find(function (item) {
                    return item.get('name') === tag;
                });

            if (_.isUndefined(checkExists)) {
                model.setUrl(collection.getUrl());
                model.save(null, {
                    success: function (model, response) {
                        model.set({id: response});
                        collection.add(model);
                    },
                    error: function (model, response) {
                        collection.remove(model.cid);
                        e.cancel = true;
                    }
                });
            }
        },
        getValue: function () {
            var val = this.$el.tagsinput('items'),
                items = this.collection.filter(function (item) {
                    return val.indexOf(item.get('name')) > -1;
                });

            return _.pluck(items, 'id');
        },
        setValue: function (val) {
            if (_.isUndefined(val) || _.isNull(val)) {
                return;
            }

            var data = {
                conditions: [
                    {
                        searchType: 'in',
                        field: 'id',
                        value: val
                    }
                ]
            };

            this.collection.query(false, data, true, true)
                .done(_.bind(function (items) {
                    var names = _.pluck(items, 'name');
                    this.taggle.add(names);
                }, this));
        }
    });
})(_, Backbone, Marionette, ReusableTypeLayoutView, Taggle);
