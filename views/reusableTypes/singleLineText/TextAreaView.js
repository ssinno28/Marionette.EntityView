var TextAreaView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView, textAreaTemplate) {
    TextAreaView = ReusableTypeLayoutView.extend({
        initialize: function(options){
            ReusableTypeLayoutView.prototype.initialize.call(this, options);
        },
        template: textAreaTemplate
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView, this['Templates']['textAreaTemplate']);
