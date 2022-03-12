// ListNode构造器，用于创建链表的每个节点
class ListNode {
  constructor(val, next) {
    this.val = val == undefined ? 0 : val;
    this.next = next == undefined ? null : next;
  }
}

// function ListNode(val) {
//   this.val = val;
//   this.next = null;
// }

// 生成链表
function generateLinklist(arr) {
  let head = new ListNode(arr[0]), // 初始化第一个节点作为头节点
    curr = head; // curr指针保存当前节点
  for (let i = 1; i < arr.length; i++) {
    curr.next = new ListNode(arr[i]); // 创建next节点
    curr = curr.next; // curr后移一位
  }
  return head; // 返回头节点
}

// 调用
const head = generateLinklist([1, 2, 3, 4]);
console.log(JSON.stringify(head, null, 2)); // 1 -> 2 -> 3 -> 4
