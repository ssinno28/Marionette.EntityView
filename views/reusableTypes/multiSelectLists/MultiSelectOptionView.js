var MultiSelectOptionView;
(function (_, Backbone, Marionette, EntityListItemView, multiSelectLiTemplate) {
    MultiSelectOptionView = EntityListItemView.extend({
        tagName: 'li',
        className: 'col-sm-12 multi-select-option nopadding',
        fieldsTemplate: multiSelectLiTemplate,
        onRender: function () {
            this.$el.attr('data-id', this.model.get('id'));
        },
        templateContext: function () {
            var context = EntityListItemView.prototype.templateContext.call(this);
            return _.extend(context, {
                displayField: this.model.get(this.displayField)
            });
        }
    });

})(_, Backbone, Marionette, EntityListItemView, this['Templates']['multiSelectLiTemplate']);
