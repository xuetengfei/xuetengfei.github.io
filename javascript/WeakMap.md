WeakMap 对象是一组键值对的集合，其中的键是弱引用对象，而值可以是任意。

> 弱引用

弱引用，就是垃圾回收机制遍历的时候不考虑该引用。只要所引用的对象的其他引用都被清
除，垃圾回收机制就会释放该对象所占用的内存。注意，WeakMap 弱引用的只是键名，而不
是键值。键值依然是正常引用。key 随时可以消失,WeakMap 的 key 是不可枚举的。

## 属性

constructor：构造函数

## 方法

```bash
set(key)：设置一组key关联对象
get(key)：返回key关联对象（没有则则返回 undefined）
delete(key)：移除 key 的关联对象
has(key)：判断是否有 key 关联对象
```

## 用途

可以用来保存 DOM 节点，不容易造成内存泄漏

```javascript
let ele = document.getElementById('logo');
let wm = new WeakMap();

wm.set(ele, { timesClicked: 0 });

ele.addEventListener(
  'click',
  function () {
    let logoData = wm.get(ele);
    logoData.timesClicked++;
  },
  false,
);
```

[WeakMap 数据结构 - ECMAScript 6 入门](https://es6.ruanyifeng.com/#docs/set-map#WeakMap)
