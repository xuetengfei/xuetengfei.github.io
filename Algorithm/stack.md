# 栈

栈是利用 Array 来创建的一种更为可控的数据结构，遵从后进先出(LIFO)原则的有序集合。
最新添加的元素保存在栈顶，另一段叫栈底。现实生活中，栈的例子:一摞盘子。

```javascript
// Class Stack

exports.Stack = function Stack() {
  var items = [];

  // 添加一个元素至栈顶
  this.push = function(element) {
    items.push(element);
  };

  // 移除一个栈顶元素
  this.pop = function() {
    return items.pop();
  };

  // 获取栈顶元素
  this.peek = function() {
    return items[items.length - 1];
  };

  this.isEmpty = function() {
    return items.length == 0;
  };

  this.size = function() {
    return items.length;
  };

  // 清空
  this.clear = function() {
    items = [];
  };

  this.value = function() {
    return items;
  };
};
```

```javascript
const { Stack } = require('./structure/Stack');

const stack = new Stack();
console.log(stack.isEmpty());
// true

stack.push(1);
stack.push(5);
stack.push(18);

console.log(stack.isEmpty());
// false
console.log('Stack value: ', stack.value());
// Stack value:  [ 1, 5, 18 ]

console.log('stack.peek(): ', stack.peek());
// stack.peek():  18

stack.pop();

console.log('stack.peek(): ', stack.peek());
// stack.peek():  5

console.log('Stack value: ', stack.value());
// Stack value:  [ 1, 5 ]
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/stack-1548920632.png' width="400px"/>
