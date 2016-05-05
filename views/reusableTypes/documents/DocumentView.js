define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'views/reusableTypes/ReusableTypeLayoutView',
    'views/reusableTypes/autoComplete/AutoCompleteLayoutView',
    'app',
    'text!templates/reusableTypes/documents/documentTemplate.html',
    'views/reusableTypes/singleLineText/SingleLineTextView',
    'views/reusableTypes/wyswig/WyswigView',
    'views/reusableTypes/image/ImageFieldView',
    'views/reusableTypes/dateTimePicker/DateTimePickerView',
    'moment',
    'util/timeoutUtil',
    'util/uriUtil',
    'text!templates/entryItems/fieldWrapperTemplate.html',
    'views/reusableTypes/multiSelectLists/MultiSelectLayoutView',
    'event.aggregator',
    'formview'
], function ($, _, Backbone, Marionette, ReusableTypeLayoutView, AutoCompleteLayoutView, App, documentTemplate, SingleLineTextView, WyswigView, ImageFieldView, DateTimePickerView, moment, timeoutUtil, uriUtil, fieldWrapperTemplate, MultiSelectLayoutView, EventAggregator, FormView) {
    var DocumentView = FormView.extend({
        initialize: function (options) {
            ReusableTypeLayoutView.prototype.initialize.call(this, options);

            this.value = null;
            this.fields = {};
            EventAggregator.on('auto-complete:selected:selectedDocument', _.bind(this.setDocumentType, this));
        },
        template: Marionette.TemplateCache.get(documentTemplate),
        regions: {
            'documentAutoCompleteRegion': '.documentAutoCompleteRegion',
            'documentRegion': '.documentRegion'
        },
        serializeFormData: function () {
            var data = FormView.prototype.serializeFormData.call(this);
            return _.extend(this.value, data);
        },
        onDomRefresh: function () {
            var data = {
                conditions: [
                    {
                        searchType: 'equals',
                        field: 'isDocument',
                        value: 'true'
                    },
                    {
                        searchType: 'equals',
                        field: 'profileIds',
                        value: App.Network.currentProfile,
                        alias: 'Profiles',
                        aliasField: 'Id'
                    }
                ]
            };

            var fields = this.getFields();
            if (!_.isNull(fields) && !_.isUndefined(fields.entryTypeId) && !_.isNull(fields.entryTypeId)) {
                this.showForm();
            }

            App.EntryType.collection.query(true, data)
                .done(_.bind(function (documentTypes) {
                    this.documentAutoCompleteRegion.show(
                        new AutoCompleteLayoutView({
                            collection: documentTypes.child,
                            selectedId: this.value == null ? null : this.value.entryTypeId,
                            dataField: 'selectedDocument'
                        }));
                }, this));
        },
        setDocumentType: function (e) {
            var $target = $(e.target);

            if (_.isNull(this.value) || this.value === '') {
                this.value = {};
            }

            this.value.entryTypeId = $target.data('id');
            this.showForm();
        },
        getEditorAndExtensionType: function (extension) {
            var deferredExtensionType = App.ExtensionType.collection.getById(extension.get('extensionTypeId'), false);
            var deferredEditorType = App.EditorType.collection.getById(extension.get('editorTypeId'), false);

            var deferred = $.when(deferredEditorType, deferredExtensionType);

            return deferred;
        },
        getEntryItemMultiSelect: function (collection, region, dataField, dataMappings, profile) {
            var fields = this.getFields(),
                selectedIds = [],
                conditions = [],
                self = this;

            App.Repository.collection.getById(profile.get('repositoryId'))
                .done(function (repository) {
                    var profileDataMapping =
                        _.find(dataMappings, function (mapping) {
                            return mapping.repositoryTypeId === repository.get('repositoryTypeId');
                        });

                    var entryTypeIds = profileDataMapping.entryTypeIds;

                    var data = {
                        conditions: [{
                            searchType: 'equals',
                            field: 'repositoryId',
                            alias: 'Repository',
                            aliasField: 'Id',
                            value: profile.get('repositoryId')
                        }]
                    };

                    App.Profile.collection.query(true, data)
                        .done(function (profiles) {
                            conditions.push({
                                searchType: 'in',
                                field: 'entryTypeId',
                                alias: 'EntryType',
                                aliasField: 'Id',
                                value: entryTypeIds
                            });

                            conditions.push({
                                searchType: 'in',
                                field: 'profileIds',
                                value: profiles.child.pluck('id'),
                                alias: 'Profiles',
                                aliasField: 'Id'
                            });

                            if (!self.model.isNew()) {
                                conditions.push({
                                    searchType: 'notEquals',
                                    value: self.model.get('id') === null ? 0 : self.model.get('id'),
                                    field: 'id'
                                });
                            }

                            if (fields !== null) {
                                selectedIds = selectedIds.concat(fields[dataField]);
                            }

                            var multiSelect =
                                new MultiSelectLayoutView({
                                    collection: collection,
                                    dataField: dataField,
                                    selectedId: selectedIds,
                                    conditions: conditions,
                                    allowMultipleItems: profileDataMapping.allowMultipleItems
                                });

                            region.show(multiSelect);
                        });

                });
        },
        getFields: function () {
            if (!_.isNull(this.value)) {
                return this.value;
            }

            var fields = this.model.get('value');
            if (!_.isUndefined(fields)) {
                this.value = fields;
            } else {
                this.value = {};
            }

            return this.value;
        },
        showForm: function () {
            var self = this;
            this.extensions = [];

            var conditions = [];
            conditions.push({
                searchType: 'equals',
                field: 'profileIds',
                value: App.Network.currentProfile,
                alias: 'Profiles',
                aliasField: 'Id'
            });

            //2.a get the entry type id
            var entryTypeId = this.value.entryTypeId;

            //4 get the currently set fields if the entry item is not new
            var currentFields = this.getFields();

            var profileDeferred = App.Profile.collection.getById(App.Network.currentProfile),
                entryTypesDeferred = App.EntryType.collection.getParents(entryTypeId, 5, true);

            //5 get entry type along with its parents
            $.when(entryTypesDeferred, profileDeferred)
                .done(function (entryTypes, profile) {

                    //6 get the fields region as jquery object
                    var $fields = $(self.documentRegion.el),
                        placement = {},
                        validations = {};

                    var currentEntryType = entryTypes.get(entryTypeId),
                        placement = JSON.parse(currentEntryType.get('placement')),
                        validations = JSON.parse(currentEntryType.get('validations'));

                    //7.b make sure the extensions are in the correct order
                    placement =
                        _.sortBy(placement, function (item) {
                            return item.placement;
                        });

                    //7.c get the extensions ids (now in correct order)
                    var extensions = _.pluck(placement, 'id');

                    //8 iterate through extensions
                    for (var i = 0; i <= extensions.length - 1; i++) {
                        var extensionId = extensions[i];

                        //9.a get the extension
                        App.Extension.collection.getById(extensionId, false)
                            .done(function (extension) {
                                self.extensions.push(extension);

                                //9.b get the datafield as the extension name
                                var dataField = extension.get('fieldName'),
                                    extensionType = App.ExtensionType.collection.get(extension.get('extensionTypeId')),
                                    editorType = App.EditorType.collection.get(extension.get('editorTypeId'));

                                var extensionName = extension.get('name'),
                                    value = currentFields ? currentFields[dataField] : '',
                                    extensionType = extensionType.get('name');

                                //10.c get the field template html
                                var fieldTemplateProperties = {
                                        dataField: dataField,
                                        noOfCols: function () {
                                            switch (extensionType) {
                                                case 'Number':
                                                    return 2;
                                                    break;
                                                case 'Date':
                                                    return 6;
                                                    break;
                                                default :
                                                    return 12;
                                                    break;
                                            }
                                        },
                                        name: extensionName
                                    },
                                    fieldHtml = Marionette.Renderer.render(fieldWrapperTemplate, fieldTemplateProperties);

                                //10.d use the renderedLayouts region manager to add and get regions, append the div
                                $fields.append(fieldHtml);

                                //11.a add the region
                                self.regionManager.addRegion(dataField, '.' + dataField);

                                //11.b get the region
                                var fieldRegion = self.regionManager.get(dataField);

                                var newField = {};
                                newField[dataField] = {
                                    el: fieldRegion.el
                                };

                                newField[dataField].validations = {};

                                var extValidations = _.find(validations, function (validation) {
                                    return validation.id === extension.get('id');
                                });

                                if (!_.isUndefined(extValidations)) {
                                    _.each(extValidations.validations, function (validation) {
                                        if (validation.key === 'required') {
                                            newField[dataField][validation.key] = validation.message;
                                        } else {
                                            newField[dataField].validations[validation.key] = validation.message;
                                        }
                                    });
                                }

                                var model = new Backbone.Model({
                                    name: extensionName,
                                    dataField: dataField,
                                    value: value
                                });

                                switch (editorType.get('name')) {
                                    case 'Single Line':
                                        if (extensionType === 'Date') {
                                            fieldRegion.show(new DateTimePickerView({
                                                model: model,
                                                dataField: dataField
                                            }));
                                        } else {
                                            fieldRegion.show(new SingleLineTextView({
                                                model: model,
                                                dataField: dataField
                                            }));
                                        }
                                        break;
                                    case 'Text Area':
                                        self.getTextAreaForRegion(model, fieldRegion, dataField);
                                        break;
                                    case 'Wyswig':
                                        fieldRegion.show(new WyswigView({model: model, dataField: dataField}));
                                        break;
                                    case 'File' :
                                        if (extensionType === "Image") {
                                            fieldRegion.show(new ImageFieldView({
                                                model: model,
                                                dataField: dataField
                                            }));
                                        }
                                        break;
                                    case 'Content Picker':
                                        var dataMappings = JSON.parse(extension.get('dataMappings'));
                                        self.getEntryItemMultiSelect(App.EntryItem.collection, fieldRegion, dataField, dataMappings, profile);
                                        break;
                                }

                                //extend the field region to pass in validation and the element for data capture
                                self.fields = _.extend(newField, self.fields);
                            });
                    }
                });
        }
    });

    return DocumentView;
});