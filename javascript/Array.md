<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/array (1).jpg?imageMogr2/thumbnail/!100p"  data-action="zoom">

## 改变原数组的：

1. shift：将第一个元素删除并且返回删除元素，空即为 undefined
2. unshift：向数组开头添加元素，并返回新的长度
3. pop：删除最后一个并返回删除的元素
4. push：向数组末尾添加元素，并返回新的长度
5. reverse：颠倒数组顺序
6. sort：对数组排序
7. splice:splice(start,length,item)删，增，替换数组元素，返回被删除数组，无删除
   则不返回

## 不改变原数组的：

1. concat：连接多个数组，返回新的数组
2. join：将数组中所有元素以参数作为分隔符放入一个字符
3. [split](http://www.w3school.com.cn/js/jsref_split.asp): join 的逆操作
4. slice：slice(start,end)，返回选定元素
5. map,filter,forEach,some,every 等不改变原数组

1.[一次掌握 JavaScript ES5 到 ES8 数组内容](https://hufangyun.com/2017/array-learn/)

## isArray:判断是否是数组

```javascript
Array.isArray(arg); // false or true

// 不支持此方法的IE9-等浏览器可以这样处理：
Object.prototype.toString.call(obj) === '[object Array]';
// Object.prototype.toString.call(obj) === `[object ${type}]`;
```

## 转换方法 toString || toLocaleString

```javascript
var months = ['Jan', 'Feb', 'Mar', 'Apr'];
months.toString(); // "Jan,Feb,Mar,Apr"
```

## shift

将第一个元素删除并且返回删除元素，空即为 undefined

```javascript
const integers = [1, 2, 3, 4, 6, 7];
const RemoveFirst = integers.shift(); // 1
console.log(integers); // [ 2, 3, 4, 6, 7 ]
```

## unshift

向数组开头添加元素，并返回新的长度

```javascript
const integers = [1, 2, 3, 4, 6, 7];
const HandleArray = integers.unshift(0); // 7
console.log(integers); // [ 0, 1, 2, 3, 4, 6, 7 ]
```

## pop

pop：删除最后一个并返回删除的元素

```javascript
const integers = [1, 2, 3, 4, 6, 7];
const HandleArray = integers.pop(); // 7
console.log(integers); // [ 1, 2, 3, 4, 6 ]
```

## push

push：向数组末尾添加元素，并返回新的长度

```javascript
const integers = [1, 2, 3, 4, 6, 7];
const HandleArray = integers.push(8); // 7
console.log(integers); // [ 1, 2, 3, 4, 6, 7, 8 ]
```

## reverse

```javascript
const integers = [1, 2, 3, 4, 6, 7];
const HandleArray = integers.reverse(); // [ 7, 6, 4, 3, 2, 1 ]
console.log(integers); // [ 7, 6, 4, 3, 2, 1 ]
```

```javascript
/**
 * copyWithin
 * copyWithin() 方法用于在当前数组内部,从数组的指定位置拷贝元素到数组的另一个指定位置中
 * 将指定位置的成员复制到其他位置（会覆盖原有成员）
 * Array.prototype.copyWithin(*target, -start = 0, -end = this.length)
 * target （必需）：从该位置开始替换数据。
 * start （可选）：从该位置开始读取数据，默认为 0 。如果为负值，表示倒数。
 * end （可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
 * 返回:当前数组
 */

var majiang = ['东', '南', '西', '北', '中', '发', '白'];

log(majiang.copyWithin(1, 2, 5));
// ["东", "西", "北", "中", "中", "发", "白"];
```

## fill

```javascript
/**
 * fill()
 * array.fill(value, start, end)
 * 返回：返回修改之后的数组
 */

const arr = ['a', 'b', 'c', 'd', 'e'];
log(arr.fill('$', 0, 2)); // [ '$', '$', 'c', 'd', 'e' ]

Array(10).fill(0); // [0,0,0,0,0,0,0,0,0,0]
```

## filter

filter 方法可以筛除数组和类似结构中不满足条件的元素，并返回满足条件的元素组成的
数组。

```javascript
const integers = [1, 2, 3, 4, 6, 7];
const evenIntegers = integers.filter(i => i % 2 === 0);
// evenIntegers的值为[2, 4, 6]
```

## every

test passAll ? true or false

```javascript
var ages = [32, 33, 16, 40];
log(
  ages.every(item => {
    return item > 20;
  }),
); // false
```

## some

some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。 some() 方法会依次
执行数组的每个元素：如果**有一个**元素满足条件，则表达式返回 true , 剩余的元素不
会再执行检测。如果没有满足条件的元素，则返回 false。注意： some() 不会对空数组进
行检测。some() 不会改变原始数组

```javascript
const integers = [1, 2, 3, 4, 6, 7];
const filterNum = integers.some(i => i > 3);
console.log(filterNum); // true
```

## find

find 返回数组或类似结构中满足条件的第一个元素。没有就返回 undefined

```javascript
const integers = [1, 2, 3, 4, 6, 7];
console.log(
  integers.find(item => {
    return item > 3;
  }),
); // 4
```

```javascript
const posts = [
  { id: 1, title: 'Title 1' },
  { id: 2, title: 'Title 2' },
];
// 找出id为1的posts
const title = posts.find(p => p.id === 1).title;
console.log(title); // Title 1
```

## findIndex

```javascript
/**
 * findIndex()
 * 同上。只不过返回的是索引。
 * 如果没有符合条件的元素返回 -1
 */
const integers = [1, 2, 3, 4, 6, 7];
console.log(
  integers.find(item => {
    return item > 3;
  }),
); // 3
```

## join

数组中的所有元素转换一个字符串

```javascript
var fruits = ['Banana', 'Orange', 'Apple', 'Mango'];
var energy = fruits.join(' and ');
console.log(energy);
// Banana and Orange and Apple and Mango
```

## split:分裂

```javascript
const str = 'apple;banan;candy;dog';
const arr = str.split(';');
console.log(arr); // [ 'apple', 'banan', 'candy', 'dog' ]
```

## slice:切片

切片字符串/数组

```
const tel = '18392015462'
const format = tel.slice(0, 3) + "*".repeat(4) + tel.slice(-4);
console.log(format); // 183****5462
```

```
const arr = ['apple', 'banan', 'candy', 'dog'];
const newArr = arr.slice(0, 2); // [ 'apple', 'banan' ]
```

## splice:剪接

**array.splice(index,\*howmany,item1,.....,itemX)**

```javascript
var arr = ['东', '南', '西', '北', '中', '发', '白'];
console.log(arr.splice(2, 1, 'Lemon', 'Kiwi')); // [ '西' ]

console.log(arr);
// [ '东', '南', 'Lemon', 'Kiwi', '北', '中', '发', '白' ]

// 如果只有两个参数,没有插入项目，那就是删除返回删除项目，修改原数组
// array.splice(index,*howmany)
```

## sort

```
const arr = ['10', '5', '40', '25', '1000', '1'];

console.log(arr.sort()); // [ '1', '10', '1000', '25', '40', '5' ]
console.log(arr.sort((a, b) => a - b)); // [ '1', '5', '10', '25', '40', '1000' ]
```

## concat

**var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])**

