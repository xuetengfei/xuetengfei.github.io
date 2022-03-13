/* 
输入一个整数数组，实现一个函数来调整该数组中数字的顺序

使得所有的奇数位于数组的前半部分
所有的偶数位于数组的后半部分
*/

function fn(array) {
  let temp = [];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (element % 2) {
      temp.unshift(element);
    } else {
      temp.push(element);
    }
  }
  return temp;
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const r = fn(array);
console.log('r', r);
