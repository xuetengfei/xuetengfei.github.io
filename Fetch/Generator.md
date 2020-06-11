?> ES6 诞生以前，异步编程的方法，大概有下面四种。回调函数、事件监听、发布/订阅、Promise 对象。Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。

形式上，Generator 函数是一个普通函数，但是有两个特征。

1. function 关键字与函数名之间有一个星号`*`；
2. 函数体内部使用`yield`表达式（yield 意思就是“产出”），定义不同的内部状态。

Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个遍历器对象（Iterator Object）。

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

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/generate.jpg" />

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

setTimeout(function() {
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
var ticking = true;
var clock = function() {
    if (ticking) console.log('Tick!');
    else console.log('Tock!');
    ticking = !ticking;
};
```

上面代码的 clock 函数一共有两种状态（Tick 和 Tock），每运行一次，就改变一次状态。这个函数如果用 Generator 实现，就是下面这样。

```javascript
var clock = function*() {
    while (true) {
        console.log('Tick!');
        yield;
        console.log('Tock!');
        yield;
    }
};
```

上面的 Generator 实现与 ES5 实现对比，可以看到少了用来保存状态的外部变量 ticking，这样就更简洁，更安全（状态不会被非法篡改）、更符合函数式编程的思想，在写法上也更优雅。Generator 之所以可以不用外部变量保存状态，是因为它本身就包含了一个状态信息，即目前是否处于暂停态。

> Generator 异步操作的同步化表达

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

上面代码中，第一次调用 loadUI 函数时，该函数不会执行，仅返回一个遍历器。下一次对该遍历器调用 next 方法，则会显示 Loading 界面（showLoadingScreen），并且异步加载数据（loadUIDataAsynchronously）。等到数据加载完成，再一次使用 next 方法，则会隐藏 Loading 界面。可以看到，这种写法的好处是所有 Loading 界面的逻辑，都被封装在一个函数，按部就班非常清晰。

Ajax 是典型的异步操作，通过 Generator 函数部署 Ajax 操作，可以用同步的方式表达。

```javascript
function* main() {
    var result = yield request('http://some.url');
    var resp = JSON.parse(result);
    console.log(resp.value);
}

function request(url) {
    makeAjaxCall(url, function(response) {
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

---

参考链接：

1. [Generator 函数的语法 - ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/generator)
2. [22. Generators](http://exploringjs.com/es6/ch_generators.html)
3. [The Basics Of ES6 Generators](https://davidwalsh.name/es6-generators)
4. [3 cases where JavaScript generators rock (+ understanding them) - Gosha Arinich](https://goshakkk.name/javascript-generators-understanding-sample-use-cases/)
