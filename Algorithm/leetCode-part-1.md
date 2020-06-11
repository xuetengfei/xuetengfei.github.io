#### 1. 两数之和

给定一个整数数组 nums  和一个目标值 target，请你在该数组中找出和为目标值的那   两个   整数，并返回他们的数组下标。你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

<!-- https://leetcode-cn.com/problems/two-sum -->

```javascript
const twoSum = (nums, target) => {
  for (let index = 0; index < nums.length; index++) {
    const element = nums[index];
    const rest = target - element;
    if (nums.includes(rest)) {
      const restIndex = nums.findIndex(v => v === rest);
      if (index !== restIndex) {
        return [index, restIndex];
      }
    }
  }
};

let nums = [3, 2, 4];
let target = 6;
const R = twoSum(nums, target);
console.log('R: ', R); // R:  [ 1, 2 ]
```

#### 26.从排序数组中删除重复项

?> 给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

```javascript
const removeDuplicates = nums => {
  if (nums.length === 1) {
    return nums;
  }
  for (const i = 0; i < nums.length - 1; i++) {
    if (nums[i] === nums[i + 1]) {
      nums.splice(i, 1);
      i--;
    }
  }
  return nums.length;
};

const a = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
const R = removeDuplicates(a);
console.log('R : ', R); // R :  5
console.log('a : ', a); // a :  [ 0, 1, 2, 3, 4 ]
```
