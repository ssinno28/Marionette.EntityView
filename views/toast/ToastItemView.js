var ToastItemView;
(function ($, _, Backbone, Marionette, EventAggregator, toastItemTpl) {
    ToastItemView = Marionette.ToastItemView = Marionette.View.extend({
        template: toastItemTpl,
        events: {
            'click .toast-pf-action': 'actionClicked'
        },
        onRender: function () {
            this.$el.css({'margin-top': this.options.margin});
        },
        actionClicked: function (e) {
            e.preventDefault();
            var action = this.model.get('action');
            EventAggregator.trigger('toast:click:' + action.name, action.options);
        },
        templateContext: function () {
            return {
                cid: this.model.cid
            };
        }
    });
})(jQuery, _, Backbone, Marionette, EventAggregator, this['FastTrack']['Templates']['./templates/toast/toastItemTpl.html']);
