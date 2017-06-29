var SortableListBehavior;
(function (_, Backbone, Marionette) {
    SortableListBehavior = Marionette.Behavior.extend({
        onRender: function () {
            this.view.$el.addClass('sortable-view');
            this.setComparator();
        },
        onChildviewItemDropped: function (draggedModel, overModel) {
            var draggedModelPlacement = draggedModel.get('placement'),
                overModelPlacement = overModel.get('placement');

            if (draggedModelPlacement < overModelPlacement) {
                this.view.collection.each(function (item) {
                    var placement = item.get('placement');
                    if (placement <= overModelPlacement) {
                        var newPlacement = placement - 1;
                        item.set({placement: newPlacement});
                        item.save();
                    }
                });

                draggedModel.set({placement: overModelPlacement});
                draggedModel.save();
            } else if (draggedModelPlacement > overModelPlacement) {
                this.view.collection.each(function (item) {
                    var placement = item.get('placement');
                    if (placement >= overModelPlacement) {
                        var newPlacement = placement + 1;
                        item.set({placement: newPlacement});
                        item.save();
                    }
                });

                draggedModel.set({placement: overModelPlacement});
                draggedModel.save();
            }

            this.setComparator();
        },
        setComparator: function () {
            this.view.collection.comparator =
                function (model) {
                    return model.get('placement');
                };

            this.view.collection.sort();
        }
    });
})(_, Backbone, Marionette);
