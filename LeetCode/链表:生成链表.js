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

{
  //节点应用类型
  function Node(data) {
    this.data = data;
    this.next = null;
  }

  //链表引用类型
  function List() {
    //哨兵节点
    this.head = new Node();
    this.size = 0;
  }

  List.prototype = {
    //在链表尾部添加节点
    add: function (data) {
      var current = this.head;
      while (current.next != null) {
        current = current.next;
      }
      current.next = new Node(data);

      this.size++;
    },

    //遍历链表，不对链表元素操作都可以调用此方法
    forEach: function (callback) {
      for (
        var current = this.head.next;
        current != null;
        current = current.next
      ) {
        callback(current.data);
      }
    },

    //打印链表中所有元素
    print: function () {
      this.forEach(function (item) {
        console.log(item);
      });
    },

    //查找链表元素的位置
    indexOf: function (data) {
      var pos = 0;
      var current = this.head.next;
      while (current != null) {
        if (current.data === data) {
          break;
        }
        current = current.next;
        pos++;
      }
      return pos;
    },

    /**
     * 在位置pos处插入节点值为data
     * 若成功则返回插入的值，若失败则返回null
     */
    insert: function (pos, data) {
      if (pos < 0 || pos > this.size - 1) {
        return null;
      }

      //插入位置的上一个节点
      var last = this.head;
      for (var i = 0; i < pos; i++) {
        last = last.next;
      }
      //保存下一个节点的引用
      var ready = last.next;
      last.next = new Node(data);
      last.next.next = ready;

      this.size++;
      return data;
    },

    /**
     * 删除指定位置的元素
     * 若成功则返回删除的值，若失败则返回null
     */
    removeAt: function (index) {
      if (index < 0 || index > this.size - 1) {
        return null;
      }

      var current = this.head.next;
      var last = this.head;
      for (var i = 0; i < index; i++) {
        last = current;
        current = current.next;
      }
      last.next = current.next;

      this.size--;
      return current.data;
    },

    //删除相应元素
    remove: function (data) {
      var current = this.head.next;
      var last = this.head;
      while (current != null) {
        if (current.data === data) {
          last.next = current.next;
          //已删除节点
          this.size--;
          break;
        }
        last = current;
        current = current.next;
      }
    },
  };
}
