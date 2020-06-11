<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/tree-1556861024.jpg' />

```javascript
/**
 *  BinarySearchTree 二叉搜索树
 *  规则：一个父节点最多两个子节点(左侧子节点和右侧子节点)
 *  左节点存储的值(key)比父节点小的值 (key) 右节点存储的值(key)比父节点大的值(key)
 *  左小 右大
 */
class BinarySearchTree {
  constructor() {
    this.root = null; // 根节点
  }
  _createNode(key) {
    const init = Object.create(null);
    init.key = key;
    init.left = null;
    init.right = null;
    return init;
  }
  insert(key) {
    const newNode = this._createNode(key);
    if (this.root === null) {
      // 如果此时没有root 就把当前插入的node 作为root
      this.root = newNode;
    } else {
      // 否则根据 key值往下比较 左小 右大
      this.insertNode(this.root, newNode);
    }
  }
  insertNode(node, newNode) {
    // 插入比较规则
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
        return;
      }
      this.insertNode(node.left, newNode);
    } else {
      if (node.right === null) {
        node.right = newNode;
        return;
      }
      this.insertNode(node.right, newNode);
    }
  }
  inOrderTraverse(callBack) {
    // 中序遍历  左-父-右
    this.inOrderTraverseNode(this.root, callBack); // 从根节点开始遍历 并把遍历出来的节点 作为参数传给callBack
  }
  inOrderTraverseNode(node, callBack) {
    if (node !== null) {
      this.inOrderTraverseNode(node.left, callBack); // 先遍历当前父节点左子树
      callBack(node.key); // 再遍历当前父节点
      this.inOrderTraverseNode(node.right, callBack); // 最后遍历当前父节点右子树
    }
  }
  preOrderTraverse(callBack) {
    // 先序遍历 父-左-右
    this.preOrderTraverseNode(this.root, callBack);
  }
  preOrderTraverseNode(node, callBack) {
    if (node !== null) {
      callBack(node.key); // 先遍历当前父节点
      this.preOrderTraverseNode(node.left, callBack); // 在当前父节点的左子树
      this.preOrderTraverseNode(node.right, callBack); // 最后当前父节点的右子树
    }
  }
  postOrderTraverse(callBack) {
    // 后序遍历 左-右-父
    this.postOrderTraverseNode(this.root, callBack);
  }
  postOrderTraverseNode(node, callBack) {
    if (node !== null) {
      this.postOrderTraverseNode(node.left, callBack); // 先当前父节点的左子树
      this.postOrderTraverseNode(node.right, callBack); // 再当前父节点的右子树
      callBack(node.key); // 最后当前父节点
    }
  }
  // 搜索最小值
  min() {
    return this.minNode(this.root);
  }
  minNode(node) {
    if (node) {
      while (node && node.left !== null) {
        node = node.left;
      }
      return node.key;
    }
    return null;
  }
  // 搜索最大值
  max() {
    return this.maxNode(this.root);
  }
  maxNode(node) {
    if (node) {
      while (node && node.right !== null) {
        node = node.right;
      }
      return node.key;
    }
    return null;
  }
  // 搜索特定值
  search(key) {
    return this.searchNode(this.root, key); // 从根节点开始查找
  }
  searchNode(node, key) {
    if (node === null) {
      return false;
    }
    if (key < node.key) {
      return this.searchNode(node.left, key);
    } else if (key > node.key) {
      return this.searchNode(node.right, key);
    }
    return true;
  }
  remove(key) {
    // 移除指定值 移除总共有三种情况
    this.root = this.removeNode(this.root, key);
  }
  findMinNode(node) {
    // 找到指定节点子树中最小值
    if (node) {
      while (node && node.left !== null) {
        node = node.left;
      }
      return node;
    }
    return null;
  }
  removeNode(node, key) {
    if (node === null) {
      return null;
    }
    if (key < node.key) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (key > node.key) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      // 第一种情况——移除一个叶节点
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      // 第二种情况——移除一个只有一个子节点的节点
      if (node.left === null) {
        // 有一个右子节点
        node = node.right;
        return node;
      }
      if (node.right === null) {
        // 有一个左子节点
        node = node.left;
        return node;
      }
      // 第三种情况——移除一个有两个子节点的节点
      const aux = this.findMinNode(node.right); // 找到要删除节点右子树中 最小值
      node.key = aux.key; // 用右子树的最小值 取代要删除的值 此时出现重复了
      node.right = this.removeNode(node.right, aux.key); // 再将右边重复的最小值删除
      return node;
    }
  }
}
```

```javascript
let nodes = [8, 3, 10, 1, 6, 11, 2, 9, 12];
let tree = new BinarySearchTree();
nodes.forEach(key => tree.insert(key));
console.log(tree.root);
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/tree-data-1556860881.jpg' width='500px'/>

```javascript
console.log(tree.min()); // Result:1
console.log(tree.max()); // Result:14
setTimeout(() => {
  // tree.remove(3)
  console.log(tree.root);
  // 搜索最小值
  console.log(tree.min());
  // 搜索最大值
  console.log(tree.max());
  // 搜素特定值
  console.log(tree.search(3));
  console.log('---');
}, 1000);

setTimeout(() => {
  // 中序遍历: 从最小到最大的顺序访问所有节点。
  // 判断二叉树是否有左子树，如果有，就去遍历左子树，没有，就输出根节点，并遍历右子树
  const end = [];
  tree.inOrderTraverse(key => {
    end.push(key);
  });
  console.log('中序遍历');
  console.log(end);
  console.log('---');
}, 1500);

// 中序遍历:  [1, 2, 3, 6, 8, 9, 10, 11, 12]

setTimeout(() => {
  // 后序遍历则是先访问节点的后代节点，再访问节点本身。后序遍历的一种应用是计算一个目录和它的子目录中所有文件所占空间的大小。
  const end = [];
  tree.postOrderTraverse(key => {
    end.push(key);
  });
  console.log('后序遍历');
  console.log(end);
  console.log('---');
}, 2000);

// 后序遍历: [2, 1, 6, 3, 9, 12, 11, 10, 8]

setTimeout(() => {
  // 先序遍历 按照最优先顺序（父节点优先于后代节点的顺序）沿一定路径访问所有的节点 先根后左再右
  const end = [];
  tree.preOrderTraverse(key => {
    end.push(key);
  });
  console.log('先序遍历');
  console.log(end);
  console.log('---');
}, 2500);

// 先序遍历: [8, 3, 1, 2, 6, 10, 9, 11, 12]
```

---

1. [Tree 数据结构 - 众成翻译](https://www.zcfy.cc/article/tree-data-structures-for-beginners)
2. [二叉搜索树 中序、先序、后序遍历 搜索树中的值](https://github.com/Lwenli1224/BinarySearchTree)
