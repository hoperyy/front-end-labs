## Browser ajax
 
```javascript
var _encodeURIComponent = encodeURIComponent;

var SEARCH_DELIMIT = '?';
var PARAM_DELIMIT = '&';
var GET_METHOD = 'GET';

function serialize(obj) {
    var result = [];
    for (var name in obj) {
        if (obj.hasOwnProperty(name)){
            var value = '';
            if(typeof obj[name] == 'object') {
                value = JSON.stringify(obj[name]);
            } else {
                value = obj[name];
            }
            result.push(_encodeURIComponent(name) + '=' + _encodeURIComponent(value));
        }
    }
    return result.join(PARAM_DELIMIT).replace(/%20/g, '+');
}

function ajax(opts) {
    /*
        * opts: {}
        * opts.type: 'get'/'post'
        * opts.url: url
        * opts.dataType: 'json'/...
        * opts.success: success callback
        * opts.error: error callback
        */

    var xhr = new XMLHttpRequest();
    var type = opts.type;
    var url = opts.url;
    var data = opts.data;

    type = type && type.toUpperCase() || GET_METHOD;

    data = serialize(data);

    // if (querystring) {
    //     url += (url.indexOf(SEARCH_DELIMIT) === -1 ? SEARCH_DELIMIT : PARAM_DELIMIT) + querystring;
    // }

    xhr.open(type, url, true);

    xhr.onreadystatechange = function() {
        var result;
        var error = opts.error;
        var success = opts.success;

        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                var result = xhr.responseText;

                if (opts.dataType === 'json') {
                    try {
                        result = JSON.parse(result);
                    } catch (e) {
                        error && error(e, 'parsererror', xhr);
                        return
                    }
                }

                success && success(result, xhr);
            } else {
                error && error(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr);
            }
        }
    }

    var xhrFields = {
        withCredentials: true
    };
    for (var name in xhrFields) {
        xhr[name] = xhrFields[name];
    }

    var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*'
    };

    for (var name in headers) {
        xhr.setRequestHeader(name, headers[name]);
    }

    xhr.send(data || null);
}

ajax({
    url: ...,
    type: 'post',
    dataType: 'json',
    success: function() {

    },
    error: function() {
        
    }
});
```