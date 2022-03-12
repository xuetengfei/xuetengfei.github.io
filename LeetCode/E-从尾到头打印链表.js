function ListNode(val) {
  this.val = val;
  this.next = null;
}

/* 

输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。

*/

const reversePrint = function (head) {
  let temp = [head.value];
  let nextNode = head.next;
  while (nextNode) {
    temp.unshift(nextNode.value);
    nextNode = nextNode.next;
  }
  let root = new ListNode(temp[0]);
  let cur = root;
  for (let i = 1; i < temp.length; i++) {
    cur.next = new ListNode(temp[i]);
    cur = cur.next;
  }
  return root;
};

const links = {
  value: 1,
  next: {
    value: 3,
    next: { value: 2, next: null },
  },
};
const r = reversePrint(links);
console.log(' r', JSON.stringify(r, null, 2));

{
  const links = {
    value: 1,
    next: {
      value: 3,
      next: { value: 2, next: null },
    },
  };
  var reversePrint2 = function (head) {
    let ans = [];
    while (head) {
      ans.unshift(head.value);
      head = head.next;
    }
    return ans;
  };
  const r = reversePrint2(links);
  console.log(' r', r);
}
