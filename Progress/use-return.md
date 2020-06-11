return，先摆下定义，“会终止函数的执行并返回函数的值”。

它的语法：`return value`。其中的`value`是可选的，用来返回指定的函数值。如果没写，就返回 `undefined`。《javascript 高级程序设计》(第 3 版)的第 64 页写的很清楚，

---

### 三种作用

?> 1，返回结果；

?> 2，return false，用来阻止默认事件的执行；

?> 3，return，单独的一个 return，可以理解为是从当前函数退出，并把程序的控制权返还给页面了。就是说，`这个 return 所在的函数，不再继续执行了`。`return false` 只在当前函数有效，不会影响其他外部函数的执行。

---

### 控制程序流程

`if+return` 也可以代替复杂的 `if...else`语句进行程序流程的控制。

```javascript
const fn = a => {
  if (a == 2) {
    console.log('a==2');
    return; //结束函数(跳出函数)
  }
  if (a == 3) {
    console.log('a==3');
    return; //结束函数(跳出函数)
  }
  if (a == 4) {
    console.log('a==4');
    return; //结束函数(跳出函数)
  }
  console.log('没有结果');
};

fn(3); // > 'a===3'
fn(8); // > '没有结果'
```
