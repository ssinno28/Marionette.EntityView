var MockModel = Backbone.EntityModel.extend({
        defaults: {
            email: 'example@gmail.com',
            name: 'John Doe'
        }
    }),
    MockEntityCollection = Backbone.EntityCollection.extend({
        url: '/api/test',
        model: MockModel,
        //for demo purposes only, never override the query method!
        query: function (track, data, force) {
            return $.Deferred(_.bind(function (defer) {
                var pageKey = this._getKeyWithOutPage(data),
                    result = this._getSubCollection(data, pageKey);

                defer.resolve(result, pageKey);
            }, this));
        }
    }),
    region = new Marionette.Region({el: '#mainRegion'}),
    MockListItemView = Marionette.EntityListItemView.extend({
        fieldsTemplate: _.template('<div><%= name %></div>'),
        onRender: function () {
            this.action('test')
                .text('Testing add Action!')
                .callBack(this.testAction)
                .add();
        },
        testAction: function () {
            alert('This is a test!');
        }
    }),
    MockListView = Marionette.EntityListView.extend({
        childView: MockListItemView
    });

//set pageSize to 5 for easier testing
App.pageSize = 5;

var formView = Marionette.EntityFormView.extend({
    onRender: function () {
        this.field('id')
            .label('Id')
            .fieldset('user-settings', 'User Settings')
            .singleLine(null, true);

        this.field('name')
            .label('Name')
            .fieldset('user-settings', 'User Settings')
            .required('Please enter your full name.')
            .singleLine();

        this.field('email')
            .label('Email')
            .fieldset('user-settings')
            .required('Please enter an email address.')
            .email('The email address is not in the correct format!')
            .singleLine();

        this.field('dob')
            .label('Date of Birth')
            .fieldset('user-settings')
            .required('The DOB is required!!')
            .datePicker();

        this.field('timeBorn')
            .label('Time of Birth')
            .fieldset('user-settings')
            .required('The time of your birth is required!!')
            .timePicker();

        this.field('photo')
            .label('Photo')
            .fieldset('user-settings')
            .required('Your picture is required!')
            .imagePicker();

        this.field('bio')
            .label('Your Bio')
            .fieldset('user-settings')
            .required('Your Bio is required!!')
            .wyswig();
    }
});

App.Users = new MockEntityCollection();

//For demo purposes only!!!!
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

//For demo purposes only
var firstData = {page: 1, pageSize: App.pageSize},
    secondData = {page: 2, pageSize: App.pageSize},
    pageKey = App.Users._getKeyWithOutPage(firstData);

var models1 = App.Users.addRange(data1);
App.Users._addModelIndexes(pageKey, models1, firstData, 10);

var models2 = App.Users.addRange(data2);
App.Users._addModelIndexes(pageKey, models2, secondData, 10);
//For demo purposes only!!!!

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
    },
    allowableOperations: ['edit', 'delete', 'delete-all', 'create', 'test']
};

App.on('start', function () {
    App.FILE_BROWSER_URL = '../node_modules/rich-filemanager/index.html';

    var controller = new Marionette.EntityController(options);
    App.router.map(function (route) {
        route('test', {path: '/test', abstract: true}, function () {
            route('test.create', {path: 'create/'});
            route('test.edit', {path: 'edit/:testeditid/'});
            route('test.getType', {path: ':page/'});
        });
    });

    App.router.use(function render(transition) {
        transition.routes.forEach(function (route, i) {
            if (App.router.isActive(route.name, route.params, route.query)) {
                return;
            }

            let routeSegments = route.name.split('.'),
                count = routeSegments.length - 1,
                channelName = '',
                method = routeSegments[count];

            for (let i = 0; i < count; i++) {
                channelName += routeSegments[i];

                if (i + 1 < count) {
                    channelName += '.';
                }
            }

            switch (method) {
                case 'getType':
                    Backbone.Radio.channel(channelName).trigger(method, route.params.page);
                    break;
                case 'edit':
                    Backbone.Radio.channel(channelName).trigger(method, route.params[route.name.replace('.', '') + 'id']);
                    break;
                case 'create':
                    Backbone.Radio.channel(channelName).trigger(method);
                    break;
            }
        });
    });

    // start listening to URL changes
    App.router.listen()
});

App.start();
