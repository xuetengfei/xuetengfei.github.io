JavaScript 条件语句在平时的开发中是不可避免要用到的，但是很多时候代码写得并不好，优化的目标是嵌套层级更少，代码更简洁和易读

### 使用 Array.includes 进行多条件选择

```javascript
// Before
function sayHi(name) {
  if (name === 'tom' || name === 'hxh' || name === 'lmly') {
    return 'hello';
  }
}

// After
function sayHi(name) {
  let mans = ['tom', 'hxh', 'lmly'];
  if (mans.includes(name)) {
    return 'hello';
  }
}
```

提出了公共的逻辑，以后只需要维护 mans 这个数组即可。

### 提前退出 / 提前返回

```javascript
// Before
function sayHi(name) {
  if (name) {
    if (name === 'hxh') {
      return 'hello';
    }
  } else {
    return '';
  }
}

// After
function sayHi() {
  if (!name) {
    return '';
  }
  if (name === 'hxh') {
    return 'hello';
  }
}
```

这里先判断了 name 是否存在，于是出现了嵌套的 if，但是如果一开始就将不存在 name 的情况直接返回
代码少了嵌套层级可读性提升了。

### 参数默认值

方法参数为空是我们经常需要处理的，多数情况下是得给一个默认值

```javascript
function sayHi(name) {
  if (!name) {
    name = 'tom';
  }
  // ...
}
```

这个时候我们可以用 || 来简化代码

```javascript
function sayHi(name) {
  name = name || 'tom';
  // ...
}
```

如果你的代码运行环境支持 ES6，那就可以直接使用参数默认值语法

```javascript
function sayHi(name = 'tom') {
  // ...
}
```

### 嵌套三元 Nested ternaries

```javascript
// Before
let result = null;
if (conditionA) {
  if (conditionB) {
    result = 'A & B';
  } else {
    result = 'A';
  }
} else {
  result = 'Not A';
}

// After
const result = !conditionA ? 'Not A' : conditionB ? 'A & B' : 'A';
```

### 用 Object、Map 替代 Switch 语句

```javascript
// Before
function printFruits(color) {
  switch (color) {
    case 'red':
      return ['apple', 'strawberry'];
    case 'yellow':
      return ['banana', 'pineapple'];
    case 'purple':
      return ['grape', 'plum'];
    default:
      return [];
  }
}

printFruits(null);
printFruits('yellow');
```

```javascript
// After
const fruitColor = {
  red: ['apple', 'strawberry'],
  yellow: ['banana', 'pineapple'],
  purple: ['grape', 'plum'],
};

function printFruits(color) {
  return fruitColor[color] || [];
}
```

```javascript
const fruitColor = new Map()
  .set('red', ['apple', 'strawberry'])
  .set('yellow', ['banana', 'pineapple'])
  .set('purple', ['grape', 'plum']);

function printFruits(color) {
  return fruitColor.get(color) || [];
}
```

```javascript
const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'strawberry', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'pineapple', color: 'yellow' },
  { name: 'grape', color: 'purple' },
  { name: 'plum', color: 'purple' },
];

function printFruits(color) {
  return fruits.filter(fruit => fruit.color === color);
}
```

### 用 Array.every & Array.some 匹配全部/部分内容

```javascript
const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'grape', color: 'purple' },
];

function test() {
  const isAllRed = fruits.every(f => f.color == 'red');
  console.log(isAllRed);
}
```

```javascript
const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'grape', color: 'purple' },
];

function test() {
  const isAnyRed = fruits.some(f => f.color == 'red');
  console.log(isAnyRed);
}
```

```javascript
```

```javascript
```

```javascript
```

### 使用可选链和空值合并
