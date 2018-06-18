#   单元测试

script

```bash
"test": "istanbul cover _mocha test/*"
```

dependencies

```bash
npm i chai istanbul mocha
```

./index.js

```js
function add (a, b) {
    return a + b;
}

module.exports = {
    add
};
```

./test/index.test.js

```javascript
const path = require('path');
const fs = require('fs');

const { expect } = require('chai');
const index = require('../index');

describe('test ./index.js', () => {
    beforeEach(() => {
        // ...
    });

    afterEach(() => {
        // ...
    });

    it('test add', () => {
        expect(index.add(1, 2)).to.be.deep.equal(3);
    });
});
```