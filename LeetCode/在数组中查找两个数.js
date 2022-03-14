/* 
输入一个递增排序的数组和一个数字S，在数组中查找两个数，
使得他们的和正好是S，如果有多对数字的和等于S，输出两个数的乘积最小的。

*/

function fn(arr, num) {
  let l = 0;
  let r = arr.length - 1;
  const temp = [];
  while (l < r) {
    const s = arr[l] + arr[r];
    if (s === num) {
      temp.push([arr[l], arr[r]]);
    }
    if (s > num) {
      const subArray = arr.slice(0, l);
      console.log('subArray', subArray);
    }
    l += 1;
    r -= 1;
  }
  return temp;
}

const list = [1, 3, 4, 5, 6, 7, 8, 9, 14];
const r = fn(list, 12);
console.log(' r ', r);
