#   timer

```javascript
function genTimeRunner() {
    var timer = null;
    var shouldBreak = false;

    function clearInterval() {
        clearTimeout(timer);
        shouldBreak = true;
    }

    function setInterval(callback, delay) {
        shouldBreak = false;
        var startTime = new Date().getTime();
        var count = 0;
        var handler = function () {
            clearTimeout(timer);

            count++;
            var offset = new Date().getTime() - (startTime + count * delay);
            var nextTime = delay - offset;
            if (nextTime < 0) {
                nextTime = 0;
            }

            callback();

            if (shouldBreak) {
                return;
            }

            // console.log('修正时间：', nextTime);

            timer = setTimeout(handler, nextTime);
            // console.log(new Date().getTime() - (startTime + count * delay));
        };
        timer = setTimeout(handler, delay);

        return timer;
    }

    return {
        setInterval: setInterval,
        clearInterval: clearInterval
    };
}
```