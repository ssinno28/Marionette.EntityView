define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'text!templates/entityListItemTemplate.html',
    'behaviors/modals/DeleteWarnBehavior',
    'event.aggregator'
], function ($, _, Backbone, Marionette, entityListItemTemplate, DeleteWarnBehavior, EventAggregator) {
    var EntityListItemView = Backbone.Marionette.LayoutView.extend({
        regions: {
            fieldsRegion: '.fieldsRegion'
        },
        className: 'row entity-list-item',
        template: entityListItemTemplate,
        initialize: function (options) {
            _.extend(this, options);
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
            if (_.isUndefined(entityTemplate)) {
                throw new Error('There was no template defined for this list item');
            }

            var fieldsView =
                Backbone.Marionette.ItemView.extend(
                    {
                        template: entityTemplate,
                        model: this.model
                    });

            this.fieldsRegion.show(new fieldsView());

            if (this.baseClassIds.indexOf(this.model.get('id')) === -1) {
                this.$el.attr('data-index', this.collection.indexOf(this.model));
                this.$el.attr('data-id', this.model.get('id'));
            }

            this.bindUIElements();
        },
        templateHelpers: function () {
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
                    EventAggregator.trigger(this.view.route + '.delete', this.view.model.get('id'));
                },
                noFunc: function (e) {
                }
            }
        }
    });

    return EntityListItemView;
});