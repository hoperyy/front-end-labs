# node 错误处理

```javascript
process.on('uncaughtException', () => {
    // console.log('uncaughtException 事件');
    process.exit(1);
});

process.on('SIGINT', () => {
    // console.log('SIGINT 事件');
    process.exit(1);
});

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});
```