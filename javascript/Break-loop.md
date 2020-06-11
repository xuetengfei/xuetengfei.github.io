某些时候我们需要在满足某个条件的时候提前跳出循环，这时就该用到 break 语句了

```javascript
let arr = [5, 3, 4, 9, 2];
```

比如要打印上面数组中的元素，直到遇到第一个偶数

```javascript
arr.forEach(item => {
  console.log(item)
  if (item % 2 === 0) {
    break
  }
})
```

上面的代码会报错

```javascript
Uncaught SyntaxError: Illegal break statement
```

因为 forEach 是不支持 break 和 continue 的，3 个数组遍历方法中`（for，for...of，forEach）`，哪些可以 break 呢？

### 先试试 for

```javascript
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
  if (arr[i] % 2 === 0) {
    break;
  }
}

// 5
// 3
// 4
```

### 再试试 for...of

```javascript
for (let item of arr) {
  console.log(item);
  if (item % 2 === 0) {
    break;
  }
}

// 5
// 3
// 4
```

## 结论

> for 和 for...of 都支持 break 和 continue，forEach 不支持。

此外，`for...of 是不能直接获取当前遍历索引值(i)的`，而 for 和 forEach 可以，因为 for...of 不光是能遍历数组。在遍历数组这一块，传统的 for 循环其实是最强大的，只不过写法上稍微麻烦一点。而 forEach 写法最简单，但是在某些情况下出现问题。for...of 更像是 for 的一个进化体，属于 ES6 的新语法。所以，在环境支持的情况下，应该优先使用 for...of。
