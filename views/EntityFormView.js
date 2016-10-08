var EntityFormView;
(function ($, _, Backbone, Marionette, entityFormLayoutTemplate, MultiSelectLayoutView, DropDownListView, AutoCompleteLayoutView, EventAggregator, MessageBehavior, RadioButtonListView, TextAreaView, CheckBoxView) {
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

            this.getDropDownForRegion = _.bind(this.dropDownForRegion, this);
            this.getRadioBtnsForRegion = _.bind(this.radioButtonListForRegion, this);
            this.getAutoCompleteForRegion = _.bind(this.autoCompleteForRegion, this);
            this.getMultiSelectForRegion = _.bind(this.multiSelectForRegion, this);
            this.getTextAreaForRegion = _.bind(this.textAreaForRegion, this);
            this.getCheckboxForRegion = _.bind(this.checkboxForRegion, this);

            this.original = this.model.toJSON();
        },
        onDomRefresh: function () {
            EventAggregator.trigger('form.view.activated.' + this.options.parentViewCid);
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
                btnClass: self.options.btnClass
            };
        },
        renderForm: function (template) {
            var formView = Backbone.Marionette.View.extend({
                template: template,
                model: this.model
            });

            this.showChildView('entityFormRegion', new formView());
            this.bindUIElements();
        },
        events: {
            'click .reset': 'resetForm'
        },
        resetForm: function (e) {
            e.preventDefault();
            this.render();
        },
        showWarningModal: function (message, yesFunc, noFunc) {
            var $warningModal = $('.warningModal');

            //update the message
            $warningModal.find('.message').html(message);

            //show modal
            $warningModal.modal('show');

            if (_.isUndefined(noFunc) || _.isUndefined(yesFunc)) {
                $warningModal.find('.buttons').hide();
            }

            $warningModal.on('click', '.no', function (e) {
                e.preventDefault();

                if (!_.isUndefined(noFunc)) {
                    noFunc();
                }

                $warningModal.modal('hide');
            });

            $warningModal.on('click', '.yes', function (e) {
                e.preventDefault();

                if (!_.isUndefined(yesFunc)) {
                    yesFunc();
                }

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

                        EventAggregator.trigger("Entity.Created." + model.get('id'));
                    } else {
                        self.triggerMethod("ShowMessages", 'success', ['Item successfully saved!']);
                        EventAggregator.trigger("Entity.Updated." + model.get('id'));
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
        dropDownForRegion: function (collection, region, dataField, conditions) {
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
        multiSelectForRegion: function (collection, region, dataField, conditions) {
            var selectedIds = this.model.get(dataField);

            if (!conditions) {
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
        autoCompleteForRegion: function (collection, region, dataField) {
            var selectedId = this.model.get(dataField);

            this.showChildView(region,
                new AutoCompleteLayoutView({
                    collection: collection,
                    dataField: dataField,
                    selectedId: selectedId
                }));
        },
        radioButtonListForRegion: function (collection, region, dataField) {
            var selectedId = this.model.get(dataField);

            this.showChildView(region, new RadioButtonListView({
                collection: collection,
                dataField: dataField,
                selectedId: selectedId
            }));
        },
        textAreaForRegion: function (model, region, dataField) {
            this.showChildView(region, new TextAreaView({
                model: model,
                dataField: dataField
            }));
        },
        checkboxForRegion: function (model, region, dataField) {
            this.showChildView(region, new CheckBoxView({
                model: model,
                dataField: dataField
            }));
        }
    });
})(jQuery, _, Backbone, Marionette, this['FastTrack']['Templates']['./templates/entityFormLayoutTemplate.html'], MultiSelectLayoutView, DropDownListView, AutoCompleteLayoutView, EventAggregator, MessageBehavior, RadioButtonListView, TextAreaView, CheckBoxView);
