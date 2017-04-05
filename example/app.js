var MockEntityCollection = Backbone.EntityCollection.extend({
        query: function (track, data, force) {
            return $.Deferred(_.bind(function (defer) {
                var pageKey = this._getKeyWithOutPage(data),
                    result = this._getSubCollection(data, pageKey);

                this._addModelIndexes(pageKey, result.child.toJSON(), data, result.length);

                defer.resolve(result, pageKey);
            }, this));
        }
    }),
    region = new Backbone.Marionette.Region({el: '#mainRegion'}),
    MockListItemView = Marionette.EntityListItemView.extend({
        fieldsTemplate: _.template('<div><%= name %></div>')
    }),
    MockListView = Marionette.EntityListView.extend({
        childView: MockListItemView
    });

//set pageSize to 5 for easier testing
App.pageSize = 5;

var data = [
    {id: 1, name: 'test'},
    {id: 2, name: 'test 2'},
    {id: 3, name: 'test 3'},
    {id: 4, name: 'test 4'},
    {id: 5, name: 'test 5'},
    {id: 6, name: 'test 6'},
    {id: 7, name: 'test 7'},
    {id: 8, name: 'test 8'},
    {id: 9, name: 'test 9'},
    {id: 10, name: 'test 10'}
];

var formView = Marionette.EntityFormView.extend({
    template: _.template('<script type="text/template">' +
        '<fieldset>' +
        '<legend>User Settings</legend>' +
        '<div class="form-group username">' +
        '<label class="label-control col-sm-2">Username</label>' +
        '<div class="col-sm-10">' +
        '<input type="text" class="form-control" data-field="username" value="<%= userName %>" />' +
        '</div>' +
        '</div>' +
        '<div class="form-group email">' +
        '<label class="label-control col-sm-2">Email</label>' +
        '<div class="col-sm-10">' +
        '<input type="email" class="form-control" data-field="email" value="<%= email %>" />' +
        '</div>' +
        '</div>' +
        '</fieldset>' +
        '</script>'),
    fields: {
        name: {
            el: '.username input',
            required: 'Please enter a Username.'
        },
        email: {
            el: '.username input',
            required: 'Please enter an email address.',
            email: 'The email address is not in the correct format!'
        }
    }
});

var options = {
    collection: new MockEntityCollection(),
    model: Backbone.Model,
    formView: formView,
    listView: MockListView,
    title: 'Testing',
    route: 'test',
    region: region
};

options.collection.addRange(data);

App.on('start', function () {
    var router = new Marionette.EntityRouter({
        controller: new Marionette.EntityController(options),
        route: 'test'
    });

    Backbone.history.start();
});

App.start();

console.log('test!');
