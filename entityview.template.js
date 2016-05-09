;
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['backbone', 'marionette', 'jquery', 'underscore', 'event.aggregator', 'app', 'moment'], factory);
    } else {
        if (_.isUndefined(root.EventAggregator)) {
            root.EventAggregator = new Backbone.Wreqr.EventAggregator();
        }

        if(_.isUndefined(root.App)){
            root.App = new Marionette.Application();
        }

        // Browser globals
        var exports = factory.call(root, root.Backbone, root.Marionette, root.jQuery, root._, root.EventAggregator, root.App, root.moment);
        _.extend(root, exports);
    }
}(this, function (Backbone, Marionette, jQuery, _, EventAggregator, App, CKEDITOR, Moment) {

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
        UriUtil: UriUtil,
        IconMenuListView: IconMenuListView,
        IconMenuItemView: IconMenuItemView,
        AutoCompleteLayoutView: AutoCompleteLayoutView,
        MultiSelectLayoutView: MultiSelectLayoutView,
        DateTimePickerView: DateTimePickerView,
        SingleLineTextView: SingleLineTextView,
        WyswigView:WyswigView,
        ImageFieldView: ImageFieldView,
        AutoCompleteListView: AutoCompleteListView,
        RadioButtonListView: RadioButtonListView,
        CheckBoxListView: CheckBoxListView,
        CheckBoxView: CheckBoxView,
        SideNavLayoutView: SideNavLayoutView
    };
}));