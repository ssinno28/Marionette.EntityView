var MockEntityCollection,
    region,
    MockListItemView,
    MockListView;

beforeEach(function () {
    $(document.body).append('<html><body><div id="test-region"></div></body></html>');

    MockEntityCollection = Backbone.EntityCollection.extend({
        query: function (track, data, force) {
            return $.Deferred(_.bind(function (defer) {
                var pageKey = this._getKeyWithOutPage(data),
                    result = this._getSubCollection(data, pageKey);

                defer.resolve(result, pageKey);
            }, this));
        }
    });
    region = new Marionette.Region({el: '#test-region'});
    MockListItemView = Marionette.EntityListItemView;
    MockListView = Marionette.EntityListView.extend({
        childView: MockListItemView
    });

    //set pageSize to 5 for easier testing
    App.pageSize = 5;
});