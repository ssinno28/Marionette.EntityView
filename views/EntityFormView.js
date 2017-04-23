var EntityFormView;
(function ($, _, Backbone, Marionette, entityFormLayoutTemplate, MultiSelectLayoutView, DropDownListView, AutoCompleteLayoutView, MessageBehavior, RadioButtonListView, TextAreaView, CheckBoxView, WyswigView, ImageFieldView, DateTimePickerView, DatePickerView, TimePickerView, SingleLineTextView, CheckboxListView) {
    EntityFormView = Marionette.EntityFormView = Marionette.FormView.extend({
        template: entityFormLayoutTemplate,
        regions: {
            entityFormRegion: '.entity-form-region',
            'messagesRegion': '.messages-region'
        },
        constructor: function (options) {
            _.extend(this, options.formOptions);
            Marionette.FormView.prototype.constructor.apply(this, arguments);

            if (!_.isUndefined(this.collection)) {
                this.model.setUrl(this.collection.getUrl());
            }

            this.getDropDownForRegion = _.bind(this._dropDownForRegion, this);
            this.getRadioBtnsForRegion = _.bind(this._radioButtonListForRegion, this);
            this.getAutoCompleteForRegion = _.bind(this._autoCompleteForRegion, this);
            this.getMultiSelectForRegion = _.bind(this._multiSelectForRegion, this);
            this.getTextAreaForRegion = _.bind(this._textAreaForRegion, this);
            this.getCheckboxForRegion = _.bind(this._checkboxForRegion, this);
            this.getWyswigForRegion = _.bind(this._wyswigForRegion, this);
            this.getImagePickerForRegion = _.bind(this._imagePickerForRegion, this);
            this.getDateTimePickerForRegion = _.bind(this._dateTimePickerForRegion, this);
            this.getTimePickerForRegion = _.bind(this._timePickerForRegion, this);
            this.getDatePickerForRegion = _.bind(this._datePickerForRegion, this);
            this.getCheckboxsForRegion = _.bind(this._checkboxesForRegion, this);

            if (!this.model.isNew()) {
                this.original = this.model.toJSON();
            }

            this._channel = Backbone.Radio.channel(this.getOption('channelName'));

            this.on('render', this.runRenderers, this);
            this.on('dom:refresh', this.runFormInitializers, this);

            this.events['click .reset'] = 'resetForm';
            this.delegateEvents();
        },
        behaviors: {
            Messages: {
                behaviorClass: MessageBehavior
            }
        },
        ui: {
            '$actions': '.actions',
            '$spinner': '.spinner'
        },
        templateContext: function () {
            return {
                btnClass: this.options.btnClass,
                isNew: this.model.isNew()
            };
        },
        runFormInitializers: function () {
            this._channel.trigger('view.form.activated');
            this.checkDisabledFields();
        },
        checkDisabledFields: function () {
            var allDisabled = true;
            for (var key in this.fields) {
                var field = this.fields[key];
                if (_.isUndefined(field.disabled) || !field.disabled) {
                    allDisabled = false;
                    break;
                }
            }

            if (allDisabled) {
                this.ui.$actions.hide();
            }
        },
        runRenderers: function () {
            if (_.isUndefined(this.formTemplate)) {
                return;
            }

            var formView = Backbone.Marionette.View.extend({
                template: this.formTemplate,
                model: this.model
            });

            this.showChildView('entityFormRegion', new formView());
            this.bindUIElements();
        },
        getChannel: function () {
            return this._channel;
        },
        resetForm: function (e) {
            e.preventDefault();
            this.render();
        },
        onSubmitFail: function (errors) {
            console.log("FAIL");
            console.log(errors);

            var $errors = $('.help-block');
            $errors.remove();

            var $formGroups = $('.has-error');
            _.each($formGroups, function ($formGroup) {
                $($formGroup).removeClass('has-error');
            });

            for (var errorObject in errors) {
                var field = errors[errorObject].el,
                    $selector = $(field),
                    $formGroup = $selector.closest('.form-group');

                $formGroup.addClass('has-error');
                for (var i = 0; i < errors[errorObject].error.length; i++) {
                    $formGroup.find('.errors').append('<span class="help-block">' + errors[errorObject].error[i] + '</span>');
                }
            }
        },
        onSubmit: function (evt) {
            evt.preventDefault();

            var $errors = $('.help-block');
            _.each($errors, function ($error) {
                var $formGroup = $($error).closest('.form-group');
                $formGroup.removeClass('has-error');
            });

            $errors.remove();

            this.setModelDefaults();
            this.saveModel();
        },
        setModelDefaults: function () {
            var data = this.serializeFormData();

            //loop through all of the data properties and save them to the model
            for (var key in data) {
                //make sure it doesn't come from the prototype and that
                //we don't overwrite the id.
                if (!data.hasOwnProperty(key) || key === 'id') {
                    continue;
                }

                this.model.set(key, data[key]);
            }
        },
        getHeaders: function () {
            return {};
        },
        saveModel: function () {
            var self = this;
            this.model.save(null, {
                headers: this.getHeaders(),
                success: function (model, response) {
                    if (model.isNew()) {
                        //check to see if something went wrong server side
                        if (parseInt(response) === 0) {
                            if (!_.isUndefined(self.collection)) {
                                self.collection.remove(model);
                            }

                            self.triggerMethod("ShowMessages", 'error', ['Could not create item!']);
                            return;
                        }

                        model.set({id: response});
                        if (!_.isUndefined(self.collection)) {
                            self.collection.add(model);
                        }

                        self.triggerMethod("ShowMessages", 'success', ['Item successfully created!']);
                        self.getChannel().trigger("Entity.Created");
                    } else {
                        self.triggerMethod("ShowMessages", 'success', ['Item successfully saved!']);
                        self.getChannel().trigger("Entity.Updated." + model.get('id'));
                    }
                },
                error: function (model, response) {
                    if (model.isNew()) {
                        if (!_.isUndefined(self.collection)) {
                            self.collection.remove(self.model.cid);
                        }

                        self.triggerMethod("ShowMessages", 'error', ['Could not create item!']);
                    } else {
                        self.triggerMethod("ShowMessages", 'error', ['Could not save item!']);
                    }

                    console.log(response.responseText);
                }
            });
        },
        getSubServiceRoute: function (name) {
            return location.hash.substring(1, location.hash.length) + name;
        },
        _wyswigForRegion: function (region, dataField, isDocProp) {
            this.addRegion(region, {
                el: '.' + this._formatRegionName(region),
                replaceElement: true
            });

            this.showChildView(region, new WyswigView({
                value: this.model.get(dataField),
                dataField: dataField,
                isDocProp: isDocProp
            }));
        },
        _singleLineForRegion: function (region, dataField, isDocProp) {
            this.addRegion(region, {
                el: '.' + this._formatRegionName(region),
                replaceElement: true
            });

            this.showChildView(region, new SingleLineTextView({
                value: this.model.get(dataField),
                dataField: dataField,
                isDocProp: isDocProp
            }));
        },
        _checkboxesForRegion: function (collection, region, dataField, conditions, isDocProp) {
            this.addRegion(region, {
                el: '.' + this._formatRegionName(region),
                replaceElement: true
            });

            var selectedIds = this.model.get(dataField);
            if (!conditions) {
                conditions = [];
            }

            var data = {
                conditions: conditions
            };

            collection.query(false, data).done(_.bind(function (entities) {
                this.showChildView(region, new CheckBoxListView({
                    collection: entities,
                    dataField: dataField,
                    selectedId: selectedIds,
                    isDocProp: isDocProp
                }));
            }, this));
        },
        _dropDownForRegion: function (collection, region, dataField, conditions, isDocProp) {
            this.addRegion(region, {
                el: '.' + this._formatRegionName(region),
                replaceElement: true
            });

            if (!conditions) {
                conditions = [];
            }

            var data = {
                conditions: conditions
            };

            collection.query(false, data).done(_.bind(function (entities) {
                var currentlySetId = this.model.get(dataField);

                if (_.isUndefined(currentlySetId) || _.isNull(currentlySetId) || currentlySetId === '' || currentlySetId === 0) {
                    entities.add(new Backbone.Model({name: 'Select', id: ''}), {at: 0});
                    currentlySetId = '';
                }

                this.showChildView(region, new DropDownListView({
                    collection: entities,
                    dataField: dataField,
                    selectedId: currentlySetId,
                    isDocProp: isDocProp
                }));
            }, this));
        },
        _multiSelectForRegion: function (collection, region, dataField, conditions, displayField, isDocProp) {
            this.addRegion(region, {
                el: '.' + this._formatRegionName(region),
                replaceElement: true
            });

            var selectedIds = this.model.get(dataField);
            if (_.isUndefined(conditions)) {
                conditions = [];
            }

            if (!this.model.isNew() && dataField === 'parentIds') {
                conditions.push({
                    searchType: 'notEquals',
                    value: this.model.get('id') === null ? 0 : this.model.get('id'),
                    field: 'id'
                });
            }

            var multiSelect =
                new MultiSelectLayoutView({
                    collection: collection,
                    dataField: dataField,
                    selectedId: selectedIds,
                    conditions: conditions,
                    displayField: displayField || 'name',
                    isDocProp: isDocProp
                });

            this.showChildView(region, multiSelect);
        },
        _autoCompleteForRegion: function (collection, region, dataField, isDocProp) {
            this.addRegion(region, {
                el: '.' + this._formatRegionName(region),
                replaceElement: true
            });

            var selectedId = this.model.get(dataField);
            this.showChildView(region,
                new AutoCompleteLayoutView({
                    collection: collection,
                    dataField: dataField,
                    selectedId: selectedId,
                    isDocProp: isDocProp
                }));
        },
        _radioButtonListForRegion: function (collection, region, dataField, isDocProp) {
            this.addRegion(region, {
                el: '.' + this._formatRegionName(region),
                replaceElement: true
            });

            var selectedId = this.model.get(dataField);
            this.showChildView(region, new RadioButtonListView({
                collection: collection,
                dataField: dataField,
                selectedId: selectedId,
                isDocProp: isDocProp
            }));
        },
        _textAreaForRegion: function (region, dataField, isDocProp) {
            this.addRegion(region, {
                el: '.' + this._formatRegionName(region),
                replaceElement: true
            });

            this.showChildView(region, new TextAreaView({
                value: this.model.get(dataField),
                dataField: dataField
            }));
        },
        _checkboxForRegion: function (region, dataField, isDocProp) {
            this.addRegion(region, {
                el: '.' + this._formatRegionName(region),
                replaceElement: true
            });

            this.showChildView(region, new CheckBoxView({
                value: this.model.get(dataField),
                dataField: dataField,
                isDocProp: isDocProp
            }));
        },
        _imagePickerForRegion: function (region, dataField, isDocProp) {
            this.addRegion(region, {
                el: '.' + this._formatRegionName(region),
                replaceElement: true
            });

            this.showChildView(region, new ImageFieldView({
                value: this.model.get(dataField),
                dataField: dataField,
                isDocProp: isDocProp
            }));
        },
        _dateTimePickerForRegion: function (region, dataField, dateFormat, isDocProp) {
            this.addRegion(region, {
                el: '.' + this._formatRegionName(region),
                replaceElement: true
            });

            this.showChildView(region, new DateTimePickerView({
                value: this.model.get(dataField),
                dataField: dataField,
                dateFormat: dateFormat,
                isDocProp: isDocProp
            }));
        },
        _timePickerForRegion: function (region, dataField, dateFormat, isDocProp) {
            this.addRegion(region, {
                el: '.' + this._formatRegionName(region),
                replaceElement: true
            });

            this.showChildView(region, new TimePickerView({
                value: this.model.get(dataField),
                dataField: dataField,
                dateFormat: dateFormat,
                isDocProp: isDocProp
            }));
        },
        _datePickerForRegion: function (region, dataField, dateFormat, isDocProp) {
            this.addRegion(region, {
                el: '.' + this._formatRegionName(region),
                replaceElement: true
            });

            this.showChildView(region, new DatePickerView({
                value: this.model.get(dataField),
                dataField: dataField,
                dateFormat: dateFormat,
                isDocProp: isDocProp
            }));
        }
    });
})(jQuery,
    _,
    Backbone,
    Marionette,
    this['Templates']['entityFormLayoutTemplate'],
    MultiSelectLayoutView,
    DropDownListView,
    AutoCompleteLayoutView,
    MessageBehavior,
    RadioButtonListView,
    TextAreaView,
    CheckBoxView,
    WyswigView,
    ImageFieldView,
    DateTimePickerView,
    DatePickerView,
    TimePickerView,
    SingleLineTextView,
    CheckBoxListView);
