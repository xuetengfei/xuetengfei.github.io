const links = {
  value: 1,
  next: {
    value: 3,
    next: {
      value: 2,
      next: {
        value: 3,
        next: { value: 2, next: null },
      },
    },
  },
};

const hasRing = function (head) {
  let ans = [];
  let flag = false;
  while (head) {
    if (ans.indexOf(head.value) !== -1) {
      flag = true;
      break;
    }
    ans.push(head.value);
    head = head.next;
  }
  return flag;
};
const r = hasRing(links);
console.log(' r', r);
