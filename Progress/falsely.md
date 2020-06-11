## 转换为布尔值

```javascript
// !!的作用是把一个其他类型的变量转成的bool类型。

// !!*** => Boolean(***)

console.log(typeof 5); // number
console.log(typeof !!5); // boolean

// 以下，均为false
console.log(!!'');
console.log(!!null);
console.log(!!undefined);
console.log(!!0);
console.log(!!false);
console.log(!!NaN);
```

`false`、`0`、`null`、`undefined`,`''`都是假数值.

## 空对象呢?

```javascript
console.log(!!{});

// > true
```
