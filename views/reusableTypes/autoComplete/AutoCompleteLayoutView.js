var AutoCompleteLayoutView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView, autoCompleteTemplate, TimeoutUtil, AutoCompleteListView) {
    AutoCompleteLayoutView = ReusableTypeLayoutView.extend({
        tag: 'div',
        template: autoCompleteTemplate,
        initialize: function (options) {
            ReusableTypeLayoutView.prototype.initialize.call(this, options);

            this.selectedId = options.selectedId;
            this.collection = options.collection;
            this.timeoutUtil = new TimeoutUtil();

            var channel = this.getChannel(this.dataField);
            channel.on('auto-complete:list:complete', _.bind(this.listingRetrieved, this));
            channel.on('auto-complete:selected', _.bind(this.entitySelected, this));
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
        entitySelected: function (e) {
            e.stopPropagation();
            e.preventDefault();

            var $target = $(e.target);
            this.ui.$selectedId.val($target.data('id'));
            this.ui.$valueText.val($target.html());

            this.getRegion('dropDownRegion').reset();

            $('html').off('click');
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

            this.timeoutUtil.suspendOperation(400,
                function () {
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
                });
        },
        onDomRefresh: function () {
            var self = this;

            if (!_.isNull(this.selectedId) && !_.isUndefined(this.selectedId)) {
                this.collection.getById(this.selectedId)
                    .done(function (entity) {
                        self.ui.$valueText.val(entity.get('name'));
                        self.ui.$selectedId.val(entity.get('id'));
                    });
            }
        }
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView, this['Templates']['autoCompleteTemplate'], TimeoutUtil, AutoCompleteListView);
