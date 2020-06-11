?> 截止 ES6，字符串共包含 31 个标准的 API 方法，其中有些方法出镜率较高，需要摸透原理；有些方法之间相似度较高，需要仔细分辨；甚至有些方法执行效率较低，应当尽量少的使用。下面将从 String 构造器方法说起，逐步帮助你掌握字符串。

---

## charCodeAt

charCodeAt() 返回指定索引处字符的 Unicode 数值。语法：`str.charCodeAt(index)`

index 为一个从 0 至 length-1 的整数。如果不是一个数值，则默认为 0，如果小于 0 或者大于字符串长度，则返回 NaN。

```javascript
console.log('Hello, World'.charCodeAt(8)); // 111
console.log('前端工程师'.charCodeAt(2)); // 24037, 可见也可以查看中文Unicode编码
```

## javascript/String

```javascript
var re = /apples/gi;
var str = 'Apples are round, and apples are juicy.';
var result = str.replace(re, 'oranges');
console.log(result); //  'oranges are round, and oranges are juicy.'
```

## concat

concat() 方法将一个或多个字符串拼接在一起，组成新的字符串并返回。语法：`str.concat(string2, string3, …)`

```javascript
console.log('早'.concat('上', '好')); // 早上好
```

但是 concat 的性能表现不佳，强烈推荐使用赋值操作符（+或+=）代替 concat。”+” 操作符大概快了 concat 几十倍。<a href="https://jsperf.com/concat-vs-plus-vs-join">concat vs + vs join · jsPerf</a>

## indexOf / lastIndexOf

indexOf() 方法用于查找子字符串在字符串中首次出现的位置，没有则返回 -1。该方法严格区分大小写，并且从左往右查找。而 lastIndexOf 则从右往左查找，其它与前者一致。

语法：`str.indexOf(searchValue [, fromIndex=0])，str.lastIndexOf(searchValue [, fromIndex=0])`

searchValue 表示被查找的字符串，fromIndex 表示开始查找的位置，默认为 0，如果小于 0，则查找整个字符串，若超过字符串长度，则该方法返回-1，除非被查找的是空字符串，此时返回字符串长度。

```javascript
console.log('IT改变世界'.indexOf('世界')); // 4
```

建议使用<a href="## /content/String?id=includes">`includes`</a>

## slice

slice() `片`方法提取字符串的一部分，并返回新的字符串。该方法有些类似 Array.prototype.slice 方法。语法：`str.slice(start, end)`

首先 end 参数可选，start 可取正值，也可取负值。

取正值时表示从索引为 start 的位置截取到 end 的位置（不包括 end 所在位置的字符，如果 end 省略则截取到字符串末尾）。

取负值时表示从索引为 length+start 位置截取到 end 所在位置的字符。

```javascript
const str = 'xuetengfei';
console.log(str.slice(0, 4)); // xuet
console.log(str.slice(1, 4)); // uet
console.log(str.slice(1, 0)); // underfind
console.log(str.slice(-1)); // i
```

## split

split() `分裂`方法把原字符串分割成子字符串组成数组，并返回该数组。语法：`str.split(separator, limit)`

```javascript
const imgURL = 'img1;img2;img3';
console.log(imgURL.split(';')); // [ 'img1', 'img2', 'img3' ]
```

```javascript
var result = 'a-b-c'.split('-', 2);
console.log(result); // ['a','b']
```

## substring

substring() 方法返回字符串两个索引之间的子串.语法：`str.substring(indexA[, indexB])`.indexA、indexB 表示字符串索引，其中 indexB 可选，如果省略，则表示返回从 indexA 到字符串末尾的子串。要截取的是从 indexA 到 indexB（不包含）之间的字符.

```javascript
const url = 'content/String?id=concat';
const index = url.lastIndexOf('='); // 17
const query = url.substring(index + 1);
console.log(query); // content
```

## toLowerCase / toUpperCase

toLocaleLowerCase() 方法返回调用该方法的字符串被转换成小写的值，转换规则根据本地化的大小写映射。而 toLocaleUpperCase() 方法则是转换成大写的值。语法：`str.toLocaleLowerCase()`, `str.toLocaleUpperCase()`

```javascript
console.log('ABCDEFG'.toLocaleLowerCase()); // abcdefg
console.log('abcdefg'.toLocaleUpperCase()); // ABCDEFG
```

## trim

trim() 方法清除字符串首尾的空白并返回。语法：`str.trim()`

```javascript
console.log('   object   '.trim()); // object
```

## includes

subString 表示要搜索的字符串，position 表示从当前字符串的哪个位置开始搜索字符串，默认值为 0。语法：`str.includes(subString [, position])`

```javascript
var str = 'Practice makes perfect.';
console.log(str.includes('perfect')); // true
console.log(str.includes('perfect', 100)); // false
```

## repeat

repeat() 方法基于 ECMAScript 2015（ES6）规范，它返回重复原字符串多次的新字符串。语法：`str.repeat(count)`

```javascript
const mobile = '18923457890';
const start3 = mobile.slice(0, 3); // 189
const end4 = mobile.slice(-4); // 7890
const result = start3 + '*'.repeat(4) + end4; // 189****7890
```

## replace

```javascript
// replace 基础用法

const rowStr = 'Stay hungry. Stay foolish';
const str = rowStr.replace('hungry', 'satisfy');
console.log(str); // Stay satisfy. Stay foolish
```

[String.prototype.replace 高阶技能 | louis blog](http://louiszhai.github.io/2015/12/11/js.replace/)
