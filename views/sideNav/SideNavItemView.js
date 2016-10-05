var SideNavItemView;
(function ($, _, Backbone, Marionette, sideNavItemTpl, EventAggregator, TreeCompositeView, sideNavChildrenTpl) {
    SideNavItemView = Marionette.SideNavItemView = TreeCompositeView.extend({
        template: sideNavItemTpl,
        tagName: 'li',
        className: 'list-group-item',
        onRender: function () {
            if (!_.isNull(this.model.get('id'))) {
                this.$el.attr('data-target', '#toggle-' + this.model.get('id'));
            }

            if (this.hasChildren()) {
                this.$el.addClass('secondary-nav-item-pf');
            }

            this.$el.attr('data-type', this.model.get('type'));
        },
        events: function () {
            var events = {
                'click a:first-child': 'listItemClick'
            };

            var newEvents = _.extend(TreeCompositeView.prototype.events.call(this), events);
            return newEvents;
        },
        listItemClick: function (e) {
            var $target = $(e.target);

            if (!$target.is('li')) {
                $target = $target.closest('li');
            }

            EventAggregator.trigger('side-nav:click:' + $target.data('type'), this.model, e, $target.attr('href'));
            this.trigger('item-clicked', $target);
        },
        templateContext: function () {
            var routeUrl = _.isUndefined(this.model.get('route')) ? '#' : this.model.get('route'),
                type = this.model.collection.type,
                icon = this.model.get('icon');

            if (_.isUndefined(type) || _.isNull(type)) {
                type = this.model.get('type');
            }

            if (_.isUndefined(icon)) {
                icon = 'pficon-screen';
            }

            return {
                routeUrl: _.isNull(routeUrl) ? '' : routeUrl,
                type: type,
                icon: icon
            };
        },
        renderChildrenTpl: function () {
            var data = {
                    name: this.model.get('name'),
                    id: this.model.get('id')
                },
                html = Marionette.Renderer.render(sideNavChildrenTpl, data);

            this.$el.append(html);
        }
    });

})(jQuery, _, Backbone, Marionette, this['FastTrack']['Templates']['./templates/sideNav/sideNavItemTemplate.html'], EventAggregator, TreeCompositeView, this['FastTrack']["Templates"]["./templates/sideNav/sideNavChildrenTpl.html"]);
