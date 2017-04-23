var FormView;
(function ($, _, Backbone, Marionette, FormValidator) {
    "use strict";

    FormView = Marionette.FormView = Marionette.View.extend({

        className: "formView",

        rules: {}, //Custom Field Validation Rules

        fields: {},

        constructor: function () {
            Marionette.View.prototype.constructor.apply(this, arguments);

            //Allow Passing In Fields by extending with a fields hash
            if (!this.fields) throw new Error("Fields Must Be Provided");

            if (!this.model) this.model = new Backbone.Model();

            this.listenTo(this.model, 'change', this.changeFieldVal, this);
            if (this.data) this.model.set(this.data);

            //Attach Events to preexisting elements if we don't have a template
            if (!this.template) this.runInitializers();
            this.on('dom:refresh', this.runInitializers, this);

            this._validator = new FormValidator();
        },

        changeFieldVal: function (model, fields) {
            if (!_.isEmpty(fields) && fields.changes) {
                var modelProperty = Object.keys(fields.changes);
                this.inputVal(modelProperty, this.model.get(modelProperty));
            } else if (fields.unset) {
                _(this.fields).each(function (options, field) {
                    var elem = this.$('[data-field="' + field + '"]');
                    this.inputVal(elem, this.model.get(field));
                }, this);
            }
        },

        populateFields: function () {
            _(this.fields).each(function (options, field) {
                var elem = this.$('[data-field="' + field + '"]');
                this.inputVal(elem, this.model.get(field));
                if (options.autoFocus) elem.focus();
                if (options.disabled) {
                    elem.attr('disabled', 'disabled');
                }
            }, this);
        },

        serializeFormData: function () {
            var data = {}, self = this;

            _(this.fields).each(function (options, field) {
                data[field] = self.inputVal(field);
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

        onFieldEvent: function (evt) {
            this.handleFieldEvent(evt, evt.type);
        },

        handleFieldEvent: function (evt, eventName) {
            var el = evt.target || evt.srcElement,
                field = $(el).attr('data-field'),
                fieldOptions = this.fields[field];

            if (fieldOptions && fieldOptions.validateOn === eventName) {
                var errors = this.validateField(field);
                if (!_.isEmpty(errors) && _.isFunction(this.onValidationFail)) this.onValidationFail(errors);
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
                } else {
                    var $docEl = $('[data-field=' + key + ']');
                    fieldErrors = this.validateProps(field.properties, $docEl, key);
                }

                if (!_.isEmpty(fieldErrors)) errors[field] = fieldErrors;
            }, this);

            return errors;
        },

        validateProps: function (properties, $docEl, field) {
            var fieldErrors = [],
                keys = _(properties).keys(),
                errors = {};

            _.each(keys, _.bind(function (key) {
                var fieldOptions = properties[key],
                    validations = fieldOptions && fieldOptions.validations ? fieldOptions.validations : {},
                    isValid = true;

                var val = this.inputVal($docEl.find('[data-property=' + key + ']'));
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
                        field: field + '.' + key,
                        el: this.fields[field].properties[key].el,
                        error: fieldErrors
                    });
                }
            }, this));

            return errors;
        },

        validateField: function (field) {
            var fieldOptions = this.fields[field],
                validations = fieldOptions && fieldOptions.validations ? fieldOptions.validations : {},
                fieldErrors = [],
                isValid = true;

            var val = this.inputVal(field);

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

        inputVal: function (input, val) {
            //takes field name or jQuery object
            var el = input.jquery ? input : this.$('[data-field="' + input + '"]');
            var self = this, mode = typeof val === 'undefined' ? 'get' : 'set';

            if (el.data('fieldtype') === 'object') {
                if (mode === 'get') {
                    val = {};
                } else if (val !== '') {
                    val = JSON.parse(val);
                }

                el.find('[data-property]').each(function () {
                    var elem = $(this);
                    var prop = elem.attr('data-property');
                    if (mode === 'get') {
                        val[prop] = self.inputVal(elem);
                    } else if (val) {
                        self.inputVal(elem, val[prop]);
                    }
                });

                val = JSON.stringify(val);
            }
            else if (el.data('fieldtype') === 'array') {
                if (mode === 'get') val = [];
                /*    el.find('[data-index]').each(function () {
                 var elem = $(this);
                 var index = elem.data('index');
                 if (mode === 'get') {
                 val.push(elem.data('id'));
                 }
                 });*/
            } else if (el.is('input')) {
                var inputType = el.attr('type').toLowerCase();
                switch (inputType) {
                    case "radio":
                        el.each(function () {
                            var radio = $(this);
                            if (mode === 'get') {
                                if (radio.is(':checked')) {
                                    val = radio.val();
                                    return false;
                                }
                            } else {
                                if (radio.val() === val) {
                                    radio.prop('checked', true);
                                    return false;
                                }
                            }
                        });
                        break;
                    case "checkbox":
                        if (mode === 'get') {
                            val = el.is(':checked');
                        } else {
                            el.prop('checked', !!val);
                        }
                        break;
                    default:
                        if (mode === 'get') {
                            val = $.trim(el.val());
                        } else {
                            el.val(val);
                        }
                        break;
                }
            }
            else if (el.is('div') && el.hasClass('zselect')) {
                var checkedOptions = el.find('.selectedOptions ul li');
                var value = [];
                _.each(checkedOptions, function (checkedOption) {
                    var $checkedOption = $(checkedOption);
                    value.push($checkedOption.data('id'));
                });

                val = value;
            }
            else if (el.is('select') && el.is(":visible")) {
                if (mode === 'get') {
                    val = el.val();
                }
            }
            else if (el.is('textarea')) {
                if (mode === 'get') {
                    var editor;
                    if (!_.isUndefined(input.jquery)) {
                        var dataField = input.attr('data-field'),
                            dataProp = input.attr('data-property'),
                            key = _.isUndefined(dataField) ? dataProp : dataField;

                        editor = CKEDITOR.instances[key];
                    } else {
                        editor = CKEDITOR.instances[input];
                    }

                    if (!_.isUndefined(editor)) {
                        val = $.trim(editor.getData());
                        var $hiddenDiv = $('<div></div>'),
                            html = $hiddenDiv.html(val),
                            imgs = $(html).find('img');

                        _.each(imgs, function (img) {
                            var $img = $(img),
                                src = $img.attr('src');

                            if (src.indexOf(App.API_URL) > -1) {
                                src = src.replace(App.API_URL, '');
                                $img.attr('src', src);
                            }
                        });

                        val = $hiddenDiv.html();
                    } else {
                        val = el.val();
                    }
                } else {
                    el.val(val);
                }
            }
            else {
                if (mode === 'get') {
                    val = $.trim(el.val());
                } else {
                    el.val(val);
                }
                //Handle Select / MultiSelect Etc
                //@todo
            }

            return val;
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
                return _(this._validator.validate).bind(this)(validationRule, val, options);
            }
            return true;
        },

        submit: function () {
            this.form.find('input[type=submit').trigger('click');
        },

        bindFormEvents: function () {
            var form = (this.$el.hasClass('form')) ? this.$el : this.$('.form').first();
            this.form = form;

            this.$('input')
                .blur(_(this.onFieldEvent).bind(this))
                .keyup(_(this.onFieldEvent).bind(this))
                .keydown(_(this.onFieldEvent).bind(this))
                .change(_(this.onFieldEvent).bind(this));

            var submitBtn = form.find('input[type=submit]');
            submitBtn.on('click', _.bind(function (e) {
                e.stopPropagation();
                _.bind(this.beforeFormSubmit, this)(e);
            }, this));
        },

        runInitializers: function () {
            this.populateFields();
            this.bindFormEvents();
            if (_.isFunction(this.onReady)) this.onReady();
        }
    });

})(jQuery, _, Backbone, Marionette, FormValidator);
