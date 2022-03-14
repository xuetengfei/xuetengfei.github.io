/* 
在数组中的两个数字，如果前面一个数字大于后面的数字
则这两个数字组成一个逆序对。输入一个数组,求出这个数组中的逆序对的总数P。

[剑指 Offer 51. 数组中的逆序对 - 力扣（LeetCode）](https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/) 
*/

function fn(nums) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    const curr = nums[i];
    const less = nums.filter(v => v < curr);
    const maxVal = Math.max(...less);
    const less2 = less.slice(less.indexOf(maxVal), less.length);
    if (less2.length) {
      map[curr] = less2;
    }
  }
  console.log('map', map);
  return Object.entries(map).reduce((acc, curr, idx) => {
    return acc + curr[1].length;
  }, 0);
}
const r = fn([7, 5, 6, 4]);
console.log(' r ', r);

/* 
75
76
74
65
64
54
*/
