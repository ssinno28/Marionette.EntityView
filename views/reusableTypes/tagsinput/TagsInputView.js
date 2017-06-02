var TagsInputView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView) {
    TagsInputView = ReusableTypeLayoutView.extend({
        template: _.template('<select multiple ></select>'),
        ui: {
            '$tagsInput': '.bootstrap-tagsinput > input'
        },
        onDomRefresh: function () {
            var tagsInputOptions = this.getOption('tagsInputOptions'),
                self = this,
                defaultOptions = {
                    typeahead: {
                        afterSelect: function (item) {
                            this.$element.val('');
                        },
                        source: function (query) {
                            return new $.Deferred(function (defer) {
                                if (query.length < 2) {
                                    defer.resolve([])
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

                                self.collection.query(false, data, true, true)
                                    .done(function (entities) {
                                        defer.resolve(_.pluck(entities, 'name'));
                                    });
                            });
                        },
                        delay: 400
                    },
                    freeInput: true
                };

            if (!_.isUndefined(tagsInputOptions)) {
                defaultOptions = _.extend(defaultOptions, tagsInputOptions);
            }

            this.$el.tagsinput(defaultOptions);
            this.setValue(this.getOption('selectedId'));


            this.$el.on('beforeItemAdd', _.bind(this.beforeItemAdd, this));
        },
        beforeItemAdd: function (e) {
            var tag = e.item;

            var modelType = this.collection.model,
                model = new modelType({name: tag}),
                collection = this.collection,
                $el = this.$el,
                checkExists = collection.find(function (item) {
                    return item.get('name') === tag;
                });

            if (!e.preventPost && _.isUndefined(checkExists)) {
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

                    _.each(names, _.bind(function (name) {
                        this.$el.tagsinput('add', name, {preventPost: true});
                    }, this));

                }, this));
        }
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView);
