define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'app',
    'text!templates/entityListTemplate.html',
    'event.aggregator'
], function ($, _, Backbone, Marionette, App, entityListTemplate, EventAggregator) {
    var EntityListView = Backbone.Marionette.CompositeView.extend({
        template: entityListTemplate,
        itemViewContainer: '.listings',
        className: 'large-12 columns',
        template: Marionette.TemplateCache.get(entityListTemplate),
        initialize: function (options) {
            this.fullCollection = options.fullCollection;
            this.parentViewCid = options.parentViewCid;
        },
        onShow: function () {
            EventAggregator.trigger('list.view.activated.' + this.parentViewCid);
        },
        childViewOptions: function () {
            var route = this.route,
                allowableOperations = this.allowableOperations,
                collection = this.collection,
                baseClassIds = [];

            if (!_.isUndefined(this.options.baseClassIds)) {
                baseClassIds = this.options.baseClassIds;
            }

            return {
                route: route,
                allowableOperations: allowableOperations,
                collection: collection,
                baseClassIds: baseClassIds
            };
        }
    });
    // Our module now returns our view
    return EntityListView;
});
