var UtilitiesMixin;
(function ($, _, Backbone, Marionette) {
    UtilitiesMixin = {
        _formatRegionName: function (name) {
            return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        },
        _getUrlFriendlyString: function (s) {
            // make the url lowercase
            var encodedUrl = s.toString().toLowerCase();

            // replace & with and
            encodedUrl = encodedUrl.split(/\&+/).join("-and-");

            // remove invalid characters
            encodedUrl = encodedUrl.split(/[^a-z0-9]/).join("-");

            // remove duplicates
            encodedUrl = encodedUrl.split(/-+/).join("-");

            // trim leading & trailing characters
            encodedUrl = encodedUrl.trim('-');

            return encodedUrl;
        }
    };
})(jQuery, _, Backbone, Marionette);
