[issue](https://github.com/hoperyy/blog/issues/41)

职责链模式的定义是：多个对象连成一条链，请求沿着这条链传递，直到有一个对象处理它为止。

+ 一个灵活可拆分的职责链代码

  ```
  var order500 = function(orderType, pay, stock) {
    if (orderType === 1 && pay === true) {
      console.log('500 元定金预约，得到 100 元优惠券');
    } else {
      return `nextSuccessor`
    }
  };

  var order200 = function(orderType, pay, stock) {
    if (orderType === 2 && pay === true) {
      console.log('200 元定金预约，得到 50 元优惠券');
    } else {
      return `nextSuccessor`
    }
  };

  var orderNormal = function(orderType, pay, stock) {
    if (stock > 0) {
      console.log('普通购买，无优惠券');
    } else {
      console.log('手机库存不足');
    }
  };
  ```

  下面将函数包装进职责链节点，需要定义个构造函数 Chain，这样使用

  ```
  var chainOrder500 = new Chain(order500);
  var chainOrder200 = new Chain(order200);
  var chainOrderNormal = new Chain(orderNormal);

  chainOrder500.setNextSuccessor(chainOrder200);
  chainOrder200.setNextSuccessor(chainOrderNormal);

  chainOrder500.passRequest(1, true, 500); // 展示结果
  ```

  对照上面的用法，Chain 可以这样定义

  ```
  var Chain = function(fn) {
    this.fn = fn;
  };

  Chain.prototype.setNextSuccessor = function(nextSuccessor) {
    return this.nextSuccessor = nextSuccessor;
  };

  Chain.prototype.passRequest = function() {
    var rt = this.fn.apply(this, arguments);

    if (rt === 'nextSuccessor') {
      this.nextSuccessor.apply(this.nextSuccessor, arguments);
    }
  };
  ```

+ 异步的职责链

  原来的函数向下级传递的是通过同步的 `nextSuccessor` 标志，现在只需要增加一个 `next` 方法手动触发下级函数的执行即可。

  原始函数的执行上下文都被设定为了包装实例对象。

  ```
  Chain.prototype.next = function() {
    return this.nextSuccessor && this.nextSuccessor.apply(this.nextSuccessor, arguments);
  };
  ```

  应用：

  ```
  var fn1 = new Chain(function() {
    console.log('fn1');
    return 'nextSuccessor';
  });

  var fn2 = new Chain(function() {
    console.log('fn2');
  
    var self = this;
    setTimeout(function() {
      self.next();
    }, 2000);
  });

  var fn3 = new Chain(function() {
    console.log('fn3');
  });

  fn1.nextSuccessor(fn2).nextSuccessor(fn3);

  fn1.passRequest();
  ```

+ 用 AOP 实现职责链

  ```
  Function.prototype.after = function(afterFn) {
    var self = this;

    return function() {
      var ret = self.apply(this, arguments);

      if (ret === 'nextSuccessor') {
        ret = afterFn.apply(this, arguments);
      }

      return ret;
    };
  };
  ```

+ 职责链模式的优缺点

  + 优点

    避免了维护一个充斥着分支语句的函数

    职责链上的节点可以灵活地拆分充足

    可以手动指定初始节点，减少判断此时，这在普通的 if 语句中是无法实现的
  
  + 缺点

    不是每个节点都能正确处理请求，因此必须手动指定一个保底的处理方式

    多了一些节点对象，从性能上考虑不是很好


