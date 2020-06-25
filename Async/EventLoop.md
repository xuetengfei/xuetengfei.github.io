<!-- <img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/event-loop-img-2.png"   width="650px"> -->

### e.g.1

```javascript
const foo = () => console.log('First');
const bar = () => setTimeout(() => console.log('Second'), 500);
const baz = () => console.log('Third');

bar();
foo();
baz();
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200526-HDH7q2-event-loop.gif' alt='20200526-HDH7q2-event-loop'/>

### macroTask、microTask Queue

在 ES6 规范中，microtask 称为 jobs，macrotask 称为 task。  
微任务包括 process.nextTick ，promise ，Object.observe ，MutationObserver  
宏任务包括 script ，setTimeout ，setInterval ，setImmediate ，I/O ，UI rendering

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200527095703event-loop.gif' alt='20200527095703event-loop'/>

### e.g.2

```javascript
setTimeout(() => {
  console.log('timer1');
  Promise.resolve().then(function () {
    console.log('promise1');
  });
}, 0);

setTimeout(() => {
  console.log('timer2');
  Promise.resolve().then(function () {
    console.log('promise2');
  });
}, 0);
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/eventloop-1554636879.gif'/>

---

[✨♻️ 插图来源 - DEV](https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif)
