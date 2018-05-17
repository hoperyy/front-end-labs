const CompileUtil = {
    text(node, vm, expr) { // 文本处理
        let updateFn = this.updater['textUpdater'];
        // 文本比较特殊 expr可能是'{{message.a}} {{b}}'
        // 调用getTextVal方法去取到对应的结果
        let value = this.getTextVal(vm, expr);

        expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
            new Watcher(vm, arguments[1], (newValue) => {
                updateFn && updateFn(node, this.getTextVal(vm, expr));
            });
        });

        updateFn && updateFn(node, value);
    },
    getTextVal(vm, expr) { // 获取编译文本后的结果
        return expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
            // 依次去去数据对应的值
            return this.getVal(vm, arguments[1]);
        })
    },
    getVal(vm, expr) { // 获取实例上对应的数据
        expr = expr.split('.'); // {{message.a}} [message,a] 实现依次取值
        // vm.$data.message => vm.$data.message.a
        return expr.reduce((prev, next) => {
            return prev[next];
        }, vm.$data);
    },
    setVal(vm, expr, value) {
        expr = expr.split('.');
        return expr.reduce((prev, next, currentIndex) => {
            if (currentIndex === expr.length - 1) {
                return prev[next] = value;
            }
            return prev[next];
        }, vm.$data);
    },
    model(node, vm, expr) { // 输入框处理
        let updateFn = this.updater['modelUpdater'];
        // 这里应该加一个监控 数据变化了 应该调用这个watch的callback 
        new Watcher(vm, expr, (newValue) => {
            updateFn && updateFn(node, newValue);
        });

        // 监听输入事件
        node.addEventListener('input', (e) => {
            const newValue = e.target.value;
            this.setVal(vm, expr, newValue);
        });

        updateFn && updateFn(node, this.getVal(vm, expr));
    },
    // 操作 dom
    updater: {
        // 文本更新
        textUpdater(node, value) {
            node.textContent = value
        },
        // 输入框更新
        modelUpdater(node, value) {
            node.value = value;
        }
    }
}

class Compile {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;

        if (this.el) {
            let fragment = this.node2fragment(this.el);

            this.compile(fragment);

            this.el.appendChild(fragment);
        }
    }

    isDirective(name) {
        return name.includes('v-');
    }

    isElementNode(node) {
        return node.nodeType === 1;
    }

    compile(fragment) {
        let childNodes = fragment.childNodes;

        Array.from(childNodes).forEach(node => {
            if (this.isElementNode(node)) {
                this.compileElement(node);
                this.compile(node);
            } else {
                this.compileText(node);
            }
        });
    }

    compileElement(node) {
        let attrs = node.attributes;


        Array.from(attrs).forEach(attr => {
            let attrName = attr.name;

            console.log(attrName, this.isDirective(attrName));

            if (this.isDirective(attrName)) {
                let expr = attr.value;
                let [, type] = attrName.split('-');

                CompileUtil[type](node, this.vm, expr);
            }
        });
    }

    compileText(node) {
        let expr = node.textContent;
        let reg = /\{\{([^}]+)\}\}/g;
        if (reg.test(expr)) {
            CompileUtil['text'](node, this.vm, expr);
        }
    }

    node2fragment(el) {
        let fragment = document.createDocumentFragment();
        let firstChild;

        while (firstChild = el.firstChild) {
            fragment.appendChild(firstChild);
        }

        return fragment;
    }
}