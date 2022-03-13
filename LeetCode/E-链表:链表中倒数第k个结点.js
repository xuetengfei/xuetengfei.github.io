const links = {
  value: 1,
  next: {
    value: 3,
    next: {
      value: 2,
      next: { value: 4, next: { value: 6, next: { value: 8, next: null } } },
    },
  },
};

function findTailNodeByNumber(head, num) {
  const temp = [];
  const map = new Map();
  while (head && head.next) {
    temp.push(head.value);
    map.set(head.value, head.next);
    head = head.next;
    if (!head.next) {
      temp.push(head.value);
      map.set(head.value, null);
    }
  }
  const val = temp[num] || null;
  if (val === null) return;
  const node = {};
  node.value = val;
  node.next = map.get(val);
  console.log('temp', temp);
  console.log('map', map);
  return node;
}

const r = findTailNodeByNumber(links, 3);
console.log('r', r);
