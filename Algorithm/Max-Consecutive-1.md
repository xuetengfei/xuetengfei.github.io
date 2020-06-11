[Max Consecutive Ones III - 1004](https://leetcode.com/articles/max-consecutive-ones-iii/)

A = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], K = 2
Output: 6
Explanation: [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1]

```javascript
const raw = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0];
const calc = (array, K) => {
  const a = array.reduce(
    (acc, v) => (v === 0 ? acc.concat(v) : acc.concat(acc.pop() + v)),
    [0],
  );
  const maxNum = Math.max(...a);
  return a.length > K + 1 ? maxNum + K : maxNum;
};
console.log(calc(raw, 2)); // 6
```

[Max Consecutive Ones - 485](https://leetcode.com/articles/max-consecutive-ones/)

Input: [1,1,0,1,1,1]
Output: 3
Explanation: The first two digits or the last three digits are consecutive 1s.
The maximum number of consecutive 1s is 3.

```javascript
const Arr = [1, 1, 0, 1, 1, 1];
const calcMaximumConsecutive = array => {
  const a = array.reduce(
    (acc, v) => (v === 0 ? acc.concat(v) : acc.concat(acc.pop() + v)),
    [0],
  );
  return Math.max(...a);
};

console.log(calcMaximumConsecutive(Arr)); // 3
```
