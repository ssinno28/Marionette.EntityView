describe('Entity Service', function () {
    var App = new Marionette.Application(),
        MockEntityCollection = Backbone.EntityCollection.extend({
            query: function (track, data, force) {
                return $.Deferred(function(defer){
                    defer.resolve(new Backbone.Collection());
                });
            }
        }),
        html = '<html><body><div id="test-region"></div></body></html>';

    $(document.body ).append(html);

    var options = {
        collection: new MockEntityCollection(),
        model: Backbone.Model,
        formView: Marionette.EntityFormView,
        listView: Marionette.EntityListView,
        title: 'Testing',
        route: 'test',
        region: new Backbone.Marionette.Region({el: '#test-region'})
    };

    var entityService = new Marionette.EntityService(options);

    it('has routing', function () {
        expect(entityService.routing).toEqual(true);
    });

    it('has channel', function () {
        expect(entityService.getChannel()).toEqual(Backbone.Radio.channel(options.route));
    });

    it('calls getAll', function () {
        entityService.region.show(entityService.entityLayoutView(new Backbone.Collection()));
        spyOn(entityService, 'getAll');

        entityService.getType(1);
        expect(entityService.getAll).toHaveBeenCalled();
    });
});