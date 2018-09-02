describe('Entity Service with Routing', function () {
    var entityService,
        options;

    beforeAll(function () {
        options = {
            collection: new MockEntityCollection(),
            model: Backbone.Model,
            formView: Marionette.EntityFormView,
            listView: MockListView,
            title: 'Testing',
            route: 'test',
            region: region
        };

        options.collection.add(new Backbone.Model({id: 1, name: 'testing'}));
        entityService = new Marionette.EntityService(options);
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

        var $subNavBtn = entityService.entityLayoutView().$el.find('.sub-nav button:first-child');
        $subNavBtn.trigger('click');

        expect(location.hash).toEqual('#' + options.route + '/1/');
    });
});