
var SideNavListView;
(function ($, _, Backbone, Marionette, SideNavItemView) {
    SideNavListView = Marionette.SideNavListView = Backbone.Marionette.CollectionView.extend({
        initialize: function (options) {
            this.listings = options.listings;
            this.headerIndexes = [];
            this.collection = new Backbone.Collection();

            _.each(this.listings, function (listing) {
                if (this.collection.length === 0) {
                    this.headerIndexes.push(this.collection.length);
                } else {
                    this.headerIndexes.push(this.collection.length);
                }

                if (!_.isUndefined(listing.items)) {
                    listing.items.each(function (item) {
                        item.set({
                            type: listing.type,
                            hierarchical: listing.hierarchical
                        });
                    }, this);

                    this.collection.add(listing.items.toJSON());
                }
            }, this);
        },
        childViewOptions: function (model, index) {
            var listing = _.find(this.listings, function (listing) {
                if (_.isUndefined(listing.fullCollection) || model.get('id') === null) {
                    return false;
                }

                var findModel = null;
                listing.fullCollection.getById(model.get('id'), false)
                    .done(function (entity) {
                        findModel = entity;
                    });

                return findModel !== null;
            });

            if (!_.isUndefined(listing)) {
                return {
                    fullCollection: listing.fullCollection
                };
            }

            return {};
        },
        tagName: 'ul',
        className: 'list-group',
        events: {
            'click a': 'setActiveElement'
        },
        ui: {
            '$listElements': 'li'
        },
        setActiveElement: function (e) {
            this.$el.find('li').removeClass('active');
            var $target = $(e.target).parent();
            $target.addClass('active');
        },
        childView: SideNavItemView,
        onAddChild: function (childView) {
            var indexOf = this.collection.indexOf(childView.model);
            if (indexOf !== this.collection.length - 1) {
                childView.$el.after('<li class="divider"></li>');
            }

            var isHeaderIndex = _.find(this.headerIndexes, function (headerIndex) {
                return indexOf === headerIndex;
            });

            if (!_.isUndefined(isHeaderIndex)) {
                var heading = this.listings[this.headerIndexes.indexOf(isHeaderIndex)].header;

                if (!_.isUndefined(heading)) {
                    childView.$el.before('<li class="heading">' + heading + '</li>');
                }
            }
        }
    });
})(jQuery, _, Backbone, Marionette, SideNavItemView);