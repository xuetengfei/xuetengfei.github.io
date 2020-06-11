# FP

# Foldable

```javascript
const sum = list => list.reduce((acc, val) => acc + val, 0);
sum([1, 2, 3]); // 6
```

# Continuation

在程序的任何给定点上，代码中尚未执行的部分称为延续部分。

```javascript
const printAsString = num => console.log(`Given ${num}`);

const addOneAndContinue = (num, cc) => {
  const result = num + 1;
  cc(result);
};

addOneAndContinue(2, printAsString); // 'Given 3'
```

在异步编程中，当程序需要等待接收数据才能继续时，通常会看到连续性。响应通常传递给程序的其余部分，即在收到之后的继续部分。

```javascript
const continueProgramWith = data => {
  // Continues program with data
};

readFileAsync('path / to / file', (err, response) => {
  if (err) {
    // handle error
    return;
  }
  continueProgramWith(response);
});
```

```javascript
Array.prototype.equals = function (arr) {
  const len = this.length;
  if (len !== arr.length) {
    return false;
  }
  for (let i = 0; i < len; i++) {
    if (this[i] !== arr[i]) {
      return false;
    }
  }
  return true;
};
[1, 2].equals([1, 2]); // true
[1, 2].equals([0]); // false
```

# Contracts

契约指定了运行时函数或表达式对行为的义务和保证。这起到了一组从函数或表达式的输入和输出中预期的规则的作用，每当违反契约时，通常都会报告错误。

```javascript
// Define our contract : int -> in'
const contract = (input) => {
  if (typeof input === 'number') return true
    throw new Error('Contract violated: expected int -> int')
  }
}

const addOne = (num) => contract(num) && num + 1

addOne(2) // 3
addOne('some string') // Contract violated: expected int -> int
```

# Predicate

谓词是为给定值返回“真”或“假”的函数。谓词的常见用法是作为数组筛选器的回调。

```javascript
const predicate = a => a > 2;
[1, 2, 3, 4].filter(predicate); // [3, 4]
```

```javascript
const point = (x, y) => ({ x, y });
const a = point(null, 3);
console.log('a: ', a);
// a:  { x: null, y: 3 }
```

# Lazy evaluation

Lazy Evaluation 是一种按需调用的评估机制，它将表达式的评估延迟到需要它的值为止。在函数语言中，这允许使用无限列表这样的结构，而在命令序列很重要的命令语言中，通常不提供无限列表。

```javascript
const rand = function* () {
  while (1 < 2) {
    yield Math.random();
  }
};
const randIter = rand();
randIter.next();
```

# Partial function

分部函数是一个没有为所有参数定义的函数，它可能返回意外的结果，也可能永远不会终止。部分函数增加了认知开销，它们很难解释，并且可能导致运行时错误。一些例子：

```javascript
// example 1: sum of the list
// sum :: [Number] -> Number
const sum = arr => arr.reduce((a, b) => a + b);
sum([1, 2, 3]); // 6
sum([]); // TypeError: Reduce of empty array with no initial value

// example 2: get the first item in list
// first :: [A] -> A
const first = a => a[0];
first([42]); // 42
first([]); // undefined
//or even worse:
first([[42]])[0]; // 42
first([])[0]; // Uncaught TypeError: Cannot read property '0' of undefined

// example 3: repeat function N times
// times :: Number -> (Number -> Number) -> Number
const times = n => fn => n && (fn(n), times(n - 1)(fn));
times(3)(console.log);
// 3
// 2
// 1
times(-1)(console.log);

// RangeError: Maximum call stack size exceeded
```

处理部分函数

部分功能是危险的，因为它们需要非常小心地处理。您可能会得到意外的（错误的）结果或遇到运行时错误。
有时部分函数可能根本不返回。因此，了解并处理所有这些边缘案例会变得非常乏味。
幸运的是，可以将分部函数转换为常规（或总计）函数。我们可以提供默认值或使用保护来处理（以前）部分函数未定义的输入。使用选项类型，我们可以生成一些（值）或无，否则我们会意外地行为：

```javascript
// example 1: sum of the list
// we can provide default value so it will always return result
// sum :: [Number] -> Number
const sum = arr => arr.reduce((a, b) => a + b, 0);
sum([1, 2, 3]); // 6
sum([]); // 0

// example 2: get the first item in list
// change result to Option
// first :: [A] -> Option A
const first = a => (a.length ? Some(a[0]) : None());
first([42]).map(a => console.log(a)); // 42
first([]).map(a => console.log(a)); // console.log won't execute at all
//our previous worst case
first([[42]]).map(a => console.log(a[0])); // 42
first([]).map(a => console.log(a[0])); // won't execte, so we won't have error here
// more of that, you will know by function return type (Option)
// that you should use `.map` method to access the data and you will never forget
// to check your input because such check become built-in into the function

// example 3: repeat function N times
// we should make function always terminate by changing conditions:
// times :: Number -> (Number -> Number) -> Number
const times = n => fn => n > 0 && (fn(n), times(n - 1)(fn));
times(3)(console.log);
// 3
// 2
// 1
times(-1)(console.log);
// won't execute anything
```

使您的部分函数成为总计函数，可以防止这些类型的运行时错误。总是返回一个值也会使代码更容易维护，也更容易解释。

# Contracts

```javascript
// Define our contract : int -> in'
const contract = (input) => {
  if (typeof input === 'number') return true
    throw new Error('Contract violated: expected int -> int')
  }
}

const addOne = (num) => contract(num) && num + 1

addOne(2) // 3
addOne('some string') // Contract violated: expected int -> int
```

# Higher-Order Functions (HOF)

以函数为参数和/或返回函数的函数。

```javascript
const filter = (predicate, xs) => xs.filter(predicate);
const is = type => x => Object(x) instanceof type;
filter(is(Number), [0, '1', 2, null]); // [0, 2]
```

# Comonad

具有提取和扩展功能的对象。

```javascript
const CoIdentity = v => ({
  val: v,
  extract() {
    return this.val;
  },
  extend(f) {
    return CoIdentity(f(this));
  },
});
```

```javascript
CoIdentity(1).extract(); // 1
```

```javascript
CoIdentity(1).extend(co => co.extract() + 1); // CoIdentity(2)
```

# Pointed functor

```javascript
Array.of(1); // [1]
```

# Type Signatures

javascript 中的函数通常会包含一些注释，这些注释指示参数的类型和返回值。
整个社区有相当多的差异，但它们通常遵循以下模式：

```javascript
// functionName :: firstArgType -> secondArgType -> returnType

// add :: Number -> Number -> Number
const add = x => y => x + y;

// increment :: Number -> Number
const increment = x => x + 1;
```

```javascript
// call :: (a -> b) -> a -> b
const call = f => x => f(x);
```

```javascript
// map :: (a -> b) -> [a] -> [b]
const map = f => list => list.map(f);
```

```javascript
```
