[issue](https://github.com/hoperyy/blog/issues/41)

举例一个电灯开关，电灯在 “开灯”、“强光”、“弱光”、“关灯” 之间切换。

+ 传统的写法：

  ```
  var Light = function() {
    this.state = 'off';
    this.button = null;
  };

  Light.prototype.buttonWasPressed = function() {
    if (this.state === 'off') {
      console.log('弱光');
      this.state = 'weakLight';
    } else if (this.state === 'weakLight') {
      console.log('强光');
      this.state = 'strongLight';
    } else if (this.state === 'strongLight') {
      console.log('关灯');
      this.state = 'off';
    }
  };

  Light.prototype.init = function() {
    var self = this;
    var button = document.createElement('button');

    button.innerHTML = '开关';
    this.button = document.appendChild(button);

    this.button.onclick = function() {
      self.buttonWasPressed();
    };
  };

  var light = new Light();

  light.init();
  ```

  这样写的缺点：

  1、buttonWasPressed 方法是违反开放-封闭原则的，如果电灯新增了状态，就要修改这个方法，这个方法就很不稳定。

  2、如果新增状态， buttonWasPressed 会膨胀。

  3、状态切换很不明显，表现在 state 的赋值很容易被漏掉，而这个代码是及其重要的。

+ 用状态模式改进电灯程序

  一般而言，谈到封装，一般会优先封装对象的行为，而不是对象的状态。

  但是在状态模式中刚好相反，状态模式的关键是把事物的每种状态都封装成单独的类，和此种状态有关的行为都被封装在这个类的内部。

  其他地方切换状态时，只需要将请求委托给状态对象即可，状态对象会负责自身的行为。

  先定义状态类，将行为封装到类里：

  ```
  var OffLightState = function(light) {
  };

  OffLightState.prototype.action = function() {
    console.log('弱光');
  };

  var WeakLightState = function() {
  };

  WeakLightState.prototype.action = function() {
    console.log('强光');
  };

  var StrongLightState = function() {
  };

  StrongLightState.prototype.action = function() {
    console.log('关灯');
  };
  ```

  定义 `Light` 类

  ```
  var Light = function() {
    
    this.button = null;
  };

  Light.prototype.init = function() {
    var self = this;
    var button = document.createElement('button');

    button.innerHTML = '开关';
    this.button = document.appendChild(button);

    this.button.onclick = function() {
      this.currentState.action();
    };
  };
  ```

  `Light` 类用 `currentState` 获得当前状态，在各个状态类里，需要可以改变 `currentState`，因此状态里需要获取 `Light` 的实例对象；

  各个状态类的行为里，需要知道其他状态，通过 `Light` 实例获取其他状态类也是不错的方法。

  如果要新增一个状态，如超强光，可这样写代码：

  ```
  var SuperStrongLight = function(light) {
    this.light = light;
  };

  SuperStrongLight.prototype.action = function() {
    console.log('超强光');

    this.light.currentState = this.light.superStrongLight;
  };
  ```

  ```
  var Light = function() {
    this.superStrongLight = new SuperStrongLight(this);
    xxx...
  };
  ```

+ 上面方法的缺点

  每次要增加一个状态，就要多写一个类。

  并且这个类都要有 `action` 方法，否则会报错。

  下面是一个改进方案

  ```
  var State = function() {};

  State.prototype.action = function() {
    throw new Error('action 必须被重写');
  };

  var SuperStrongLight = function() {};

  SuperStrongLight.prototype = new State();

  SuperStrongLight.prototype.action = function() {};
  ```

+ JavaScript 版本的状态机

  和上面方法的区别，就是去掉了各个状态类，而是直接用字面量表示。

  ```
  var FSM = {
    off: {
      action: function() {
        console.log('关灯');
        this.currentState = FSM.on;
      }
    },
    on: {
      action: function() {
        console.log('开灯');
        this.currentState = FSM.off;
      }
    }
  };

  var Light = function() {
    
    this.button = null;
  };

  Light.prototype.init = function() {
    var self = this;
    var button = document.createElement('button');

    button.innerHTML = '开关';
    this.button = document.appendChild(button);

    this.currentState = FSM.on;

    this.button.onclick = function() {
      this.currentState.action.apply(self);
    };
  };
  ```

  另外，可以用闭包实现 `this.currentState.action()`


