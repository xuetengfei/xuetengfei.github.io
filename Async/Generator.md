?> ES6 诞生以前，异步编程的方法，大概有下面四种。回调函数、事件监听、发布/订阅、Promise 对象。Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。

形式上，Generator 函数是一个普通函数，但是有两个特征。

```md
1. function 关键字与函数名之间有一个星号`*`；
2. 函数体内部使用`yield`表达式（yield 意思就是“产出”），定义不同的内部状态。
```

Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个`遍历器对象`（Iterator Object）。

下一步，必须调用这个遍历器对象的`next方法`，使得指针移向下一个状态。也就是说，每次调用 next 方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个 yield 表达式（或 return 语句）为止。

换言之，Generator 函数是`分段执行`的，`yield` 表达式是`暂停执行`的标记，而`next` 方法可以`恢复执行`。

```javascript
function* xue() {
  yield console.log(1);
  yield console.log(2);
  yield console.log(3);
}
let x = xue();
let init = 1;

document.getElementById('btn').addEventListener('click', () => {
  console.log(x.next());
  console.log(`第${init++}次点击,${new Date().toLocaleString()}`);
});
```

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/generate.jpg" width='300px'/>

代码分析:`let x = xue();`调用这个名字叫`xue`的 Generator 函数，返回一个遍历器对象,`现在的x就是一个遍历器对象`。
Generator 函数里面的每一个 yield 关键字代表暂停。遍历器对象的 next 方法，会使得 Generator 函数前进一步到下一个 yield 暂停点。直至，遍历器对象迭代完毕`done:true`。

### yield 表达式

由于 Generator 函数返回的遍历器对象，只有调用 next 方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield 表达式就是暂停标志。

需要注意的是，yield 表达式后面的表达式，只有当调用 next 方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。

另外需要注意，yield 表达式只能用在 Generator 函数里面，用在其他地方都会报错。

> Generator 函数可以不用 yield 表达式，这时就变成了一个单纯的暂缓执行函数。

```javascript
function* f() {
  console.log('执行了！');
}

var generator = f();

setTimeout(function () {
  generator.next();
}, 2000);

// 2s later -> 执行了！
```

### next 方法的参数

yield 表达式本身没有返回值，或者说总是返回 undefined。next 方法可以带一个参数，该参数就会被当作上一个 yield 表达式的返回值

```javascript
function* foo(x) {
  var y = 2 * (yield x + 1);
  var z = yield y / 3;
  return x + y + z;
}

var a = foo(5);
a.next(); // Object{value:6, done:false}
a.next(); // Object{value:NaN, done:false}
a.next(); // Object{value:NaN, done:true}

var b = foo(5);
b.next(); // { value:6, done:false }
b.next(12); // { value:8, done:false }
b.next(13); // { value:42, done:true }
```

> Generator 与状态机

Generator 是实现状态机的最佳结构。比如，下面的 clock 函数就是一个状态机。

```javascript
// ES5 实现
var ticking = true;
var clock1 = function () {
  if (ticking) console.log('Tick!');
  else console.log('Tock!');
  ticking = !ticking;
};

// Generator 实现
var clock2 = function* () {
  while (true) {
    console.log('Tick!');
    yield;
    console.log('Tock!');
    yield;
  }
};
```

使用 Generator 实现,少了用来保存状态的外部变量 ticking，这样就更简洁，更安全（状态不会被非法篡改）、更符合函数式编程的思想，在写法上也更优雅。

也可以封装多个状态

```js
const clock = function* () {
  const empty = Object.create(null);
  while (true) {
    yield Object.assign(empty, { a: 'red', b: 'green' });
    yield Object.assign(empty, { a: 'white', b: 'black' });
  }
};

let x = clock();

setInterval(() => {
  let res = x.next();
  console.log(res.value);
}, 1000);

// {a: "red", b: "green"}
// {a: "white", b: "black"}
// {a: "red", b: "green"}
// {a: "white", b: "black"}
```

> Generator 异步操作的同步化表达

Loading 界面的逻辑

```javascript
function* loadUI() {
  showLoadingScreen();
  yield loadUIDataAsynchronously();
  hideLoadingScreen();
}
var loader = loadUI();
// 加载UI
loader.next();

// 卸载UI
loader.next();
```

Generator 函数部署 Ajax

```javascript
function* main() {
  var result = yield request('http://some.url');
  var resp = JSON.parse(result);
  console.log(resp.value);
}

function request(url) {
  makeAjaxCall(url, function (response) {
    it.next(response);
  });
}

var it = main();
it.next();
```

> redux-saga

redux-saga 的实现

> async 函数

ES2017 标准引入了 async 函数，使得异步操作变得更加方便。

```javascript
async function fetchJson(url) {
  try {
    let request = await fetch(url);
    let text = await request.text();
    return JSON.parse(text);
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
  }
}
```

完整的调用方法如下

```javascript
fetchJson('http://example.com/api').then(obj => console.log(obj));
```

[async 函数](http://es6.ruanyifeng.com/#docs/async#%E5%90%AB%E4%B9%89)是什么？

它就是 Generator 函数的语法糖。async 函数就是将 Generator 函数的星号`*`替换成 async，将 yield 替换成 await，仅此而已。async 函数对 Generator 函数的改进，(1)内置执行器，自动执行、(2)返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用 then 方法指定下一步的操作。

> UUIDGenerator

UUIDGenerator 是一个 generator 函数，它使用当前时间和随机数计算 UUID 。

```javascript
function* UUIDGenerator() {
  let d, r;
  while (true) {
    yield 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      r = (new Date().getTime() + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }
}
const UUID = UUIDGenerator();

setInterval(() => {
  console.log(UUID.next().value);
}, 300);
```

```
861b9ff5-1062-41ff-967c-bdb81e812d3f
26a146a1-4faf-4ade-8c66-dcb78517c810
3ebd10ab-2f6c-410f-9468-898aa1fb863b
b902cc25-6045-4c6a-b74f-a662bb8f40a5
```

---

参考链接：

1. [Generator 函数的语法 - ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/generator)
2. [22. Generators](http://exploringjs.com/es6/ch_generators.html)
3. [The Basics Of ES6 Generators](https://davidwalsh.name/es6-generators)
4. [3 cases where JavaScript generators rock (+ understanding them) - Gosha Arinich](https://goshakkk.name/javascript-generators-understanding-sample-use-cases/)
