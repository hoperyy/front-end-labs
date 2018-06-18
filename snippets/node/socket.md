# Node socket

客户端

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.1/socket.io.js"></script>
<script>
var socket = io.connect('//127.0.0.1:3000', {
    reconnection: false
});
socket.on('connect', function () {
    socket.on('page-reload', function (data) {
        window.location.reload();
    });
});
</script>
```

server

```javascript
var io = require('socket.io')(3000);

io.emit('page-reload', { data: 'test' });
```