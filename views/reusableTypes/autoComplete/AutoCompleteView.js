var AutoCompleteView;
(function ($, _, Backbone, Marionette, ReusableTypeListView, liAutoCompleteTemplate) {
    AutoCompleteView = Marionette.ItemView.extend({
        tagName: 'li',
        template: Marionette.TemplateCache.get(liAutoCompleteTemplate)
    });
})($, _, Backbone, Marionette, ReusableTypeListView, liAutoCompleteTemplate);