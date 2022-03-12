// es5实现，区分数字和字符串

const arr = [1, 2, 5, 6, 7, 8, 10, 11, 1, 3, 4, 5, 6, 7, 8, 9];

const uniq = arr => {
  return [...new Set(arr)];
};

const r = uniq(arr);
console.log('r ', r);

const uniq2 = arr =>
  arr.filter((v, idx, a) => {
    console.log(' a', a);
    return arr.indexOf(v) === idx;
  });

const r2 = uniq2(arr);
console.log('r ', r2);
