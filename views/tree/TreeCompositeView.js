
var TreeCompositeView;
(function ($, _, Backbone, Marionette, treeCompositeTemplate) {
    TreeCompositeView = Marionette.TreeCompositeView = Backbone.Marionette.CompositeView.extend({
        tagName: 'li',
        template: Marionette.TemplateCache.get(treeCompositeTemplate),
        events: function () {
            var nodeClickEvent = 'click .nodeLink' + this.options.model.get('id'),
                plusClickEvent = 'click .plus' + this.options.model.get('id'),
                minusClickEvent = 'click .minus' + this.options.model.get('id'),
                toggleClickEvent = 'click .toggle' + this.options.model.get('id');

            var eventsHash = {};
            eventsHash[nodeClickEvent] = 'navigateToItem';
            eventsHash[plusClickEvent] = 'showChildren';
            eventsHash[minusClickEvent] = 'hideChildren';
            eventsHash[toggleClickEvent] = 'toggleChildren';

            return eventsHash;
        },
        onDomRefresh: function () {
            if (!this.hasChildren() || this.model.get('hideChildren')) {
                this.ui.$children.hide();
                this.ui.$plus.show();
                this.ui.$minus.hide();
            } else {
                this.ui.$plus.hide();
                this.ui.$minus.show();
                this.ui.$children.show();
            }

            if (_.isUndefined(this.fullCollection)) {
                this.ui.$toggle.hide();
            }
        },
        ui: {
            '$children': '.children',
            '$plus': '.tree-view-plus',
            '$minus': '.fi-minus',
            '$toggle': '.toggle',
            '$node' : '.node'
        },
        navigateToItem: function (e) {
            e.preventDefault();
        },
        childViewOptions: function () {
            var fullCollection = this.fullCollection;

            return {
                fullCollection: fullCollection
            };
        },
        toggleChildren: function (e) {
            e.preventDefault();

            if (!this.model.get('hideChildren')) {
                this.hideChildren(e);
                this.ui.$plus.show();
                this.ui.$minus.hide();
            } else {
                this.showChildren(e);
                this.ui.$plus.hide();
                this.ui.$minus.show();
            }
        },
        showChildren: function (e) {
            e.preventDefault();
            var self = this;

            this.collection = this.getChildrenCollection()
                .done(function () {
                    self.setChildrenCollection();
                    if (self.collection.length > 0) {
                        self.ui.$children.show();
                        self.model.set({childCollection: self.collection});
                        self.model.set({hideChildren: false});

                        self.render();
                    }
                });
        },
        hideChildren: function (e) {
            e.preventDefault();
            this.ui.$children.hide();
            this.model.set({hideChildren: true});
        },
        initialize: function (options) {
            _.extend(this, options);

            if(_.isUndefined(this.model.get('hideChildren'))){
                this.model.set({hideChildren: true});
            }

            var childCollection = this.model.get('childCollection');
            if (!_.isUndefined(childCollection) && childCollection.length > 0) {
                this.collection = childCollection;
            }
        },
        getChildrenCollection: function () {
            var modelId = this.model.get('id');
            return this.fullCollection.getChildren(modelId, 5, false);
        },
        setChildrenCollection: function () {
            var self = this,
                modelId = this.model.get('id');

            var collection = new Backbone.CollectionSubset({
                parent: self.fullCollection,
                filter: function (node) {
                    var parentIds = node.get('parentIds');
                    return parentIds.indexOf(modelId) > -1;
                }
            });

            this.collection = collection.child;
        },
        childViewContainer: ".children",
        hasChildren: function () {
            return !_.isUndefined(this.collection) && this.collection.length > 0;
        }
    });

})(jQuery, _, Backbone, Marionette, this['FastTrack']['Templates']['./templates/tree/treeCompositeTemplate.html']);
