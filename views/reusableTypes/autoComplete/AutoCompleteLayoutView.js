var AutoCompleteLayoutView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView, autoCompleteTemplate, AutoCompleteListView) {
    AutoCompleteLayoutView = ReusableTypeLayoutView.extend({
        tag: 'div',
        template: autoCompleteTemplate,
        dataFieldSelector: '.selectedId',
        childViewEvents: {
            'autoCompleteSelected': function (view, e) {
                this.ui.$selectedId.val(view.model.get('id'));
                this.ui.$valueText.val(view.model.get('name'));

                this.getRegion('dropDownRegion').reset();
                $('html').off('click');
            }
        },
        initialize: function (options) {
            ReusableTypeLayoutView.prototype.initialize.call(this, options);

            this.selectedId = options.selectedId;
            this.collection = options.collection;

            var channel = this.getChannel(this.dataField);
            channel.on('auto-complete:list:complete', _.bind(this.listingRetrieved, this));
        },
        className: 'dropdown col-sm-12 nopadding',
        listingRetrieved: function () {
            this.ui.$ddLink.dropdown('toggle');
            var setSelectedEntity = _.bind(this.setSelectedEntity, this);

            $('html').on('click', function (e) {
                $(this).off('click');
                setSelectedEntity();
            });
        },
        setSelectedEntity: function () {
            var $valueText = this.ui.$valueText,
                id = this.ui.$selectedId.val();

            if (_.isNull(id) || _.isUndefined(id) || id === '') {
                this.ui.$valueText.val('');
                this.getRegion('dropDownRegion').reset();
                return;
            }

            this.collection.getById(id)
                .done(_.bind(function (entity) {
                    this.getRegion('dropDownRegion').reset();
                    $valueText.val(entity.get('name'));
                }, this));
        },
        ui: {
            '$valueText': '.valueText',
            '$selectedId': '.selectedId',
            '$ddLink': '.dropdown-menu'
        },
        regions: {
            'dropDownRegion': '.dropDownRegion'
        },
        events: {
            'keyup .valueText': 'getEntities'
        },
        getEntities: function (e) {
            var $target = $(e.target),
                name = $target.val(),
                self = this;

            if (name.length < 2) {
                return;
            }

            _.debounce(_.bind(function () {
                var data = {
                    conditions: [
                        {
                            searchType: 'like',
                            field: 'name',
                            value: name
                        }
                    ]
                };

                self.collection.query(false, data)
                    .done(function (entities) {
                        if (entities.length > 0) {
                            var listView = new AutoCompleteListView({
                                collection: entities,
                                dataField: self.dataField,
                                selectedId: self.selectedId
                            });

                            self.showChildView('dropDownRegion', listView);
                        } else {
                            self.getRegion('dropDownRegion').reset();
                        }
                    });
            }, this), 400)();
        },
        onDomRefresh: function () {
            this.setValue(this.selectedId);
        },
        getValue: function () {
            return this.getDataField().val();
        },
        setValue: function (val) {
            var self = this;

            if (!_.isNull(val) && !_.isUndefined(val)) {
                this.collection.getById(val)
                    .done(function (entity) {
                        self.ui.$valueText.val(entity.get('name'));
                        self.ui.$selectedId.val(entity.get('id'));
                    });
            }
        }
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView, this['Templates']['autoCompleteTemplate'], AutoCompleteListView);
