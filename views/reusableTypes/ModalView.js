var ModalView;
(function (_, Backbone, $, Marionette, modalTpl, ModalModel) {
    ModalView = Marionette.View.extend({
        model: ModalModel,
        template: modalTpl,
        constructor: function (options) {
            _.each(options,
                _.bind(function (option) {
                    var funcName = option.type + 'Click';
                    this.events['click .' + option.type] = funcName;

                    this[funcName] = _.bind(function (e) {
                        e.preventDefault();

                        this._channel.trigger(this.getOption('name') + ':' + option.type);
                        this.$el.modal('hide');
                    }, this);
                }, this));
        },
        initialize: function () {
            this._channel = Backbone.Radio.channel(this.getOption('channel'));
            this.on('destroy', this._destroyRadio);
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

            _.each(this.model.get('options',
                _.bind(function (option) {
                    var html =
                        Marionette.Renderer.render(
                            '<button type="button" class="btn btn-primary <%= type %>" ' +
                            '<% if(dismiss) { %> data-dismiss="modal" <% } %>> <%= text %>' +
                            '</button>',
                            option
                        );

                    this.ui.$modalFooter.append(html);
                }, this)));
        },
        onDomRefresh: function () {
            if (_.isUndefined(this.model.get('name'))) {
                this.$el.find('.buttons').hide();
            }

            this.$el.modal('show');
        },
        _destroyRadio: function () {
            this._channel.stopReplying(null, null, this);
        }
    });
})(_, Backbone, jQuery, Marionette, Templates.modalTpl, ModalModel);