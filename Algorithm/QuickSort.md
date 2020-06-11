<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/kuaisu-1560491840.png'/>

快速排序采用了分治（递归）的方法，该方法的基本思想是：

先从数列中取出一个数作为基准数
分区过程，将比这个数大的数全放到它的右边，小于或等于它的数全放到它的左边
再对左右区间重复第二步，直到各区间只有一个数

> 分治法 - 将问题分成较小的部分，然后解决这些部分

```javascript
const quickSortArray = arr => {
  if (arr.length <= 1) {
    return arr;
  }
  const middleIndex = Math.floor(arr.length / 2);
  const middleIndexNumber = arr.splice(middleIndex, 1)[0];
  const left = [];
  const right = [];
  arr.forEach(v => {
    v > middleIndexNumber ? right.push(v) : left.push(v);
  });

  // return quickSortArray(left).concat([middleIndexNumber], quickSort(right));
  return [...quickSortArray(left), middleIndexNumber, ...quickSortArray(right)];
};

var arr = [3, 44, 13, 38, 5, 47, 28, 34, 36, 26, 27, 2, 46, 4, 19, 50, 48];

console.time('快速排序耗时');
console.log(quickSortArray(arr));
console.timeEnd('快速排序耗时');

// [ 2, 3, 4, 5, 13, 19, 26, 27, 28, 34, 36, 38, 44, 46, 47, 48, 50 ]
// 快速排序耗时: 0.60400390625ms
```

```

```
