!> 函数式编程有两个最基本的运算：函数组合和柯里化。

函数式编程中组合函数。组合将两个函数在一个新的函数中『组合』到一起，产下一个崭新的函数。

### compose

```javascript
const compose = (...fns) => x => fns.reduceRight((x, fn) => fn(x), x);

const inc = a => a + 1;
const times = a => a * 2;

const result = compose(inc, times); // right -> left

console.log(result(5)); // 11
```

### 函数组合写法

更简单的写法

```javascript
const compose = (a, b) => c => a(b(c));

const inc = a => a + 1;
const times = a => a * 2;
const xue = compose(inc, times);
xue(5);
//  11
```

注意参数的顺序以及它们是如何被计算的,从右到左

```javascript
const inc = a => a + 1;
const times = a => a * 2;
const compose = (a, b) => c => a(b(c));
const xue = compose(times, inc);
xue(5);
//  12
```

### 函数组合写法-3

```javascript
const inc = a => a + 1;
const times = a => a * 2;

const pipe = fns => x => fns.reduce((v, f) => f(v), x);
const result = pipe([times, inc]);
result(5);
// => 11
```

## 结合实际

一个问候语纯函数

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
