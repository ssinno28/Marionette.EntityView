var ToastListView;
(function ($, _, Backbone, Marionette, ToastErrorView, ToastInfoView, ToastSuccessView, ToastWarningView) {
    ToastListView = Marionette.CollectionView.extend({
        childView: function (item) {
            switch (item.get('type')) {
                case 'error':
                    return ToastErrorView;
                case 'success':
                    return ToastSuccessView;
                case 'info':
                    return ToastInfoView;
                case 'warning':
                    return ToastWarningView;
                default:
                    return ToastInfoView;
            }
        },
        events: {
            'click .pficon-close': 'removeToast'
        },
        removeToast: function (e) {
            var $target = $(e.target),
                cid = $target.data('cid');

            this.collection.remove(cid);
            this.render();
        },
        buildChildView: function (child, ChildViewClass, childViewOptions) {
            // build the final list of options for the childView class
            var options = _.extend({model: child}, childViewOptions),
                index = this.collection.indexOf(child);

            options.margin = 55 * index;

            // create the child view instance
            var view = new ChildViewClass(options);
            // return it
            return view;
        }
    });
})(jQuery, _, Backbone, Marionette, ToastErrorView, ToastInfoView, ToastSuccessView, ToastWarningView);
