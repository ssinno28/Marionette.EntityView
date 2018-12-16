describe('Entity Service with Routing', function () {
    var entityService,
        options;

    beforeEach(function () {
        options = {
            collection: new MockEntityCollection(),
            model: Backbone.EntityModel,
            formView: Marionette.EntityFormView,
            listView: MockListView,
            title: 'Testing',
            route: 'test',
            region: region
        };

        options.collection.add(new Backbone.EntityModel({id: 1, name: 'testing'}));
        entityService = new Marionette.EntityService(options);
    });

    afterEach(() => {
        entityService.destroy();
    });

    it('executes function when form region is not an object for edit', function () {
        entityService.region.show(entityService.entityLayoutView());
        entityService.formRegion = function () {
        };

        spyOn(entityService, 'formRegion').and.returnValue(new Marionette.Region({el: '#test-region'}));
        entityService.edit(1);
        expect(entityService.formRegion).toHaveBeenCalled();
    });

    it('executes function when form region is not an object for create', function () {
        entityService.region.show(entityService.entityLayoutView());
        entityService.formRegion = function () {
        };

        spyOn(entityService, 'formRegion').and.returnValue(new Marionette.Region({el: '#test-region'}));
        entityService.create();
        expect(entityService.formRegion).toHaveBeenCalled();
    });

    it('defaults to have routing', function () {
        expect(entityService.routing).toEqual(true);
    });

    it('has channel', function () {
        expect(entityService.getChannel()).toEqual(Backbone.Radio.channel(options.route));
    });

    it('getType makes call to getAll', function () {
        entityService.region.show(entityService.entityLayoutView());
        spyOn(entityService, 'getAll');

        entityService.getType(1);
        expect(entityService.getAll).toHaveBeenCalled();
    });

    it('changes hash on route', function () {
        entityService.region.show(entityService.entityLayoutView());

        var $subNavBtn = entityService.entityLayoutView().$el.find('.navbar button:first-child');
        $subNavBtn.trigger('click');

        expect(location.hash).toEqual('#' + options.route + '/1/');
    });
});