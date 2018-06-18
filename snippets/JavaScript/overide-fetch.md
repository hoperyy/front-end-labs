```javascript
var overrideFetch = function (onRequestSend, afterRequestReturn) {
        var oldFetch;
        var newFetch = function () {
            var _this = this;
            var args = arguments;

            // 当 fetch 已被支持，说明也支持 Promise 了，可以放心地实用 Promise，不用考虑兼容性
            return new Promise(function (resolve, reject) {
                // when failed to get fetch url, skip report
                oldFetch.apply(_this, args).then(function (response) {
                    resolve(response);
                }).catch(function (err) {
                    reject(err);
                });
            })
        };

        if (window.fetch) {
            oldFetch = window.fetch;
            window.fetch = newFetch;
        } else {
            Object.defineProperty(window, 'fetch', {
                set: function (value) {
                    if (value !== null) {
                        oldFetch = value;
                    }
                },
                get: function () {
                    if (oldFetch) {
                        return newFetch;
                    } else {
                        return null;
                    }
                },
            });
        }
    };
```