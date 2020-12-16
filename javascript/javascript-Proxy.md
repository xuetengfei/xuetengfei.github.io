Proxy 使你能够包装目标对象,通过 Proxy 可以拦截和重新定义该对象的基本操作。

### Syntax

```js
const handler = {
  set: function (target, property, value, receiver) {},
};
const p = new Proxy(target, handler);
```

#### get object attribute

```js
const wrap = obj => {
  return new Proxy(obj, {
    get(target, propKey) {
      console.log(`Reading property "${propKey}"`);
      return target[propKey];
    },
  });
};

const object = { message: 'hello world' };
const wrapped = wrap(object);
console.log(wrapped.message);

// >> Reading property "message"
// >> hello world
```

#### handler.apply 拦截函数的调用

```js
const fetch = ms =>
  new Promise((resolve, _) => {
    setTimeout(() => {
      resolve(ms);
    }, ms * 1000);
  });

const handler = {
  apply: function (target, _context, args) {
    // dosomething
    console.log('target: ', target); // target:  [Function: fetch]
    return target(...args);
  },
};

const Task = new Proxy(fetch, handler);

Task(1)
  .then(res => console.log(res))
  .catch();
```

#### Validation

```js
let checkHandler = {
  set: function (obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }
    obj[prop] = value;
    return true;
  },
};

function fn({ age }) {
  const validator = new Proxy({}, checkHandler);
  const exetor = (resolve, reject) => {
    try {
      if (age) {
        validator.age = age;
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  };
  return new Promise(exetor);
}

fn({ age: 500 })
  .then(() => {
    console.log('ok');
  })
  .catch(err => {
    if (err.name === 'RangeError') {
      console.info(err.message);
    } else {
      console.error('Uh oh, an error!', err);
    }
  });
```

```
$ node javascript-Proxy.js
>> The age seems invalid
```

#### Side Effects

可以使用代理对属性读 / 写创建副作用。 想法是触发一些函数，如果一个特定的属性被访
问或写入。 举例:

```js
const sendEmail = () => {
  console.log('Sending Email After Task Completion');
};

const handler = {
  set: function (target, prop, value) {
    if (prop === 'status' && value === 'complete') {
      sendEmail();
    }
    target[prop] = value;
  },
};

const tasks = new Proxy({}, handler);

tasks.status = 'complete';

// Sending Email After Task Completion

// > console.log(tasks)
// { status: 'complete' }
```

#### Caching

```js
const cacheTarget = (target, ttl = 60) => {
  const CREATED_AT = Date.now();
  const isExpired = () => Date.now() - CREATED_AT > ttl * 1000;
  const handler = {
    get: (target, prop) => (isExpired() ? undefined : target[prop]),
  };
  return new Proxy(target, handler);
};

const cache = cacheTarget({ age: 25 }, 5);

console.log(cache.age);

setTimeout(() => {
  console.log(cache.age);
}, 6 * 1000);

// 25
// undefined
```

#### lazy code

```js
const executeOperations = (operations, args) => {
  return operations.reduce((args, method) => {
    return [method(...args)];
  }, args);
};

const $ = Symbol('RESULT_ARGUMENT');

function lazify(instance) {
  const operations = [];

  const proxy = new Proxy(instance, {
    get(target, propKey) {
      const propertyOrMethod = target[propKey];

      if (propKey === 'run') {
        return (...args) => {
          return executeOperations(operations, args)[0];
        };
      }

      if (!propertyOrMethod) {
        throw new Error('No property found.');
      }

      // is not a function
      if (typeof propertyOrMethod !== 'function') {
        return target[propKey];
      }

      return (...args) => {
        operations.push(internalResult => {
          return propertyOrMethod.apply(
            target,
            [...args].map(arg => (arg === $ ? internalResult : arg)),
          );
        });

        return proxy;
      };
    },
  });

  return proxy;
}

class Calculator {
  add(a, b) {
    return a + b;
  }
  subtract(a, b) {
    return a - b;
  }
  multiply(a, b) {
    return a * b;
  }
  divide(a, b) {
    return a / b;
  }
}
const _R = new Calculator().add(1, 5);
console.log(' _R: ', _R); // -> 6

const lazyCalculator = lazify(new Calculator());

const a = lazyCalculator.add(5, 10).subtract($, 5).multiply($, 10);

console.log(a.run()); // -> 100
```

### javascript

apply 方法拦截函数的调用、call 和 apply 操作。 apply 方法可以接受三个参数，分别
是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。

```js
var handler = {
  apply(target, ctx, args) {
    return Reflect.apply(...arguments);
  },
};
```

```javascript
var target = function () {
  return 'I am the target';
};
var handler = {
  apply: function () {
    return 'I am the proxy';
  },
};

const p = new Proxy(target, handler);
const result = p();

console.log('result: ', result);
// result:  I am the proxy

const twice = {
  apply(target, ctx, args) {
    return Reflect.apply(...arguments) * 2;
  },
};
function sum(left, right) {
  return left + right;
}
const proxy2 = new Proxy(sum, twice);
proxy2(1, 2); // 6
proxy2.call(null, 5, 6); // 22
proxy2.apply(null, [7, 8]); // 30
```

---

1. [code source](https://github.com/xuetengfei/grocery/blob/master/003-proxy.js#L5-L20)
1. [Proxy - ECMAScript 6 入门](https://es6.ruanyifeng.com/#docs/proxy)
1. [Proxy - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
1. [Javascript Proxies : Real World Use Cases – Arbaz Siddiqui](https://www.arbazsiddiqui.me/javascript-proxies-real-world-use-cases/)
