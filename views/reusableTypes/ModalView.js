var ModalView;
(function (_, Backbone, $, Marionette, modalTpl) {
    ModalView = Marionette.View.extend({
        template: modalTpl,
        events: {
            'click .no': 'noClick',
            'click .yes': 'yesClick'
        },
        noClick: function (e) {
            e.preventDefault();

            this._channel.trigger('warning-modal:no:' + this.eventName);
            $warningModal.modal('hide');
        },
        yesClick: function (e) {
            e.preventDefault();

            self._channel.trigger('warning-modal:yes:' + this.eventName);
            $warningModal.modal('hide');
        },
        onDomRefresh: function () {
            if (_.isUndefined(eventName)) {
                $warningModal.find('.buttons').hide();
            }
        }
    });
})(_, Backbone, jQuery, Marionette, Templates.modalTpl);