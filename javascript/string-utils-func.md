## 首字母大写(every word)

```javascript
const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase());

console.log(capitalizeEveryWord('hello world! he me Aob'));
// Hello World! He Me Aob
```

## 首字母大写(first letter)

使用解构和 toUpperCase() 大写第一个字母，...rest 第一个字母后获得字符数组，然后 Array.join('')再次使它成为一个字符串。 省略 lowerRest 参数以保持字符串的剩余部分不变，或者将其设置为 true 这会将字符串的剩余部分转换为小写。

```javascript
const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() +
  (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

// capitalize('myName') -> 'MyName'
// capitalize('myName', true) -> 'Myname'
```

## 检查回文

```javascript
const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return (
    s ===
    s
      .split('')
      .reverse()
      .join('')
  );
};
// palindrome('wow') -> true
```

```javascript
const fn = para =>
  String(para)
    .split('')
    .reverse()
    .join('');

console.log(fn('hello')); // olleh
console.log(fn(1234)); // 4321
```

## 反转字符串

```javascript
const reverseString = str => [...str].reverse().join('');
// reverseString('foobar') -> 'raboof'
```

## 截断字符串

按照指定长度截断一个字符串,确定字符串的 length 是否大于 num。 返回截断所需长度的字符串，用 ... 附加到结尾或原始字符串。

```javascript
const truncate = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

console.log(truncate('这个函数是超出指定的字符长度省略为省略号', 7));
// 这个函数...
```

## 对'字符串'洗牌组合

使用递归。 对于给定字符串中的每个字母，为其余字母创建所有部分字母。 使用 Array.map() 将字母与每个部分字母组合在一起，然后使用 Array.reduce() 将所有字母组合到一个数组中。 基本情况是字符串 length 等于 2 或 1 。

```javascript
const anagrams = str => {
  if (str.length < = 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str.split('').reduce((acc, letter, i) =>
    acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)), []);
};
// anagrams('abc') // => ['abc','acb','bac','bca','cab','cba']
//
// anagrams('薛腾飞'); // =>[ '薛腾飞', '薛飞腾', '腾薛飞', '腾飞薛', '飞薛腾', '飞腾薛' ]
```

## 求字符串长度

```javascript
function length(str) {
  return [...str].length;
}

console.log(length('hello')); // 5

const b = 'xue';
console.log(b.length); // 3
```

## 字符串转化为数组序列

```javascript
const digitize = n => {
  return [...n];
};

console.log(digitize('123')); // [ '1', '2', '3' ]
console.log(digitize('xue')); // [ 'x', 'u', 'e' ]
```

```javascript
const rawStr = ` Lorem ipsum dolor sit amet  `;
// 去除所有空格
const removeAllSpace = rawStr.replace(/\s+/g, '');
console.log('removeAllSpace: ', removeAllSpace);

// 去除两头空格
const trimStr = rawStr.replace(/^\s+|\s+$/g, '');
console.log('TCL: trimStr', trimStr);

// 去除左空格
const removeLeftspace = rawStr.replace(/^\s/, '');
console.log('TCL: removeLeftspace', removeLeftspace);

// 去除右空格
const removeRightspace = rawStr.replace(/(\s$)/g, '');
console.log('TCL: removeRightspace', removeRightspace);
```

## 将字符串拆分成等长字符串的数组

```javascript
const str = `excepturiquasisuumtotam,`;

const arr = str.match(/.{1,6}/g);
const arr1 = str.split(/(.{6})/);

console.log('arr: ', arr);
// arr:  [ 'except', 'uriqua', 'sisuum', 'totam,' ]

console.log('arr1: ', arr1);
// arr1:  [ '', 'except', '', 'uriqua', '', 'sisuum', '', 'totam,', '' ]
```
