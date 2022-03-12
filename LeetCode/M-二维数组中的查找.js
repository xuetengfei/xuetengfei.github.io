/* 
[剑指 Offer 04. 二维数组中的查找 - 力扣（LeetCode）](https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/) 

现有矩阵 matrix 如下：
请完成一个高效的函数，输入这样的一个二维数组和一个整数

判断数组中是否含有该整数。
给定 target = 5，返回 true。
给定 target = 20，返回 false。
*/

const matrix = [
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30],
];

{
  const fd = (matrix, target) => {
    let r = 0;
    let c = matrix[0].length - 1;
    let res = false;
    while (r <= matrix.length || c >= 0) {
      const diff = fn(matrix, target, r, c);
      console.log('pos', { r: r + 1, c: c + 1, diff });
      if (diff === 'end') {
        break;
      }
      if (!diff) {
        res = true;
        break;
      }
      if (diff > 0) {
        c -= 1;
      }
      if (diff < 0) {
        r += 1;
      }
    }
    return res;
  };

  const fn = (matrix, target, r, c) => {
    let flag = matrix[r] && matrix[r][c];
    if (!flag) return 'end';
    return flag - target;
  };
  console.log(fd(matrix, 21));
  console.log(fd(matrix, 20));
  console.log(fd(matrix, 20));
}

// 暴力破解
{
  function fn(matrix, target) {
    return matrix.flat(Infinity).includes(target);
  }
  console.log(fn(matrix, 5));
  console.log(fn(matrix, 20));
}
