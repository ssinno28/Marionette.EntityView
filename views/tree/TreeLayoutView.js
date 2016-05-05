define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'text!templates/tree/treeLayoutTemplate.html',
    'models/EntityLayoutModel',
    'event.aggregator',
    'views/tree/TreeListView'
], function ($, _, Backbone, Marionette, treeLayoutTemplate, EntityLayoutModel, EventAggregator, TreeListView) {
    var TreeLayoutView = Backbone.Marionette.LayoutView.extend({
        template: Marionette.TemplateCache.get(treeLayoutTemplate),
        initialize: function (options) {
            this.collection = options.collection;
        },
        className: 'ancestor-tree',
        regions: {
            'treeRegion': '.treeRegion'
        },
        onDomRefresh: function () {
            var viewContext = this;

            if (!_.isUndefined(this.model) && !_.isNull(this.model)) {
                this.showTreeList();
            } else {
                this.collection.getTopLevel()
                    .done(function () {
                        if (viewContext.collection.length > 0) {
                            viewContext.showTreeList();
                        }
                    });
            }
        },
        showTreeList: function () {
            var viewContext = this;

            this.collection.getTopLevel(false)
                .done(function (topLevel) {
                    viewContext.treeRegion.show(new TreeListView({collection: topLevel}));
                });
        }
    });

    return TreeLayoutView;
});