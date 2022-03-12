const SingleTon = (() => {
  let instance;
  class CreateSingleTon {
    constructor(name) {
      if (instance) return instance;
      this.name = name;
      this.getName();
      return (instance = this);
    }

    getName() {
      return this.name;
    }
  }
  return CreateSingleTon;
})();

const a = new SingleTon('instance_A');
const b = new SingleTon('instance_B');

console.log(a.getName()); // instance_A
console.log(b.getName()); // instance_A
console.log(a === b); // true

class CreateSingleTon {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

function makeSingleton(func) {
  let instance;
  let handler = {
    construct: function (target, args) {
      if (!instance) {
        instance = new func(...args);
      }
      return instance;
    },
  };
  return new Proxy(func, handler);
}

const TestSingleton = makeSingleton(CreateSingleTon);
const c = new TestSingleton('instance_C');
const d = new TestSingleton('instance_D');
console.log(c.getName()); // instance_C
console.log(d.getName()); // instance_C
console.log(c === d); // true
