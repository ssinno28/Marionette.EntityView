var EntityListView;
(function ($, _, Backbone, Marionette) {
    EntityListView = Marionette.EntityListView = Backbone.Marionette.CollectionView.extend({
        className: 'col-sm-12',
        initialize: function (options) {
            this.fullCollection = options.fullCollection;
            this.parentViewCid = options.parentViewCid;
        },
        onDomRefresh: function () {
            this.getChannel().trigger('list.view.activated.' + this.parentViewCid);
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
        },
        onAddChild: function (childView) {
            var indexOf = this.collection.indexOf(childView.model);
            if (indexOf === 0 && !_.isUndefined(this.getTableHeader)) {
                childView.$el.before(this.getTableHeader());
            }
        },
        getChannel: function(){
            return Backbone.Radio.Channel(this.route);
        }
    });
})(jQuery, _, Backbone, Marionette);
