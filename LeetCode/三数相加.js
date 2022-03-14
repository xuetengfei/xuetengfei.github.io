/* 
给定一个包含 n 个整数的数组nums，判断 nums 中是否存在三个元素a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。
*/

const nums = [-1, 0, 1, 2, -1, -4];

var twoSum = function (nums, target) {
  const map = {};
  const temp = [];
  for (let i = 0; i < nums.length; i++) {
    const curr = nums[i];
    const restVal = target - curr;
    if (map[restVal] != undefined) {
      //   return [map[restVal], i];
      temp.push([map[restVal], i]);
    } else {
      map[curr] = i;
    }
    console.log('map', map);
  }
  return temp;
};

function fn2(array, target) {
  const map = new Map();
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const need = 1;
  }
}
function fn(arr) {
  const temp = [];
  for (let i = 0; i < arr.length; i++) {
    const cur = array[i];
    const rest = 0 - cur;
    const r = twoSum(arr.slice(0, i), rest);
    r && temp.push(r);
  }
  return temp;
}

const r = fn(nums);
console.log('r', r);
