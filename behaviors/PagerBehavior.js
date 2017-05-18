var PagerBehavior;
(function ($, _, Backbone, Marionette, App, PagerListView, DropDownListView) {
    PagerBehavior = Marionette.Behavior.extend({
        onRender: function () {
            var collection = new Backbone.Collection(),
                view = this.view;

            _.each(view.getOption('pageSizes'), function (pageSize) {
                collection.add(new Backbone.Model({id: pageSize, name: pageSize}));
            });

            view.showChildView('pageSizeRegion', new DropDownListView({
                dataField: view.route + ':pageSize',
                collection: collection
            }));

            view.triggerMethod("ShowPager");
            Backbone.Radio.channel(view.route + ':pageSize').on('change',
                _.bind(function (pageSize) {
                    if (!_.isNull(pageSize)) {
                        this._channel.trigger('changePageSize', parseInt(pageSize));
                        this.triggerMethod("ShowPager");
                    }
                }, view));
        },
        onShowPager: function () {
            var pagerRegion = this.view.getRegion('pagerRegion'),
                channel = this.view.getChannel();

            if (pagerRegion.currentView !== null) {
                pagerRegion.reset();
            }

            if (_.isUndefined(App.indexes)) {
                return;
            }

            var pageSize = channel.request('getPageSize'),
                count = App.indexes[this.view.key],
                currentPage = this.view.listView.currentPage,
                collection = new Backbone.Collection(),
                noOfPages = Math.ceil(count / pageSize);

            if (noOfPages === 1) {
                pagerRegion.empty();
                if (this.view.routing) {
                    location.hash = '/' + this.view.route + '/' + 1 + '/';
                }

                return;
            }

            for (var i = 1; i <= noOfPages; i++) {
                var pagerItem = new Backbone.Model(),
                    route = '/' + this.view.route + '/' + i + '/';

                pagerItem.set({route: route, currentPage: i == currentPage, number: i});
                collection.add(pagerItem);
            }

            this.view.showChildView('pagerRegion', new PagerListView({
                collection: collection,
                parentViewCid: this.view.cid,
                routing: this.view.routing,
                route: this.view.route
            }));
        }
    });
})(jQuery, _, Backbone, Marionette, App, PagerListView, DropDownListView);