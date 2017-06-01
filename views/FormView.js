var FormView;
(function ($, _, Backbone, Marionette, FormValidator) {
    "use strict";

    FormView = Marionette.FormView = Marionette.View.extend({

        className: "formView col-sm-12",

        rules: {}, //Custom Field Validation Rules

        fields: {},

        constructor: function () {
            Marionette.View.prototype.constructor.apply(this, arguments);

            //Allow Passing In Fields by extending with a fields hash
            if (!this.fields) throw new Error("Fields Must Be Provided");

            if (!this.model) this.model = new Backbone.Model();

            if (this.data) this.model.set(this.data);

            //Attach Events to preexisting elements if we don't have a template
            if (!this.template) this.runInitializers();
            this.on('dom:refresh', this.runInitializers, this);

            this._validator = new FormValidator();
        },

        serializeFormData: function () {
            var data = {}, self = this;

            _(this.fields).each(function (options, field) {
                data[field] = self.fields[field].view.getValue();
            });

            return data;
        },

        beforeFormSubmit: function (e) {
            e.preventDefault();
            var errors = this.validate();
            var success = _.isEmpty(errors);
            if (success) {
                if (_.isFunction(this.onSubmit)) return this.onSubmit.apply(this, [e]);
            } else {
                if (_.isFunction(this.onSubmitFail)) this.onSubmitFail.apply(this, [errors]);
                e.stopImmediatePropagation();
                return false;
            }
        },

        validate: function () {
            var errors = {},
                fields = _(this.fields).keys();

            _(fields).each(function (key) {
                var field = this.fields[key],
                    fieldErrors = null;

                if (_.isUndefined(field.properties)) {
                    fieldErrors = this.validateField(key);
                    if (!_.isEmpty(fieldErrors)) errors[key] = fieldErrors;
                } else {
                    var $docEl = $('[data-field=' + key + ']'),
                        propKeys = _(field.properties).keys();

                    _.each(propKeys, _.bind(function (propKey) {
                        fieldErrors = this.validateProps(field.properties, $docEl, key, propKey);
                        if (!_.isEmpty(fieldErrors)) errors[propKey] = fieldErrors;
                    }, this));
                }
            }, this);

            return errors;
        },

        validateProps: function (properties, $docEl, field, propKey) {
            var fieldErrors = [],
                errors = {};

            var fieldOptions = properties[propKey],
                validations = fieldOptions && fieldOptions.validations ? fieldOptions.validations : {},
                isValid = true;

            var val = fieldOptions.view.getValue();
            if (fieldOptions.required) {
                isValid = this.validateRule(val, 'required');
                var errorMessage = typeof fieldOptions.required === 'string' ? fieldOptions.required : 'This field is required';
                if (!isValid) fieldErrors.push(errorMessage);
            }

            // Don't bother with other validations if failed 'required' already
            if (isValid && validations) {
                _.each(validations, function (errorMsg, validateWith) {
                    isValid = this.validateRule(val, validateWith);
                    if (!isValid) fieldErrors.push(errorMsg);
                }, this);
            }

            if (!_.isEmpty(fieldErrors)) {
                _.extend(errors, {
                    field: field + '.' + propKey,
                    el: this.fields[field].properties[propKey].el,
                    error: fieldErrors
                });
            }

            return errors;
        },

        validateField: function (field) {
            var fieldOptions = this.fields[field],
                validations = fieldOptions && fieldOptions.validations ? fieldOptions.validations : {},
                fieldErrors = [],
                isValid = true;

            var val = fieldOptions.view.getValue();

            if (fieldOptions.required) {
                isValid = this.validateRule(val, 'required');
                var errorMessage = typeof fieldOptions.required === 'string' ? fieldOptions.required : 'This field is required';
                if (!isValid) fieldErrors.push(errorMessage);
            }

            // Don't bother with other validations if failed 'required' already
            if (isValid && validations) {
                _.each(validations, function (errorMsg, validateWith) {
                    isValid = this.validateRule(val, validateWith);
                    if (!isValid) fieldErrors.push(errorMsg);
                }, this);
            }

            if (!_.isEmpty(fieldErrors)) {
                var errorObject = {
                    field: field,
                    el: this.fields[field].el,
                    error: fieldErrors
                };
                return errorObject;
            }
        },

        validateRule: function (val, validationRule) {
            var options;

            // throw an error because it could be tough to troubleshoot if we just return false
            if (!validationRule) throw new Error('Not passed a validation to test');

            if (validationRule === 'required') return this._validator.required.evaluate(val);

            if (validationRule.indexOf(':') !== -1) {
                options = validationRule.split(":");
                validationRule = options.shift();
            }

            if (this.rules && this.rules[validationRule]) {
                return _(this.rules[validationRule].evaluate).bind(this)(val);
            } else {
                return this._validator.validate(validationRule, val, options);
            }
        },

        submit: function () {
            this.form.find('input[type=submit').trigger('click');
        },

        bindFormEvents: function () {
            var form = (this.$el.hasClass('form')) ? this.$el : this.$('.form').first();
            this.form = form;

            var submitBtn = form.find('input[type=submit]');
            submitBtn.on('click', _.bind(function (e) {
                e.stopPropagation();
                _.bind(this.beforeFormSubmit, this)(e);
            }, this));
        },

        runInitializers: function () {
            this.bindFormEvents();
            if (_.isFunction(this.onReady)) this.onReady();
        }
    });

})(jQuery, _, Backbone, Marionette, FormValidator);
