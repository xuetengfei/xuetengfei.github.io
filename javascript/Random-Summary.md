## 随机数构成的数组

```javascript
/**
 * 由随机数组成的数组：长度和随机数范围可自定义
 * @param {number} length 数组的长度
 * @param {number} limit 随机数的范围
 */
const genNumArr = (length, limit) => {
  // Array.from第二个参数 类似数组的map方法，对每个元素进行处理，将处理后的值放入返回的数组
  return Array.from({ length }, () => Math.floor(Math.random() * limit));
};
console.log(genNumArr(20, 10));
// 数组长度为20，每个元素的范围在0-9之间
// > [ 8, 1, 0, 8, 5, 7, 7, 4, 3, 7, 4, 1, 5, 7, 6, 9, 4, 2, 3, 0 ]
```

## Shuffle array (随机排列数组)

```javascript
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const shuffle = arr => arr.sort(() => Math.random() - 0.5);
console.log(shuffle(arr)); // [ 1, 5, 2, 3, 6, 4, 7, 9, 0, 8 ]
```

## 定时随机打印数组元素

```javascript
var array = ['apple', 'fox', 'cat', 'mima', 'lorem', 'vued', 'heko', 'arxk'];
setInterval(function () {
  console.log(array[Math.floor(Math.random() * 10)]);
}, 500);
```

## 设置条件生成一个随机数

```javascript
// 随机整数

const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

console.log(randomIntegerInRange(0, 5)); // 3
```

```javascript
// 随机数

const randomInRange = (min, max) => Math.random() * (max - min) + min;

console.log(randomInRange(1, 10)); // 6.295866359219117
```

```javascript
// 指定长度的随机数
const randomInRange = (min, max, length) =>
  String(Math.random() * (max - min) + min).substr(0, length + 1);

console.log(randomInRange(1, 10, 5)); //8.0744
```

## 数组取样，随机获取数组中的 1 个元素

使用 Math.random() 生成一个随机数，乘以 length，并使用 Math.floor() 舍去小数获得到最接近的整数。这个方法也适用于字符串。

```javascript
const sample = arr => arr[Math.floor(Math.random() * arr.length)];
// sample([3, 7, 9, 11]) -> 9
```

## 使用 JS 生成随机字符串-1

```javascript
Math.random().toString(36).substring(2);
```

`Math.random()` 返回 0 到 1 的随机数，长度也是随机的。机数转变成三十六进制，实际就相当于变成了数字+字母的随机字符串。类似于`'0.dyphg9qcxd5'` ，取小数点后的字符串就完成了。

```javascript
const randomString = (length = 10) => {
  let num = length - 10 > 0 ? Math.ceil((length - 10) / 10) : 1;
  let str = '';
  for (let i = 0; i < num; i++) {
    str += Math.random().toString(36).substring(2);
  }
  return str.substring(0, length);
};

log(randomString()); // lp0sd7rtlh
log(randomString(6)); // z0m3fp
log(randomString(200)); // 05oti5...n...xsynift9
```

## 随机生成指定长度的字符串-2

```javascript
function strFn(n) {
  let str = 'abcdefghijklmnopqrstuvwxyz9876543210!@## $%^&*()"><?';
  let tmp = '',
    len = str.length;
  for (i = 0; i < n; i++) {
    tmp += str.charAt(Math.floor(Math.random() * len));
  }
  return tmp;
}

let str81 = strFn(10);
console.log(str81); // d!7m1ivhmy
```

## 随机汉字

```javascript
function tohanzi() {
  let data = '\\u' + (Math.round(Math.random() * 20901) + 19968).toString(16);
  data = data.split('\\u');
  var str = '';
  for (var i = 0; i < data.length; i++) {
    str += String.fromCharCode(parseInt(data[i], 16).toString(10));
  }
  return str;
}

console.log(tohanzi()); // > 媌 抬 ...
```

## 随机生成颜色

```javascript
var getRandomColor = function () {
  return (
    '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6)
  );
};

// #bc9ee3
```
