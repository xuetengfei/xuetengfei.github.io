# 原型上面添加函数

```javascript
Function.prototype.before = function (beforefun) {
  //函数调用前执行
  let _this = this; // 保存原函数引用
  return function () {
    // 返回包含了原函数和新函数的"代理函数"
    beforefun.apply(this, arguments); // 执行新函数，修正this
    return _this.apply(this, arguments); // 执行原函数
  };
};

Function.prototype.after = function (afterfun) {
  let _this = this; // 保存原函数引用
  return function () {
    // 返回包含了原函数和新函数的"代理函数"
    let ret = _this.apply(this, arguments); // 执行原函数
    afterfun.apply(this, arguments); // 执行新函数，修正this
    return ret;
  };
};

// 利用前面的before、after方法实现
Function.prototype.around = function (beforeFun, afterFun) {
  var _this = this;
  return function () {
    return _this.before(beforeFun).after(afterFun).apply(this, arguments);
  };
};
```

## 代码实践

```js
// Function.prototype.before code
// Function.prototype.after code 
// Function.prototype.around code
  
const Step1 = function (orderType, isPaid, stock) {
  console.log(`run ~ Step1`);
};

const Step2 = function (orderType, isPaid, stock) {
  console.log(`run ~ Step2`);
};

const Step3 = function (orderType, isPaid, stock) {
  console.log(`run ~ Step3`);
};

const order = Step1.after(Step2).after(Step3);
const order2 = Step1.before(Step2).before(Step3);
const order3 = Step1.around(Step2, Step3);

order(1, true, 10);
console.log('--------');
order2(1, true, 10);
console.log('--------');
order3(1, true, 10);

```

print result

```md
run ~ Step1
run ~ Step2
run ~ Step3
--------
run ~ Step3
run ~ Step2
run ~ Step1
--------
run ~ Step2
run ~ Step1
run ~ Step3
```