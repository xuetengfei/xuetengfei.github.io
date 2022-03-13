/* 

[从尾到头打印链表 | awesome-coding-js](http://www.conardli.top/docs/dataStructure/%E9%93%BE%E8%A1%A8/%E4%BB%8E%E5%B0%BE%E5%88%B0%E5%A4%B4%E6%89%93%E5%8D%B0%E9%93%BE%E8%A1%A8.html#%E9%A2%98%E7%9B%AE) 
输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。

*/
function ListNode(val) {
  this.val = val;
  this.next = null;
}

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

  var printListFromTailToHead = function (head) {
    let ans = [];
    while (head) {
      ans.unshift(head.value);
      head = head.next;
    }
    return ans;
  };
  const r = printListFromTailToHead(links);
  console.log(' r', r);
}
