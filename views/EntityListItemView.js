var EntityListItemView;
(function ($, _, Backbone, Marionette, entityListItemTpl, SortableItemBehavior) {
    EntityListItemView = Marionette.EntityListItemView = Backbone.Marionette.View.extend({
        regions: {
            fieldsRegion: {
                el: '.fieldsRegion',
                replaceElement: true
            }
        },
        className: 'list-group-item',
        template: entityListItemTpl,
        constructor: function (options) {
            _.extend(this, options);
            Marionette.View.prototype.constructor.apply(this, arguments);

            this._channel = Backbone.Radio.channel(this.route);

            this.on('render', this.runRenderers, this);
            this.on('dom:refresh', this.runInitializers, this);
        },
        behaviors: function(){
            var behaviors = {};
          if(this.getOption('sortable'))
          {
              behaviors.Sortable = {
                  behaviorClass: SortableItemBehavior
              };
          }           
            
            return behaviors;
        },
        ui: {
            $edit: '.edit',
            $multiAction: '.multi-action',
            $actions: '.actions',
            $delete: '.delete-item-modal-show'
        },
        runInitializers: function () {
            if (this.options.baseClassIds.indexOf(this.model.get('id')) > -1) {
                this.ui.$delete.addClass('not-active');
                this.ui.$edit.addClass('not-active');
                this.ui.$multiAction.addClass('not-active');
            }
        },
        runRenderers: function () {
                var fieldsView =
                    Marionette.View.extend(
                        {
                            template: _.isUndefined(this.fieldsTemplate) ? _.template('<div class="col-sm-3"><span><%= name %></span></div>') : this.fieldsTemplate,
                            model: this.model,
                            templateContext: _.isFunction(this.templateContext) ? this.templateContext() : this.templateContext,
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

            if (this.baseClassIds.indexOf(this.model.get('id')) === -1) {
                this.$el.attr('data-index', this.collection.indexOf(this.model));
                this.$el.attr('data-id', this.model.get('id'));
            }
        },
        templateContext: function () {
            var route = this.route;

            var allowEdit = this.allowableOperations.indexOf('edit') > -1,
                allowDelete = this.allowableOperations.indexOf('delete') > -1,
                allowDeleteAll = this.allowableOperations.indexOf('delete-all') > -1,
                allowPublishAll = this.allowableOperations.indexOf('clone-all') > -1,
                allowAddAll = this.allowableOperations.indexOf('add-all') > -1,
                allowViewLive = this.allowableOperations.indexOf('view-live') > -1;

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
        getChannel: function () {
            return this._channel;
        }
    });

})(jQuery, _, Backbone, Marionette, this['Templates']['entityListItemTemplate'], SortableItemBehavior);
