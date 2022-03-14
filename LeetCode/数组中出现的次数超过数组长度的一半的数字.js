const nums = [1, 2, 3, 2, 2, 2, 5, 4, 2];

function fn(arr) {
  const map = {};
  const temp = [];
  for (let i = 0; i < arr.length; i++) {
    const curr = arr[i];
    if (map[curr] !== undefined) {
      const next = map[curr] + 1;
      if (next >= arr.length / 2) {
        temp.push(curr);
      }
      map[curr] = next;
    } else {
      map[curr] = 1;
    }
  }
  return temp;
}

const r = fn(nums);
console.log('r', r);
