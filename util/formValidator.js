var FormValidator;
(function ($, _, Backbone, Marionette) {
    FormValidator = Marionette.Object.extend({
        regex: {
            //RFC 2822
            email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
            alpha: /^[a-zA-Z]+$/,
            alphanum: /^[a-zA-Z0-9]+$/
        },

        validate: function (validator, val, options) {
            if (_.isFunction(FormValidator[validator].evaluate)) return _(FormValidator[validator].evaluate).bind(this)(val, options);
            throw new Error('Validator does not exist : ' + validator);
        },

        /*     matches: function (val, field) {
         *//*jshint eqeqeq:false*//*
         return val == this.inputVal(field);
         },*/

        min: {
            id: '272b4a6f-055f-44af-bd2e-dc8d3f281537',
            evaluate: function (val, options) {
                if (val.length < options[0]) return false;
                return true;
            }
        },


        max: {
            id: 'c1bfaee0-7179-4764-a92a-42e1afb78b82',
            evaluate: function (val, options) {
                if (val.length > options[0]) return false;
                return true;
            }
        },

        numeric: {
            id: '85aee6f9-c7af-4658-b983-4be319e960c4',
            evaluate: function (val) {
                return !_.isNaN(val);
            }
        },

        alpha: {
            id: 'a355ed4d-6a00-44c9-8052-9361fb285ae5',
            evaluate: function (val) {
                return FormValidator.regex.alpha.test(val);
            }
        },

        alphanum: {
            id: '63f1cf8b-daed-48f2-a719-a2229de2fd94',
            evaluate: function (val) {
                return FormValidator.regex.alphanum.test(val);
            }
        },

        email: {
            id: '813dd3a8-c394-496b-a81c-93b97b4bbf87',
            evaluate: function (val) {
                return val === '' || FormValidator.regex.email.test(val);
            }
        },

        required: {
            id: 'c63eae79-f7b6-4747-88c0-2baa6bffe3e4',
            evaluate: function (val) {
                if (val === false || _.isNull(val) || _.isUndefined(val) || (_.isString(val) && val.length === 0)) return false;
                return true;
            }
        },

        boolean: {
            id: 'f23a85d8-389f-44db-bc1d-a9162c4a5580',
            evaluate: function (val) {
                return _.isBoolean(val);
            }
        }
    });
})(jQuery, _, Backbone, Marionette);
