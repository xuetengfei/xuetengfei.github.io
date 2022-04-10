[数据类型](https://zh.javascript.info/types)

## 数据类型判断

### 方法一

```javascript
const getType = v =>
  v === undefined
    ? 'undefined'
    : v === null
    ? 'null'
    : v.constructor.name.toLowerCase();

console.log(getType([])); // array
console.log(getType({})); // object
console.log(getType('')); // string
console.log(getType(null)); // null
console.log(getType(undefined)); // undefined
console.log(getType(NaN)); // number
```

### 方法二

```javascript
// javascript设计模式和开发实践
var isType = function (type) {
  return function (obj) {
    return Object.prototype.toString.call(obj) === `[object ${type}]`;
  };
};

var isString = isType('String');
var isArray = isType('Array');
var isNumber = isType('Number');

console.log(isArray([1, 2, 3])); // true
```

### 方法三

```js
const isOfType = (() => {
  // create a plain object with no prototype
  const type = Object.create(null);
  // check for null type
  type.null = x => x === null;
  // check for undefined type
  type.undefined = x => x === undefined;
  // check for nil type. Either null or undefined
  type.nil = x => type.null(x) || type.undefined(x);
  const getType = x => !type.nil(x) && x.constructor.name.toLowerCase();
  type.object = x => ({}.toString.call(x) === '[object Object]');
  // check for number or number literal type. e.g: 12, 30.5, new Number()
  type.number = x =>
    !type.nil(x) && // NaN & Infinity have typeof "number" and this excludes that
    ((!isNaN(x) && isFinite(x) && typeof x === 'number') ||
      x instanceof Number);
  // check for provided type instance
  type.type = (x, X) => !type.nil(x) && x instanceof X;
  // check for set type
  type.set = x => type.type(x, Set);
  // check for map type
  type.map = x => type.type(x, Map);
  // check for date type
  type.date = x => type.type(x, Date);
  // check for strings and string literal type. e.g: 's', "s", `str`, new String()
  type.string = x => getType(x) === 'string';
  // type.array = x => getType(x) === 'array';
  type.array = x => !type.nil(x) && Array.isArray(x);
  // check for boolean or boolean literal type. e.g: true, false, new Boolean()
  type.boolean = x => getType(x) === 'boolean';
  return type;
})();

// all is true
console.log(isOfType.number(123));
console.log(isOfType.null(null));
console.log(isOfType.undefined(undefined));
console.log(isOfType.boolean(true));
console.log(isOfType.boolean(new Boolean()));
console.log(isOfType.array([1, 2, 3]));
console.log(isOfType.array(new Array()));
console.log(isOfType.object(Object.create(null)));
console.log(isOfType.type({}, Object));
console.log(isOfType.type([], Array));
```

```js
function isEmpty(x) {
  if (Array.isArray(x) || typeof x === 'string' || x instanceof String) {
    return x.length === 0;
  }

  if (x instanceof Map || x instanceof Set) {
    return x.size === 0;
  }

  if ({}.toString.call(x) === '[object Object]') {
    return Object.keys(x).length === 0;
  }

  return false;
}

// all is true
console.log(isEmpty({}));
console.log(isEmpty([]));
console.log(isEmpty(new Set()));
console.log(isEmpty(new Map()));
```

## lastItem

```javascript
function lastItem(list) {
  if (Array.isArray(list)) {
    return list.slice(-1)[0];
  }
  if (list instanceof Set) {
    return Array.from(list).slice(-1)[0];
  }
  if (list instanceof Map) {
    return Array.from(list.values()).slice(-1)[0];
  }
}

const s = new Set();
s.add(1);
s.add(10);
s.add(100);
console.log(lastItem([1, 2, 3]));
console.log(lastItem(s));
```

## 判断空对象

```javascript
const a = {};

const isEmptyObj = obj => {
  for (var i in obj) {
    // 如果不为空，则会执行到这一步，返回false
    return false;
  }
  return true; // 如果为空,返回true
};

console.log('isEmptyObj(a) is', isEmptyObj(a)); // > true : 是空对象
```

```javascript
const a = {};

const isEmptyObj2 = obj => {
  return Object.keys(obj).length === 0;
};

console.log('isEmptyObj2(a) is', isEmptyObj2(a)); // > true : 是空对象
```

```javascript
const a = {};

const isEmptyObj3 = obj => {
  return JSON.stringify(obj) === '{}' ? true : false;
};

console.log('isEmptyObj3(a) is', isEmptyObj3(a)); // > true : 是空对象
```

## 判断工作日和周末

```javascript
const weekendOrWeekday = inputDate => {
  const day = inputDate.getDay();
  return day === 0 || day === 6 ? 'weekend' : 'weekday';
};

console.log(weekendOrWeekday(new Date()));
```

## 判断奇偶数

```javascript
// Even:偶数 Odd:奇数

const isEven = num => num % 2 === 0;
// isEven(3) -> false
```

```javascript
const EvenOrOdd = array => {
  const EvenCounter = array
    .map(v => v % 2 === 0)
    .reduce((init, v) => init + v, 0);
  const OddCounter = array
    .map(v => v % 2 === 1)
    .reduce((init, v) => init + v, 0);
  const OddList = array.filter(v => v % 2 === 1);
  const EvenList = array.filter(v => v % 2 === 0);
  return { EvenCounter, EvenList, OddCounter, OddList };
};
```

```javascript
const arrayOfIntegers = [1, 4, 5, 9, 0, -1, 5];
console.log(EvenOrOdd(arrayOfIntegers));

{ EvenCounter: 2,
  EvenList: [ 4, 0 ],
  OddCounter: 4,
  OddList: [ 1, 5, 9, 5 ] }
```

## 判断是不是中文

第一种代码：

```javascript
function isChinese(temp) {
  var re = /[^/u4e00-/u9fa5]/;
  if (re.test(temp)) return false;
  return true;
}
```

第二种代码：

```javascript
function isChn(str) {
  var reg = /^[/u4E00-/u9FA5]+$/;
  if (!reg.test(str)) {
    alert('不全是中文');
    return false;
  } else {
    alert('全是中文');
    return true;
  }
}
```
