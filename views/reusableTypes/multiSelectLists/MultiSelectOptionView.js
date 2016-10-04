var MultiSelectOptionView;
(function ($, _, Backbone, Marionette, EntityListItemView, multiSelectLiTemplate) {
    MultiSelectOptionView = EntityListItemView.extend({
        tagName: 'li',
        className: 'col-sm-12',
        onRender: function () {
            EntityListItemView.prototype.onRender.call(this, multiSelectLiTemplate);
        }
    });

})(jQuery, _, Backbone, Marionette, EntityListItemView, this['FastTrack']['Templates']['./templates/reusableTypes/multiSelectLists/multiSelectLiTemplate.html']);
