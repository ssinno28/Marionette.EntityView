var EntityFormView;
(function ($, _, Backbone, Marionette, entityFormLayoutTemplate, MultiSelectLayoutView, DropDownListView, AutoCompleteLayoutView, EventAggregator, MessageBehavior, RadioButtonListView, TextAreaView) {
    EntityFormView = Marionette.EntityFormView = Backbone.Marionette.FormView.extend({
        template: entityFormLayoutTemplate,
        regions: {
            entityFormRegion: '.entityFormRegion',
            'messagesRegion': '.messagesRegion'
        },
        initialize: function (options) {
            _.extend(this, options.formOptions);

            this.model.setUrl(this.collection.getUrl());

            this.getDropDownForRegion = _.bind(this.dropDownForRegion, this);
            this.getRadioBtnsForRegion = _.bind(this.radioButtonListForRegion, this);
            this.getAutoCompleteForRegion = _.bind(this.autoCompleteForRegion, this);
            this.getMultiSelectForRegion = _.bind(this.multiSelectForRegion, this);
            this.getTextAreaForRegion = _.bind(this.textAreaForRegion, this);
        },
        onShow: function () {
            EventAggregator.trigger('form.view.activated.' + this.options.parentViewCid);
        },
        behaviors: {
            Messages: {
                behaviorClass: MessageBehavior
            }
        },
        ui: {
            '$actions': '.actions'
        },
        templateHelpers: function () {
            var self = this;
            return {
                btnClass: self.options.btnClass
            };
        },
        renderForm: function (template) {
            var formView = Backbone.Marionette.ItemView.extend({
                template: template,
                model: this.model
            });

            this.entityFormRegion.show(new formView());
            this.bindUIElements();
        },
        events: {
            'click .reset': 'resetForm'
        },
        resetForm: function (e) {
            e.preventDefault();
            this.model.store();
            this.render();
        },
        showWarningModal: function (message, yesFunc, noFunc) {
            var $warningModal = $('.warningModal');

            //update the message
            $warningModal.find('.message').html(message);

            //show modal
            $warningModal.foundation('reveal', 'open');

            if (_.isUndefined(noFunc) || _.isUndefined(yesFunc)) {
                $warningModal.find('.buttons').hide();
            }

            $warningModal.on('click', '.no', function (e) {
                e.preventDefault();

                if (!_.isUndefined(noFunc)) {
                    noFunc();
                }

                $warningModal.foundation('reveal', 'close');
            });

            $warningModal.on('click', '.yes', function (e) {
                e.preventDefault();

                if (!_.isUndefined(yesFunc)) {
                    yesFunc();
                }

                $warningModal.foundation('reveal', 'close');
            });
        },
        onSubmitFail: function (errors) {
            console.log("FAIL");
            console.log(errors);

            var $errors = $('.error');
            $errors.remove();

            for (var errorObject in errors) {
                var field = errors[errorObject].el;
                var $selector = $(field);
                for (var i = 0; i < errors[errorObject].error.length; i++) {
                    $selector.after('<small class="error">' + errors[errorObject].error[i] + '</small>');
                }
            }
        },
        onSubmit: function (evt) {
            evt.preventDefault();

            var $errors = $('.error');
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
                    continue
                }

                this.model.set(key, data[key]);
            }
        },
        saveModel: function () {
            var self = this;
            this.model.store();

            this.model.save(null, {
                success: function (model, response) {
                    if (model.isNew()) {
                        //check to see if something went wrong server side
                        if (parseInt(response) === 0) {
                            self.collection.remove(model);
                            self.triggerMethod("ShowMessages", 'error', ['Could not create item!']);
                            return;
                        }

                        model.set({id: response});
                        self.collection.add(model);
                        self.triggerMethod("ShowMessages", 'success', ['Item successfully created!']);

                        EventAggregator.trigger("Entity.Created." + model.get('id'));
                    } else {
                        self.triggerMethod("ShowMessages", 'success', ['Item successfully saved!']);
                        EventAggregator.trigger("Entity.Updated." + model.get('id'));
                    }
                },
                error: function (model, response) {
                    if (model.isNew()) {
                        self.collection.remove(self.model.cid);
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

                region.show(new DropDownListView({
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

            region.show(multiSelect);
        },
        autoCompleteForRegion: function (collection, region, dataField) {
            var selectedId = this.model.get(dataField);

            region.show(
                new AutoCompleteLayoutView({
                    collection: collection,
                    dataField: dataField,
                    selectedId: selectedId
                }));
        },
        radioButtonListForRegion: function (collection, region, dataField) {
            var selectedId = this.model.get(dataField);

            region.show(new RadioButtonListView({
                collection: collection,
                dataField: dataField,
                selectedId: selectedId
            }));
        },
        textAreaForRegion: function (model, region, dataField) {
            region.show(new TextAreaView({
                model: model,
                dataField: dataField
            }));
        }
    });
})(jQuery, _, Backbone, Marionette, this['FastTrack']['Templates']['./templates/entityFormLayoutTemplate.html'], MultiSelectLayoutView, DropDownListView, AutoCompleteLayoutView, EventAggregator, MessageBehavior, RadioButtonListView, TextAreaView);
