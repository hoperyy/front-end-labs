class Dep {
    constructor() {
        this.subs = [];
    }

    addSub(watcher) {
        this.subs.push(watcher);
    }

    notify() {
        this.subs.forEach(watcher => watcher.update());
    }
}

class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;

        // new watcher 的时候会获取一次值
        this.value = this.get();
    }

    getVal(vm, expr) {
        expr = expr.split('.');

        return expr.reduce((prev, next) => {
            return prev[next];
        }, vm.$data);
    }

    get() {
        Dep.target = this;
        const value = this.getVal(this.vm, this.expr); // 会触发对应属性的 get 方法
        Dep.target = null;
        return value;
    }

    update() {
        const newValue = this.getVal(this.vm, this.expr);
        const oldValue = this.value;

        if (newValue !== oldValue) {
            this.cb(newValue);
        }
    }
}