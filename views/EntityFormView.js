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

            if (!this.model.isNew()) {
                this.original = this.model.toJSON();
            }

            this._channel = Backbone.Radio.channel(this.getOption('channelName'));

            this.on('render', this.runRenderers, this);
            this.on('dom:refresh', this.runFormInitializers, this);

            if (_.isUndefined(this.events)) {
                this.events = {};
            }

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
            '$spinner': '.spinner',
            '$header': 'entity-form-header'
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
            this.renderHeader();
            this.bindUIElements();
        },
        renderHeader: function () {
            if (_.isUndefined(this.header)) {
                return;
            }

            var html = _.template(this.header.template)(this.header.params);
            this.ui.$header.append(html);
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

            var $errors = this.$el.find('.help-block');
            $errors.remove();

            var $formGroups = this.$el.find('.has-error');
            _.each($formGroups, function ($formGroup) {
                $($formGroup).removeClass('has-error');
            });

            for (var errorObject in errors) {
                var $selector = this.$el.find('[data-field=' + errorObject + ']'),
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
        getMessages: function () {
            return {
                created: 'Item successfully created!',
                createdError: 'Could not create item!',
                updated: 'Item successfully saved!',
                updatedError: 'Could not save item!'
            };
        },
        saveModel: function () {
            var self = this;
            var messages = this.getMessages();

            this.model.save(null, {
                headers: this.getHeaders(),
                success: function (model, response) {
                    if (model.isNew()) {
                        //check to see if something went wrong server side
                        if (parseInt(response) === 0) {
                            if (!_.isUndefined(self.collection)) {
                                self.collection.remove(model);
                            }

                            self.triggerMethod("ShowMessages", 'error', [messages.createdError]);
                            return;
                        }

                        model.set({id: response});
                        if (!_.isUndefined(self.collection)) {
                            self.collection.add(model);
                        }

                        self.triggerMethod("ShowMessages", 'success', [messages.created]);
                        self.getChannel().trigger("Entity.Created");
                    } else {
                        self.triggerMethod("ShowMessages", 'success', [messages.updated]);
                        self.getChannel().trigger("Entity.Updated." + model.get('id'));
                    }
                },
                error: function (model, response) {
                    if (model.isNew()) {
                        if (!_.isUndefined(self.collection)) {
                            self.collection.remove(self.model.cid);
                        }

                        self.triggerMethod("ShowMessages", 'error', [messages.createdError]);
                    } else {
                        self.triggerMethod("ShowMessages", 'error', [messages.updatedError]);
                    }

                    console.log(response.responseText);
                }
            });
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
