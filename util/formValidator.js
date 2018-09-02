var FormValidator;
(function ($, _, Backbone, Marionette) {
    FormValidator = Marionette.MnObject.extend({
        regex: {
            //RFC 2822
            email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
            alpha: /^[a-zA-Z]+$/,
            alphanum: /^[a-zA-Z0-9]+$/
        },

        validate: function (validator, val, options) {
            if (_.isFunction(this[validator].evaluate)) return _(this[validator].evaluate).bind(this)(val, options);
            throw new Error('Validator does not exist : ' + validator);
        },

       /* matches: {
			evaluate: function (val, field) {
				 return val == this.inputVal(field);
			}
		 }, */

        min: {
            evaluate: function (val, options) {
                if (val < options[0]) return false;
                return true;
            }
        },


        max: {
            evaluate: function (val, options) {
                if (val > options[0]) return false;
                return true;
            }
        },

        numeric: {
            evaluate: function (val) {
                return !_.isNaN(val);
            }
        },

        alpha: {
            evaluate: function (val) {
                return this.regex.alpha.test(val);
            }
        },

        alphanum: {
            evaluate: function (val) {
                return this.regex.alphanum.test(val);
            }
        },

        email: {
            evaluate: function (val) {
                return val === '' || this.regex.email.test(val);
            }
        },

        required: {
            evaluate: function (val) {
                if (val === false || _.isNull(val) || _.isUndefined(val) || (_.isString(val) && val.length === 0)) return false;
                return true;
            }
        },

        boolean: {
            evaluate: function (val) {
                return _.isBoolean(val);
            }
        }
    });
})(jQuery, _, Backbone, Marionette);
