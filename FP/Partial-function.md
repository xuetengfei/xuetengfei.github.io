仔细观察下面的代码.

```javascript
function add(a, b) {
  return a + b;
}
console.log(add(1, 2)); //结果3
console.log(add(1, 3)); //结果4
console.log(add(1, 4)); //结果5
console.log(add(1, 5)); //结果6
console.log(add(1, 7)); //结果8
```

`add( )`接收的第一个参数全都是相同的，都是 1，对于这样相同的参数，我们已经重复输入了多次。参数少的情况还好办，那参数多的时候就非常不方便了.

那么有没有什么办法可以让我们对于相同的参数，只输入一次（也就是把他们固定住），对于其他的参数在调用的时候输入就行了呢？答案是偏函数！

上一篇博客，讲解了函数柯里化，借助闭包，将一个包含 n（> 1） 个参数的函数转换为 n 个嵌套的只包含一个参数的函数。

偏函数 Partial function 很像函数柯里化，就是固定一个函数的一个或者多个参数，返回一个新的函数，这个函数用于接受剩余的参数。

```javascript
const partial = (f, ...args) => (...moreArgs) => f(...args, ...moreArgs);
const add3 = (a, b, c) => a + b + c;
const fivePlus = partial(add3, 2, 3); // (c) => 2 + 3 + c

fivePlus(4); // 9
fivePlus(5); // 10
fivePlus(6); // 11
```

```javascript
const greet = (greeting, name1, name2) => greeting + ' ' + name1 + ' ' + name2;

var sayHelloTo = (...args) => greet('Hello', ...args);

const R = sayHelloTo('Word', 'JS');
console.log('R: ', R); //  Hello Word JS
```

---

经常有人搞不清柯里化和部分函数应用 ( Partial Function Application )，经常把他们混为一谈。部分函数应用强调的是固定一定的参数，返回一个更小元的函数。通过以下表达式展示出来就明显了：

```javascript
// 柯里化
f(a,b,c) → f(a)(b)(c)
// 部分函数调用
f(a,b,c) → f(a)(b,c) / f(a,b)(c)
```

柯里化强调的是生成单元函数，部分函数应用的强调的固定任意元参数，而我们平时生活中常用的其实是部分函数应用，这样的好处是可以固定参数，降低函数通用性，提高函数的适合用性。

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
