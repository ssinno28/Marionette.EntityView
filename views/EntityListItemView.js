var EntityListItemView;
(function ($, _, Backbone, Marionette, entityListItemTemplate, DeleteWarnBehavior) {
    EntityListItemView = Marionette.EntityListItemView = Backbone.Marionette.View.extend({
        regions: {
            fieldsRegion: {
                el: '.fieldsRegion',
                replaceElement: true
            }
        },
        className: 'row entity-list-item',
        template: entityListItemTemplate,
        initialize: function (options) {
            _.extend(this, options);

            this._channel = Backbone.Radio.channel(this.route);
        },
        ui: {
            $delete: '.delete',
            $edit: '.edit',
            $multiAction: '.multi-action',
            $actions: '.actions'
        },
        onDomRefresh: function () {
            if (this.options.baseClassIds.indexOf(this.model.get('id')) > -1) {
                this.ui.$delete.addClass('not-active');
                this.ui.$edit.addClass('not-active');
                this.ui.$multiAction.addClass('not-active');
            }
        },
        onRender: function (entityTemplate) {
            if (!_.isUndefined(entityTemplate)) {
                var fieldsView =
                    Backbone.Marionette.View.extend(
                        {
                            template: entityTemplate,
                            model: this.model,
                            onRender: function () {
                                // Get rid of that pesky wrapping-div.
                                // Assumes 1 child element present in template.
                                this.$el = this.$el.children();
                                // Unwrap the element to prevent infinitely
                                // nesting elements during re-render.
                                this.$el.unwrap();
                                this.setElement(this.$el);
                            }
                        });

                this.showChildView('fieldsRegion', new fieldsView());
                this.bindUIElements();
            }

            if (this.baseClassIds.indexOf(this.model.get('id')) === -1) {
                this.$el.attr('data-index', this.collection.indexOf(this.model));
                this.$el.attr('data-id', this.model.get('id'));
            }
        },
        templateContext: function () {
            var route = this.route;

            var allowEdit = this.allowableOperations.indexOf('edit') > -1;
            var allowDelete = this.allowableOperations.indexOf('delete') > -1;
            var allowDeleteAll = this.allowableOperations.indexOf('delete-all') > -1;
            var allowPublishAll = this.allowableOperations.indexOf('clone-all') > -1;
            var allowAddAll = this.allowableOperations.indexOf('add-all') > -1;
            var allowViewLive = this.allowableOperations.indexOf('view-live') > -1;

            return {
                route: route,
                allowEdit: allowEdit,
                allowDelete: allowDelete,
                allowDeleteAll: allowDeleteAll,
                allowPublishAll: allowPublishAll,
                allowAddAll: allowAddAll,
                allowViewLive: allowViewLive
            };
        },
        appendAction: function (action, icon) {
            this.ui.$actions.append('<li>' +
                '<a class="live" href="#' + this.route + '/' + action + '/' + this.model.get('id') + '/">' +
                '<i data-id="' + this.model.get('id') + '" class="' + icon + ' size-21"></i> ' +
                '</a> ' +
                '</li>');
        },
        behaviors: {
            ConfirmModal: {
                behaviorClass: DeleteWarnBehavior,
                message: "Are you sure you want to delete this item?",
                yesFunc: function (e) {
                    this.view._channel.trigger('delete', this.view.model.get('id'));
                },
                noFunc: function (e) {
                }
            }
        },
        getChannel: function () {
            return this._channel;
        }
    });

})(jQuery, _, Backbone, Marionette, this['Templates']['entityListItemTemplate'], DeleteWarnBehavior);
