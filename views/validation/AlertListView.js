define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'app',
    'views/validation/InfoView',
    'views/validation/ErrorView',
    'views/validation/SuccessView',
    'views/validation/WarningView'
], function ($, _, Backbone, Marionette, App, InfoView, ErrorView, SuccessView, WarningView) {
    var AlertListView = Backbone.Marionette.CollectionView.extend({
        className: 'alerts',
        getChildView: function (model) {
            switch (model.get('type')) {
                case 'Info':
                    return InfoView;
                    break;
                case 'Warning':
                    return WarningView;
                    break;
                case 'Error':
                    return ErrorView;
                    break;
                case 'Success':
                    return SuccessView;
                    break;
                default :
                    return InfoView;
                    break;
            }
        },
        childViewOptions: function (model) {
            return model.get('messages');
        },
        buildChildView: function (child, ChildViewClass, childViewOptions) {
            // create the child view instance
            var view = new ChildViewClass(childViewOptions);
            // return it
            return view;
        },
        onDomRefresh: function () {
            $(document).foundation('alert', 'reflow');
        }
    });
    return AlertListView;
});