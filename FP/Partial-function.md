partial（偏函数）是一种减少函数元数（arity）的方法，其核心是，它会创建一个新函数
，这个新函数的一些参数是预设好的，对于相同的参数，只输入一次（也就是把他们固定住
），对于其他的参数在调用的时候输入就行了。

上一篇博客，讲解了函数柯里化，借助闭包，将一个包含 n（> 1） 个参数的函数转换为 n
个嵌套的只包含一个参数的函数。

偏函数 Partial function 很像函数柯里化，就是固定一个函数的一个或者多个参数，返回
一个新的函数，这个函数用于接受剩余的参数。

## 实现

```javascript
// 实现方案1
const partial =
  (f, ...args) =>
  (...moreArgs) =>
    f(...args, ...moreArgs);

// or
function partial(func, ...args) {
  return function (...arg) {
    return func.call(this, ...args, ...arg);
  };
}
```

```javascript
// 实现方案2 使用 bind
function mul(a, b) {
  return a * b;
}

let double = mul.bind(null, 2);

console.log(double(3)); // = mul(2, 3) = 6
console.log(double(4)); // = mul(2, 4) = 8
console.log(double(5)); // = mul(2, 5) = 10
```

## 使用

```javascript
// demo1
const partial =
  (f, ...args) =>
  (...moreArgs) =>
    f(...args, ...moreArgs);

const sum = (a, b, c) => a + b + c;
const fivePlus = partial(sum, 2, 3); // (c) => 2 + 3 + c

fivePlus(4); // 9
fivePlus(5); // 10
fivePlus(6); // 11
```

```javascript
// demo2
const greet = (greeting, name1, name2) => greeting + ' ' + name1 + ' ' + name2;
var sayHelloTo = (...args) => greet('Hello', ...args);

const R = sayHelloTo('Word', 'JS');
console.log('R: ', R); //  Hello Word JS
```

```javascript
// demo3 使用 bind
function mul(a, b) {
  return a * b;
}

let double = mul.bind(null, 2);

console.log(double(3)); // = mul(2, 3) = 6
console.log(double(4)); // = mul(2, 4) = 8
console.log(double(5)); // = mul(2, 5) = 10
```

---

经常有人搞不清柯里化和部分函数应用 ( Partial Function Application )，经常把他们
混为一谈。部分函数应用强调的是固定一定的参数，返回一个更小元的函数。通过以下表达
式展示出来就明显了：

```javascript
// 柯里化
f(a,b,c) → f(a)(b)(c)

// 部分函数调用
f(a,b,c) → f(a)(b,c) / f(a,b)(c)
```

柯里化强调的是生成单元函数，部分函数应用的强调的固定任意元参数，平时常用的其实偏
函数，这样的好处是可以固定参数，降低函数通用性，提高函数的适合用性。

```javascript
// 假设一个通用的请求 API
const request = (type, url, options) => ...
// GET 请求
request('GET', 'http://....')
// POST 请求
request('POST', 'http://....')

// 但是通过部分调用后，我们可以抽出特定 type 的 request
const get = request('GET');
get('http://', {..})

```
