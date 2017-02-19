describe('EntityCollection tests', function () {
    var MockCollection = Backbone.EntityCollection.extend({url: '/api/test'}),
        entities = [
            {id: 1, name: 'test', locationId: 1},
            {id: 2, name: 'test 2', locationId: 1},
            {id: 3, name: 'test 3', locationId: 1},
            {id: 4, name: 'test 4', locationId: 1},
            {id: 5, name: 'test 5', locationId: 1},
            {id: 6, name: 'test 6', locationId: 1},
            {id: 7, name: 'test 7', locationId: 1}
        ],
        entities2 = [
            {id: 8, name: 'test 8', locationId: 2},
            {id: 9, name: 'test 9', locationId: 2},
            {id: 10, name: 'test 10', locationId: 2}
        ];

    it('calls setAttributes', function () {
        var collection = new MockCollection();
        spyOn(collection, 'setAttributes');

        collection.addRange(entities);
        expect(collection.setAttributes).toHaveBeenCalled();
    });

    it('sets model urls', function () {
        var collection = new MockCollection();
        collection.addRange(entities);
        expect(collection.first().url).toEqual(collection.url);
    });

    it('gets correct subcollection', function () {
        var collection = new MockCollection(),
            data = {
                conditions: [
                    {
                        searchType: 'equals',
                        field: 'locationId',
                        value: 2
                    }
                ],
                page: 1,
                pageSize: 5
            },
            pageKey = collection._getKeyWithOutPage(data);

        collection.addRange(entities);
        var models = collection.addRange(entities2, data);
        collection._addModelIndexes(pageKey, models, data, 10);

        var result = collection._getSubCollection(data, pageKey);

        expect(result.child.length).toEqual(3);
        expect(App.indexes[pageKey]).toEqual(10);
    });

    it('sets correct starting index for models', function () {
        var collection = new MockCollection(),
            dataPage2 = {
                page: 2,
                pageSize: 5
            },
            page2Key = collection._getKeyWithOutPage(dataPage2),
            dataPage1 = {
                page: 1,
                pageSize: 5
            },
            page1Key = collection._getKeyWithOutPage(dataPage1);

        var entitiesToAdd = entities.concat(entities2),
            models = collection.addRange(entitiesToAdd);

        collection._addModelIndexes(page1Key, models.slice(0,4), dataPage1, 10);
        collection._addModelIndexes(page2Key, models.slice(4,9), dataPage2, 10);

        var result = collection._getSubCollection(dataPage2, page2Key);

        console.log('full collection length: ' + collection.length);
        console.log('child collection length: ' + result.child.length);

        expect(result.child.at(0).indexes[page2Key]).toEqual(5);
        expect(result.child.at(1).indexes[page2Key]).toEqual(6);
        expect(result.child.at(2).indexes[page2Key]).toEqual(7);
    });
});