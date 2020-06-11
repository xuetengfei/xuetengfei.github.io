call 和 apply 都是为了解决改变 this 的指向。作用都是相同的，只是传参的方式不同。
除了第一个参数外，call 可以接收一个参数列表，apply 只接受一个参数数组。

bind 的作用与 call 和 apply 相同，区别是 call 和 apply 是立即调用函数，而 bind 是返回了一个函数，需要调用的时候再执行.
并且我们可以通过 bind 实现柯里化。

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
