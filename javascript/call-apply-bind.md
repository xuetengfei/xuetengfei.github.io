## this 丢失

```js
let user = {
  firstName: 'John',
  sayHi() {
    console.log(`Hello, ${this.firstName}!`);
  },
};

setTimeout(user.sayHi, 1000); // Hello, undefined!

let f = user.sayHi;
setTimeout(f, 1000); // Hello, undefined!

// 这是因为 setTimeout 获取到了函数 user.sayHi，但它和对象分离开了。
```

```js
let user = {
  firstName: 'John',
  sayHi() {
    console.log(`Hello, ${this.firstName}!`);
  },
};
setTimeout(function () {
  user.sayHi(); // Hello, John!
}, 1000);
// or
setTimeout(() => user.sayHi(), 1000); // Hello, John!
```

活着解决方案 1：最简单的解决方案是使用一个包装函数。解决方案 2：函数提供了一个内
建方法 bind，它可以绑定 this。

## bind

```javascript
const logger = function () {
  console.log(this.name);
};

const fun = logger.bind({ name: 'Order' });

fun();
```

[Lodash bindAll Documentation](https://lodash.com/docs/4.17.15#bindAll)

```js
var view = {
  label: 'docs',
  click: function () {
    console.log('clicked ' + this.label);
  },
};

_.bindAll(view, ['click']);
jQuery(element).on('click', view.click);
// => 'clicked docs'
```

## call、apply

call 和 apply 都是为了解决改变 this 的指向。作用都是相同的，只是传参的方式不同。
除了第一个参数外，call 可以接收一个参数列表，apply 只接受一个参数数组。

bind 的作用与 call 和 apply 相同，区别是 call 和 apply 是立即调用函数，而 bind
是返回了一个函数，需要调用的时候再执行. 并且我们可以通过 bind 实现柯里化。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200608144739无标题-2020-04-26-1620.jpg' alt='20200608144739无标题-2020-04-26-1620'/>

```js
function describe(color, sound) {
  return `${this.name}是一只${color}的${this.type},叫声是${sound}`;
}

const wangcai = {
  name: '旺财',
  type: '狗',
};

const xiaodou = {
  name: '小豆豆',
  type: '猫',
};

const r1 = describe.call(wangcai, 'black', '汪汪');
const r2 = describe.apply(xiaodou, ['white', '喵喵']);
const r3 = describe.bind(xiaodou, 'white', '喵喵');

console.log('r1: ', r1);
console.log('r2: ', r2);
console.log('r3: ', r3());

// r1:  旺财是一只black的狗,叫声是汪汪
// r2:  小豆豆是一只white的猫,叫声是喵喵
// r3:  小豆豆是一只white的猫,叫声是喵喵
```

一个简单的 bind 函数实现如下

```javascript
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  var _this = this;
  var args = [...arguments].slice(1);
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments);
    }
    return _this.apply(context, args.concat(...arguments));
  };
};
```

## console.error.bind(console)

[console.error.bind(console) 到底是做什么的？](https://www.tjvantoll.com/2015/12/29/console-error-bind/)

```javascript
function someAsyncTask() {
  return new Promise(function (resolve, reject) {
    reject(a);
  });
}
someAsyncTask().then(
  function () {},
  function () {
    console.log('this', this); // 我尝试后，发现现在的this的确指向window
    console.error; // 不在需要 console.error.bind(console) bind操作了
  },
);
```
