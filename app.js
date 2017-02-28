(function (App) {

    var $config = $('#config');
    if ($config.length > 0) {
        var config = JSON.parse(decodeURIComponent($config.val()));
        _.extend(App, config);
    }

    App.isMobile = function () {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        return ((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(userAgent));
    };

    App.keyStrokes = {
        backspace: 8,
        tab: 9,
        enter: 13,
        esc: 27,
        space: 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        insert: 45,
        del: 46
    };

    Backbone.Radio.DEBUG = App.DEBUG_MODE;

    //turn on/off logging based on environment
    if (!App.DEBUG_MODE) {
        console.log = function () {
        };
    }

    //set up simple caching
    var cache = {};
    App.getCache = function (key, store) {
        if (cache[key]) {
            return cache[key];
        }

        if (!store) {
            return undefined;
        }

        var result;
        if (typeof (store) === "function") {
            result = store();
        } else {
            result = store;
        }

        cache[key] = result;
        return result;
    };

    App.setCache = function (key, value) {
        if (_.isUndefined(cache[key]) || _.isNull(cache[key])) {
            cache[key] = value;
        }
    };

    if (_.isUndefined(App.pageSize)) {
        App.pageSize = 10;
    }

    $('#file-manager').on('click', function (e) {
        e.preventDefault();
        BrowseServer();
    });

})(App);