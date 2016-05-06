var PagerListView;
(function ($, _, Backbone, Marionette, PagerItemView, EventAggregator) {
    PagerListView = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'pagination',
        initialize: function (options) {
            _.extend(this, options);
        },
        childView: PagerItemView,
        events: {
            'click li': 'updateCurrent'
        },
        ui: {
            '$pagerItems': 'li'
        },
        updateCurrent: function (e) {
            e.preventDefault();

            var $target = $(e.target);
            this.$el.find('li').removeClass('current');
            $target.parent().addClass('current');

            EventAggregator.trigger('page:changed:' + this.parentViewCid, e);

            if (this.options.routing) {
                location.hash = $target.attr('href');
            } else {
                EventAggregator.trigger(this.route + '.getAll', $target.data('number'));
            }
        },
        onDestroy: function () {
            EventAggregator.off('page:changed:' + this.parentViewCid);
        }
    });
})(jQuery, _, Backbone, Marionette, PagerItemView, EventAggregator);