```javascript
var a = ['Cecilie', 'Lone'];
var b = ['Emil', 'Tobias', 'Linus'];
var c = ['Robin'];
var children = a.concat(b, c);
log(children); // ["Cecilie","Lone","Emil","Tobias","Linus","Robin"]

var aa = '12';
var bb = '23';
var cc = '34';
var dd = cc.concat(aa, bb);
log(dd); //341223
```

## forEach

不改变原数组

```javascript
/**
 * forEach()
 * array.forEach(function(currentValue, index, arr), thisValue)
 */
const items = ['item1', 'item2', 'item3'];
const copy = [];

items.forEach(function (item) {
  copy.push(item);
});

console.log(copy); // [ 'item1', 'item2', 'item3' ]
```

## map

不会改变原始数组,返回`新数组`

```javascript
var arr = [4, 9, 16, 25];
log(
  arr.map(item => {
    return item * item;
  }),
);
// [16,81,256,625]
```

```
const integers = [1, 2, 3, 4, 6, 7];
const twoXIntegers = integers.map(i => i*2);
// twoXIntegers现在是 [2, 4, 6, 8, 12, 14]，而integers不发生变化。
```

```javascript
// 改造对象
const a = [
    {id: 1, value: 'name'},
    {id: 2,value: 'age'},
    { id: 3, value: 'sexual' },
];

const b = a.map(v => ({
    ...v,
    key: v.id
}))
console.log(b)
// [ { id: 1, value: 'name', key: 1 },
//   { id: 2, value: 'age', key: 2 },
//   { id: 3, value: 'sexual', key: 3 } ]

// 对象解构 - 删除不必要的属性
const { id ...rest } = b；

console.log(rest); //  {c:'ccc'}
```

