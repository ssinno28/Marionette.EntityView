define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'views/reusableTypes/ReusableTypeLayoutView',
    'text!templates/reusableTypes/wyswigTemplate.html',
    'app'
], function ($, _, Backbone, Marionette, ReusableTypeLayoutView, wyswigTextTemplate, App) {
    var wyswigView = ReusableTypeLayoutView.extend({
        initialize: function (options) {
            ReusableTypeLayoutView.prototype.initialize.call(this, options);

            var value = this.model.get('value'),
                $hiddenDiv = $('<div></div>'),
                html = $hiddenDiv.html(value),
                imgs = $(html).find('img'),
                self = this;

            _.each(imgs, function(img){
                var $img = $(img),
                    src = $img.attr('src');

                if(self.isPathAbsolute(src)){
                    return;
                }

                src = App.API_URL + src;
                $img.attr('src', src);
            });

            this.model.set({value: $hiddenDiv.html()})
        },
        tag: 'input',
        ui: {
            $editor: '.editor'
        },
        onDomRefresh: function () {
            var self = this;

            require(['libs/ckeditor/ckeditor', 'libs/ckeditor/adapters/jquery'], function () {
                CKEDITOR.replace(self.dataField, {
                    filebrowserBrowseUrl: '/AchillesCR.Web/js/libs/filemanager/index.html'
                });
            });
        },
        template: Marionette.TemplateCache.get(wyswigTextTemplate),
        isPathAbsolute: function (path) {
            return /^https?:\/\//i.test(path);
        }
    });

    return wyswigView;
});