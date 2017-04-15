var WyswigView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView, wyswigTextTemplate, CKEDITOR) {
    WyswigView = ReusableTypeLayoutView.extend({
        initialize: function (options) {
            ReusableTypeLayoutView.prototype.initialize.call(this, options);

            var $hiddenDiv = $('<div></div>'),
                html = $hiddenDiv.html(this.value),
                imgs = $(html).find('img'),
                self = this;

            _.each(imgs, function (img) {
                var $img = $(img),
                    src = $img.attr('src');

                if (self.isPathAbsolute(src)) {
                    return;
                }

                src = App.API_URL + src;
                $img.attr('src', src);
            });

            this.value = $hiddenDiv.html();
        },
        tag: 'input',
        ui: {
            $editor: '.editor'
        },
        onDomRefresh: function () {
            CKEDITOR.replace(this.dataField, {
                filebrowserBrowseUrl: App.FILE_BROWSER_URL
            });
        },
        template: wyswigTextTemplate,
        isPathAbsolute: function (path) {
            return /^https?:\/\//i.test(path);
        }
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView, this['Templates']['wyswigTemplate'], CKEDITOR);
