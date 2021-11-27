## Javascript RORO 模式

一种编写更具可读性的函数的好方法代码可读性是一件大事。开发人员花费大量时间阅读代
码：其他人的代码、我们自己的代码、我们以前从未见过的代码等。以尽可能可读的方式编
写代码可以帮助团队中的每个人节省大量时间。可读性有时会与性能有所折衷，但我尽量保
持可读性。

一种编写更具可读性的函数的好方法 Javascript 的一种模式是 RORO 模式，即接收对象、
返回和对象 我必须非常喜欢 Javascript 的一种模式是 RORO 模式，即接收对象、返回和
对象。该模式的要点如下：函数应该始终接受一个对象作为它们的参数，并且它们应该始终
返回一个对象作为其结果。然后，我们将解构参数和返回值，以便以更有表现力的方式了解
进出函数的内容。接收一个对象作为我编写的所有函数的标准是我在学习 Python 并获得
kwargs 经验后开始做的事情，我非常喜欢它，因为它使了解函数的内容变得如此容易。能
够标记传递给函数的参数真是太好了，Javascript 中的 RORO 模式为我们提供了一些类似
的功能。

考虑以下函数调用

```js
const item = await getItemFromCollection(54391, 'shop');
```

为了完全理解这个接口，我们必须在我们的代码库中找到函数声明。如果我们使用 RORO 模
式编写这个函数。

```js
const item = await getItemFromCollection({ id: 54391, collectionName: 'shop' });
```

它更具可读性，并且必须减少搜索代码库/文档的时间。

```js
someFunctionCall(false);
someFunctionCall({ booleanPurpose: false });
```

[Javascript RORO 模式 | 博客](https://www.tinyblog.dev/blog/2020-07-13-javascript-roro-pattern/)
