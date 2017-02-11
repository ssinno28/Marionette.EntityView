var EntityFilters;
(function (Backbone, Marionette) {
    EntityFilters = Marionette.EntityFilters = Marionette.Object.extend({
        like: function (model, condition) {
            return model.get(condition.field).toLowerCase().indexOf(condition.value.toLowerCase()) === 0;
        },

        equals: function (model, condition) {
            if (model.get(condition.field) instanceof Array) {
                return model.get(condition.field).indexOf(condition.value) > -1;
            } else {
                return model.get(condition.field) === condition.value;
            }
        },

        contains: function (model, condition) {
            return model.get(condition.field).indexOf(condition.value) > -1;
        },

        notEquals: function (model, condition) {
            if (model.get(condition.field) instanceof Array) {
                return model.get(condition.field).indexOf(condition.value) === -1;
            } else {
                return model.get(condition.field) !== condition.value;
            }
        },

        idsFilter: function (model, condition) {
            var values;
            if (condition.value instanceof Array) {
                values = condition.value;
            } else {
                values = condition.value.split(',');
            }

            var fieldValue = model.get(condition.field);
            for (var i = 0; i < values.length; i++) {
                if (fieldValue instanceof Array) {
                    if (fieldValue.indexOf(values[i]) > -1) {
                        return true;
                    }
                } else {
                    if (values[i] == fieldValue) {
                        return true;
                    }
                }
            }

            return false;
        },

        except: function (model, condition) {
            var values;
            if (condition.value instanceof Array) {
                values = condition.value;
            } else {
                values = condition.value.split(',');
            }

            for (var i = 0; i < values.length; i++) {
                if (values[i] == model.get(condition.field)) {
                    return false;
                }
            }

            return true;
        },

        textSearchFilter: function (model, condition) {
            var searchResults = self.searchIndex.search(condition.value);
            var filteredResult =
                _.find(searchResults, function (searchResult) {
                    return searchResult.ref === model.get('id');
                });

            return !_.isUndefined(filteredResult);
        }
    });
})(Backbone, Marionette);