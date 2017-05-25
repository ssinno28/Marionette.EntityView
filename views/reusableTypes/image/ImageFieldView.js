var ImageFieldView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView, imageFieldTemplate) {
    ImageFieldView = ReusableTypeLayoutView.extend({
        initialize: function () {
            this.dataFieldSelector = '.imgUrl';
        },
        template: imageFieldTemplate,
        ui: {
            '$image': '.uploadedImage'
        },
        updateImageUrl: function () {
            var url = this.getDataField().val();

            if (url !== '') {
                this.ui.$image.attr('src', url);
                this.ui.$image.parent().show();
            }
        },
        onDomRefresh: function () {
            this.updateImageUrl();
            this.getDataField().change(_.bind(this.updateImageUrl, this));
        },
        getValue: function () {
            return this.getDataField().val();
        }
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView, this['Templates']['imageFieldTemplate']);
