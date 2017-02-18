describe('EntityCollection tests', function () {
    var MockCollection = Backbone.EntityCollection.extend({url: '/api/test'}),
        models = [
            new Backbone.Model({id: 1, name: 'test'}),
            new Backbone.Model({id: 2, name: 'test 2'})
        ];

    it('calls setAttributes', function () {
        var collection = new MockCollection();
        spyOn(collection, 'setAttributes');

        collection.addRange(models);
        expect(collection.setAttributes).toHaveBeenCalled();
    });

    it('sets model urls', function () {
        var collection = new MockCollection();
        collection.addRange(models);
        expect(collection.first().url).toEqual(collection.url);
    });
});