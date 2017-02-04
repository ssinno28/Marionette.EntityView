var SortableCollectionView;
(function ($, _, Backbone, Marionette, SortableItemView) {
    SortableCollectionView = Marionette.SortableCollectionView = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'sortable-view',
        childView: SortableItemView,
        overClass: 'over',
        initialize: function (options) {
            _.extend(this, options);

            this.getChannel().on('item:dropped', _.bind(this.setPlacement, this));
            this.setComparator();
        },
        setPlacement: function (draggedModel, overModel) {
            var placementOverModelIndex = _.indexOf(_.pluck(this.placement, 'id'), overModel.get('id')),
                placementDraggedModelIndex = _.indexOf(_.pluck(this.placement, 'id'), draggedModel.get('id'));

            var draggedModelPlacment = this.placement[placementDraggedModelIndex].placement,
                overModelPlacement = this.placement[placementOverModelIndex].placement;

            var placement;
            if (draggedModelPlacment < overModelPlacement) {
                for (var j = 0; j < this.placement.length; j++) {
                    placement = this.placement[j].placement;
                    if (placement <= overModelPlacement) {
                        this.placement[j].placement--;
                    }
                }

                this.placement[placementDraggedModelIndex].placement = overModelPlacement;
            } else if (draggedModelPlacment > overModelPlacement) {
                for (var i = 0; i < this.placement.length; i++) {
                    placement = this.placement[i].placement;
                    if (placement >= overModelPlacement) {
                        this.placement[i].placement++;
                    }
                }

                this.placement[placementDraggedModelIndex].placement = overModelPlacement;
            }


            this.setComparator();
        },
        setComparator: function () {
            var self = this;

            this.collection.comparator =
                function (model) {
                    var item =
                        _.find(self.placement, function (index) {
                            return index.id === model.get('id');
                        });

                    if (!_.isUndefined(item)) {
                        return item.placement;
                    }

                    return 0;
                };

            this.collection.sort();
        },
        buildChildView: function (item, ItemViewType, itemViewOptions) {
            var options = _.extend({
                    model: item,
                    overClass: this.overClass,
                    parent: this,
                    route: this.route
                },
                itemViewOptions);

            return new ItemViewType(options);
        },
        appendHtml: function (collectionView, itemView, index) {
            var childrenContainer = collectionView.itemViewContainer ? collectionView.$(collectionView.itemViewContainer) : collectionView.$el;
            var children = childrenContainer.children();
            if (children.size() <= index) {
                childrenContainer.append(itemView.el);
            } else {
                childrenContainer.children().eq(index).before(itemView.el);
            }
        },
        onDestroy: function () {
            this.getChannel().reset();
        },
        getChannel: function () {
            return Backbone.Radio.Channel(this.route);
        }
    });
})(jQuery, _, Backbone, Marionette, SortableItemView);