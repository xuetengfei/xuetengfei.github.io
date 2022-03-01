?> A callback is a function that is passed as an argument to another function
and is executed after its parent function has completed

回调函数就是一个参数，将 A 函数作为参数传到 B 函数里面，当 B 函数执行完之后，再
执行传进去的 A 函数。这个过程就叫做回调。

```js
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}
```

loadScript 使用给定的 src 将一个新的、动态创建的标签 `<script src="…">` 插入到文
档中。浏览器将自动开始加载它，并在加载完成后执行它。

可以像这样使用这个函数：

```js
loadScript('/my/script.js');
```

脚本是“异步”调用的，因为它从现在开始加载，但是在这个加载函数执行完成后才运行。如
果在 `loadScript(…)`下面有任何其他代码，它们不会等到脚本加载完成才执行。

```js
loadScript('/my/script.js');
// loadScript 下面的代码 不会等到脚本加载完成才执行
// ...
```

假设需要在新脚本加载后立即使用它。它声明了新函数，想运行它们。但如果在
loadScript(…) 调用后立即执行此操作，这将不会有效。

```js
loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js');
console.log(_); // Error
```

自然情况下，浏览器可能没有时间加载脚本。到目前为止，loadScript 函数并没有提供跟
踪加载完成的方法。脚本加载并最终运行，仅此而已。但我们希望了解脚本何时加载完成，
以使用其中的新函数和变量。

添加一个 callback 函数作为 loadScript 的第二个参数，该函数应在脚本加载完成时执行

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}
```

现在，如果想调用该脚本中的新函数，应该将其写在回调函数中：

```js
loadScript('/my/script.js', function() {
  // 在脚本加载完成后，回调函数才会执行
  newFunction(); // 现在它工作了
  ...
});

```

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

loadScript(
  'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js',
  script => {
    console.log(`Ok,the script ${script.src} is loaded`);
    console.log(_); // 所加载的脚本中声明的函数
  },
);
```

这被称为“基于回调”的异步编程风格。异步执行某项功能的函数应该提供一个 callback 参
数用于在相应事件完成时调用。（译注：上面这个例子中的相应事件是指脚本加载）

## 处理 Error

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));
  document.head.append(script);
}
```

```js
loadScript('/my/script.js', function (error, script) {
  if (error) {
    // 处理 error
  } else {
    // 脚本加载成功
  }
});
```

---

1. [理解与使用 Javascript 中的回调函数](http://www.html-js.com/article/1592)
2. [关于 js 中的回调函数 callback](https://juejin.im/entry/584f9dac8d6d8100545cbbc6)
3. [理解 JS 引擎的执行机制](http://web.jobbole.com/93749/#2)
4. [理解 Event Loop、Micro Task & Macro Task](https://zhuanlan.zhihu.com/p/28051505)
