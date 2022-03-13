function filterArr(arr) {
  // 这里写下你的代码
  return arr.filter(v => {
    return arr.filter((v, idx) => arr.indexOf(v) == idx);
  });
}
// [ 2, 3, 4, 1, 1 ]
// console.log(filterArr());

function fn(arr) {
  const len = arr.length;
  const temp = [];
  for (let index = 0; index < len; index++) {
    const element = arr[index];
    const idx1 = arr.indexOf(element);
    const idx2 = arr.lastIndexOf(element);
    if (idx1 === idx2) {
      temp.push(element);
    }
  }
  return temp;
}

const r = fn([1, 2, 3, 4, 2, 3, 4, 1, 5, 6, 23, 32, 1]);
console.log('r', r);
