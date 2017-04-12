var MockModel = Backbone.EntityModel.extend({
        defaults: {
            email: 'example@gmail.com',
            name: 'John Doe'
        }
    }),
    MockEntityCollection = Backbone.EntityCollection.extend({
        url: '/api/test',
        model: MockModel,
        query: function (track, data, force) {
            return $.Deferred(_.bind(function (defer) {
                var pageKey = this._getKeyWithOutPage(data),
                    result = this._getSubCollection(data, pageKey);

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

var formView = Marionette.EntityFormView.extend({
    formTemplate: _.template('<fieldset id="user-settings">' +
        '<legend>User Settings</legend>' +
        '<div class="form-group dob">' +
        '<label class="label-control col-sm-2">Date Of Birth</label>' +
        '<div class="dob-region">' +
        '</div>' +
        '<div class="col-sm-10 col-sm-offset-2 errors"></div>' +
        '</div>' +
        '<div class="form-group time-born">' +
        '<label class="label-control col-sm-2">Time Of Birth</label>' +
        '<div class="time-born-region">' +
        '</div>' +
        '<div class="col-sm-10 col-sm-offset-2 errors"></div>' +
        '</div>' +
        '</fieldset>'),
    fields: {
        dob: {
            el: '[data-field="dob"]',
            required: 'The DOB is required!!'
        },
        timeBorn: {
            el: '[data-field="timeBorn"]',
            required: 'The time of your birth is required!!'
        }
    },
    onDomRefresh: function () {
        this.getDatePickerForRegion('dobRegion', 'dob');
        this.getTimePickerForRegion('timeBornRegion', 'timeBorn');

        this.field('name')
            .label('Name')
            .fieldset('User Settings', '#user-settings')
            .required('Please enter your full name.')
            .singleLine();

        this.field('email')
            .label('Email')
            .fieldset('User Settings', '#user-settings')
            .required('Please enter an email address.')
            .email('The email address is not in the correct format!')
            .singleLine();
    }
});

App.Users = new MockEntityCollection();

var data1 = [
    {id: 1, name: 'Bob'},
    {id: 2, name: 'Sherri'},
    {id: 3, name: 'Sam'},
    {id: 4, name: 'Marci'},
    {id: 5, name: 'John'}
];

var data2 = [
    {id: 6, name: 'Mike'},
    {id: 7, name: 'Ted'},
    {id: 8, name: 'Steve'},
    {id: 9, name: 'Kevin'},
    {id: 10, name: 'Matt'}
];

var firstData = {page: 1, pageSize: App.pageSize},
    secondData = {page: 2, pageSize: App.pageSize},
    pageKey = App.Users._getKeyWithOutPage(firstData);


var models1 = App.Users.addRange(data1);
App.Users._addModelIndexes(pageKey, models1, firstData, 10);

var models2 = App.Users.addRange(data2);
App.Users._addModelIndexes(pageKey, models2, secondData, 10);

var options = {
    collection: App.Users,
    model: MockModel,
    formView: formView,
    listView: MockListView,
    title: 'Testing',
    route: 'test',
    region: region,
    header: {
        template: _.template('<h3><%= title %></h3> <hr />'),
        params: {title: 'Testing'}
    }
};

var router = Marionette.EntityRouter.extend({
    urlRoot: 'test'
});

App.on('start', function () {
    new router({
        controller: new Marionette.EntityController(options)
    });

    Backbone.history.start();
});

App.start();
