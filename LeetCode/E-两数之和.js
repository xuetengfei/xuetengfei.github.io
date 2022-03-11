/* 
[2. 两数相加 - 力扣（LeetCode）](https://leetcode-cn.com/problems/add-two-numbers/) 
输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]

输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.

*/
const addTwoNumbers = function (l1, l2) {
  const n1 = l1.reduce((acc, cur, idx) => {
    return acc + Math.pow(10, idx) * cur;
  }, 0);
  const n2 = l2.reduce((acc, cur, idx) => {
    return acc + Math.pow(10, idx) * cur;
  }, 0);
  return [...(n1 + n2 + '')].reverse().map(v => Number(v));
};
console.log(addTwoNumbers([9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9])); // [8,9,9,9,0,0,0,1]
console.log(addTwoNumbers([2, 4, 3], [5, 6, 4])); // [7,0,8]
