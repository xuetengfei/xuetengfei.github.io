!> 函数式编程有两个最基本的运算：函数组合和柯里化。

函数式编程中组合函数。组合将两个函数在一个新的函数中『组合』到一起，产下一个崭新的函数。

### compose

```javascript
const compose = (...fns) => x => fns.reduceRight((x, fn) => fn(x), x);
```

```javascript
const add = a => a + 1;
const times = a => a * 2;

const xue = compose(add, times); // right -> left

/* console */
console.log(xue(5)); // 11
```

### 函数组合写法-1

f 和 g 都是函数，x 是在它们之间通过“管道”传输的值。
`函数组合`选择两个有特点你又喜欢的函数，让它们结合。组合的用法如下：

```javascript
var compose = function(f, g) {
  return function(x) {
    return f(g(x));
  };
};

var toUpperCase = function(x) {
  return x
    .split('')
    .reverse()
    .join('');
};

var exclaim = function(x) {
  return x + '!';
};

var shout = compose(exclaim, toUpperCase);

shout('hello word');

//  drow olleh!
```

### 函数组合写法-2

更简单的写法

```javascript
const compose = (a, b) => c => a(b(c));

const add = a => a + 1;
const times = a => a * 2;
const xue = compose(add, times);
xue(5);
//  11
```

注意参数的顺序以及它们是如何被计算的,从右到左

```javascript
const add = a => a + 1;
const times = a => a * 2;
const compose = (a, b) => c => a(b(c));
const xue = compose(times, add);
xue(5);
//  12
```

### 函数组合写法-3

```javascript
const add = a => a + 1;
const times = a => a * 2;

const pipe = fns => x => fns.reduce((v, f) => f(v), x);
const xue = pipe([times, add]);
xue(5);
// => 11
```

## 结合实际

一个简单的问候语纯函数

```javascript
const greeting = name => `Hello ${name}`;
```

添加性别前缀

```javascript
const greeting = (name, sex = 'man') =>
  `Hello,${sex === 'man' ? 'Mr.' : 'Ms.'}${name}`;
```

如果我们又要添加越来越多的判断逻辑，比如『Dr.』或『Sir』呢？如果我们要添加『MD』或者『PhD』前缀呢？又或者我们要变更下问候的方式，用『Sup』替代『Hello』呢？

现在事情已然变得很棘手。像这样为函数添加判断逻辑并不是面向对象中的继承，不过与继承并且重写对象的属性和方法的情况有些类似。既然反对添加判断逻辑，那我们就来试试函数组合的方式：

```javascript
const formalGreeting = name => `Hello ${name}`;
const casualGreeting = name => `Sup ${name}`;
const male = name => `Mr. ${name}`;
const female = name => `Mrs. ${name}`;
const doctor = name => `Dr. ${name}`;
const phd = name => `${name} PhD`;
const md = name => `${name} M.D.`;
formalGreeting(male(phd('Chet'))); // => "Hello Mr. Chet PhD"
```

使用上文的 pipe 函数，执行一个函数数组，按照从左到右顺序执行。添加更复杂一点的逻辑。既然反对添加判断逻辑，那我们就来试试函数组合的方式。

```javascript
const pipe = fns => x => fns.reduce((v, f) => f(v), x);
const formalGreeting = name => `Hello ${name}`;
const casualGreeting = name => `Sup ${name}`;
const male = name => `Mr. ${name}`;
const female = name => `Mrs. ${name}`;
const doctor = name => `Dr. ${name}`;
const phd = name => `${name} PhD`;
const md = name => `${name} M.D.`;
const identity = x => x;

const greet = (name, options) => {
  return pipe([
    // prefix
    options.doctor
      ? doctor
      : options.male
      ? male
      : options.female
      ? female
      : identity,
    // suffix
    options.phd ? phd : options.md ? md : identity,
    // greeting
    options.formal ? formalGreeting : casualGreeting,
  ])(name);
};

console.log(
  greet('xue', {
    formal: 'formalGreeting',
    doctor: 'doctor',
    female: 'female',
    phd: 'phd',
  }),
);
// => "Hello Dr. xue PhD"
```

另外一个使用纯函数和函数组合的好处是更加容易追踪错误。无论在什么时候出现一个错误，你都能够通过每个函数追溯到问题的缘由。在面向对象编程中，这通常会相当的复杂，因为你一般情况下并不知道引发改问题的对象的其他状态。
