(function (_, Backbone, Marionette) {
    var DomMixin = {
        createBuffer: function createBuffer() {
            return document.createDocumentFragment();
        },
        appendChildren: function appendChildren(el, children) {
            if (_.isArray(children)) {
                children.forEach(el.appendChild, el)
            } else {
                el.appendChild(children)
            }
        },
        beforeEl: function beforeEl(el, sibling) {
            el.insertBefore(sibling);
        },
        replaceEl: function replaceEl(newEl, oldEl) {
            if (newEl === oldEl) {
                return;
            }

            var parent = oldEl.parentNode;

            if (!parent) {
                return;
            }

            parent.replaceChild(newEl, oldEl);
        },
        detachContents: function detachContents(el) {
            while (el.firstChild) {
                el.removeChild(el.firstChild);
            }
        },
        setInnerContent: function setInnerContent(el, html) {
            el.innerHTML = html
        },
        detachEl: function detachEl(el) {
            if (el.parentNode) el.parentNode.removeChild(el);
        },
        removeEl: function removeEl(el) {
            if (el.parentNode) el.parentNode.removeChild(el);
            this.undelegateEvents();
        },
        findEls: function findEls(selector, context) {
            if (_.isObject(selector)) {
                return [selector]
            } else {
                return this.el.querySelectorAll(selector);
            }
        }
    };

    var NativeViewMixinPatches = {
        _setElement: function (element) {
            Backbone.NativeViewMixin._setElement.call(this, element);
            this.$el = [this.el]
        },

        delegate: function(eventName, selector, listener) {
            var dotIndex = eventName.indexOf('.');
            if (dotIndex > 0) eventName = eventName.slice(0, dotIndex).trim();
            Backbone.NativeViewMixin.delegate.call(this, eventName, selector, listener);
        }
    };

    var MnNativeMixin = _.extend({}, Backbone.NativeViewMixin, NativeViewMixinPatches, DomMixin, {
        constructor: function () {
            this._domEvents = [];
            return Marionette.View.apply(this, arguments);
        }
    });

    var MnCollectionNativeMixin = _.extend({}, Backbone.NativeViewMixin, DomMixin, {
        constructor: function () {
            this._domEvents = [];
            return Marionette.NextCollectionView.apply(this, arguments);
        }
    });

    Marionette.NativeView = Marionette.View.extend(MnNativeMixin);
    Marionette.NativeCollectionView = Marionette.NextCollectionView.extend(MnCollectionNativeMixin);
})(_, Backbone, Marionette);
