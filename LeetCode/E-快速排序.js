const quickSortArray = arr => {
  if (arr.length <= 1) {
    return arr;
  }
  const INDEX = 0; // Math.floor(arr.length / 2); 随便去一个数字都行
  const baseNumber = arr.splice(INDEX, 1)[0]; // 找到中间数字，并且在原数组中删除
  const left = [];
  const right = [];
  arr.forEach(v => (v > baseNumber ? right.push(v) : left.push(v)));
  return [...quickSortArray(left), baseNumber, ...quickSortArray(right)];
};

const arr = [3, 44, 13, 38, 5, 47, 28, 34, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.time('快速排序耗时');
console.log(quickSortArray(arr));
console.timeEnd('快速排序耗时');
// [ 2, 3, 4, 5, 13, 19, 26, 27, 28, 34, 36, 38, 44, 46, 47, 48, 50 ]
