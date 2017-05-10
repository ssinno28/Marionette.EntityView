
describe('Entity Forms Validation', function () {
    var options = {
        collection: new MockEntityCollection(),
        model: Backbone.Model,
        formView: Marionette.EntityFormView,
        listView: MockListView,
        title: 'Testing',
        route: 'test',
        region: region
    };

    options.collection.add(new Backbone.Model({id: 1, name: 'testing'}));
    var entityService = new Marionette.EntityService(options);

    it('defaults to have routing', function () {
        expect(entityService.routing).toEqual(true);
    });
});
