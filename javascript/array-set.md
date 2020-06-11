ES6 提供了一个新的数据结构 Set 用来存储任意类型的值，它类似于数组。 那么既然已经有了数组，为啥还要搞个 Set 出来呢？必然这两者之间是有区别的。

开始之前，先说明一下，数组和 Set 之间是可以很方便地进行相互转换的

#### 转换

数组转 Set 只需要通过 Set 的构造函数即可

```javascript
let arr = [1, 2, 3];
let set = new Set(arr);

// Set(3) {1, 2, 3}
```

Set 转数组可以直接用展开运算符

```javascript
let set = new Set([1, 2, 3]);
let arr = [...set];
```

接下来看看二者之间的操作有什么区别

#### 唯一性

Array 是可以包含重复值的，比如下面的数组长度为 4

```javascript
let arr = [1, 1, 2, 2];
```

而 Set 中的值则总是唯一的，不会有重复值存在，这也是 Set 跟数组之间最直观的区别。

```javascript
new Set([1, 1, 2, 2]);

// 输出 Set(2) {1, 2}
```

这在我们前面讲过的结合展开运算符进行数组去重中是非常有用的

```javascript
let arr = [1, 1, 2, 2];
let newArr = [...new Set(arr)];

// newArr 为 [1, 2]
```

既然 Set 具有元素唯一性，那么就肯定会有一个判断的机制，这个机制其实就类似精确相等 ===，当然这里面有特例 NaN

```javascript
NaN === NaN;
```

上面的结果为 false，然而在 Set 的判断中，会判定为 true，因此不能存在多个 NaN

```javascript
new Set([NaN, NaN]);

// Set(1) {NaN}
```

#### 长度

arr.length 用来获取数组的长度，而在 Set 中就变成了`size`属性了

```javascript
let set = new Set([1, 2, 3]);
set.size; // 3
```

#### 获取元素

数组可以直接通过索引的方式（arr[0]）取值，但是 Set 是不能这样获取的。只能通过遍历取值

```javascript
let sets = new Set([5, 8, 10]);
for (let value of sets) {
  console.log(value);
}

// 5
// 8
// 10
```

#### 添加元素

数组可以通过 push() 方法或者索引的方式添加值

```javascript
let arr = [1, 2];
arr[2] = 3;
arr.push(4);
```

而 Set 则是通过 `add()`方法来实现

```javascript
let set = new Set();
set.add(1);
set.add('hello');

// Set(2) {1, "hello"}
```

而且 add 方法是返回 Set 对象本身，所以是可以链式调用的

```javascript
set.add(2).add('hello');
```

#### 删除元素

数组中可以通过 splice 来删除某个元素，本质上是通过索引来删除元素

```javascript
let arr = [4, 5, 6];
arr.splice(1, 1);

// arr [4, 6]
```

Set 要删除某个元素更方便，用 delete() 来做

```javascript
let set = new Set([4, 5, 6]);
set.delete(5);

// Set(2) {4, 6}
```

该方法返回一个布尔值，删除成功返回 true，如果删除一个不存在的元素则返回 false。

#### 清空

前面讲过清空数组的方式，最简单的直接

```javascript
arr.length = 0;
```

而 Set 有个专门用来清空的方法 clear()

```javascript
let set = new Set([4, 5, 6]);
set.clear();

// Set(0) {}
```

#### 是否存在某个值

数组中要判断是否存在某个值，可以用 indexOf() 或 includes() 实现

```javascript
arr.indexOf(1) > -1;
arr.includes(1);
```

而 Set 则可以通过 has() 实现

```javascript
let set = new Set([4, 5, 6]);
set.has(1); // false
```

#### 总结

数组和 Set 直观的区别是，数组可以包含重复元素，而 Set 的元素都是唯一的。综合 Set 操作元素的方法，更像是一个数组仓库，没有索引的概念，也就不能通过索引方便地取值了。实际开发中应该根据情况在二者之间选择合适的使用。
