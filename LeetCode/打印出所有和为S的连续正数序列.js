/* 
输入一个正数S，打印出所有和为S的连续正数序列。

例如：输入15，有序1+2+3+4+5 = 4+5+6 = 7+8 = 15 所以打印出3个连续序列1-5，5-6和7-8。

#
*/

const calc = arr =>
  arr.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

function f(l, sum) {
  const r = [];
  const a = [];
  while (l.length) {
    const el = l[0];
    a.push(el);
    const end = calc(a);
    if (end === sum) {
      r.push([...a]);

      a.length = 0;
    }
    if (end > sum) {
      a.length = 0;
    }
    l.shift();
  }
  return r;
}
function fn(sum) {
  const l = Array(sum)
    .fill(0)
    .map((_, idx) => idx + 1);
  const l2 = [...l];
  const r = [];
  for (let index = 0; index < l2.length; index++) {
    const subArray = l2.slice(index, l2.length);
    r.push(...f(subArray, sum));
  }
  const r1 = r.filter(v => v.length > 1);
  const h = [...new Set(r1.map(v => v[0]))].sort();
  const r2 = h.map(v => r1.find(x => x[0] === v));
  return r2;
}

const r = fn(9);
console.log('r', r);
