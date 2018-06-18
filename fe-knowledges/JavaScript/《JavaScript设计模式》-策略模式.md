[issue](https://github.com/hoperyy/blog/issues/41)

策略模式的定义是：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。

## 应用场景：使用策略模式计算奖金

+ 最初版本

  ```
  var calculateBonus = function(performanceLevel, salary) {
    if (performanceLevel ===  'S') {
      return salary * 4;
    }

    if (performanceLevel ===  'A') {
      return salary * 3;
    }

    if (performanceLevel ===  'B') {
      return salary * 2;
    }
  };

  calculateBonus('B', 20000);
  calculateBonus('S', 6000);
  ```

  这段代码的缺点如下：

  1、calculateBonus 函数比较庞大，包含了很多 if-else 语句，这些语句需要覆盖所有的逻辑分支。

  2、calculateBonus 函数缺乏弹性，后面新增了绩效等级的话，就要深入内部修改代码，违反了开发-封闭原则。

  3、算法的复用性差，如果在程序的其他地方需要重用这些计算奖金的算法呢？只有复制、粘贴了。

+ 改进1：封装算法。

  ```
  var performanceS = function(salary) {
    return salary * 4;
  };

  var performanceA = function(salary) {
    return salary * 3;
  };

  var performanceB = function(salary) {
    return salary * 2;
  };

  var calculateBonus = function(performanceLevel, salary) {
    if (performanceLevel === 'S') {
      return performanceS(salary);
    }

    if (performanceLevel === 'A') {
      return performanceS(salary);
    }

    if (performanceLevel === 'B') {
      return performanceS(salary);
    }
  };

  calculateBonus('A', 10000); // 30000
  ```

  改进点：封装了策略。 

  Context 接收用户请求并委托策略。

  但策略不可替换，如果要替换，还是要修改 Context，并不优雅。

+ 改进2：使用策略模式重构代码（模仿传统面向对象语言中的实现）

  先把每种绩效的计算规则都封装在对应的策略类里面：

  ```
  var performanceS = function() {};

  performanceS.prototype.calculate = function(salary) {
    return salary * 4;
  };

  var performanceA = function() {};

  performanceA.prototype.calculate = function(salary) {
    return salary * 3;
  };

  var performanceB = function() {};

  performanceB.prototype.calculate = function(salary) {
    return salary * 2;
  };
  ```

  接下来定义奖金类 Bonus：

  ```
  var Bonus = function() {
    this.salary = null;
    this.strategy = null;
  };

  Bonus.prototype.setSalary = function(salary) {
    this.salary = salary;
  };

  // 设置策略对象
  Bonus.prototype.setStrategy = function(strategy) {
    this.salary = strategy;
  };

  Bonus.prototype.getBonus = function() {
    return this.strategy.calculate(this.salary);
  };
  ```

  改进点：相对于版本 2，这个版本的 Context 委托策略就很优雅了，策略是可替换的。

+ 改进3：`JavaScript` 版本的策略模式

  ```
  var strategies = {
    'S': function(salary) {
      return salary * 4;
    },
    'A': function(salary) {
      return salary * 3;
    },
    'B': function(salary) {
      return salary * 2;
    }
  };

  var calculateBonus = function(strategy, salary) {
    return strategies[strategy](salary);
  };
  ```

+ 对以上的总结

  策略模式的思想：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。

  策略模式的实现：1、定义策略；2、利用 Context 接收请求并委托给 strategy 对象。

  通过使用策略模式重构代码，可以消除原程序中大片的条件分支语句。

## 应用场景：表单校验

+ 版本 1

  ```
  var registerForm = document.getElementById('registerForm');

  registerForm.onsubmit = function() {
    if (registerForm.userName.value === '') {
      alert('用户名不能为空');
      return false;
    }

    if (registerForm.password.value.length < 6) {
      alert('密码长度不能少于 6 位');
      return false;
    }

    if (!/^1[3|5|8][0-9]{9}$/.test(registerForm.phoneNumber.value)) {
      alert('手机号码格式不正确');
      return false;
    }
  };
  ```

  缺点：

  1、if else 多

  2、缺乏弹性，应付不了后面可能新增的规则，违反开放-封闭原则

  3、复用性差

+ 版本 2：策略模式

  实现策略

  ```
  var strategies = {
    isNonEmpty: function(value, errorMsg) {
      if (value === '') {
        return errorMsg;
      }
    },
    minLength: function(value, length, errorMsg) {
      if (value.length < length) {
        return errorMsg;
      }
    },
    isMobile: function(value, errorMsg) {
      if (!/^1[3|5|8][0-9]{9}$/.test(value)) {
        return errorMsg;
      }
    }
  };
  ```

  实现一个 Validator 类作为 Context，负责接收用户的请求并委托给策略。

  ```
  var validatorFunc = function() {
    var validator = new Validator();

    validator.add(registerForm.urerName, 'isNonEmpty', '用户名不能为空');
    validator.add(registerForm.password, 'minlength:6', '密码长度不能少于 6 位');
    validator.add(registerForm.phoneNumber, 'isMobile', '手机号码格式不正确');

    var errorMsg = validator.start();

    return errorMsg;
  };

  registerForm.onsubmit = function() {
    var errorMsg = validatorFunc();

    if (errorMsg) {
      alert(errorMsg);
      return false; // 阻止表单提交
    }
  };
  ```

  `Validator` 的实现

  ```
  var Validator = function() {
    this.cache = [];
  };

  Validator.prototype.add = function(dom, rule, errorMsg) {
    var ary = rul.split(':');
    this.cache.push(function() {
      var strategy = ary.shift();
      ary.unshift(dom);
      ary.push(errorMsg);
      return strategies[strategy].apply(dom, ary);
    });
  };

  Validator.prototype.start = function() {
    for (var i = 0, validatorFunc; validatorFunc = this.cache[i]; i++) {
      var msg = validatorFunc();
      if (msg) {
        return msg;
      }
    }
  };
  ```

  添加多种校验规则

  使用方式

  ```
  validator.add(registorForm.userName, [{
    strategy: 'isNonEmpty',
    errorMsg: '用户名不能为空'
  }, {
    strategy: 'minLength: 6',
    errorMsg: '用户名不能小于 6 位'
  }]);
  ```

  ```
  var Validator = function() {
    this.cache = [];
  };

  Validator.prototype.add = function(dom, rules) {
    var self = this;

    for (var i = 0, rule; rule = rules[i++];) {
      (function() {
        var strategyAry = rule.strategy.split(':');
        var errorMsg = rule.errorMsg;

        self.cache.push(function() {
          var strategy = strategyAry.shift();
          strategyAry.unshift(dom);
          strategyAry.push(errorMsg);

          return strategies[strategy].apply(dom, strategyAry);
        });
      })();
      
    }
  };
  ```

