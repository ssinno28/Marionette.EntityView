var MultiSelectLayoutView;
(function (Marionette, $, _, multiSelectLayoutTpl, ReusableTypeLayoutView, MultiSelectService, EntityLayoutModel, headerTemplate, EventAggregator) {
    MultiSelectLayoutView = ReusableTypeLayoutView.extend({
        initialize: function (options) {
            ReusableTypeLayoutView.prototype.initialize.call(this, options);

            this.collection = options.collection;
            this.excludedItemsRoute = this.dataField + '-excluded-items';
            this.selectedItemsRoute = this.dataField + '-included-items';

            if (!options.selectedId) {
                this.selectedId = [];
            } else {
                this.selectedId = options.selectedId;
            }

            this.selectedItems = new Backbone.Collection();
            this.actionableOptions = new Backbone.Collection();
        },
        onRender: function () {
            this.$el.attr('data-field', this.dataField);
        },
        className: 'zselect',
        template: multiSelectLayoutTpl,
        regions: {
            'optionsRegion': '.options',
            'selectedOptionsRegion': '.selectedOptions'
        },
        events: {
            'click .zmshead': 'toggleMultiSelect',
            'click .multi-select-option': 'selectOption',
            'click .remove-items': 'removeItems',
            'click .add-items': 'addItems'
        },
        ui: {
            '$optionsRegion': '.optionsRegion',
            '$selected': '.zmshead',
            '$addItems': '.add-items',
            '$removeItems': '.remove-items'
        },
        showSelectedInHeader: function () {
            this.ui.$selected.attr('title', '');

            var toolTip = 'There are no selected items.';
            if (this.selectedItems.length > 0) {
                toolTip = 'Selected items: ';
                this.selectedItems.each(_.bind(function (entity) {
                    if (this.selectedItems.indexOf(entity) === (this.selectedItems.length - 1)) {
                        toolTip = toolTip + entity.get('name');
                    } else {
                        toolTip = toolTip + entity.get('name') + ', ';
                    }
                }, this));
            }

            this.ui.$selected.attr('title', toolTip);
            this.ui.$selected.tooltip();
        },
        removeItems: function (e) {
            e.preventDefault();

            var self = this;
            this.actionableOptions.each(function (entity) {
                var index = self.selectedId.indexOf(entity.get('id'));
                self.selectedId.splice(index, 1);
            });

            var addItemTrigger = this.dataField + ':removed';
            EventAggregator.trigger(addItemTrigger, this.actionableOptions);

            this.actionableOptions.reset();
            this.showSelectedInHeader();
            this.ui.$removeItems.hide();
            this.refreshCollections();
        },
        addItems: function (e) {
            e.preventDefault();

            if (!_.isUndefined(this.options.allowMultipleItems)) {
                if (!this.options.allowMultipleItems &&
                    ((this.selectedItems.length >= 1 && this.actionableOptions.length >= 1) ||
                    this.actionableOptions.length > 1)) {
                    alert("You can only add one content item.");
                    this.$el.find('.entityRegion ul li').removeClass('selected');
                    this.actionableOptions.reset();
                }
            }

            var self = this;
            this.actionableOptions.each(function (entity) {
                self.selectedId.push(entity.get('id'));
            });

            var addItemTrigger = this.dataField + ':added';
            EventAggregator.trigger(addItemTrigger, this.selectedItems);

            this.actionableOptions.reset();
            this.showSelectedInHeader();
            this.ui.$addItems.hide();
            this.refreshCollections();
        },
        refreshCollections: function () {
            var selectedIds = this.selectedId;

            var notInPred = [];
            if (selectedIds !== "") {
                notInPred = [
                    {
                        searchType: 'except',
                        field: 'id',
                        value: selectedIds
                    }
                ];
            }

            if (this.options.conditions && this.options.conditions.length > 0) {
                notInPred = notInPred.concat(this.options.conditions);
            }

            this.excludedItemsService.conditions = notInPred;
            EventAggregator.trigger(this.excludedItemsRoute + '.getAll', 1);

            var inPred = [
                {
                    searchType: 'in',
                    field: 'id',
                    value: selectedIds
                }
            ];

            if (this.options.selectedConditions && this.options.selectedConditions.length > 0) {
                inPred = inPred.concat(this.options.selectedConditions);
            }

            this.selectedItemsService.conditions = inPred;
            EventAggregator.trigger(this.selectedItemsRoute + '.getAll', 1);
        },
        selectOption: function (e) {
            e.preventDefault();

            var $target = $(e.target);

            if(!$target.is('li')){
                $target = $target.closest('li');
            }

            var optionSelectedFunc = _.bind(this.optionSelected, this),
                id = $target.data('id');

            this.collection.getById(id)
                .done(function (entity) {
                    optionSelectedFunc(entity, $target);
                });
        },
        optionSelected: function (entity, $target) {
            if (this.actionableOptions.contains(entity)) {
                this.actionableOptions.remove(entity);
                $target.removeClass('selected');
            } else {
                this.actionableOptions.add(entity);
                $target.addClass('selected');
            }

            var removing = false,
                adding = false;

            if (this.actionableOptions.length > 0) {
                this.selectedItems.each(_.bind(function (item) {
                    var findSelected =
                        this.actionableOptions.find(function (actionableItem) {
                            return actionableItem.get('id') === item.get('id');
                        });

                    if (!_.isUndefined(findSelected)) {
                        removing = true;
                        return;
                    }
                }, this));

                this.nonSelectedItems.each(_.bind(function (item) {
                    var findNonSelected =
                        this.actionableOptions.find(function (actionableItem) {
                            return actionableItem.get('id') === item.get('id');
                        });

                    if (!_.isUndefined(findNonSelected)) {
                        adding = true;
                        return;
                    }
                }, this));
            }

            if (adding && removing) {
                alert("You can only select items from one side or the other.");
                this.$el.find('.entityRegion ul li').removeClass('selected');
                this.actionableOptions.reset();
                this.ui.$removeItems.hide();
                this.ui.$addItems.hide();
            } else if (adding) {
                this.ui.$addItems.show();
                this.ui.$removeItems.hide();
            } else if (removing) {
                this.ui.$removeItems.show();
                this.ui.$addItems.hide();
            } else {
                this.ui.$addItems.hide();
                this.ui.$removeItems.hide();
            }
        },
        toggleMultiSelect: function (e) {
            if (!this.ui.$optionsRegion.is(':visible')) {
                this.ui.$optionsRegion.show();
            } else {
                this.ui.$optionsRegion.hide();
            }
        },
        showSelectedItems: function () {
            var inPred = [
                {
                    searchType: 'in',
                    field: 'id',
                    value: this.selectedId.toString()
                }
            ];

            if (this.options.selectedConditions && this.options.selectedConditions.length > 0) {
                inPred = inPred.concat(this.options.selectedConditions);
            }

            this.selectedItemsService = new MultiSelectService();

            var options = {
                allowableOperations: [],
                route: this.selectedItemsRoute,
                header: {params: {title: "Remove an Item"}, template: headerTemplate},
                routing: false,
                conditions: inPred,
                region: this.getRegion('selectedOptionsRegion'),
                collection: this.collection
            };

            this.selectedItemsService.initialize(options);

            EventAggregator.on(this.selectedItemsRoute + '.subcollection', _.bind(function (entities) {
                this.selectedItems = new Backbone.Collection(entities.models);

                this.showSelectedInHeader();
            }, this));

            EventAggregator.trigger(this.selectedItemsRoute + '.getType', 1);
        },
        showExcludedItems: function () {
            var notInPred = [
                {
                    searchType: 'except',
                    field: 'id',
                    value: this.selectedId.toString()
                }
            ];

            if (this.options.conditions && this.options.conditions.length > 0) {
                notInPred = notInPred.concat(this.options.conditions);
            }

            this.excludedItemsService = new MultiSelectService();

            var options = {
                allowableOperations: [],
                route: this.excludedItemsRoute,
                header: {params: {title: "Select an Item"}, template: headerTemplate},
                routing: false,
                conditions: notInPred,
                region: this.getRegion('optionsRegion'),
                collection: this.collection
            };

            this.excludedItemsService.initialize(options);

            EventAggregator.on(this.excludedItemsRoute + '.subcollection', _.bind(function (entities) {
                this.nonSelectedItems = new Backbone.Collection(entities.models);
            }, this));

            EventAggregator.trigger(this.excludedItemsRoute + '.getType', 1);
        },
        onDomRefresh: function () {
            this.ui.$optionsRegion.hide();
            this.showExcludedItems();
            this.showSelectedItems();
        },
        onDestroy: function () {
            EventAggregator.off(this.excludedItemsRoute + '.subcollection');
            EventAggregator.off(this.selectedItemsRoute + '.subcollection');
        }
    });
})(Marionette, jQuery, _, this['Templates']['multiSelectLayoutTemplate'], ReusableTypeLayoutView, MultiSelectService, EntityLayoutModel, this['Templates']['headerTemplate'], EventAggregator);
