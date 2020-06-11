# 队列

```javascript
exports.Queue = function Queue() {
  var items = [];
  this.enqueue = function(element) {
    items.push(element);
  };
  this.dequeue = function() {
    return items.shift();
  };
  this.front = function() {
    return items[0];
  };
  this.isEmpty = function() {
    return items.length == 0;
  };
  this.clear = function() {
    items = [];
  };
  this.size = function() {
    return items.length;
  };
  this.value = function() {
    return items;
  };
};
```

```javascript
const { Queue } = require('./structure/Queue');
const queue = new Queue();
console.log(queue.isEmpty()); // true
console.log(queue.value()); // []

queue.enqueue(1);
queue.enqueue(23);
queue.enqueue(45);
queue.enqueue(67);

console.log(queue.value()); // [1,23,45,67]
console.log('queue.front()', queue.front()); // 1
console.log('queue.dequeue()', queue.dequeue()); // 1
console.log('queue.size()', queue.size()); // 3
console.log(queue.value()); // [23,45,67]
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/queue-1548920826.svg' width='400px'/>
