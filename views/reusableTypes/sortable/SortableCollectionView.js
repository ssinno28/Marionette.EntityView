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
            var draggedModelPlacement = draggedModel.get('placement'),
                overModelPlacement = overModel.get('placement');

            var placement;
            if (draggedModelPlacement < overModelPlacement) {
                this.collection.each(function (item) {
                    var placement = item.get('placement');
                    if (placement <= overModelPlacement) {
                        var newPlacement = placement - 1;
                        item.set({placement: newPlacement});
                    }
                });

                draggedModel.set({placement: overModelPlacement});
            } else if (draggedModelPlacement > overModelPlacement) {
                this.collection.each(function (item) {
                    var placement = item.get('placement');
                    if (placement >= overModelPlacement) {
                        var newPlacement = placement + 1;
                        item.set({placement: newPlacement});
                    }
                });

                draggedModel.set({placement: overModelPlacement});
            }

            this.setComparator();
        },
        setComparator: function () {
            this.collection.comparator =
                function (model) {
                    return model.get('placement');
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
        getChannel: function () {
            return Backbone.Radio.channel(this.route);
        }
    });
})(jQuery, _, Backbone, Marionette, SortableItemView);