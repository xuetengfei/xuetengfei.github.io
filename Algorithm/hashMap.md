Hashrable 类，也叫 HashMap 类，是 Dictionary 类的一种散列表实现方式。

散列算法的作用是尽可能快地在数据结构中找到一个值。如果要在数组数据结构中获得一个值，需要遍历整个数组来找到它。如果使用散列函数，就知道值的具体位置，因此能够快速检索到该值。散列函数的作用是给定一个键值，然后返回值在表中的地址。

```javascript
exports.HashMap = function HashTable() {
  var table = [];
  var ValuePair = function(key, value) {
    this.key = key;
    this.value = value;
    this.toString = function() {
      return '[' + this.key + ' - ' + this.value + ']';
    };
  };
  const djb2HashCode = function(key) {
    var hash = 5381;
    for (var i = 0; i < key.length; i++) {
      hash = hash * 33 + key.charCodeAt(i);
    }
    return hash % 1013;
  };
  this.put = function(key, value) {
    var position = djb2HashCode(key);
    table[position] = new ValuePair(key, value);
  };

  this.get = function(key) {
    var position = djb2HashCode(key);
    return table[position] === undefined ? undefined : table[position];
  };

  this.remover = function(key) {
    var position = djb2HashCode(key);
    return table[position] === undefined;
  };
  this.print = function() {
    for (let i = 0; i < table.length; i++) {
      if (table[i] !== undefined) {
        console.log(i + ': ' + table[i]);
      }
    }
  };
};
```

```javascript
const { HashMap } = require('./structure/HashMap');

console.log('======');
const hash = new HashMap();

hash.put('shenzhen', 'I LOVE SZ');
hash.put('beijing', 'I LOVE BJ');
hash.print();
/* 
5: [shenzhen - I LOVE SZ]
705: [beijing - I LOVE BJ]
*/
console.log('hash.get("beijing");: ', hash.get('beijing'));

/* 
hash.get("beijing");:  ValuePair { key: 'beijing', value: 'I LOVE BJ', toString: [Function] }
*/
```

## 散列算法

5381、33 是这个一个哈希算法的“魔法常数”，更少的碰撞。

```javascript
const djb2HashCode = function(key) {
  var hash = 5381;
  for (var i = 0; i < key.length; i++) {
    hash = hash * 33 + key.charCodeAt(i);
  }
  return hash % 1013;
};
```

[Hash functions.](http://www.azillionmonkeys.com/qed/hash.html)
