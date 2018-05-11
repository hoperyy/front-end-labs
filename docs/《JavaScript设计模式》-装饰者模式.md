`decorator`

+ 背景

  在程序开发中，许多时候并不希望某个类天生就非常庞大，一次性包含许多职责。那么我们就可以使用装饰者模式。装饰者模式可以动态地给某个对象添加一些额外的职责，而不会影响从这个类中派生的其他对象。

  在传统的面向对象语言中，给对象添加功能常常使用继承的方式。但是继承的方式并不灵活，会带来很多问题：

  1、会导致超类和子类之间存在强耦合性，当超类改变时，子类也会随之改变。

  2、继承这种方式通常被称为”白箱复用“，”白箱“是相对可见性而言的。在继承方式中，超类的内部细节是对子类可见的，继承常常被认为破坏了封装性。

  而装饰者模式，指的是给对象动态地增加职责的方式。能够在不改变对象自身的基础上，在程序运行期间给对象动态地添加职责。跟继承相比，装饰者是一种更轻便灵活的方式。

+ 模拟传统面向对象语言的装饰者模式

  首先，给 `JavaScript` 对象动态添加或改变职责是很容易的事情，虽然改变了对象自身，但更符合 js 的语言特色，和传统定义中的装饰者模式并不相同。

  模拟传统的装饰者模式的一个例子：原始的飞机 --> 发射导弹的飞机 --> 发射原子弹的飞机

  ```
  // 原始飞机
  var Plane = function() {};

  Plane.prototype.fire = function() {
    console.log('normal fire');
  };

  // 增加两个装饰类，分别是导弹和原子弹

  var MissilePlane = function(plane) {
    this.plane = plane;
  };

  MissilePlane.prototype.fire = function() {
    this.plane.fire();
    console.log('missile fire');
  }

  var AtomPlane = function(plane) {
    this.plane = plane;
  };

  AtomPlane.prototype.fire = function() {
    this.plane.fire();
    console.log('atom fire');
  };
  ```

  效果

  ```
  var plane = new Plane();

  plane = new MissilePlane(plane);
  plane = new AtomPlane(plane);

  plane.fire();
  ```

+ 回到 `JavaScript` 的装饰者

  ```
  var plane = {
    fire: function() {
      console.log('normal fire');
    }
  };

  var missilePlane = function() {
    console.log('missile fire');
  };

  var atomPlane = function() {
    console.log('atom fire');
  };

  var fire1 = plane.fire;

  plane.fire = function() {
    fire1();
    missilePlane();
  };

  var fire2 = plane.fire;

  plane.fire = function() {
    fire2();
    atomPlane();
  };
  ```

+ 装饰函数

  现在要给函数添加一些额外功能。

  一种办法是直接修改函数，但这是最后一种办法，违背了开放-封闭原则。

  另一种办法，就是保留原引用。

  ```
  var a = function() {
    alert(1);
  };

  var _a = a;

  a = function() {
    _a();

    alert(2);
  };
  ```

  但是这种办法有两个问题：

  1、必须维护一个中间变量，但如果装饰链过长，中间变量的数量会越来越多。

  2、`this` 被劫持。

+ 用 AOP 装饰函数

  `before` 和 `after`：

  ```
  // 新增函数在原函数之前执行（前置装饰）
  Function.prototype.before = function(beforeFn) {
    var self = this;

    return function() {
      beforeFn.apply(this, arguments);
      self.apply(this, arguments);
    };
  };

  Function.prototype.after = function(afterFn) {
    var self = this;
    
    return function() {
      self.apply(this, arguments);
      afterFn.apply(this, arguments);
    };
  };
  ```

  如果不想污染原型，可用下面的方式：

  ```
  var before = function(fn, beforeFn) {
  
    return function() {
      beforeFn.apply(this, arguments);
      fn.apply(this, arguments);
    };

  };
  ```

+ AOP 应用实例

  + 数据统计

    即将业务逻辑执行后的数据统计，和前面的代码分开。

  + 插件式的表单验证

    如果没有通过验证，可以直接在 `before` 中阻止原始函数的执行。

  + 动态改变函数的参数

    在 `before` 中可以动态劫持并修改函数参数。

    比如在 `ajax` 请求前动态增加 `ajax` 的参数。