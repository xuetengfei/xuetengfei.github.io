## 数据类型判断

### 方法一

```javascript
const getType = v =>
  v === undefined
    ? 'undefined'
    : v === null
    ? 'null'
    : v.constructor.name.toLowerCase();

const a = getType(new Set([1, 2, 3])); // ==> set

const b = getType([1, 2, 3]); // ==> array

const c = getType({}); // ==> object
```

### 方法二

```javascript
// javascript设计模式和开发实践
var isType = function(type) {
  return function(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1) === type;
  };
};

var isString = isType('String');
var isArray = isType('Array');
var isNumber = isType('Number');

console.log(isArray([1, 2, 3])); // true
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
