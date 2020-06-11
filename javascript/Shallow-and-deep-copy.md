`浅复制` ：浅复制是`复制引用`，复制后的 引用类型数据 都是指向同一个对象的实例，彼此之间的操作会互相影响

`深复制`：深复制是`复制实例`深复制不是简单的复制引用，而是在堆中重新分配内存，并且把源对象实例的所有属性都进行新建复制，以保证深复制的对象的引用图不包含任何原有对象或对象图上的任何对象，复制后的对象与原来的对象是完全隔离的

### 浅拷贝可遍历属性

```javascript
function ShallowCopy(target, source) {
  for (var key in source) {
    target[key] = source[key];
  }
}
ShallowCopy(target, source);

const Boy1 = {
  Motherland: 'China',
  Nation: 'Han',
  Profile: {
    Gender: 'Male',
    Age: 25,
    Education: 'Undergraduate',
  },
};

const Boy2 = {};
ShallowCopy(Boy2, Boy1);

console.log(Boy1.Profile.Age === Boy2.Profile.Age); // true

// ---- 分割线 ---

let z = { a: 3, b: 4 };
let n = { ...z };

n; // { a: 3, b: 4 }
```

### 深复制

```javascript
function deepClone(source) {
  // 创建一个空的对象或者数值
  var copy = source instanceof Array ? [] : {};

  for (attr in source) {
    // 判断是否是对象实例本身的属性
    if (!source.hasOwnProperty(attr)) {
      continue; // 判断是否是对象实例本身的属性,跳过原型链上的属性，
    }
    // 这个属性如果是对象，调用该函数递归
    copy[attr] =
      typeof source[attr] == 'object' ? deepClone(source[attr]) : source[attr];
  }

  return copy;
}

const Boy1 = {
  Motherland: 'China',
  Nation: 'Han',
  Profile: {
    Gender: 'Male',
    Age: 25,
    Education: 'Undergraduate',
  },
};

const Boy2 = deepClone(Boy1);
console.log(Boy1.Profile.Age == Boy2.Profile.Age); //false
```

#### 拓展对象原型

```javascript
Object.prototype.clone = function () {
  if (this == null || typeof this != 'object') return this;
  if (
    this instanceof Number ||
    this instanceof String ||
    this instanceof Boolean
  )
    return this.valueOf();
  if (this instanceof Date) {
    var copy = new Date();
    copy.setTime(this.getTime());
    return copy;
  }
  if (this instanceof Object || this instanceof Array) {
    var copy = this instanceof Array ? [] : {};
    for (var attr in this) {
      if (this.hasOwnProperty(attr))
        copy[attr] = this[attr] ? this[attr].clone() : this[attr];
    }
    return copy;
  }
  throw new Error("Unable to clone obj! Its type isn't supported.");
};

var Boy2 = Boy1.clone();
Boy2.Profile.Age = 18;
console.log(Boy1.Profile.Age == Boy2.Profile.Age); // false
```

### 可以复制一切的深复制

```javascript
function deepClone(obj) {
  var copy;
  // Handle the 3 simple types, and null or undefined
  if (null == obj || 'object' != typeof obj) return obj;
  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }
  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepClone(obj[i]);
    }
    return copy;
  }
  // Handle Function
  if (obj instanceof Function) {
    copy = function () {
      return obj.apply(this, arguments);
    };
    return copy;
  }
  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = deepClone(obj[attr]);
    }
    return copy;
  }
  throw new Error(
    "Unable to copy obj as type isn't supported " + obj.constructor.name,
  );
}

const Boy = {
  Motherland: 'China',
  Nation: 'Han',
  Profile: {
    Gender: 'Male',
    Age: 25,
    Education: {
      a: 1,
      b: 2,
    },
  },
};
const boy2 = deepClone(Boy);
Boy.Profile.Age = 18;
console.log(boy2);

const sum = () => 1;
console.log(deepClone(sum)()); // 1

const time = new Date();
console.log(deepClone(time));

const arr = [1, 3, 5, 7];
console.log(deepClone(arr));
```

[比较两个对象-utils-(路由跳转)](Calculate/object-utils-func?id=比较对象)

---

[Copying objects in Javascript](https://smalldata.tech/blog/2018/11/01/copying-objects-in-javascript)
