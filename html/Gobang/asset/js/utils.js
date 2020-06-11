/**
|--------------------------------------------------
| utils
|--------------------------------------------------
*/
const emptyMap = num =>
  Array(num)
    .fill(0)
    .map(() => Array(num).fill(0));
const take = (arr, n = 1) => arr.slice(0, n);
const isEven = num => num % 2 === 0;
const countOccurrences = (arr, value) =>
  arr.reduce((a, v) => (v === value ? a + 1 : a + 0), 0);
function deepClone(source) {
  var copy = source instanceof Array ? [] : {};
  for (attr in source) {
    if (!source.hasOwnProperty(attr)) continue;
    copy[attr] = typeof source[attr] == 'object' ? deepClone(source[attr]) : source[attr];
  }
  return copy;
}
function flatten(a) {
  return Array.isArray(a) ? [].concat(...a.map(flatten)) : a;
}
const last = arr => arr.slice(-1)[0];
const smaller = num => (num - 1 < 0 ? 0 : num - 1);
const bigger = num => (num + 1 > 10 ? 10 : num + 1);

/**
|--------------------------------------------------
| 对战判断
|--------------------------------------------------
*/
const isWin = (arr, party) => {
  let temp = arr.map(v => (v == 0 ? 0 : 9));
  let vaildslice = arr.slice(temp.indexOf(9), temp.lastIndexOf(9) + 1);
  let flag = false;
  let len = vaildslice.length;
  if (len < 5) {
    // return '总长度少于5';
    return false;
  }
  if (countOccurrences(vaildslice, party) < 5) {
    // return '同色小于5';
    return false;
  }
  let loop = [...vaildslice];
  do {
    flag = take(loop, 5).every(v => v == party);
    loop.shift();
  } while (!flag && loop.length >= 5);
  //   console.log('loop end');
  return flag;
};
//  黑子 1 白子 2
const versusResult = (chessMap, rowIndex, columnIndx, side, count) => {
  let c = Number(columnIndx);
  let r = Number(rowIndex);
  // 行
  const row = chessMap[r];
  if (isWin(row, side)) {
    return true;
  }
  // 列
  const column = chessMap.map(v => v[c]);
  if (isWin(column, side)) {
    return true;
  }
  // 撇
  let pieIndexList = [];
  const sum = r + c;
  for (let i = sum; i >= 0; i--) {
    const temp = [i, sum - i];
    // temp[0] <= count && temp[1] <= count && pieIndexList.push(temp);
    pieIndexList.push(temp);
  }

  let pie = pieIndexList
    .filter(v => v.every(a => 0 <= a && a <= count))
    .map(v => chessMap[v[0]][v[1]]);
  if (isWin(pie, side)) {
    return true;
  }
  // 捺
  let naIndexList = [];
  for (let i = r; i >= 0; i--) {
    const temp = [r - i, c - i];
    naIndexList.push(temp);
  }
  for (let i = 1; i <= count - c; i++) {
    const temp = [r + i, c + i];
    naIndexList.push(temp);
  }
  let na = naIndexList
    .filter(v => v.every(a => 0 <= a && a <= count))
    .map(v => chessMap[v[0]][v[1]]);
  console.log(na);
  if (isWin(na, side)) {
    return true;
  }
  return false;
};

/**
|--------------------------------------------------
| 人机对战 计算有效面积
|--------------------------------------------------
*/
const calcArea = pointList => {
  const minC = Math.min(...pointList.map(v => v[1]));
  const maxC = Math.max(...pointList.map(v => v[1]));
  const minR = Math.min(...pointList.map(v => v[0]));
  const maxR = Math.max(...pointList.map(v => v[0]));

  const p1 = [smaller(minR), smaller(minC)];
  const p2 = [smaller(minR), bigger(maxC)];
  const p3 = [bigger(maxR), smaller(minC)];
  const p4 = [bigger(maxR), bigger(maxC)];
  //   console.log(`${[p1, p2, p3, p4]}`);
  //   return {};
};

const calcAround = arr => {
  const r = arr[0]; // 3
  const c = arr[1]; // 4
  const r1 = smaller(r); // 2
  const c1 = smaller(c); // 3
  const r2 = bigger(r); // 4
  const c2 = bigger(c); // 5
  // [2,3]
  // [4,5]
};
