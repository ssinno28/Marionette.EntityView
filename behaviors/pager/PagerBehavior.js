var PagerBehavior;
(function ($, _, Backbone, Marionette, App, PagerListView) {
    PagerBehavior = Marionette.Behavior.extend({
        onShowPager: function (entityCollection) {
            if (this.view.pagerRegion.currentView != null) {
                this.view.pagerRegion.reset();
            }

            var count = window.indexes[this.view.key],
                currentPage = this.view.listView.currentPage,
                collection = new Backbone.Collection(),
                noOfPages = Math.ceil(count / window.pageSize);

            if (noOfPages === 1) {
                this.view.pagerRegion.empty();
                if (this.view.routing) {
                    location.hash = '/' + this.view.route + '/' + 1 + '/' + this.view.additionalParams;
                }

                return;
            }

            for (var i = 1; i <= noOfPages; i++) {
                var pagerItem = new Backbone.Model(),
                    route = '/' + this.view.route + '/' + i + '/' + this.view.additionalParams;

                pagerItem.set({route: route, currentPage: i == currentPage, number: i});
                collection.add(pagerItem);
            }

            this.view.pagerRegion.show(new PagerListView({
                collection: collection,
                parentViewCid: this.view.cid,
                routing: this.view.routing,
                route: this.view.route
            }));
        }
    });
})(jQuery, _, Backbone, Marionette, App, PagerListView);