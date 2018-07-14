+   检查是否是子元素

    ```javascript
    function isChild(child, parent) {
        var isChild = false;

        while(child) {
            if (child === parent) {
                isChild = true;
                break;
            }

            child = child.parentNode;
        }

        return isChild;
    }
    ```