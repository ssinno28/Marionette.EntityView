var EntityListView;
(function ($, _, Backbone, Marionette, entityListTemplate, EventAggregator) {
    EntityListView = Marionette.EntityListView = Backbone.Marionette.CompositeView.extend({
        template: entityListTemplate,
        itemViewContainer: '.listings',
        className: 'large-12 columns',
        template: entityListTemplate,
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
})(jQuery, _, Backbone, Marionette, this['FastTrack']['Templates']['./templates/entityListTemplate.html'], EventAggregator);
