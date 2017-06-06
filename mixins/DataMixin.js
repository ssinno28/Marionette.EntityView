var DataMixin;
(function ($, _, Backbone) {
    DataMixin = {
        data: function (page, pageSize) {
            var data = {};
            data.conditions = [];
            data.groupJoins = [];

            if (!_.isUndefined(page) && !_.isUndefined(pageSize)) {
                data.page = page;
                data.pageSize = pageSize;
            }

            var returnObj = {
                result: data
            };

            var condition =
                function (field, searchType, value, options) {
                    var condition = {
                        field: field,
                        searchType: searchType,
                        value: value
                    };

                    if (!_.isUndefined(options)) {
                        data.conditions.push(_.extend(condition, options));
                    } else {
                        data.conditions.push(condition);
                    }

                    return returnObj;
                };

            var conjunction =
                function (group1, conj, group2) {
                    data.groupJoins.push(group1);
                    data.groupJoins.push(conj);
                    data.groupJoins.push(group2);

                    return returnObj;
                };

            returnObj.condition = condition;
            returnObj.conjunction = conjunction;

            return returnObj;
        }
    };
})(jQuery, _, Backbone);