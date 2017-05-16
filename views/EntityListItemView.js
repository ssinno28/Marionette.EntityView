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
        behaviors: function () {
            var behaviors = {};
            if (this.getOption('sortable')) {
                behaviors.Sortable = {
                    behaviorClass: SortableItemBehavior
                };
            }

            return behaviors;
        },
        ui: {
            $multiAction: '.multi-action',
            $actions: '.actions',
            $listViewActions: '.list-view-actions'
        },
        runInitializers: function () {
            if (this.options.baseClassIds.indexOf(this.model.get('id')) > -1) {
                this.ui.$multiAction.addClass('not-active');
            }
        },
        runRenderers: function () {
            this.renderFieldsView();
            this.renderActions();

            this.bindUIElements();
            if (this.baseClassIds.indexOf(this.model.get('id')) === -1) {
                this.$el.attr('data-index', this.collection.indexOf(this.model));
                this.$el.attr('data-id', this.model.get('id'));
            }
        },
        renderFieldsView: function () {
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
        },
        renderActions: function () {
            this.action('edit')
                .text('Edit')
                .callBack(this.editClick)
                .add();

            this.action('delete', true)
                .text('Delete')
                .withModal('deleteItemModal')
                .add();
        },
        templateContext: function () {
            var route = this.route;

            return {
                route: route,
                embedded: this.getOption('embedded')
            };
        },
        editClick: function (e) {
            e.preventDefault();
            e.stopPropagation();

            var id = this.model.get('id');
            if (this.getOption('routing')) {
                location.hash = this.route + '/edit/' + id + '/';
            } else {
                this._channel.trigger('edit', id);
            }
        },
        action: function (name) {
            var options = {},
                returnObj = {};

            options.name = name;
            options.withModal = false;
            options.safeName = this._formatRegionName(options.name);
            options.embedded = this.getOption('embedded');
            options.id = this.model.get('id');

            var text = function (text) {
                options.text = text;
                return returnObj;
            };

            var className = function (className) {
                options.className = className;
                return returnObj;
            };

            var callBack = function (callBack) {
                options.callBack = callBack;
                return returnObj;
            };

            var template = function (template) {
                options.template = template;
            };

            var withModal = _.bind(function (modalName) {
                options.modalSafeName = this._formatRegionName(modalName);
                options.withModal = true;
                options.template = _.template('<li>' +
                    '<a data-toggle="modal" data-target="#<%= modalSafeName %>" class="<%= safeName %>"' +
                    'data-id="<%= id %>" href="#">' +
                    '<%= text %>' +
                    '</a>' +
                    '</li>');

                return returnObj;
            }, this);

            var add = _.bind(function (forceShow) {
                if (this.allowableOperations.indexOf(options.safeName) === -1 && !forceShow) {
                    return;
                }

                var template = null;
                if (!_.isUndefined(options.template)) {
                    template = options.template;
                } else {
                    template = _.template('<li>' +
                        '<a class="<%= safeName %>" data-id="<%= id %>" href="#">' +
                        '<%= text %>' +
                        '</a>' +
                        '</li>');
                }

                var html = Marionette.Renderer.render(template, options);
                this.ui.$actions.append(html);

                if (!_.isUndefined(options.callBack) && !options.withModal) {
                    var $el = this.ui.$actions.find('.' + options.safeName);
                    $el.on('click', _.bind(function (e) {
                        _.bind(options.callBack, this)(e)
                    }, this));
                    this.on('destroy', function () {
                        $el.off('click');
                    });
                }
            }, this);

            returnObj = _.extend(returnObj, {
                text: text,
                className: className,
                callBack: callBack,
                template: template,
                withModal: withModal,
                add: add
            });

            return returnObj;
        },
        getChannel: function () {
            return this._channel;
        }
    });

})(jQuery, _, Backbone, Marionette, this['Templates']['entityListItemTemplate'], SortableItemBehavior);
