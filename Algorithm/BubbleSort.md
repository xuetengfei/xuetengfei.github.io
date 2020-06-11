比较相邻的元素。如果第一个比第二个大，就交换他们两个。 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。 针对所有的元素重复以上的步骤，除了最后一个。 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/maopao-1560491840.png' width="500px"/>

```javascript
var arr = [-39, 0, 1, 23, 432, 54, 34, 5, 6, 72, 90, 34, 25, 64, 13, -100, 123, 213];

function bubbleSort(arr) {
  var len = arr.length;
  console.time('冒泡排序耗时');
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // 相邻元素两两对比
        var temp = arr[j + 1]; // 元素交换
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  console.timeEnd('冒泡排序耗时');
  return arr;
}
console.log(bubbleSort(arr1)); // 0.434ms
// [ -100, -39, 0, 1, 5, 6, 13, 23, 25, 34, 34, 54, 64, 72, 90, 123, 213, 432 ]
```

```javascript
// 更快的算法，更小的时间复杂度
function bubbleSort2(arr) {
  console.time('改进后冒泡排序耗时');
  var i = arr.length - 1; //初始时,最后位置保持不变
  while (i > 0) {
    var pos = 0; //每趟开始时,无记录交换
    for (var j = 0; j < i; j++)
      if (arr[j] > arr[j + 1]) {
        pos = j; //记录交换的位置
        var tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    i = pos; //为下一趟排序作准备
  }
  console.timeEnd('改进后冒泡排序耗时');
  return arr;
}

console.log(bubbleSort2(arr1)); // 0.009ms
```
