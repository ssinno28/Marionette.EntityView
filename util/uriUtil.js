var UriUtil;
(function ($, _, Backbone) {
    UriUtil = {
        getUriHash: function (object) {
            var str = decodeURIComponent($.param(object));
            return "q/" + str;
        },
        getUrlVars: function () {
            //set to a key value pair for each parameter
            var hash;
            var jsonObject = {};
            var hashes = location.hash.slice(location.hash.indexOf('q/') + 2).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                jsonObject[hash[0]] = hash[1];
            }
            return jsonObject;
        },
        getRoute: function () {
            return location.hash.slice(0, location.hash.indexOf('q/'));
        },
        getUrlFriendlyString: function (s) {
            return s.replace(/ /g, "-").toLowerCase();
        }
    };
})(jQuery, _, Backbone);