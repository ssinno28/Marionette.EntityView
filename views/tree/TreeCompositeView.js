
var TreeCompositeView;
(function ($, _, Backbone, Marionette, treeCompositeTpl) {
    TreeCompositeView = Marionette.TreeCompositeView = Backbone.Marionette.LayoutView.extend({
        tagName: 'li',
        template: treeCompositeTpl,
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
            if (this.hasChildren() && !_.isUndefined(this.renderChildrenTpl)) {
                this.renderChildrenTpl();
                var childrenRegion = new Backbone.Marionette.Region({
                    el: '.children-' + this.model.get('id'),
                    replaceElement: true
                });

                this.regionManager.addRegion('childrenRegion', childrenRegion);
                 
                var ListView = this.model.get('listView');
                this.childrenRegion.show(new ListView({ collection: this.collection }));
            }
        },
        ui: {
            '$children': '.children'
        },
        navigateToItem: function (e) {
            e.preventDefault();
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
                        self.model.set({ childCollection: self.collection });
                        self.model.set({ hideChildren: false });

                        self.render();
                    }
                });
        },
        hideChildren: function (e) {
            e.preventDefault();
            this.ui.$children.hide();
            this.model.set({ hideChildren: true });
        },
        initialize: function (options) {
            _.extend(this, options);

            if (_.isUndefined(this.model.get('hideChildren'))) {
                this.model.set({ hideChildren: true });
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
        hasChildren: function () {
            return !_.isUndefined(this.collection) && this.collection.length > 0;
        }
    });

})(jQuery, _, Backbone, Marionette, this['FastTrack']['Templates']['./templates/tree/treeCompositeTemplate.html']);
