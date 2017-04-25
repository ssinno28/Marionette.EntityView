
var SortableItemBehavior;
(function ($, _, Backbone, Marionette) {
    SortableItemBehavior = Marionette.Behavior.extend({
        onRender: function(){
         this.view.$el.attr('draggable', true);   
         this.view.$el.data('id', this.model.get('id'));
        }
        events: {
            "dragstart": "start",
            "dragenter": "enter",
            "dragleave": "leave",
            "dragend": "leave",
            "dragover": "over",
            "drop": "drop"
        },
        start: function (e) {
            this.draggedModel = this.model;
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

            this.view.triggerMethod('item:dropped', this.draggedModel, currentModel);
        }
    });
})(jQuery, _, Backbone, Marionette);
