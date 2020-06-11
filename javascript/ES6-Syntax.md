## Variables and constant feature comparison

| Keyword | Scope          | Hoisting | Can Be Reassigned | Can Be Redeclared |
| ------- | -------------- | -------- | ----------------- | ----------------- |
| var     | Function scope | Yes      | Yes               | Yes               |
| let     | Block scope    | No       | Yes               | No                |
| const   | Block scope    | Yes      | Yes               | No                |

## Arrow functions

```javascript
// ES6
let func = () => {};
let func = a => {};
let func = (a, b, c) => {};
```

## Template literals

```javascript
let str = `Release Date: ${date}`;
```

## Implicit returns

```javascript
// ES5
function func(a, b, c) {
  return a + b + c;
}

// ES6
let func = (a, b, c) => a + b + c; // curly brackets must be omitted
```

## Key/property shorthand

```javascript
// ES5
var obj = {
  a: a,
  b: b,
};

// ES6
let obj = {
  a,
  b,
};
```

## Method definition shorthand

```javascript
// ES5
var obj = {
  a: function(c, d) {},
  b: function(e, f) {},
};

// ES6
let obj = {
  a(c, d) {},
  b(e, f) {},
};
```

## Destructuring (object matching)

```javascript
var obj = { a: 1, b: 2, c: 3 };

// ES5
var a = obj.a;
var b = obj.b;
var c = obj.c;

// ES6
let { a, b, c } = obj;
```

## Array iteration (looping)

```javascript
var arr = ['a', 'b', 'c'];

// ES5
for (var i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// ES6
for (let i of arr) {
  console.log(i);
}
```

## Default parameters

```javascript
// ES5
var func = function(a, b) {
  b = b === undefined ? 2 : b;
  return a + b;
};
// ES6
let func = (a, b = 2) => {
  return a + b;
};

func(10); // returns 12
func(10, 5); // returns 15
```

## Spread syntax

```javascript
// ES6
let arr1 = [1, 2, 3];
let arr2 = ['a', 'b', 'c'];
let arr3 = [...arr1, ...arr2];

console.log(arr3); // [1, 2, 3, "a", "b", "c"]
// Spread syntax can be used for function arguments.

// ES6
let arr1 = [1, 2, 3];
let func = (a, b, c) => a + b + c;

console.log(func(...arr1)); // 6
```

## Classes/constructor functions

```javascript
// ES5
function Func(a, b) {
  this.a = a;
  this.b = b;
}

Func.prototype.getSum = function() {
  return this.a + this.b;
};

var x = new Func(3, 4);

// ES6
class Func {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  getSum() {
    return this.a + this.b;
  }
}

let x = new Func(3, 4);
x.getSum(); // returns 7
```

## Inheritance

```javascript
// Inheritance

// ES5
function Inheritance(a, b, c) {
  Func.call(this, a, b);

  this.c = c;
}

Inheritance.prototype = Object.create(Func.prototype);
Inheritance.prototype.getProduct = function() {
  return this.a * this.b * this.c;
};

var y = new Inheritance(3, 4, 5);

// ES6
class Inheritance extends Func {
  constructor(a, b, c) {
    super(a, b);

    this.c = c;
  }

  getProduct() {
    return this.a * this.b * this.c;
  }
}

let y = new Inheritance(3, 4, 5);
y.getProduct(); // 60
```

## Modules - export/import

```javascript
// <script src="export.js"></script>
// <script type="module" src="import.js"></script>

/* export.js */
let func = a => a + a;
let obj = {};
let x = 0;
export { func, obj, x };

/*  import.js */
import { func, obj, x } from './export.js';
console.log(func(3), obj, x);
```

## Promises/Callbacks

```javascript
// ES5 callback
function doSecond() {
  console.log('Do second.');
}

function doFirst(callback) {
  setTimeout(function() {
    console.log('Do first.');

    callback();
  }, 500);
}

doFirst(doSecond);
```

```javascript
// ES6 Promise
let doSecond = () => {
  console.log('Do second.');
};

let doFirst = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Do first.');

    resolve();
  }, 500);
});

doFirst.then(doSecond);
```

Simple new XMLHttpRequest

```javascript
// ES5 callback
function makeRequest(method, url, callback) {
  var request = new XMLHttpRequest();

  request.open(method, url);
  request.onload = function() {
    callback(null, request.response);
  };
  request.onerror = function() {
    callback(request.response);
  };
  request.send();
}

makeRequest('GET', 'https://url.json', function(err, data) {
  if (err) {
    throw new Error(err);
  } else {
    console.log(data);
  }
});
```

```javascript
// ES6 Promise
function makeRequest(method, url) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();

    request.open(method, url);
    request.onload = resolve;
    request.onerror = reject;
    request.send();
  });
}

makeRequest('GET', 'https://url.json')
  .then(event => {
    console.log(event.target.response);
  })
  .catch(err => {
    throw new Error(err);
  });
```

<!--

[ES6 Syntax and Feature Overview – Tania Rascia](https://www.taniarascia.com/es6-syntax-and-feature-overview/)
 -->
