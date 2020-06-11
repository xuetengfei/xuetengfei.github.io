链模式：通过在对象方法中将当前对象返回，实现对同一个对象多个方法的链式调用。从而，简化对该对象的多个方法的多次调用是，对该对象的多次引用

链式调用处理字符串

```javascript
class Strman {
  constructor(para) {
    this.str = para;
  }
  upper() {
    this.str = this.str.toUpperCase();
    // Note: Returning this for chaining
    return this; // (关键)
  }
  reverse() {
    this.str = this.str
      .split('')
      .reverse()
      .join('');
    // Note: Returning this for chaining
    return this; // (关键)
  }
  end() {
    return this.str;
  }
}

let a = new Strman('abcdefg')
  .upper()
  .reverse()
  .end();
console.log(a); // GFEDCBA
```

声明的每一个方法的末尾将当前对象返回 return this; 是关键。这个 this 就是实例化的具体对象。

---

1.《JavaScript 设计模式 张容铭著 》
