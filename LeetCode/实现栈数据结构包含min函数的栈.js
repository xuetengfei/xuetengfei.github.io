class Stack {
  constructor(arr = []) {
    this.data = [...arr];
    this.minValue = Math.min(...arr);
  }
  add(value) {
    if (this.minValue) {
      this.minValue = Math.min.call(this, this.minValue, value);
    } else {
      this.minValue = value;
    }
    this.data.push(value);
  }
  min() {
    return this.minValue;
  }
}

const s = new Stack([3, 4, 2, 7, 9]);
console.log('s.min()', s.min());
