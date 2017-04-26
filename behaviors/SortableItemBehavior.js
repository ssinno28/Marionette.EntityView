var SortableItemBehavior;
(function ($, _, Backbone, Marionette) {
    SortableItemBehavior = Marionette.Behavior.extend({
        onRender: function () {
            this.view.$el.attr('draggable', true);
            this.view.$el.addClass('sortable-item');
            this.view.$el.data('id', this.view.model.get('id'));

            var currentPlacement = this.view.model.get('placement'),
                model = this.view.model;

            if (currentPlacement === 0 || _.isUndefined(currentPlacement)) {
                model.set({placement: this.view.collection.indexOf(model)});
            }
        },
        events: {
            "dragstart": "start",
            "dragenter": "enter",
            "dragleave": "leave",
            "dragend": "leave",
            "dragover": "over",
            "drop": "drop"
        },
        start: function (e) {
            this.view.parent.draggedModel = this.view.model;
            if (e.originalEvent) e = e.originalEvent;
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.dropEffect = "move";
            e.dataTransfer.setData('text', "Drag");
        },
        enter: function (e) {
            e.preventDefault();
            this.view.$el.addClass('over');
        },
        leave: function (e) {
            e.preventDefault();
            this.view.$el.removeClass('over');
        },
        over: function (e) {
            e.preventDefault();
            return false;
        },
        drop: function (e) {
            e.preventDefault();
            this.leave(e);

            var $target = $(e.target),
                currentModelId = $target.data('id'),
                collection = this.view.collection,
                currentModel = collection.get(currentModelId);

            this.view.triggerMethod('item:dropped', this.view.parent.draggedModel, currentModel);
        }
    });
})(jQuery, _, Backbone, Marionette);
