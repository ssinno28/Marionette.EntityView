var FieldsMixin;
(function ($, _, Backbone, Marionette) {
    FieldsMixin = {
        field: function (name) {
            var field = {},
                options = {},
                currentField = field[name] = {},
                fieldsRegion = this.getRegion('fieldsRegion'),
                $fields = $(fieldsRegion.el);

            //validations
            currentField.validations = {};
            var required = function (message) {
                currentField.validations.required = message;
            };

            var min = function (message) {
                currentField.validations.min = message;
            };

            var max = function (message) {
                currentField.validations.max = message;
            };

            var numeric = function (message) {
                currentField.validations.numeric = message;
            };

            var alpha = function (message) {
                currentField.validations.alpha = message;
            };

            var alphanum = function (message) {
                currentField.validations.alphanum = message;
            };

            var email = function (message) {
                currentField.validations.email = message;
            };

            var boolean = function (message) {
                currentField.validations.boolean = message;
            };

            //options
            var label = function (text, noOfCols) {
                options.label = {};
                options.label.text = text;

                return {
                    min: min,
                    required: required,
                    max: max,
                    numeric: numeric,
                    alpha: alpha,
                    alphanum: alphanum,
                    email: email,
                    boolean: boolean,
                    fieldset: fieldset
                };
            };

            var fieldset = function (name) {
                options.fieldset = {};
                options.fieldset.text = name;
                options.fieldset.id = this._formatRegionName(name);

                return {
                    min: min,
                    required: required,
                    max: max,
                    numeric: numeric,
                    alpha: alpha,
                    alphanum: alphanum,
                    email: email,
                    boolean: boolean,
                    label: label
                };
            };

            return {
                label: label,
                fieldset: fieldset
            }
        }
    };
})(jQuery, _, Backbone, Marionette);
