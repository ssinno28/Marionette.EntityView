
describe('Entity Forms Validation', function () {
    var formView = Marionette.EntityFormView.extend({
    onRender: function () {
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

        this.field('age')
            .label('Your Age')
            .fieldset('user-settings')
            .required('Your Age is required!!')
            .numeric('This field should be a number!')
            .min('There is a minimum age of 23 required!', 23)
            .singleLine();
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

    options.collection.add(new Backbone.Model({id: 1, name: 'testing'}));
    var entityService = new Marionette.EntityService(options);
    entityService.create();
    
    it('returns required validation', function () {
        var errors = region.currentView.validate();
        
        expect(entityService.routing).toEqual(true);
    });
});
