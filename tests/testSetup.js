var MockEntityCollection = Backbone.EntityCollection.extend({
        query: function (track, data, force) {
            return $.Deferred(function (defer) {
                defer.resolve(new Backbone.Collection());
            });
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