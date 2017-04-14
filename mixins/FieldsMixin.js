var FieldsMixin;
(function ($, _, Backbone, Marionette) {
    FieldsMixin = {
        field: function (name) {
            var field = {},
                options = {},
                currentField = field[name] = {
                    el: '.' + name
                },
                $fields = this.$el.find('.entity-form-region'),
                dataField = name,
                fieldRegion =  this._formatRegionName(dataField) + '-region',
                editors = {},
                validations = {},
                returnObj;

            //validations
            currentField.validations = {};
            var required = function (message) {
                currentField.required = message;
                return returnObj;
            };

            var min = function (message) {
                currentField.validations.min = message;
                return returnObj;
            };

            var max = function (message) {
                currentField.validations.max = message;
                return returnObj;
            };

            var numeric = function (message) {
                currentField.validations.numeric = message;
                return returnObj;
            };

            var alpha = function (message) {
                currentField.validations.alpha = message;
                return returnObj;
            };

            var alphanum = function (message) {
                currentField.validations.alphanum = message;
                return returnObj;
            };

            var email = function (message) {
                currentField.email = message;
                return returnObj;
            };

            var boolean = function (message) {
                currentField.validations.boolean = message;
                return returnObj;
            };

            validations = {
                min: min,
                required: required,
                max: max,
                numeric: numeric,
                alpha: alpha,
                alphanum: alphanum,
                email: email,
                boolean: boolean
            };

            var addField = _.bind(function () {
                var $el = null;
                if (!_.isUndefined(options.fieldset.$el)) {
                    $el = options.fieldset.$el;
                } else {
                    $el = $fields;
                }

                var fieldWrapperTpl = null;
                if (_.isUndefined(options.template)) {
                    fieldWrapperTpl = _.template('<div class="form-group">' +
                        '<label class="col-sm-2 control-label"><%= label %></label>' +
                        '<div class="col-sm-10 <%= dataField %>">' +
                        '<div class="<%= fieldRegion %>"></div>' +
                        '</div>' +
                        '<div class="col-sm-10 col-sm-offset-2 errors"></div>' +
                        '</div>');
                } else {
                    fieldWrapperTpl = options.template;
                }

                var fieldHtml = Marionette.Renderer.render(fieldWrapperTpl, {
                    label: options.label.text,
                    dataField: dataField,
                    fieldRegion: fieldRegion
                });

                $el.append(fieldHtml);
                this.fields = _.extend(field, this.fields);
            }, this);

            var datePicker = _.bind(function (dateFormat) {
                addField();
                this._datePickerForRegion(fieldRegion, dataField, dateFormat);
            }, this);

            var timePicker = _.bind(function (dateFormat) {
                addField();
                this._timePickerForRegion(fieldRegion, dataField, dateFormat);
            }, this);

            var dateTimePicker = _.bind(function (dateFormat) {
                addField();
                this._dateTimePickerForRegion(fieldRegion, dataField, dateFormat);
            }, this);

            var imagePicker = _.bind(function () {
                addField();
                this._imagePickerForRegion(fieldRegion, dataField);
            }, this);

            var checkbox = _.bind(function () {
                addField();
                this._checkboxForRegion(fieldRegion, dataField);
            }, this);

            var textArea = _.bind(function () {
                addField();
                this._textAreaForRegion(fieldRegion, dataField);
            }, this);

            var radioBtns = _.bind(function (collection) {
                addField();
                this._radioButtonListForRegion(collection, fieldRegion, dataField);
            }, this);

            var autocomplete = _.bind(function (collection) {
                addField();
                this._autoCompleteForRegion(collection, fieldRegion, dataField);
            }, this);

            var multiSelect = _.bind(function (collection, conditions, displayField) {
                addField();
                this._multiSelectForRegion(collection, fieldRegion, dataField, conditions, displayField);
            }, this);

            var dropdown = _.bind(function (collection, conditions) {
                addField();
                this._dropDownForRegion(collection, fieldRegion, dataField, conditions);
            }, this);

            var wyswig = _.bind(function () {
                addField();
                this._wyswigForRegion(fieldRegion, dataField);
            }, this);

            var singleLine = _.bind(function () {
                addField();
                this._singleLineForRegion(fieldRegion, dataField);
            }, this);

            editors = {
                wyswig: wyswig,
                dropdown: dropdown,
                autocomplete: autocomplete,
                radioBtns: radioBtns,
                textArea: textArea,
                checkbox: checkbox,
                imagePicker: imagePicker,
                dateTimePicker: dateTimePicker,
                timePicker: timePicker,
                datePicker: datePicker,
                singleLine: singleLine
            };

            returnObj = _.extend(validations, editors);

            var template = function (template) {
                options.template = template;

                return _.extend({
                    fieldset: fieldset,
                    label: label
                }, returnObj);
            };

            //options
            var label = function (text) {
                options.label = {};
                options.label.text = text;

                return _.extend({
                    fieldset: fieldset,
                    template: template
                }, returnObj);
            };

            var fieldset = _.bind(function (text, fieldsetId) {
                options.fieldset = {};
                options.fieldset.text = text;

                var $fieldset = this.$el.find('#' + fieldsetId);

                if ($fieldset.length === 0) {
                    $fields.append('<fieldset id="' + fieldsetId + '">' +
                        '<legend>' + text + '</legend>' +
                        '</fieldset>');
                    $fieldset = $fields.find('#' + fieldsetId);
                }

                options.fieldset.$el = $fieldset;
                return _.extend({
                    label: label,
                    template: template
                }, returnObj);
            }, this);

            return {
                label: label,
                fieldset: fieldset,
                template: template
            };
        }
    };
})(jQuery, _, Backbone, Marionette);