```javascript

```

## indexOf

```javascript
/**
 * indexOf()
 * array.indexOf(item,start)
 * indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
 * 如果在数组中没找到字符串则返回 -1。
 */

var fruits = ['Orange', 'Apple', 'Mango', 'Banana', 'Orange', 'Apple'];
var firstIndex = fruits.indexOf('Apple', 4);
console.log(firstIndex); // 5

/**
 * lastIndexOf()
 * array.lastIndexOf(item,start)
 */
```

## includes

arr/srt.includes(searchElement, fromIndex)

```javascript
[1, 2, 3].includes(2); // true
[1, 2, 3].includes(4); // false
[1, 2, 3].includes(3, 3); // false
[1, 2, 3].includes(3, -1); // true
'loremqwe'.includes('re'); // true
```

## reduce

**array.reduce(\*function(accumulator, value, index, arr), initialValue)** 数组
累计为一个单值

```javascript
const posts = [
  { id: 1, upVotes: 2 },
  { id: 2, upVotes: 89 },
  { id: 3, upVotes: 1 },
];
const totalUpvotes = posts.reduce(
  (totalUpvotes, currentPost) => totalUpvotes + currentPost.upVotes, //reducer函数
  0, // 初始化投票数为0
);
console.log(totalUpvotes); //输出投票总数：92
```

```javascript
// 1.有initialValue，那么第一次运行的时候，`accumulator = initialValue`。
// 回调函数从数组的index 0,开始执行。

// 2.没有initialValue，那么第一次运行的时候`accumulator = array[0]`。
// accumulator为数组第一项，回调函数从数组的index 1,开始执行。

[1, 2, 3, 4, 5].reduce((accumulator, currentValue, currentIndex, array) => {
  return accumulator * currentValue;
}, 10);
// 1200

[
  [0, 1],
  [2, 3],
  [4, 5],
].reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);
// [0,1,2,3,4,5]
```

[Array.prototype.reduce() - JavaScript - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

参考链接：

---

1. [JavaScript Array 对象](http://www.runoob.com/jsref/jsref-obj-array.html)
2. [[翻译]map 和 reduce，处理数据结构的利器 · Issue ## 1 · WhiteYin/translation](https://github.com/WhiteYin/translation/issues/1)
3. [js 数组详细操作方法及解析合集](https://mp.weixin.qq.com/s?__biz=MzA5NzkwNDk3MQ==&mid=2650587665&idx=1&sn=cad6e192c9ac1d695c5cef8a9515c19d&chksm=8891d235bfe65b233120d301ba79a69eb1a4f20a9cfb7ddd642cc0c063552930a0833ee3d27a)
4. [JavaScript 数组 所有 API 全解密 | louis blog](http://louiszhai.github.io/2017/04/28/array/)
5. [JavaScript 字符串 所有 API 全解密 | louis blog](http://louiszhai.github.io/2016/01/12/js.String/)
6. [JavaScript 对象所有 API 解析](https://segmentfault.com/a/1190000010753942?utm_medium=hao.caibaojian.com&utm_source=hao.caibaojian.com&share_user=1030000000178452)
