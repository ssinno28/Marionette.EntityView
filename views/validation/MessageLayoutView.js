define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'app'
], function ($, _, Backbone, Marionette, App) {
    var MessageLayoutView = Backbone.Marionette.LayoutView.extend({
        template: function () {
            return _.template('<script id="empty-template" type="text/template"></script>');
        },
        className: 'alerts',
        onDomRefresh: function () {
            var self = this,
                i = 0;

            App.Alerts.each(function (view) {
                var messageRegionName = 'messageRegion' + i;
                self.$el.append('<div id="' + messageRegionName + '"></div>');
                self.regionManager.addRegion(messageRegionName, '#' + messageRegionName);
                var region = self[messageRegionName];
                region.show(view);
                i++;
            });

            $(document).foundation('alert', 'reflow');
        }
    });
// Our module now returns our view
    return MessageLayoutView;
});