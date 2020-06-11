?> 函数的内部，再定义一个函数,内部的函数可以访问外部函数里的变量。那么，内部的函数就是一个闭包。闭包是函数。

```javascript
function make() {
  const name = 'Mozilla';
  return () => {
    console.log('name: ', name);
  };
}
const fn = make();

fn();
// name:  Mozilla
```

#### case-1:使用闭包进行函数柯里化

```javascript
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2)); // 7
console.log(add10(2)); // 12

console.log(makeAdder(5)(2)); // 7
console.log(makeAdder(10)(2)); // 12
```

`add5`和 `add10` 都是闭包,它们共享相同的函数定义，但是保存了不同的词法环境。在 `add5` 的环境中，`x` 为 5。而在 `add10` 中，`x` 则为 10。

### case-2:封装函数传递参数

一个真实的场景中，一个初始化函数 apiConnect(apiKey)，它返回一些使用 API​​ 密钥的方法。在这种情况下，只需要提供一次 apiKey 即可。

```javascript
function apiConnect(apiKey) {
  function get(route) {
    return fetch(`${route}?key=${apiKey}`);
  }
  function post(route, params) {
    return fetch(route, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
  }
  return { get, post };
}
const api = apiConnect('my-secret-key');

// No need to include the apiKey anymore
api.get('http://api/get-endpoint');
api.post('http://api/post-endpoint', { name: 'Joe' });
```

### case-3

闭包很有用，因为它允许将函数与其所操作的某些数据（环境）关联起来。这显然类似于面向对象编程。在面向对象编程中，对象允许我们将某些数据（对象的属性）与一个或者多个方法相关联。`因此，通常你使用只有一个方法的对象的地方，都可以使用闭包。`

```javascript
function makeSizer(size) {
  return function() {
    document.body.style.fontSize = size + 'px';
  };
}

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);

<a href="#" id="size-12">12</a>
<a href="#" id="size-14">14</a>
<a href="#" id="size-16">16</a>

document.getElementById('size-12').onclick = size12;
document.getElementById('size-14').onclick = size14;
document.getElementById('size-16').onclick = size16;
```

### case-4:用闭包模拟私有方法

使用闭包来定义公共函数，并令其可以访问私有函数和变量。这个方式也称为 `模块模式（module pattern）`
以这种方式使用闭包，提供了许多与面向对象编程相关的好处 —— 特别是`数据隐藏`和`封装`。

封装的使用

```javascript
var person = (function() {
  var name = 'default-name';
  return {
    getName: function() {
      return name;
    },
    setName: function(newName) {
      name = newName;
    },
  };
})();

console.log(person.name); // undefined
console.log(person.getName()); // default-name
person.setName('James Bond');
console.log(person.getName()); // James Bond
```

### case-4:下面的这个函数用来`锁定`和`解锁`窗口的滚动。

```javascript
let stopBodyScroll = (() => {
  let bodyEl = document.body;
  let topH = 0;

  return isFixed => {
    if (isFixed) {
      topH = window.scrollY;
      bodyEl.style.position = 'fixed';
      bodyEl.style.top = -topH + 'px';
    } else {
      bodyEl.style.position = '';
      bodyEl.style.top = '';
      window.scrollTo(0, topH);
    }
  };
})();

let Lock = () => {
  stopBodyScroll(true);
};
let Unlock = () => {
  stopBodyScroll(false);
};
document.getElementById('lockBtn').onclick = Lock;
document.getElementById('unlockBtn').onclick = Unlock;
```
