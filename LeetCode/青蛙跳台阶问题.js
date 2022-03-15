/* 

[剑指 Offer 10- II. 青蛙跳台阶问题 - 力扣（LeetCode）](https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/) 
一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。
*/

// 递归
// 结果是斐波那契数列

function calc(n) {
  if (n === 0) return 1;
  if (n === 1) return 1;
  if (n === 2) return 2;
  return calc(n - 1) + calc(n - 2);
}
console.log('calc(10)', calc(10));
// 备忘录的方法
/* 上面的解法之所以会超时，原因在于上面存在两个递归，
第二个递归和第一个递归走了重复的路，因此时间复杂度较高，
下面我们采用备忘录的方法，
所谓的备忘录的方法就是用一个数组将第一个递归走过的路记录下来，
这样第二的递归可以直接用，这样时间复杂度就会降下来。
 */

{
  function memory(n, s) {
    if (n <= 1) {
      s[n] = 1;
    }
    if (n === 2) {
      s[n] = 2;
    }
    if (s[n]) {
      return s[n];
    }
    if (!s[n]) {
      s[n] = memory(n - 1, s) + memory(n - 2, s);
    }
    return s[n];
  }

  function calc(n) {
    const storeList = Array(n).fill(null);
    memory(n, storeList);
    console.log('storeList', storeList);
    return storeList[n];
  }
  console.log('calc(10)', calc(10));
}
