// root = [5, 4,8, 11,null,13,4,7,2,null,null,null,1], targetSum = 22

const fn = arr => {
  const temp = [];
  let i = 0;
  while (arr.length) {
    temp.push(arr.splice(0, Math.pow(2, i)));
    i++;
  }
  return temp;
};
const r = fn([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]);
console.log('r ', r);
