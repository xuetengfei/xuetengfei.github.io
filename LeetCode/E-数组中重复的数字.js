const arr = [1, 2, 5, 6, 7, 8, 10, 11, 1, 3, 4, 5, 6, 7, 8, 9];

const uniq2 = arr => arr.filter((v, idx) => arr.indexOf(v) !== idx);
const r2 = uniq2(arr);

console.log('r ', r2); // r  [ 1, 5, 6, 7, 8 ]
