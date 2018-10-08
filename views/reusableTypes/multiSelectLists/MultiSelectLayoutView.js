var MultiSelectLayoutView;
(function (Marionette, $, _, multiSelectLayoutTpl, ReusableTypeLayoutView, MultiSelectService, EntityLayoutModel) {
    MultiSelectLayoutView = ReusableTypeLayoutView.extend({
        initialize: function (options) {
            this.collection = options.collection;
            this.excludedItemsRoute = options.dataField + '-excluded-items';
            this.selectedItemsRoute = options.dataField + '-included-items';

            if (!options.selectedId) {
                this.selectedId = [];
            } else {
                this.selectedId = options.selectedId;
            }

            this.selectedItems = new Backbone.Collection();
            this.actionableOptions = new Backbone.Collection();
        },
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
        renderActions: function () {
            // Do nothing
        },
        showSelectedInHeader: function () {
            this.ui.$selected.attr('title', '');

            var toolTip = 'There are no selected items.';
            if (this.selectedItems.length > 0) {
                toolTip = 'Selected items: ';
                this.selectedItems.each(_.bind(function (entity) {
                    if (this.selectedItems.indexOf(entity) === (this.selectedItems.length - 1)) {
                        toolTip = toolTip + entity.get(this.displayField);
                    } else {
                        toolTip = toolTip + entity.get(this.displayField) + ', ';
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

            this.getChannel().trigger('removed', this.actionableOptions);

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
                    alert("You can only add one item.");
                    this.$el.find('.entityRegion ul li').removeClass('selected');
                    this.actionableOptions.reset();
                }
            }

            var self = this;
            this.actionableOptions.each(function (entity) {
                self.selectedId.push(entity.get('id'));
            });

            this.getChannel().trigger('added', this.selectedItems);

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
            this.excludedItemsService.getChannel().trigger('getAll', 1);

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
            this.selectedItemsService.getChannel().trigger('getAll', 1);
        },
        selectOption: function (e) {
            e.preventDefault();
            e.stopPropagation();

            var $target = $(e.target);

            if (!$target.is('li')) {
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
                    value: _.isUndefined(this.selectedId) ? '' : this.selectedId.toString()
                }
            ];

            if (this.options.selectedConditions && this.options.selectedConditions.length > 0) {
                inPred = inPred.concat(this.options.selectedConditions);
            }

            var options = {
                allowableOperations: [],
                route: this.selectedItemsRoute,
                header: {
                    params: {title: "Select an Item"},
                    template: _.template('<div class="col-sm-12 nopadding">' +
                        '<h5><%= title %></h5>' +
                        '</div>')
                },
                routing: false,
                conditions: inPred,
                region: this.getRegion('selectedOptionsRegion'),
                collection: this.collection,
                displayField: this.displayField
            };

            this.selectedItemsService = new MultiSelectService(options);
            this._selectedItemsChannel = this.selectedItemsService.getChannel();

            this._selectedItemsChannel.on('subcollection', _.bind(function (entities) {
                this.selectedItems = new Backbone.Collection(entities.models);
                this.showSelectedInHeader();
            }, this));

            this._selectedItemsChannel.trigger('getType', 1);
        },
        showExcludedItems: function () {
            var notInPred = [
                {
                    searchType: 'except',
                    field: 'id',
                    value: _.isUndefined(this.selectedId) ? '' : this.selectedId.toString()
                }
            ];

            if (this.options.conditions && this.options.conditions.length > 0) {
                notInPred = notInPred.concat(this.options.conditions);
            }

            var options = {
                allowableOperations: [],
                route: this.excludedItemsRoute,
                header: {
                    params: {title: "Select an Item"},
                    template: _.template('<div class="col-sm-12 nopadding">' +
                        '<h5><%= title %></h5>' +
                        '</div>')
                },
                routing: false,
                conditions: notInPred,
                region: this.getRegion('optionsRegion'),
                collection: this.collection,
                displayField: this.displayField
            };

            this.excludedItemsService = new MultiSelectService(options);
            this._excludedItemsChannel = this.excludedItemsService.getChannel();

            this._excludedItemsChannel.on('subcollection', _.bind(function (entities) {
                this.nonSelectedItems = new Backbone.Collection(entities.models);
            }, this));

            this._excludedItemsChannel.trigger('getType', 1);
        },
        onDomRefresh: function () {
            this.ui.$optionsRegion.hide();
            this.showExcludedItems();
            this.showSelectedItems();
        },
        onDestroy: function () {
            this._excludedItemsChannel.reset();
            this._selectedItemsChannel.reset();
        },
        getValue: function () {
            var checkedOptions = this.$el.find('.selectedOptions ul li');
            var value = [];
            _.each(checkedOptions, function (checkedOption) {
                var $checkedOption = $(checkedOption);
                value.push($checkedOption.data('id'));
            });

            return value;
        }
    });
})(Marionette, jQuery, _, this['Templates']['multiSelectLayoutTemplate'], ReusableTypeLayoutView, MultiSelectService, EntityLayoutModel);
