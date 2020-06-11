实现一个 ECMAScript6 Set 类，使用【值，值】的形式来储存元素。

```javascript
exports._Set = function _Set() {
  let items = Object.create(null);
  this.has = function(value) {
    return value in items;
  };
  //  add
  this.add = function(value) {
    if (!this.has(value)) {
      items[value] = value; //{1}
      return true;
    }
    return false;
  };
  this.values = function() {
    return Object.keys(items);
  };
  // remove
  this.remove = function(value) {
    if (this.has(value)) {
      delete items[value]; //{2}
      return true;
    }
    return false;
  };
  this.clear = function() {
    items = {};
  };
  this.size = function() {
    return Object.keys(items).length;
  };
};
```

```javascript
const { _Set } = require('./structure/Set');
var set = new _Set();
set.add(1);
set.add(2);

console.log('set: ', set.values());
// set:  [ '1', '2' ]
```
