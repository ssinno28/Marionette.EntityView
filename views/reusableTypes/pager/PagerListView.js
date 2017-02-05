var PagerListView;
(function ($, _, Backbone, Marionette, PagerItemView) {
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

            var $target = $(e.target),
                channel = this.getChannel();

            this.$el.find('li').removeClass('current');
            $target.parent().addClass('current');

            channel.trigger('page:changed:' + this.parentViewCid, e);

            if (this.options.routing) {
                location.hash = $target.attr('href');
            } else {
                channel.trigger('getAll', $target.data('number'));
            }
        },
        getChannel: function () {
            return Backbone.Radio.channel(this.route);
        }
    });
})(jQuery, _, Backbone, Marionette, PagerItemView);