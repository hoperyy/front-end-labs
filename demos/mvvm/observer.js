class Observer {
    constructor(data) {
        this.observe(data);
    }
    observe(data) {
        if (!data || typeof data !== 'object') {
            return;
        }

        Object.keys(data).forEach(key => {
            // 每个子属性都会执行一遍 defineReactive
            this.defineReactive(data, key, data[key]);
            this.observe(data[key]);
        });
    }

    defineReactive(obj, key, value) {
        let that = this;
        // 每个子属性都会生成一个 Dep 实例
        let dep = new Dep();
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                // Dep 有值时才会添加监听，new Watcher 时会： 给 Dep.target 赋值；触发 get；清除 Dep.target
                Dep.target && dep.addSub(Dep.target);
                return value;
            },
            set(newValue) {
                if (newValue !== value) {
                    that.observe(newValue);
                    value = newValue;
                    dep.notify();
                }
            }
        });
    }
}