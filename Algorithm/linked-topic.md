## 生成链表

```javascript
function ListNode(val) {
  this.val = val;
  this.next = null;
}

function generateLinklist(arr) {
  let head = new ListNode(arr[0]), // 初始化第一个节点作为头节点
    curr = head; // curr指针保存当前节点
  for (let i = 1; i < arr.length; i++) {
    curr.next = new ListNode(arr[i]); // 创建next节点
    curr = curr.next; // curr后移一位
  }
  return head; // 返回头节点
}

const head = generateLinklist([1, 2, 3, 4]);

console.log(JSON.stringify(head, null, 2)); // 1 -> 2 -> 3 -> 4

// {
//   "val": 1,
//   "next": {
//     "val": 2,
//     "next": {
//       "val": 3,
//       "next": {
//         "val": 4,
//         "next": null
//       }
//     }
//   }
// }
```

## 反转链表

```javascript
const links = {
  value: 1,
  next: {
    value: 3,
    next: { value: 2, next: null },
  },
};
function reverseLink(link) {
  let head = link;
  let cur = null;
  while (link && link.next) {
    cur = link.next;
    link.next = cur.next;
    cur.next = head;
    head = cur;
  }
  return head;
}

const r = reverseLink(links);

console.log('r', r);
// r { value: 2, next: { value: 3, next: { value: 1, next: null } } }
```

## 从尾到头打印链表

> 输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）

```javascript
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
console.log('r', r);
// r [ 2, 3, 1 ]
```

## 倒数第 k 个结点

```javascript
const links = {
  value: 1,
  next: {
    value: 3,
    next: { value: 4, next: { value: 6, next: { value: 8, next: null } } },
  },
};

function findTailNodeByNumber(head, num) {
  const temp = [];
  const map = [];
  while (head && head.next) {
    temp.push(head.value);
    map.push(head.value, head.next);
    head = head.next;
    if (!head.next) {
      temp.push(head.value);
      map.push(head.value, null);
    }
  }
  const value = temp[temp.length - num] || null;
  const next = map[map.length - num] || null;
  if (!value) return null;
  return {
    value,
    next,
  };
}

const r = findTailNodeByNumber(links, 3);
console.log('r', r);
// r { value: 4, next: { value: 8, next: null } }
```
