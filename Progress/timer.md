# Timer

定时器函数是高阶函数，可用于延迟或重复执行其他函数。  
JavaScript 定时器函数像 **setTimeout** 和 **setInterval** 都不是 ECMAScript 规范
或者任何 JavaScript 实现的一部分。 定时器功能由浏览器实现，它们的实现在不同浏览
器之间会有所不同。定时器也可以由 Node.js 运行时本身实现。在浏览器里主要的定时器
函数是作为 Window 对象的接口，Window 对象同时拥有很多其他方法和对象。该接口使其
所有元素在 JavaScript 全局作用域中都可用。这就是为什么可以直接在浏览器控制台执行
setTimeout。实际项目中经常用定时器做短信验证码。

## 词法

```javascript
const rocks = who => {
  console.log(who + ' love codeing');
};
setTimeout(rocks, 2 * 1000, 'Xuetengfei');

// Xuetengfei love codeing
```

## 最小延迟时间

```javascript
setTimeout(() => console.log('Hello after 0.5 seconds. MAYBE!'), 500);
for (let i = 0; i < 1e10; i++) {
  // Block Things Synchronously
}
```

示例中定义计时器之后，使用大的 for 循环同步阻止运行时。 1e10 是 1 后面有 10 个零
，基本上模拟繁忙的 CPU。 当此循环正在滴答时，节点无法执行任何操作。这当然是在实
践中做的非常糟糕的事情，但它会帮助你理解 setTimeout 延迟不是一个保证的东西，而是
一个最小的东西。 500ms 表示最小延迟为 500ms。 实际上，计时器必须等待阻塞循环才能
完成。

## 跳步定时器

```javascript
const greeting = (delay = 0) =>
  setTimeout(() => {
    console.log(`Delay time: ${delay} second , ${new Date().toLocaleString()}`);
    greeting(delay + 1);
  }, delay * 1000);

greeting();

// Delay time: 0 second , 8/17/2018, 4:07:17 PM
// Delay time: 1 second , 8/17/2018, 4:07:18 PM
// Delay time: 2 second , 8/17/2018, 4:07:20 PM
// Delay time: 3 second , 8/17/2018, 4:07:23 PM
// Delay time: 4 second , 8/17/2018, 4:07:27 PM
// Delay time: 5 second , 8/17/2018, 4:07:32 PM
// Delay time: 6 second , 8/17/2018, 4:07:38 PM
```

## 避免使用 setInterval

> setInterval 无视代码错误

如果 setInterval 执行的代码由于某种原因出了错，它还会持续不断（不管不顾）地调用
该代码。

> setInterval 无视网络延迟

假设每隔一段时间就通过 Ajax 轮询一次服务器，看看有没有新数据。如果你真的这么做了
，那恐怕做错了；建议使用“补偿性轮询”。而由于某些原因（服务器过载、临时断网、流量
剧增、用户带宽受限，等等，请求要花的时间远比你想象的要长。但 setInterval 不在乎
。它仍然会按定时持续不断地触发请求，最终你的客户端网络队列会塞满 Ajax 调用。

> setInterval 不保证执行

与 setTimeout 不同，你并不能保证到了时间间隔，代码就准能执行。如果你调用的函数需
要花很长时间才能完成，那某些调用会被直接忽略。

> 解决: 用 setTimeout 替代 setInterval

与其使用 setInterval，不如在适当的时刻通过 setTimeout 来调
用`函数自身`。setTimeout 而且不用设置很多 clear，相比较频繁的使用 clearInterval
来清除 setInterval , clearTimeout 使用的就比较少，代码也清晰很多。

> 如果必须保证间隔相等怎么办？

如果确实要保证事件“匀速”被触发，那可以用希望的延迟减去上次调用所花时间，然后将得
到的差值作为延迟动态指定给 setTimeout。 不过，要注意的是 JavaScript 的计时器并不
是非常精确。因此你不可能得到绝对“平均”的延迟，即使使用 setInterval 也不行，原因
很多（比如垃圾回收、JavaScript 是单线程的，等等）。此外，当前浏览器也会将最小的
超时时间固定在 4ms 到 15ms 之间。因此不要指望一点误差也没有。

## 轮询(polling): 请求数据

```javascript
const API = 'https://api.isoyu.com/index.php/api/Web/web_daily_list?page=1';
const fetchData = () => {
  fetch(API, {
    mode: 'cors',
  }).then(res => {
    if (res) {
      console.count(`success-${new Date().toLocaleString()}`);
      setTimeout(fetchData, 1000);
    } else {
      console.log('failed');
    }
  });
};
setTimeout(fetchData, 100);

// success-2018/8/31 上午1:23:06: 1
// success-2018/8/31 上午1:23:07: 1
// success-2018/8/31 上午1:23:09: 1
// success-2018/8/31 上午1:23:11: 1
// success-2018/8/31 上午1:23:13: 1
// success-2018/8/31 上午1:23:15: 1
// success-2018/8/31 上午1:23:16: 1
```

### 补偿性轮询（backoff polling）

使用 Ajax 轮询的人看看服务器上是否有新的东西。然而，这里有一个问题:如果在 Ajax
轮询之后没有数据，很可能在一段时间内不会有数据。可能站点过载或队列已备份。在这种
情况下，持续的轮询会给站点增加额外的不必要的压力。要做什么吗? **解决方案是增加每
次轮询之间等待的时间。**

```javascript
const greeting = (delay = 1) =>
  setTimeout(() => {
    console.log(`Delay time: ${delay} second , ${new Date().toLocaleString()}`);
    greeting(delay * 3);
  }, delay * 1000);

greeting();

// Delay time: 1 second , 8/17/2018, 4:21:35 PM
// Delay time: 3 second , 8/17/2018, 4:21:38 PM
// Delay time: 9 second , 8/17/2018, 4:21:47 PM
// Delay time: 27 second , 8/17/2018, 4:22:14 PM
```
