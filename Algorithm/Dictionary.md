字典也叫映射，以【键，值】的形式来储存元素。
实现一个 ECMAScript6 Map 类。

```javascript
exports.Dictionary = function() {
  var items = Object.create(null);
  this.has = function(key) {
    return key in items;
  };
  this.set = function(key, value) {
    items[key] = value;
  };
  this.remove = function(key) {
    if (this.has(key)) {
      delete items[key];
      return true;
    }
    return false;
  };
  this.get = function(key) {
    return this.has(key) ? items[key] : undefined;
  };
  this.keys = function() {
    return Object.keys(items);
  };
  this.values = function() {
    return Object.values(items);
  };
  this.clear = function() {
    items = {};
  };
  this.size = function() {
    return Object.keys(items).length;
  };
  this.getItems = function() {
    return items;
  };
};
```

```javascript
const { Dictionary } = require('./structure/Dictionary');

let D = new Dictionary();
D.set('name', 'xuetengfei');

console.log('D.getItems()', D.getItems());

// { name: 'xuetengfei' }

console.log('D.getItems()', D.has('name'));
// true

console.log(D.keys());
// [ 'name' ]
console.log(D.values());
// [ 'xuetengfei' ]

console.log(D.get('Tyrion'));
//undefined
```
