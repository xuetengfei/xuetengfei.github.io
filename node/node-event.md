### DOM 事件

```javascript
var p = document.getElementById('foo');
p.onclick = function(event) {
  console.log('moot!');
};
```

### node 事件

```javascript
const event = require('events');

// 创建了一个userEvent事件对象
const userEvent = new event.EventEmitter();

// userEvent事件对象绑定一个事件，名字叫someTrigger
userEvent.on('someEventName', function(message) {
  console.log(message);
});
// 触发事件
userEvent.emit('someEventName', 'parameter message');
// ==> parameter message
```

### 进阶 node 事件

```javascript
const util = require('util');
const event = require('events');

function Person(name) {
  this.name = name;
}
util.inherits(Person, event.EventEmitter);

const Bob = new Person('Bob');
const Cherry = new Person('Cherry');
const Lucy = new Person('Lucy');

const PersonList = [Bob, Cherry, Lucy];
PersonList.forEach(v => {
  v.on('speak', message => {
    console.log(`${v.name} said: ${message}`);
  });
});

Bob.emit('speak', 'i am 20 age');
Cherry.emit('speak', 'i am 21 age');
Lucy.emit('speak', 'i am 22 age');

// Bob said: i am 20 age
// Cherry said: i am 21 age
// Lucy said: i am 22 age
```
