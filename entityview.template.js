/*jshint sub:true*/

/* MIT License

Copyright (c) 2016 Sammi Maan Sinno

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['backbone', 'marionette', 'jquery', 'underscore', 'app', 'moment'],
            function (Backbone, Marionette, $, _, App, moment) {
                return factory(Backbone, Marionette, $, _, App, moment);
            });
    } else {

        if (_.isUndefined(root.App)) {
            root.App = new Marionette.Application();
        }

        // Browser globals
        var exports = factory.call(root, root.Backbone, root.Marionette, root.jQuery, root._, root.App, root.moment);
        _.extend(root, exports);
    }
}(this, function (Backbone, Marionette, jQuery, _, App, moment) {

    /* jshint ignore:start */
    <%= templates %>
    /* jshint ignore:end */

    <%= content %>

    return {
        ErrorView: ErrorView,
        InfoView: InfoView,
        WarningView: WarningView,
        SuccessView: SuccessView,
        TimeoutUtil: TimeoutUtil,
        UriUtil: UriUtil,
        AutoCompleteLayoutView: AutoCompleteLayoutView,
        MultiSelectLayoutView: MultiSelectLayoutView,
        DateTimePickerView: DateTimePickerView,
        SingleLineTextView: SingleLineTextView,
        WyswigView: WyswigView,
        ImageFieldView: ImageFieldView,
        AutoCompleteListView: AutoCompleteListView,
        RadioButtonListView: RadioButtonListView,
        CheckBoxListView: CheckBoxListView,
        CheckBoxView: CheckBoxView,
        SortableItemView: SortableItemView,
        SortableCollectionView: SortableCollectionView,
        FormValidator: FormValidator,
        ReusableTypeLayoutView: ReusableTypeLayoutView,
        MessageBehavior: MessageBehavior,
        DropDownListView: DropDownListView,
        EntityListItemView: EntityListItemView,
        EntityListView: EntityListView,
        EntityLayoutView: EntityLayoutView,
        TreeCompositeView: TreeCompositeView
    };
}));