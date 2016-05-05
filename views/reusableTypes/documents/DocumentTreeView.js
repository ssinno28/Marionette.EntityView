define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'views/reusableTypes/ReusableTypeLayoutView',
    'text!templates/reusableTypes/documents/documentTreeTemplate.html',
    'app',
    'services/treeService',
    'event.aggregator'
], function ($, _, Backbone, Marionette, ReusableTypeLayoutView, documentTreeTemplate, App, treeService, EventAggregator) {
    var DocumentTreeView = ReusableTypeLayoutView.extend({
        initialize: function (options) {
            var parentId = this.model.get('parentId');

            if (_.isUndefined(parentId)) {
                throw new Error("The document tree needs a parent id to be passed into it.");
            }

            this.entryItemRoute = 'entry-item-tree';

            EventAggregator.on(this.entryItemRoute + '.addAll',
                _.bind(function (models) {
                    var selectedNode =
                        this.ui.$treeView.tree('getSelectedNode');

                    _.each(models, _.bind(function (model) {
                        var node = {
                            label: model.get('name'),
                            id: model.get('id'),
                            fields: JSON.parse(model.get('fields')),
                            children: []
                        };

                        if (selectedNode == false) {
                            this.ui.$treeView.tree('appendNode', node);
                        } else {
                            this.ui.$treeView.tree('addNodeAfter', node, selectedNode);
                        }

                    }, this));
                }, this));

            ReusableTypeLayoutView.prototype.initialize.call(this, options);
        },
        template: Marionette.TemplateCache.get(documentTreeTemplate),
        regions: {
            'multiPickerRegion': '.multiPickerRegion'
        },
        ui: {
            '$treeView': '.treeview',
            '$treeActions': '.tree-actions'
        },
        events: {
            'click .removeSelected': 'removeSelected'
        },
        onShow: function () {
            var self = this;
            require(['jquery.tree'], function () {
                self.renderTree();
            });
        },
        onDomRefresh: function () {
            this.getEntryItemMultiSelect();
        },
        removeSelected: function (e) {
            e.preventDefault();

            if (!_.isUndefined(this.node) && !_.isNull(this.node)) {
                this.ui.$treeView.tree('removeNode', this.node);
                this.ui.$treeActions.hide();
            }
        },
        renderTree: function () {
            var data = [],
                value = this.model.get('value');

            if (!_.isUndefined(value) && !_.isNull(value) && value !== '') {
                data = value;
            }

            this.ui.$treeView.tree({
                data: data,
                autoOpen: true,
                dragAndDrop: true
            });

            this.ui.$treeView.bind('tree.select', _.bind(this.nodeSelected, this));
        },
        nodeSelected: function (e) {
            if (e.node) {
                // node was selected
                this.node = e.node;
                this.ui.$treeActions.show();
            }
            else {
                this.node = null;
                this.ui.$treeActions.hide();
            }
        },
        getEntryItemMultiSelect: function () {
            var self = this,
                conditions = [];

            App.Repository.collection.getById(this.profile.get('repositoryId'))
                .done(function (repository) {
                    var profileDataMapping =
                        _.find(self.dataMappings, function (mapping) {
                            return mapping.repositoryTypeId === repository.get('repositoryTypeId');
                        });

                    var entryTypeIds = profileDataMapping.entryTypeIds;

                    var data = {
                        conditions: [{
                            searchType: 'equals',
                            field: 'repositoryId',
                            alias: 'Repository',
                            aliasField: 'Id',
                            value: self.profile.get('repositoryId')
                        }]
                    };

                    App.Profile.collection.query(true, data)
                        .done(function (profiles) {

                            if (!_.isUndefined(entryTypeIds)) {
                                conditions.push({
                                    searchType: 'in',
                                    field: 'entryTypeId',
                                    alias: 'EntryType',
                                    aliasField: 'Id',
                                    value: entryTypeIds
                                });
                            }

                            conditions.push({
                                searchType: 'in',
                                field: 'profileIds',
                                value: profiles.child.pluck('id'),
                                alias: 'Profiles',
                                aliasField: 'Id'
                            });

                            if (!_.isNull(self.entryItemId)) {
                                conditions.push({
                                    searchType: 'notEquals',
                                    value: self.entryItemId,
                                    field: 'id'
                                });
                            }

                            var options = {
                                title: 'Choose Entry Items',
                                route: self.entryItemRoute,
                                region: self.multiPickerRegion,
                                routing: false,
                                allowableOperations: ['add-all'],
                                conditions: conditions
                            };

                            var documentTreeService = new treeService();
                            documentTreeService.initialize(options);
                            EventAggregator.trigger(self.entryItemRoute + '.getType', 1);
                        });
                });
        },
        onDestroy: function () {
            EventAggregator.trigger(this.entryItemRoute + '.destroy');
        }
    });

    return DocumentTreeView;
});