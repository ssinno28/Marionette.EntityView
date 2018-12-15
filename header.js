/*jshint sub:true*/

/* MIT License

 Copyright (c) 2017 Sammi Maan Sinno

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

(function (factory) {
    "use strict";

    // Establish the root object, `window` (`self`) in the browser, or `global` on the server.
    // We use `self` instead of `window` for `WebWorker` support.
    var root = (typeof self == 'object' && self.self === self && self) ||
        (typeof global == 'object' && global.global === global && global);

    if (typeof exports !== 'undefined') {
        var _ = require('underscore'),
            Backbone = require('backbone'),
            Marionette = require('backbone.marionette'),
            moment = require('moment'),
            collectionsubset = require('backbone.collectionsubset'),
            combobox = require('@danielfarrell/bootstrap-combobox'),
            cherrytree = require('cherrytree'),
            $;

        try { $ = require('jquery'); } catch (e) {}

        factory(Backbone, Marionette, $, _, new Marionette.Application(), moment, cherrytree, exports);
    }
    else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['backbone', 'backbone.marionette', 'jquery', 'underscore', 'moment', 'cherrytree'],
            function (Backbone, Marionette, $, _, moment, cherrytree) {
                return factory(Backbone, Marionette, $, _, new Marionette.Application(), moment, cherrytree, {});
            });
    } else {

        if (root._.isUndefined(root.App)) {
            root.App = new root.Marionette.Application();
        }

        // Browser globals
        var MnEntityViewExports = factory.call(root, root.Backbone, root.Marionette, root.jQuery, root._, root.App, root.moment, root.cherrytree, {});
        root._.extend(root, MnEntityViewExports);
    }
}(function (Backbone, Marionette, jQuery, _, App, moment, cherrytree, MnEntityView) {
    Backbone.Collection = Backbone.Collection.extend({
        getByCid: function (cid) {
            return this.get({cid: cid});
        }
    });