var AutoCompleteView;
(function ($, _, Backbone, Marionette, ReusableTypeListView, liAutoCompleteTemplate) {
    AutoCompleteView = Marionette.ItemView.extend({
        tagName: 'li',
        template: liAutoCompleteTemplate
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeListView, this['FastTrack']['Templates']['./templates/reusableTypes/autoComplete/liAutoCompleteTemplate.html']);