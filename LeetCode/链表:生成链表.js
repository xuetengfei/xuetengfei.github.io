// ListNode构造器，用于创建链表的每个节点
class ListNode {
  constructor(value, next) {
    this.value = value == undefined ? 0 : value;
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
    console.log('head', head);
  }
  return head; // 返回头节点
}

// 调用
// const head = generateLinklist([1, 2, 3, 4]);
// console.log(JSON.stringify(head, null, 2)); // 1 -> 2 -> 3 -> 4

const list = {
  head: {
    value: 6,
    next: {
      value: 10,
      next: {
        value: 12,
        next: {
          value: 3,
          next: null,
        },
      },
    },
  },
};

function fn(arr) {
  const array = arr.map(v => new ListNode(v));
  let head = array[0];
  const len = array.length;
  for (let index = 1; index < len; index++) {
    const element = array[index];
    if (index === 1) {
      head.next = element;
    }
    if (index === len - 1) {
      element.next = null;
    } else {
      element.next = array[index + 1];
    }
  }
  return head;
}

console.log(JSON.stringify(fn([1, 2, 3, 4]), null, 2));
