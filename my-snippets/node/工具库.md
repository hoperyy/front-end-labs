# Node 工具库

+   匹配

    anymatch: https://www.npmjs.com/package/anymatch

    ```
    anymatch
    ```

+   判断是否是 generator 函数

    ```javascript
    function isGeneratorFunction(obj) {
        var constructor = obj.constructor;
        if (!constructor) return false;
        if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
        return isGenerator(constructor.prototype);
    }
    ```