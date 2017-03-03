var EntityFormView;
(function ($, _, Backbone, Marionette, entityFormLayoutTemplate, MultiSelectLayoutView, DropDownListView, AutoCompleteLayoutView, MessageBehavior, RadioButtonListView, TextAreaView, CheckBoxView, WyswigView, ImageFieldView, DateTimePickerView) {
    EntityFormView = Marionette.EntityFormView = Backbone.Marionette.FormView.extend({
        template: entityFormLayoutTemplate,
        regions: {
            entityFormRegion: '.entityFormRegion',
            'messagesRegion': '.messagesRegion'
        },
        initialize: function (options) {
            _.extend(this, options.formOptions);

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
            this.getDatePickerForRegion = _.bind(this._dateTimePickerForRegion, this);

            if (!this.model.isNew()) {
                this.original = this.model.toJSON();
            }

            this._channel = Backbone.Radio.channel(this.getOption('channelName'));
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
            var self = this;
            return {
                btnClass: self.options.btnClass,
                isNew: this.model.isNew()
            };
        },
        events: {
            'click .reset': 'resetForm'
        },
        onDomRefresh: function () {
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
        onRender: function () {
            if (_.isUndefined(this.formTemplate)) {
                throw new Error("The formTemplate property is undefined!");
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
        showWarningModal: function (message, eventName) {
            var $warningModal = $('.warningModal'),
                self = this;

            //update the message
            $warningModal.find('.message').html(message);

            //show modal
            $warningModal.modal('show');

            if (_.isUndefined(eventName)) {
                $warningModal.find('.buttons').hide();
            }

            $warningModal.on('click', '.no', function (e) {
                e.preventDefault();

                self._channel.trigger('warning-modal:no:' + eventName);
                $warningModal.modal('hide');
            });

            $warningModal.on('click', '.yes', function (e) {
                e.preventDefault();
                
                self._channel.trigger('warning-modal:yes:' + eventName);
                $warningModal.modal('hide');
            });
        },
        onSubmitFail: function (errors) {
            console.log("FAIL");
            console.log(errors);

            var $errors = $('.error');
            $errors.remove();

            for (var errorObject in errors) {
                var field = errors[errorObject].el,
                    $selector = $(field),
                    $formGroup = $selector.closest('.form-group');

                $formGroup.addClass('has-error');

                for (var i = 0; i < errors[errorObject].error.length; i++) {
                    $selector.after('<span class="help-block">' + errors[errorObject].error[i] + '</span>');
                }
            }
        },
        onSubmit: function (evt) {
            evt.preventDefault();

            var $errors = $('.help-block');
            $errors.remove();

            _.each($errors, function ($error) {
                var $formGroup = $error.closest('.form-group');
                $formGroup.removeClass('has-error');
            });

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
                        self.onCreated();
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
        onCreated: function () {
        },
        getSubServiceRoute: function (name) {
            return location.hash.substring(1, location.hash.length) + name;
        },
        _wyswigForRegion: function (model, region, dataField) {
            this.showChildView(region, new WyswigView({
                model: model,
                dataField: dataField
            }));
        },
        _dropDownForRegion: function (collection, region, dataField, conditions) {
            var viewContext = this;
            if (!conditions) {
                conditions = [];
            }

            var data = {
                conditions: conditions
            };

            collection.query(false, data).done(function (entities) {
                var currentlySetId = viewContext.model.get(dataField);

                if (_.isUndefined(currentlySetId) || _.isNull(currentlySetId) || currentlySetId === '' || currentlySetId === 0) {
                    entities.add(new Backbone.Model({name: 'Select', id: ''}), {at: 0});
                    currentlySetId = '';
                }

                viewContext.showChildView(region, new DropDownListView({
                    collection: entities,
                    dataField: dataField,
                    selectedId: currentlySetId
                }));
            });
        },
        _multiSelectForRegion: function (collection, region, dataField, conditions) {
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
                    conditions: conditions
                });

            this.showChildView(region, multiSelect);
        },
        _autoCompleteForRegion: function (collection, region, dataField) {
            var selectedId = this.model.get(dataField);

            this.showChildView(region,
                new AutoCompleteLayoutView({
                    collection: collection,
                    dataField: dataField,
                    selectedId: selectedId
                }));
        },
        _radioButtonListForRegion: function (collection, region, dataField) {
            var selectedId = this.model.get(dataField);

            this.showChildView(region, new RadioButtonListView({
                collection: collection,
                dataField: dataField,
                selectedId: selectedId
            }));
        },
        _textAreaForRegion: function (model, region, dataField) {
            this.showChildView(region, new TextAreaView({
                model: model,
                dataField: dataField
            }));
        },
        _checkboxForRegion: function (model, region, dataField) {
            this.showChildView(region, new CheckBoxView({
                model: model,
                dataField: dataField
            }));
        },
        _imagePickerForRegion: function (model, region, dataField) {
            this.showChildView(region, new ImageFieldView({
                model: model,
                dataField: dataField
            }));
        },
        _dateTimePickerForRegion: function (model, region, dataField, dateType) {
            this.showChildView(region, new DateTimePickerView({
                model: model,
                dataField: dataField,
                dateType: dateType
            }));
        }
    });
})(jQuery, _, Backbone, Marionette, this['Templates']['entityFormLayoutTemplate'], MultiSelectLayoutView, DropDownListView, AutoCompleteLayoutView, MessageBehavior, RadioButtonListView, TextAreaView, CheckBoxView, WyswigView, ImageFieldView, DateTimePickerView);
