# Node 快速生成软链接

```javascript
const fse = require('fs-extra');

// const src = 'xxx';
// const targets = [
//     'xxx',
// ];

const src = 'xxx';
const targets = [
    'xxx'
];

targets.forEach((target) => {
    if (!require('fs').existsSync(target)) {
        fse.ensureDirSync(target);
    }

    try {
        fse.removeSync(target);
    } catch(err) {
        
    }
    
    fse.symlinkSync(src, target);
});
```