var AutoCompleteView;
(function ($, _, Backbone, Marionette, ReusableTypeListView, liAutoCompleteTemplate) {
    AutoCompleteView = Marionette.View.extend({
        tagName: 'li',
        template: liAutoCompleteTemplate
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeListView, this['EntityView']['Templates']['./templates/reusableTypes/autoComplete/liAutoCompleteTemplate.html']);
