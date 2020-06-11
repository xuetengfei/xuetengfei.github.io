# 优先队列

实现一个最小优先队列

```javascript
exports.PriorityQueue = function PriorityQueue() {
  var items = [];
  function QueueElement(element, priority) {
    this.element = element;
    this.priority = priority;
  }
  this.enqueue = function(element, priority) {
    var queueElement = new QueueElement(element, priority);
    if (this.isEmpty()) {
      items.push(queueElement);
    } else {
      var added = false;
      for (var i = 0; i < items.length; i++) {
        if (queueElement.priority < items[i].priority) {
          items.splice(i, 0, queueElement);
          added = true;
          break;
        }
      }
      if (!added) {
        items.push(queueElement);
      }
    }
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
  this.print = function() {
    console.log(items.toString());
  };
};
```

```javascript
const { PriorityQueue } = require('./structure/PriorityQueue');

const pQueue = new PriorityQueue();

pQueue.enqueue('John', 2);
pQueue.enqueue('Jack', 1);
pQueue.enqueue('TOM', 5);
pQueue.enqueue('AJX', 3);
pQueue.enqueue('Ashell', 4);
pQueue.enqueue('Ez', 4);
pQueue.enqueue('TOM', 5);
pQueue.enqueue('Camila', 1);

console.log('pQueue.size();: ', pQueue.size()); // 8
console.log('pQueue.value();: ', pQueue.value());
/* 
pQueue.value();:  [ QueueElement { element: 'Jack', priority: 1 },
  QueueElement { element: 'Camila', priority: 1 },
  QueueElement { element: 'John', priority: 2 },
  QueueElement { element: 'AJX', priority: 3 },
  QueueElement { element: 'Ashell', priority: 4 },
  QueueElement { element: 'Ez', priority: 4 },
  QueueElement { element: 'TOM', priority: 5 },
  QueueElement { element: 'TOM', priority: 5 } ]
*/

console.log('pQueue.dequeue();: ', pQueue.dequeue());
// QueueElement { element: 'Jack', priority: 1 }

console.group('-for-');
console.log('pQueue.size();: ', pQueue.size());
console.log('pQueue.front();: ', pQueue.front());
//  QueueElement { element: 'Camila', priority: 1 }
const a = pQueue.value();
a.forEach(element => {
  console.log('element: ', element);
});
/* 

  element:  QueueElement { element: 'Camila', priority: 1 }
  element:  QueueElement { element: 'John', priority: 2 }
  element:  QueueElement { element: 'AJX', priority: 3 }
  element:  QueueElement { element: 'Ashell', priority: 4 }
  element:  QueueElement { element: 'Ez', priority: 4 }
  element:  QueueElement { element: 'TOM', priority: 5 }
  element:  QueueElement { element: 'TOM', priority: 5 }
  
*/
console.groupEnd();
```
