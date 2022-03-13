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
