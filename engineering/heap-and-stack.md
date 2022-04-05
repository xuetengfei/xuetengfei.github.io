![20220330-bbUTSV-stack-heap-pointers](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220330-bbUTSV-stack-heap-pointers.png)

说到堆栈，讲的就是内存的使用和分配。

## 栈内存 Stack

Stack: Static memory allocation

栈是一种数据结构,JavaScript 使用存储静态数据。静态数据是数据引擎在编译时知道大小
的地方。在 JavaScript 中,这包括原始值(字符串、数字、布尔值、定义和 null)和引用,
对象和函数。

由于引擎知道大小不会改变,这将为每个值分配一个固定数量的内存。分配内存之前执行的
过程被称为静态内存分配。因为引擎为这些值,分配一个固定数量的内存是有限度的原始值
可以有多大。这些价值观和整个堆栈的极限取决于浏览器。

## 堆内存 Heap

Heap: Dynamic memory allocation

堆是一个不同的空间来存储数据,JavaScript 存储对象和函数。与堆栈,引擎不为这些对象
分配一个固定数量的内存。相反,将根据需要分配更多的空间。分配内存这种方式也被称为
动态内存分配。

对象就是栈的指针和堆中的数值。

## 比较

| Stack                | Heap                   |
| :------------------- | :--------------------- |
| 原始值和引用         | 对象和函数             |
| 大小在编译时就知道了 | 大小在运行时是才知道的 |
| 分配固定数量的内存   | 每个对象没有限制       |

## 出个题目

```js
// 连续赋值
let a = { x: 1 };
let b = a;
a.x = a = { n: 1 };
console.log(a);
console.log(b);
```

打印出什么

```js
console.log(a); // { n: 1 }
console.log(b); // { x: { n: 1 } }
```

---

1. [内存管理 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management)
2. [JavaScript's Memory Management Explained](https://felixgerschau.com/javascript-memory-management/#the-memory-heap-and-stack)
