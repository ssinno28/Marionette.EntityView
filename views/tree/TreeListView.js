// Filename: views/facets/FacetListView
define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'views/tree/TreeCompositeView',
    'event.aggregator'
], function ($, _, Backbone, Marionette, TreeCompositeView, EventAggregator) {
    var TreeListView = Marionette.CollectionView.extend({
        childView: TreeCompositeView,
        initialize: function (options) {
            this.fullCollection = options.fullCollection;
        },
        onShow: function () {
            EventAggregator.trigger('tree.view.activated');
        },
        onRender: function () {
            // Get rid of that pesky wrapping-div.
            // Assumes 1 child element present in template.
            this.$el = this.$el.children();
            // Unwrap the element to prevent infinitely
            // nesting elements during re-render.
            this.$el.unwrap();
            this.setElement(this.$el);
        },
        childViewOptions: function () {
            var fullCollection = this.fullCollection;

            return {
                fullCollection: fullCollection
            };
        }
    });
    // Our module now returns our view
    return TreeListView;
});
