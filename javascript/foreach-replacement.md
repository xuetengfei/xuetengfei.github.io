JavaScript 语言中的这种模式尤其要弃用：使用 forEach 创建新数组。该模式实际上非常简单，看起来像这样：

```javascript
const kids = [];
people.forEach(person => {
  if (person.age < 15) {
    kids.push({ id: person.id, name: person.name });
  }
});
```

复制代码这段代码的意思是，处理一个包含所有人的数组，以找出每个年龄小于 15 岁的人。然后选择 person 对象中的其中几个字段作为 'kids' 对象，并将其复制到 kids 数组中。
虽然这是有效的，但这是非常必要的编程范例编码方式。

### map 和 filter

map 和 filter 作为 ES6 特性集的一部分被引入 JavaScript。它们是数组的方法，允许在 JavaScript 中进行更多函数式编程。像在函数式编程世界中一样，这两种方法都`没有改变原始数组`。相反，它们都`返回一个新数组`。它们都接受`函数类型的单个参数`。然后在原始数组中的每一项上调用此函数以生成结果数组。让我们看看这些方法的作用：

map：每项调用函数处理后的值存放到返回的新数组中。
filter：每项调用函数处理后的值决定该项是否应该放在方法返回的新数组中。
reduce: 聚合为单值

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(number => number \* 2); // [2, 4, 6, 8, 10]
const even = numbers.filter(number => number % 2 === 0); // [2, 4]
```

```javascript
const kids = people
  .filter(person => person.age < 15)
  .map(person => ({ id: person.id, name: person.name }));
```

那么这个实现究竟有什么好处：

关注点分离：过滤和更改数据格式是两个独立的问题，使用单独的方法可以分离关注点。

可测试性：为实现这两个目的，一个简单的、纯函数的方法可以轻松地针对各种行为进行单元测试。值得注意的是，初始实现并不像它依赖于其范围 （kids 数组）之外的某些状态那样纯粹。

可读性：由于这些方法具有过滤数据或更改数据格式的明确目的，因此很容易看出正在进行何种操作。特别是因为有那些同类功能的函数，如 reduce。

异步编程：forEach 和 async/await 不能很好地协同工作。另一方面，map 提供了一个能够结合 promises 和 async/await 的有效模式。
