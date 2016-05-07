;
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['backbone', 'marionette', 'jquery', 'underscore', 'event.aggregator', 'app', 'ckeditor', 'moment'], factory);
    } else {
        // Browser globals
        root.FastTrack = factory(root.Backbone, root.Marionette, root.jQuery, root._, root.EventAggregator, root.App, root.CKEDITOR, root.Moment);
    }
}(this, function (Backbone, Marionette, jQuery, _, EventAggregator, App, CKEDITOR, Moment) {  
    "use strict";

    <%= templates %>
    <%= content %>

    return {
        SideNavLayoutView: SideNavLayoutView,
        SideNavItemView: SideNavItemView,
        SideNavListView: SideNavListView,
        ErrorView: ErrorView,
        InfoView: InfoView,
        WarningView: WarningView,
        SuccessView: SuccessView,
        TimeoutUtil: TimeoutUtil,
        UriUtil: UriUtil
    };
}));