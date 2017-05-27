describe('Entity Forms Validation', function () {
    var channel = Backbone.Radio.channel('test');

    var FormView = Marionette.EntityFormView.extend({
        model: Backbone.EntityModel,
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
                .rule('testRule', 'The age cannot be greater than 50!',
                    function (val) {
                        return val <= 50;
                    })
                .singleLine();

            this.field('miscData')
                .label('Misc Data')
                .fieldset('user-settings')
                .document(channel, 'misc-data');
        }
    });

    channel.reply('document:misc-data', function (docField) {
        docField('title')
            .label('Title')
            .required()
            .singleLine();

        docField('married')
            .label('Married')
            .required()
            .checkbox();
    });

    it('gets field data', function () {
        var view = new FormView({channelName: 'test', model: new Backbone.EntityModel()});
        region.show(view);

        var properties = view.fields['miscData'].properties;
        properties['married'].view.setValue(true);
        properties['title'].view.setValue('Mr.');

        expect(properties['married'].view.getValue()).toEqual(true);
        expect(properties['title'].view.getValue()).toEqual('Mr.');
    });

    it('returns min requirement error', function () {
        var view = new FormView({channelName: 'test', model: new Backbone.EntityModel()});
        region.show(view);

        view.fields['age'].view.setValue(21);
        view.fields['name'].view.setValue('test');
        view.fields['email'].view.setValue('test@example.com');

        var errors = view.validate();
        for (var errorObject in errors) {
            var field = errors[errorObject];
            expect(field.error[0]).toEqual('There is a minimum age of 23 required!');
        }
    });

    it('returns custom rule requirement error', function () {
        var view = new FormView({channelName: 'test', model: new Backbone.EntityModel()});
        region.show(view);

        view.fields['age'].view.setValue(51);
        view.fields['name'].view.setValue('test');
        view.fields['email'].view.setValue('test@example.com');

        var errors = view.validate();
        for (var errorObject in errors) {
            var field = errors[errorObject];
            expect(field.error[0]).toEqual('The age cannot be greater than 50!');
        }
    });

    it('returns email requirement error', function () {
        var view = new FormView({channelName: 'test', model: new Backbone.EntityModel()});
        region.show(view);

        view.fields['age'].view.setValue(23);
        view.fields['name'].view.setValue('test');
        view.fields['email'].view.setValue('test');

        var errors = view.validate();
        for (var errorObject in errors) {
            var field = errors[errorObject];
            expect(field.error[0]).toEqual('The email address is not in the correct format!');
        }
    });

    /* it('returns email confirmation error', function () {
     region.show(new FormView({channelName: 'test', model: new Backbone.EntityModel()}));
     var currentView = region.currentView;

     currentView.$el.find('[data-field=age]').val(23);
     currentView.$el.find('[data-field=name]').val('test');
     currentView.$el.find('[data-field=email]').val('test@example.com');
     currentView.$el.find('[data-field=confirmEmail]').val('test@exa2mple.com');

     var errors = currentView.validate();
     for (var errorObject in errors) {
     var field = errors[errorObject];
     expect(field.error[0]).toEqual('This does not match the other email!');
     }
     }); */
});
