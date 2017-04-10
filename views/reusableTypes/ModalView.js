var ModalView;
(function (_, Backbone, $, Marionette, modalTpl, ModalModel) {
    ModalView = Marionette.View.extend({
        model: ModalModel,
        template: modalTpl,
        initialize: function (options) {
            if (_.isUndefined(this.triggers)) {
                this.triggers = {};
            }

            _.each(options.choices,
                _.bind(function (option) {
                    this.triggers['click .' + option.type] = {
                        event: 'modal:' + this.getOption('safeName') + ':' + option.type,
                        preventDefault: true,
                        stopPropagation: true
                    };
                }, this));

            this.delegateEvents();

            this.$el.on('show.bs.modal', _.bind(function (e) {
                this.modalData = $(e.relatedTarget).data();
            }, this));
        },
        ui: {
            $modalFooter: '.modal-footer'
        },
        className: 'modal fade',
        onRender: function () {
            this.$el.attr('tabindex', -1);
            this.$el.attr('role', 'dialog');
            this.$el.attr('aria-labelledby', this.getOption('name'));
            this.$el.attr('aria-hidden', true);
            this.$el.attr('id', this.getOption('safeName'));

            _.each(this.options.choices,
                _.bind(function (option) {
                    var html =
                        Marionette.Renderer.render(
                            _.template('<button type="button" class="btn btn-primary <%= type %>" ' +
                                '<% if(dismiss) { %> data-dismiss="modal" <% } %> > <%= text %> </button>'),
                            option
                        );

                    this.ui.$modalFooter.append(html);
                }, this));
        },
        onDomRefresh: function () {
            if (_.isUndefined(this.model.get('name'))) {
                this.$el.find('.buttons').hide();
            }
        }
    });
})(_, Backbone, jQuery, Marionette, Templates.modalTpl, ModalModel);
