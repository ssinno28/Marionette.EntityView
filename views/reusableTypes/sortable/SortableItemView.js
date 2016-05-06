var SortableItemView;
(function ($, _, Backbone, Marionette, EventAggregator) {
    SortableItemView = Marionette.SortableItemView = Marionette.LayoutView.extend({
        tagName: "li",
        attributes: {
            "draggable": true
        },
        events: {
            "dragstart": "start",
            "dragenter": "enter",
            "dragleave": "leave",
            "dragend": "leave",
            "dragover": "over",
            "drop": "drop"
        },
        initialize: function (options) {
            _.extend(this, options);
        },
        onRender: function () {
            this.$el.data('id', this.model.get('id'));
        },
        start: function (e) {
            this.parent.draggedModel = this.model;
            if (e.originalEvent) e = e.originalEvent;
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.dropEffect = "move";
            e.dataTransfer.setData('text', "Drag");
        },
        enter: function (e) {
            e.preventDefault();
            this.$el.addClass(this.overClass);
        },
        leave: function (e) {
            e.preventDefault();
            this.$el.removeClass(this.overClass);
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
                collection = this.model.collection,
                currentModel = collection.get(currentModelId);

            EventAggregator.trigger('item:dropped', this.parent.draggedModel, currentModel);
        }
    });
})(jQuery, _, Backbone, Marionette, EventAggregator);