var FieldsMixin;
(function ($, _, Backbone, Marionette) {
    FieldsMixin = {
        field: function (name, isDocProp, parent) {
            var field = {},
                options = {},
                currentField = field[name] = {
                    el: '.' + name
                },
                $fields = this.$el.find('.entity-form-region'),
                dataField = name,
                fieldRegion = this._formatRegionName(dataField) + '-region',
                editors = {},
                validations = {},
                returnObj;

            options.isDocProp = _.isUndefined(isDocProp) ? false : isDocProp;
            currentField.isDocProp = options.isDocProp;

            //validations
            currentField.validations = {};
            var required = function (message) {
                currentField.required = message;
                return returnObj;
            };

            var min = function (message, min) {
                currentField.validations['min:' + min] = message;
                return returnObj;
            };

            var max = function (message, max) {
                currentField.validations['max:' + max] = message;
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
                currentField.validations.email = message;
                return returnObj;
            };

            var booleanFunc = function (message) {
                currentField.validations.boolean = message;
                return returnObj;
            };

            var matches = function (message, field) {
                currentField.validations['matches:' + field] = message;
                return returnObj;
            };

            var rule = _.bind(function (name, message, func) {
                if (_.isUndefined(this.rules)) {
                    this.rules = {};
                }

                this.rules[name] = {};
                this.rules[name].evaluate = func;

                currentField.validations[name] = message;
                return returnObj;
            }, this);

            validations = {
                min: min,
                required: required,
                max: max,
                numeric: numeric,
                alpha: alpha,
                alphanum: alphanum,
                email: email,
                rule: rule,
                boolean: booleanFunc
            };

            var addField = _.bind(function () {
                var $el = null;
                if (!_.isUndefined(options.fieldset) && !_.isUndefined(options.fieldset.$el)) {
                    $el = options.fieldset.$el;
                } else {
                    $el = $fields;
                }

                if ($el.length === 0) {
                    $el = this.$el;
                }

                var fieldWrapperTpl = null;
                if (!_.isUndefined(options.template)) {
                    fieldWrapperTpl = options.template;
                } else if (!_.isUndefined(this.fieldWrapperTpl)) {
                    fieldWrapperTpl = this.fieldWrapperTpl;
                }
                else {
                    fieldWrapperTpl = _.template('<div class="form-group">' +
                        '<label class="<% if(srOnly){ %> sr-only <% } %>col-xs-12 col-sm-2 control-label"><%= label %></label>' +
                        '<div class="col-xs-12 col-sm-10 <%= dataField %>">' +
                        '<div class="<%= fieldRegion %>"></div>' +
                        '</div>' +
                        '<div class="col-xs-12 col-sm-10 col-sm-offset-2 errors"></div>' +
                        '</div>');
                }

                var fieldHtml = Marionette.Renderer.render(fieldWrapperTpl, {
                    label: options.label.text,
                    dataField: dataField,
                    fieldRegion: fieldRegion,
                    srOnly: options.label.srOnly
                });

                $el.append(fieldHtml);
                if (!isDocProp) {
                    this.fields = _.extend(field, this.fields);
                }

                if (!_.isUndefined(parent)) {

                    if (_.isUndefined(parent.properties)) {
                        parent.properties = {};
                    }

                    parent.properties = _.extend(parent.properties, field);
                }
            }, this);

            var datePicker = _.bind(function (dateFormat) {
                addField();
                this._datePickerForRegion(fieldRegion, dataField, dateFormat, options.isDocProp);
            }, this);

            var timePicker = _.bind(function (dateFormat) {
                addField();
                this._timePickerForRegion(fieldRegion, dataField, dateFormat, options.isDocProp);
            }, this);

            var dateTimePicker = _.bind(function (dateFormat) {
                addField();
                this._dateTimePickerForRegion(fieldRegion, dataField, dateFormat, options.isDocProp);
            }, this);

            var imagePicker = _.bind(function () {
                addField();
                this._imagePickerForRegion(fieldRegion, dataField, options.isDocProp);
            }, this);

            var checkbox = _.bind(function () {
                addField();
                this._checkboxForRegion(fieldRegion, dataField, options.isDocProp);
            }, this);

            var textArea = _.bind(function () {
                addField();
                this._textAreaForRegion(fieldRegion, dataField, options.isDocProp);
            }, this);

            var radioBtns = _.bind(function (collection) {
                addField();
                this._radioButtonListForRegion(collection, fieldRegion, dataField, options.isDocProp);
            }, this);

            var autocomplete = _.bind(function (collection) {
                addField();
                this._autoCompleteForRegion(collection, fieldRegion, dataField, options.isDocProp);
            }, this);

            var multiSelect = _.bind(function (collection, conditions, displayField) {
                addField();
                this._multiSelectForRegion(collection, fieldRegion, dataField, conditions, displayField, options.isDocProp);
            }, this);

            var dropdown = _.bind(function (collection, conditions) {
                addField();
                this._dropDownForRegion(collection, fieldRegion, dataField, conditions, options.isDocProp);
            }, this);

            var wyswig = _.bind(function () {
                addField();
                this._wyswigForRegion(fieldRegion, dataField, options.isDocProp);
            }, this);

            var singleLine = _.bind(function (placeholderTxt) {
                addField();
                this._singleLineForRegion(fieldRegion, dataField, options.isDocProp, placeholderTxt);
            }, this);

            var checkboxes = _.bind(function (collection, conditions) {
                addField();
                this._checkboxesForRegion(collection, fieldRegion, dataField, conditions, options.isDocProp);
            }, this);

            var document = _.bind(function (channel, type, id) {
                var $el = null;
                if (!_.isUndefined(options.fieldset) && !_.isUndefined(options.fieldset.$el)) {
                    $el = options.fieldset.$el;
                } else {
                    $el = $fields;
                }

                if ($el.length === 0) {
                    $el = this.$el;
                }

                var fieldWrapperTpl = null;
                if (_.isUndefined(options.template)) {
                    fieldWrapperTpl =
                        _.template('<div class="<%= fieldRegion %>" data-fieldtype="object" data-field="<%= dataField %>"></div>');
                } else {
                    fieldWrapperTpl = options.template;
                }

                var fieldHtml = Marionette.Renderer.render(fieldWrapperTpl, {
                    dataField: dataField,
                    fieldRegion: fieldRegion
                });

                $el.append(fieldHtml);
                this.fields = _.extend(field, this.fields);

                var $docEl = $el.find('.' + fieldRegion);
                var docField = _.bind(function (name) {
                    return this.field(name, true, currentField).el($docEl);
                }, this);

                channel.request('document:' + type, docField);
                channel.request('document:' + type + ':' + id, docField);
            }, this);

            var custom = _.bind(function (view) {
                addField();

                this.addRegion(region, {
                    el: '.' + this._formatRegionName(fieldRegion),
                    replaceElement: true
                });

                this.showChildView(region, new view({
                    value: this.model.get(dataField),
                    dataField: dataField
                }));
            }, this);

            var service = _.bind(function (serviceType, serviceOptions) {
                var $el = null;
                if (!_.isUndefined(options.fieldset) && !_.isUndefined(options.fieldset.$el)) {
                    $el = options.fieldset.$el;
                } else {
                    $el = $fields;
                }

                if ($el.length === 0) {
                    $el = this.$el;
                }

                var fieldWrapperTpl = null;
                if (_.isUndefined(options.template)) {
                    fieldWrapperTpl = _.template('<div class="form-group">' +
                        '<div class="col-sm-12">' +
                        '<div class="<%= fieldRegion %>" data-fieldtype="array" data-field="<%= dataField %>">' +
                        '</div>' +
                        '</div>' +
                        '</div>');
                } else {
                    fieldWrapperTpl = options.template;
                }

                var fieldHtml =
                    Marionette.Renderer.render(fieldWrapperTpl, {
                        dataField: dataField,
                        fieldRegion: fieldRegion
                    });

                $el.append(fieldHtml);
                this.fields = _.extend(field, this.fields);

                this.addRegion(fieldRegion, {
                    el: '.' + fieldRegion,
                    replaceElement: false
                });

                this['_' + name + 'Service'] = new serviceType(_.extend(serviceOptions, {
                    region: this.getRegion(fieldRegion),
                    route: this.getSubServiceRoute(name),
                    subRoute: location.hash.substring(1, location.hash.length),
                    name: name,
                    embedded: true
                }));

                this['_' + name + 'Channel'] = this['_' + name + 'Service'].getChannel();

                this.on('dom:refresh', _.bind(function () {
                    this['_' + name + 'Channel'].trigger('getType', 1);
                }, this));

                this.on('destroy', _.bind(function () {
                    this['_' + name + 'Service'].destroy();
                }, this));
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
                singleLine: singleLine,
                custom: custom,
                checkboxes: checkboxes,
                service: service,
                document: document,
                multiSelect: multiSelect
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
            var label = function (text, srOnly) {
                options.label = {};
                options.label.text = text;
                options.label.srOnly = srOnly;

                return _.extend({
                    fieldset: fieldset,
                    template: template,
                    el: el
                }, returnObj);
            };

            var fieldset = _.bind(function (fieldsetId, text) {
                options.fieldset = {};

                var $fieldset = this.$el.find('#' + fieldsetId);
                if ($fieldset.length === 0) {
                    options.fieldset.text = text;

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

            var el = _.bind(function ($el) {
                options.fieldset = {};
                options.fieldset.$el = $el;

                return _.extend({
                    label: label,
                    template: template
                }, returnObj);
            }, this);

            return _.extend({
                label: label,
                fieldset: fieldset,
                template: template,
                el: el
            }, returnObj);
        },
        _wyswigForRegion: function (region, dataField, isDocProp) {
            this.addRegion(region, {
                el: '.' + this._formatRegionName(region),
                replaceElement: true
            });

            this.showChildView(region, new WyswigView({
                value: this.model.get(dataField),
                dataField: dataField,
                isDocProp: isDocProp
            }));
        },
        _singleLineForRegion: function (region, dataField, isDocProp, placeholderTxt) {
            this.addRegion(region, {
                el: '.' + this._formatRegionName(region),
                replaceElement: true
            });

            this.showChildView(region, new SingleLineTextView({
                value: this.model.get(dataField),
                dataField: dataField,
                isDocProp: isDocProp,
                placeholderTxt: placeholderTxt
            }));
        },
        _checkboxesForRegion: function (collection, region, dataField, conditions, isDocProp) {
            this.addRegion(region, {
                el: '.' + this._formatRegionName(region),
                replaceElement: true
            });

            var selectedIds = this.model.get(dataField);
            if (!conditions) {
                conditions = [];
            }

            var data = {
                conditions: conditions
            };

            collection.query(false, data).done(_.bind(function (entities) {
                this.showChildView(region, new CheckBoxListView({
                    collection: entities,
                    dataField: dataField,
                    selectedId: selectedIds,
                    isDocProp: isDocProp
                }));
            }, this));
        },
        _dropDownForRegion: function (collection, region, dataField, conditions, isDocProp) {
            this.addRegion(region, {
                el: '.' + this._formatRegionName(region),
                replaceElement: true
            });

            if (!conditions) {
                conditions = [];
            }

            var data = {
                conditions: conditions
            };

            collection.query(false, data).done(_.bind(function (entities) {
                var currentlySetId = this.model.get(dataField);

                if (_.isUndefined(currentlySetId) || _.isNull(currentlySetId) || currentlySetId === '' || currentlySetId === 0) {
                    entities.add(new Backbone.Model({name: 'Select', id: ''}), {at: 0});
                    currentlySetId = '';
                }

                this.showChildView(region, new DropDownListView({
                    collection: entities,
                    dataField: dataField,
                    selectedId: currentlySetId,
                    isDocProp: isDocProp
                }));
            }, this));
        },
        _multiSelectForRegion: function (collection, region, dataField, conditions, displayField, isDocProp) {
            this.addRegion(region, {
                el: '.' + this._formatRegionName(region),
                replaceElement: true
            });

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
                    conditions: conditions,
                    displayField: displayField || 'name',
                    isDocProp: isDocProp
                });

            this.showChildView(region, multiSelect);
        },
        _autoCompleteForRegion: function (collection, region, dataField, isDocProp) {
            this.addRegion(region, {
                el: '.' + this._formatRegionName(region),
                replaceElement: true
            });

            var selectedId = this.model.get(dataField);
            this.showChildView(region,
                new AutoCompleteLayoutView({
                    collection: collection,
                    dataField: dataField,
                    selectedId: selectedId,
                    isDocProp: isDocProp
                }));
        },
        _radioButtonListForRegion: function (collection, region, dataField, isDocProp) {
            this.addRegion(region, {
                el: '.' + this._formatRegionName(region),
                replaceElement: true
            });

            var selectedId = this.model.get(dataField);
            this.showChildView(region, new RadioButtonListView({
                collection: collection,
                dataField: dataField,
                selectedId: selectedId,
                isDocProp: isDocProp
            }));
        },
        _textAreaForRegion: function (region, dataField, isDocProp) {
            this.addRegion(region, {
                el: '.' + this._formatRegionName(region),
                replaceElement: true
            });

            this.showChildView(region, new TextAreaView({
                value: this.model.get(dataField),
                dataField: dataField
            }));
        },
        _checkboxForRegion: function (region, dataField, isDocProp) {
            this.addRegion(region, {
                el: '.' + this._formatRegionName(region),
                replaceElement: true
            });

            this.showChildView(region, new SingleCheckBoxView({
                value: this.model.get(dataField),
                dataField: dataField,
                isDocProp: isDocProp
            }));
        },
        _imagePickerForRegion: function (region, dataField, isDocProp) {
            this.addRegion(region, {
                el: '.' + this._formatRegionName(region),
                replaceElement: true
            });

            this.showChildView(region, new ImageFieldView({
                value: this.model.get(dataField),
                dataField: dataField,
                isDocProp: isDocProp
            }));
        },
        _dateTimePickerForRegion: function (region, dataField, dateFormat, isDocProp) {
            this.addRegion(region, {
                el: '.' + this._formatRegionName(region),
                replaceElement: true
            });

            this.showChildView(region, new DateTimePickerView({
                value: this.model.get(dataField),
                dataField: dataField,
                dateFormat: dateFormat,
                isDocProp: isDocProp
            }));
        },
        _timePickerForRegion: function (region, dataField, dateFormat, isDocProp) {
            this.addRegion(region, {
                el: '.' + this._formatRegionName(region),
                replaceElement: true
            });

            this.showChildView(region, new TimePickerView({
                value: this.model.get(dataField),
                dataField: dataField,
                dateFormat: dateFormat,
                isDocProp: isDocProp
            }));
        },
        _datePickerForRegion: function (region, dataField, dateFormat, isDocProp) {
            this.addRegion(region, {
                el: '.' + this._formatRegionName(region),
                replaceElement: true
            });

            this.showChildView(region, new DatePickerView({
                value: this.model.get(dataField),
                dataField: dataField,
                dateFormat: dateFormat,
                isDocProp: isDocProp
            }));
        }
    };
})(jQuery, _, Backbone, Marionette);
