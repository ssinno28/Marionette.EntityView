var ImageFieldView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView, imageFieldTemplate) {
    ImageFieldView = ReusableTypeLayoutView.extend({
        initialize: function (options) {
            ReusableTypeLayoutView.prototype.initialize.call(this, options);

            this.model = new Backbone.Model({value: this.getOption('value')});
            $('[data-field="' + this.dataField + '"]').on('change', this.updateImageUrl);
        },
        template: imageFieldTemplate,
        ui: {
            '$image': '.uploadedImage'
        },
        updateImageUrl: function (localUrl) {
            var url = $('[data-field="' + this.dataField + '"]').val();

            if (url !== '') {
                this.ui.$image.attr('src', localUrl + url);
                this.ui.$image.parent().show();
            }
        },
        onDomRefresh: function () {
            this.updateImageUrl(App.API_URL + '/');
        }
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView, this['Templates']['imageFieldTemplate']);
