var MultiSelectOptionView;
(function ($, _, Backbone, Marionette, EntityListItemView, multiSelectLiTemplate) {
    MultiSelectOptionView = EntityListItemView.extend({
        tagName: 'li',
        className: 'col-sm-12 multi-select-option nopadding',
        fieldsTemplate: multiSelectLiTemplate,
        onRender: function () {
            EntityListItemView.prototype.onRender.call(this);
            this.$el.attr('data-id', this.model.get('id'));
        }
    });

})(jQuery, _, Backbone, Marionette, EntityListItemView, this['Templates']['multiSelectLiTemplate']);
