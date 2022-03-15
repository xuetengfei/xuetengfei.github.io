/* 

给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在
滑动窗口 k 内的数字。滑动窗口每次只向右移动一位。 返回滑动窗口最大值。

输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
输出: [3,3,5,5,6,7] 
*/

const nums = [1, 3, -1, -3, 5, 3, 6, 7];
const k = 3;
function fn(arr, k) {
  const temp = [];
  while (arr.length >= k) {
    const subArray = arr.slice(0, k);
    temp.push(Math.max(...subArray));
    arr.shift();
  }
  return temp;
}

const r = fn(nums, 3);
console.log('r ', r); // r  [ 3, 3, 5, 5, 6, 7 ]
