var MockEntityCollection = Backbone.EntityCollection.extend({
        query: function (track, data, force) {
            return $.Deferred(_.bind(function (defer) {
                var pageKey = this._getKeyWithOutPage(data),
                    result = this._getSubCollection(data, pageKey);

                defer.resolve(result, pageKey);
            }, this));
        }
    }),
    html = '<html><body><div id="test-region"></div></body></html>',
    region = new Backbone.Marionette.Region({el: '#test-region'}),
    MockListItemView = Marionette.EntityListItemView,
    MockListView = Marionette.EntityListView.extend({
        childView: MockListItemView
    });

$(document.body).append(html);

//set pageSize to 5 for easier testing
App.pageSize = 5;