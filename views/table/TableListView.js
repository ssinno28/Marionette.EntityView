var TableListView;
(function ($, _, Backbone, Marionette, EntityListView) {
    TableListView = Marionette.TableListView = EntityListView.extend({
        tagName: 'tbody'
    });
})(jQuery, _, Backbone, Marionette, EntityListView);