var AutoCompleteView;
(function ($, _, Backbone, Marionette, ReusableTypeListView, liAutoCompleteTemplate) {
    AutoCompleteView = Marionette.ItemView.extend({
        tagName: 'li',
        template: Marionette.TemplateCache.get(liAutoCompleteTemplate)
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeListView, this['FastTrack']['Templates']['./templates/reusableTypes/autoComplete/liAutoCompleteTemplate.html']);