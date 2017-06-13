var WyswigView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView, wyswigTextTemplate) {
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
        },
        getValue: function () {
            var dataField = this.$el.attr('data-field'),
                dataProp = this.$el.attr('data-property'),
                key = _.isUndefined(dataField) ? dataProp : dataField;

            var editor = CKEDITOR.instances[key];

            var val = $.trim(editor.getData());
            var $hiddenDiv = $('<div></div>'),
                html = $hiddenDiv.html(val),
                imgs = $(html).find('img');

            _.each(imgs, function (img) {
                var $img = $(img),
                    src = $img.attr('src');

                if (src.indexOf(App.API_URL) > -1) {
                    src = src.replace(App.API_URL, '');
                    $img.attr('src', src);
                }
            });

            return $hiddenDiv.html();
        }
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView, this['Templates']['wyswigTemplate']);
