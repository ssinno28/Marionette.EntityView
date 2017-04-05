var TextAreaView;
(function ($, _, Backbone, Marionette, ReusableTypeLayoutView, textAreaTemplate) {
    TextAreaView = ReusableTypeLayoutView.extend({
        initialize: function(options){
            ReusableTypeLayoutView.prototype.initialize.call(this, options);

            this.model = new Backbone.Model({value: this.getOption('value')});
        },
        template: textAreaTemplate
    });
})(jQuery, _, Backbone, Marionette, ReusableTypeLayoutView, this['Templates']['textAreaTemplate']);
