#   tryjs

```javascript
module.exports = function(fn, backupFn) {
    return function() {
        try {
            fn.apply(this, arguments);
        } catch(err) {
            console.warn('err: ', err);

            if (!backupFn || typeof backupFn !== 'function') {
                return;
            }

            var args = Array.prototype.slice.call(arguments, 0);
            args.unshift(err);

            backupFn.apply(this, args);
        }
    };
};
```

usage

```javascript
var fn = function() {
    console.log(a); // will throw error
};

fn(); // throw Error: a is not defined

fn = tryjs(fn);

fn(); // catched
```