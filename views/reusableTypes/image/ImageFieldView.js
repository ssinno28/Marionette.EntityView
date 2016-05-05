define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'views/reusableTypes/ReusableTypeLayoutView',
    'text!templates/reusableTypes/image/imageFieldTemplate.html',
    'app'
], function ($, _, Backbone, Marionette, ReusableTypeLayoutView, imageFieldTemplate, App) {
    var imageFieldView = ReusableTypeLayoutView.extend({
        initialize: function (options) {
            ReusableTypeLayoutView.prototype.initialize.call(this, options);

            $('[data-field="' + this.dataField + '"]').on('change', this.updateImageUrl);
        },
        template: Marionette.TemplateCache.get(imageFieldTemplate),
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

    return imageFieldView;
})
;