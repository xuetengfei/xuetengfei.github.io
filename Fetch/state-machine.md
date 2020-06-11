```javascript
var ticking = true;
var clock = function() {
    if (ticking) console.log('Tick!');
    else console.log('Tock!');
    ticking = !ticking;
};

clock(); // Tick!
clock(); // Tock!
clock(); // Tick!
clock(); // Tock!
```

上面的 clock 函数就是一个状态机。这样的写法需要保存一个外部变量 `ticking`，根据 ticking 的状态来判断操作。

---

```javascript
var clock = function*() {
    while (true) {
        console.log('Tick!');
        yield;
        console.log('Tock!');
        yield;
    }
};

let x = clock();

setInterval(() => {
    x.next();
}, 1000);

// Tick!
// Tock!
// Tick!
// Tock!
// ...
```

上面的 Generator 实现，可以看到少了用来保存状态的外部变量 ticking，这样就更简洁，更安全（状态不会被非法篡改）、更符合函数式编程的思想，在写法上也更优雅。Generator 之所以可以不用外部变量保存状态，是因为它本身就包含了一个状态信息，即目前是否处于暂停态。

---

也可以封装多个状态

```javascript
const clock = function*() {
    const empty = Object.create(null);
    while (true) {
        yield Object.assign(empty, { a: 'red', b: 'green' });
        yield Object.assign(empty, { a: 'white', b: 'black' });
    }
};

let x = clock();

setInterval(() => {
    let res = x.next();
    console.log(res.value);
}, 1000);

// {a: "red", b: "green"}
// {a: "white", b: "black"}
// {a: "red", b: "green"}
// {a: "white", b: "black"}
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/statemachine-2-1564536830.png'/>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/statemachine-1-1564536830.png'/>
