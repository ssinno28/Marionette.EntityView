var AutoCompleteLayoutView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView, autoCompleteTemplate, TimeoutUtil, EventAggregator, AutoCompleteListView) {
    AutoCompleteLayoutView = ReusableTypeLayoutView.extend({
        tag: 'div',
        template: Marionette.TemplateCache.get(autoCompleteTemplate),
        initialize: function (options) {
            ReusableTypeLayoutView.prototype.initialize.call(this, options);

            this.selectedId = options.selectedId;
            this.collection = options.collection;
            this.timeoutUtil = new TimeoutUtil();

            EventAggregator.on('auto-complete:list:complete:' + this.dataField, _.bind(this.listingRetrieved, this));
            EventAggregator.on('auto-complete:selected:' + this.dataField, _.bind(this.entitySelected, this));
        },
        listingRetrieved: function () {
            Foundation.libs.dropdown.toggle(this.ui.$ddLink);
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

            Foundation.libs.dropdown.toggle(this.ui.$ddLink);

            $('html').off('click');
        },
        setSelectedEntity: function () {
            var $ddLink = this.ui.$ddLink,
                $valueText = this.ui.$valueText,
                id = this.ui.$selectedId.val();

            if (_.isNull(id) || _.isUndefined(id) || id === '') {
                this.ui.$valueText.val('');
                Foundation.libs.dropdown.toggle(this.ui.$ddLink);
                return;
            }

            this.collection.getById(id)
                .done(function (entity) {
                    Foundation.libs.dropdown.toggle($ddLink);
                    $valueText.val(entity.get('name'));
                });
        },
        ui: {
            '$valueText': '.valueText',
            '$selectedId': '.selectedId',
            '$ddLink': '.ddLink'
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

                                self.dropDownRegion.show(listView);
                            } else {
                                self.dropDownRegion.reset();
                            }
                        });
                });
        },
        onDomRefresh: function () {
            var viewContext = this;

            if (!_.isNull(this.selectedId) && !_.isUndefined(this.selectedId)) {
                this.collection.getById(this.selectedId)
                    .done(function (entity) {
                        viewContext.ui.$valueText.val(entity.get('name'));
                        viewContext.ui.$selectedId.val(entity.get('id'));
                    });
            }
        },
        onDestroy: function () {
            EventAggregator.off('auto-complete:list:complete:' + this.dataField);
            EventAggregator.off('auto-complete:selected:' + this.dataField);
        }
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView, this['FastTrack']['Templates']['./templates/reusableTypes/autoComplete/autoCompleteTemplate.html'], TimeoutUtil, EventAggregator, AutoCompleteListView);