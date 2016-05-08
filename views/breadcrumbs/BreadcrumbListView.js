define([
    'jquery',
    'underscore',
    'backbone',
    'marionette'
], function($, _, Backbone, Marionette){
    var BreadcrumbsListView = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'breadcrumbs'
    });

    return BreadcrumbsListView;
});