/* 

用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型。
栈:先进后出
队列：先进先出
*/

class Queue {
  constructor(item) {
    this.stack1 = []; // 1 2 3 4
    this.stack2 = []; // 4 3 2
  }
  push(item) {
    // 添加到队尾
    this.stack1.push(item);
  }
  pop2() {
    while (this.stack1.length > 0) {
      this.stack2.push(this.stack1.pop());
    }
    return this.stack2.pop() || null;
  }
  pop() {
    // 删除返回head
    let temp = null;
    const array1 = this.stack1;
    const len1 = this.stack1.length;
    for (let index = 0; index < len1; index++) {
      const element = array1[index];
      if (!index) {
        temp = element;
      } else {
        this.stack2[len1 - index - 1] = element;
      }
    }
    this.stack1 = [];
    const l2 = this.stack2.length;
    for (let index = 0; index < l2; index++) {
      const element = this.stack2[index];
      this.stack1[l2 - index - 1] = element;
    }
    this.stack2 = [];
    return temp;
  }
}

const x = new Queue();
x.push(1);
x.push(2);
x.push(4);
x.push(5);
x.push(6);
console.log('x', x);
x.pop2();
console.log('x', x);
