var EntityLayoutModel;
(function ($, _, Backbone, Marionette) {
    EntityLayoutModel = Backbone.Model.extend({
        defaults: {
            title: '',
            listView: new Marionette.CollectionView(),
            route: '',
            additionalParams: ''
        }
    });
})(jQuery, _, Backbone, Marionette);