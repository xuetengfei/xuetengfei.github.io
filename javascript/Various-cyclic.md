<!-- | Keyword Syntax | Used to `Array` | Used to `Object` | `Break` `continue` `return` interrupt the loop |
| -------------- | --------------- | ---------------- | ---------------------------------------------- |
| for            | yes             |                  | yes                                            |
| forEach        | yes             |                  | no                                             |
| for in         | don't           | yes              | yes                                            |
| for of         | yes             |                  | yes                                            | -->

## 循环数组

```javascript
const Season = ['Spring', 'Summer', 'Autumn', 'Winter '];
```

### for loop

```javascript
for (let index = 0; index < Season.length; index++) {
  console.log('element: ', Season[index]);
}

// element:  Spring
// element:  Summer
// element:  Autumn
// element:  Winter
```

### forEach

forEach:不能使用 break 语句中断循环，也不能使用 **return 语句返回到外层函数**。

```javascript
Season.forEach(a => console.log('element: ', a));

// element: Spring
// element: Summer
// element: Autumn
// element: Winter
```

### for of

最简洁、最直接的遍历**数组元素**的语法,这个方法避开了 for-in 循环的所有缺陷.与`forEach()`不同的是，它可以正确响应 `break、continue` 和 `return` 语句，for-of 循环不仅仅支持数组的遍历。同样适用于很多类似数组的对象，也支持字符串。for-of 并不适用于处理原有的原生对象

`for-of` 循环不支持普通对象，但如果你想迭代一个对象的属性，你可以用 `for-in` 循环或内建的 `Object.keys()`方法：

```javascript
for (const a of Season) {
  console.log('element: ', a);
}
// element:  Spring
// element:  Summer
// element:  Autumn
// element:  Winter
```

同样适用于**类数组**

```javascript
const uniqueWords = new Set('words');

for (const a of uniqueWords) {
  console.log(a);
}
// w
// o
// r
// d
// s
```

### for-in

**for-in 不适用于数组遍历，是为普通对象设计的**

```javascript
for (const a in Season) {
  console.log('element: ', a);
}
// element:  0
// element:  1
// element:  2
// element:  3
```

---

## 循环对象

```javascript
const fruits = {
  apple: 28,
  orange: 17,
  pear: 54,
};
```

在 ES6 之前，循环对象,唯一的方式是`for...in`,但是存在着一个问题,在`for...in`每次循环体内首先要检查某个属性来着这个`对象本身`还是来着与自`原型链的继承`,

```javascript
for (var property in object) {
  if (object.hasOwnProperty(property)) {
    // Do things here
  }
}
```

```javascript
for (const v in fruits) {
  console.log(v);
}

// apple
// orange
// pear
```

最好的方式是，将对象转为数组.然后迭代数组

### Object.keys

```javascript
for (const a of Object.keys(fruits)) {
  console.log(a);
}
// apple
// orange
// pear
```

### Object.values

```javascript
for (const a of Object.values(fruits)) {
  console.log(a);
}

// 28
// 17
// 54
```

### Object.entries

```javascript
const obj = {
  name: 'lyreal666',
  age: 23,
  speak() {
    console.log(`Hello, I'm ly!`);
  },
};

for (const [key, value] of Object.entries(obj)) {
  console.log(`${key}: ${value}`);
}

// name: lyreal666
// age: 23
// speak: speak() {
//     console.log(`Hello, I'm ly!`);
//   }
```

```javascript
const fruits = {
  apple: 28,
  orange: 17,
  pear: 54,
};

const entries = Object.entries(fruits);
console.log(entries);
// [
//   [apple, 28],
//   [orange, 17],
//   [pear, 54]
// ]

for (const [fruit, count] of entries) {
  console.log(`There are ${count} ${fruit}s`);
}

// There are 28 apples
// There are 17 oranges
// There are 54 pears

// 实现方式二
const objectToPairs = obj => Object.keys(obj).map(k => [k, obj[k]]);
objectToPairs(fruits); // [ [ 'apple', 28 ], [ 'orange', 17 ], [ 'pear', 54 ] ]
```

## objectFromPairs:根据键值对创建对象

使用 Array.reduce() 来创建和组合键值对,根据键值对创建对象.

```javascript
const a = [['apple', 28], ['orange', 17], ['pear', 54]];

const objectFromPairs = arr =>
  arr.reduce(
    (init, v) => ({
      ...init,
      [v[0]]: v[1],
    }),
    {},
  );

objectFromPairs(a); // { apple: 28, orange: 17, pear: 54 }
```

## 技巧

```javascript
const ALLMAPArray = [
  [1, '待支付', 'Waiting'],
  [2, '已取消', 'Cancel'],
  [3, '支付中', 'Paymenting'],
  [4, '已支付', 'Paymented'],
  [5, '已抵扣', 'Deducted'],
  [6, '退款中', 'Refunding'],
  [7, '已退还', 'Refunded'],
];
const objectFromPairs = arr => arr.reduce((a, v) => ((a[v[0]] = v[1]), a), {});

const statusMap = objectFromPairs(ALLMAPArray.map(v => [v[0], v[1]]));
const options = ALLMAPArray.map(v => ({
  label: v[1],
  value: v[0],
}));
const statusConstantMap = objectFromPairs(ALLMAPArray.map(v => [v[2], v[0]]));

console.log(statusMap);
console.log(options);
console.log(statusConstantMap);
```

```json
{
  "1": "待支付",
  "2": "已取消",
  "3": "支付中",
  "4": "已支付",
  "5": "已抵扣",
  "6": "退款中",
  "7": "已退还"
}

[
  { "label": "待支付", "value": 1 },
  { "label": "已取消", "value": 2 },
  { "label": "支付中", "value": 3 },
  { "label": "已支付", "value": 4 },
  { "label": "已抵扣", "value": 5 },
  { "label": "退款中", "value": 6 },
  { "label": "已退还", "value": 7 }
]

{
  "Waiting": 1,
  "Cancel": 2,
  "Paymenting": 3,
  "Paymented": 4,
  "Deducted": 5,
  "Refunding": 6,
  "Refunded": 7
}
```

## 更新

使用 map 书写复杂的判断，更简单呢。

```javascript
const actions = new Map([
  [
    { identity: 'guest', status: 1 },
    () => {
      console.log('return 1');
    },
  ],
  [
    { identity: 'guest', status: 2 },
    () => {
      console.log('return 2');
    },
  ],
]);

const onButtonClick = (identity, status) => {
  let action = [...actions].filter(
    ([key, value]) => key.identity == identity && key.status == status,
  );
  action.forEach(([key, value]) => value());
};

onButtonClick('guest', 2);
// return 2
```

#### 可以使用正则表达式

```javascript
const actions = () => {
  const functionA = () => {
    console.log('run functionA');
  };
  const functionB = () => {
    console.log('run functionB');
  };
  return new Map([[/^guest_[1-4]$/, functionA], [/^guest_5$/, functionB]]);
};

const onButtonClick = (identity, status) => {
  let action = [...actions()].filter(([key, value]) =>
    key.test(`${identity}_${status}`),
  );
  action.forEach(([key, value]) => value());
};

onButtonClick('guest', '2');

//  run functionA
```
