function reverseLink(head) {
  let currentNode = null;
  let headNode = head;
  while (head && head.next) {
    console.log('headNode1', headNode);
    currentNode = head.next;
    head.next = currentNode.next;
    currentNode.next = headNode;
    headNode = currentNode;
    console.log('headNode2', headNode);
  }
  return headNode;
}

const links = {
  value: 1,
  next: {
    value: 3,
    next: { value: 2, next: null },
  },
};

const r = reverseLink(links);
console.log('r', r);
