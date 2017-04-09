var UtilitiesMixin;
(function ($, _, Backbone, Marionette) {
    UtilitiesMixin = {
        _formatRegionName: function (name) {
            return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        }
    };
})(jQuery, _, Backbone, Marionette);
