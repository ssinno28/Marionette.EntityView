
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
            //.rule('testRule', 'The age cannot be greater than 50!', function(val){return val < 50;})
            .singleLine();
        }
    });
    
    var options = {
        collection: new MockEntityCollection(),
        model: Backbone.EntityModel,
        formView: formView,
        listView: MockListView,
        title: 'Testing',
        route: 'test',
        region: region
    };

    var entityService = new Marionette.EntityService(options);
    
    it('returns min requirement error', function () {
        entityService.region.show(entityService.entityLayoutView());
        entityService.create();
        var currentView = entityService.region.currentView.getRegion('entityRegion').currentView;
        
        currentView.$el.find('[data-field=age]').val(21);
        currentView.$el.find('[data-field=name]').val('test');
        currentView.$el.find('[data-field=email]').val('test@example.com');
        
        var errors = currentView.validate();        
        expect(errors[0].error[0]).toEqual('There is a minimum age of 23 required!');
    });
    
/*    it('returns custom rule requirement error', function () {
        var currentView =  region.currentView;
        
        currentView.$el.find('[data-field=age]').val(51);
        currentView.$el.find('[data-field=name]').val('test');
        currentView.$el.find('[data-field=email]').val('test@example.com');
        
        var errors = currentView.validate();        
        expect(errors[0].error[0]).toEqual('The age cannot be greater than 50!');
    });
    
    it('returns email requirement error', function () {
        var currentView =  region.currentView;
        
        currentView.$el.find('[data-field=age]').val(23);
        currentView.$el.find('[data-field=name]').val('test');
        currentView.$el.find('[data-field=email]').val('test');
        
        var errors = currentView.validate();        
        expect(errors[0].error[0]).toEqual('The email address is not in the correct format!');
    });*/
});
