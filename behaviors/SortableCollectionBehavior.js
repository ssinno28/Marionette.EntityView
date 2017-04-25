
var SortableCollectionBehavior;
(function ($, _, Backbone, Marionette) {
    SortableCollectionBehavior = Marionette.Behavior.extend({
        onRender: function(){
            this.view.$el.addClass('sortable-view');
            this.setComparator();
        }, 
        onChildviewItemDropped: function (draggedModel, overModel) {
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
            this.view.collection.comparator =
                function (model) {
                    return model.get('placement');
                };

            this.view.collection.sort();
        }
    });
})(jQuery, _, Backbone, Marionette);
