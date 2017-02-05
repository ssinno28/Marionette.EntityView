describe('Entity Service', function () {
    var App = new Marionette.Application(),
        MockEntityCollection = Backbone.EntityCollection.extend({});

    var options = {
        collection: new MockEntityCollection(),
        model: Backbone.Model,
        formView: Marionette.EntityFormView,
        listView: Marionette.EntityListView,
        title: 'Extension Types',
        route: 'extension-type',
        region: new Backbone.Marionette.Region({el: document.createElement('div')})
    };

    var entityService = new Marionette.EntityService(options);

    it('has routing', function () {
        expect(entityService.routing).toEqual(true);
    });

    it('has channel', function () {
        expect(entityService.getChannel()).toEqual(Backbone.Radio.channel(options.route));
    });

    it('calls ')
});