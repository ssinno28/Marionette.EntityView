var EntityLayoutModel;
(function (_, Backbone, Marionette) {
    EntityLayoutModel = Backbone.Model.extend({
        defaults: {
            title: '',
            listView: new Backbone.Marionette.CollectionView(),
            route: '',
            additionalParams: ''
        }
    });
})(_, Backbone, Marionette);