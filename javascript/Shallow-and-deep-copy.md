`浅拷贝` ：浅拷贝是`拷贝引用`，拷贝后的引用类型数据 都是指向同一个对象的实例，彼
此之间的操作会互相影响

`深拷贝`：深拷贝是`拷贝实例`深不是简单的拷贝引用，而是在堆中重新分配内存，并且把
源对象实例的所有属性都进行新建拷贝，以保证深的对象的引用图不包含任何原有对象或对
象图上的任何对象，拷贝后的对象与原来的对象是完全隔离的

### 浅拷贝

类型判断 + 遍历赋值

```javascript
function clone(target) {
  let cloneTarget = {};
  for (const key in target) {
    cloneTarget[key] = target[key];
  }
  return cloneTarget;
}

// ---- 分割线 ---

let z = { a: 3, b: 4 };
let n = { ...z };

n; // { a: 3, b: 4 }
```

## 深拷贝:基础版本

深拷贝,考虑到要拷贝的对象是不知道有多少层深度的  
可以用递归来解决问题，稍微改写上面的代码

递归 + 类型判断 + 遍历赋值

```javascript
function deepClone(target) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {};
    for (const key in target) {
      cloneTarget[key] = clone(target[key], map);
    }
    return cloneTarget;
  } else {
    return target;
  }
}
```

## 深拷贝:解决循环引用

```javascript
const target = {
  key1: 1,
  key2: undefined,
  key3: [2, 4, 8],
  key4: {
    child: 'child',
  },
  key5: function () {
    console.log('this key5 func');
  },
  null: 'x',
};
target.target = target;
```

解决循环引用导致的栈溢出问题，就需要判断要拷贝的对象，是不是已经拷贝过.  
如果已经拷过了，而不去循环拷贝。  
可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系  
当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象  
如果有直接返回，如果没有继续拷贝

```javascript
function deepClone(target, map = new WeakMap()) {
  // typeof操作符 数组、null 都是 'object'
  // Object只能用基本类型作为key值,不存在null数据类型的情况
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {};
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);
    for (const key in target) {
      cloneTarget[key] = deepClone(target[key], map);
    }
    return cloneTarget;
  } else {
    return target;
  }
}
const ans = deepClone(target);
console.log(ans);
/* 
  <ref *1> {
    key1: 1,
    key2: undefined,
    key3: [ 2, 4, 8 ],
    key4: { child: 'child' },
    key5: [Function: key5],
    null: 'x',
    target: [Circular *1]
  }
  */
```

WeakMap 比 Map 有两个不同  
1、【特殊点】WeakMap 只接受引用类型（对象）作为键名  
2、【优点】WeakMap 的键名所指向的对象都是弱引用，不计入垃圾回收机制，不用考虑内
存泄漏。 当引用对象被清除，其所对应的 WeakMap 记录就会自动被移除

<!--

## 拓展对象原型

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

## 可以拷贝一切的深拷贝

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

```javascript
const isObject = target =>
  (typeof target === 'object' || typeof target === 'function') &&
  target !== null;

function deepClone(target, map = new WeakMap()) {
  if (map.get(target)) {
    return target;
  }
  // 获取当前值的构造函数：获取它的类型
  let constructor = target.constructor;
  // 检测当前对象target是否与正则、日期格式对象匹配
  if (/^(RegExp|Date)$/i.test(constructor.name)) {
    // 创建一个新的特殊对象(正则类/日期类)的实例
    return new constructor(target);
  }
  if (isObject(target)) {
    map.set(target, true); // 为循环引用的对象做标记
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = deepClone(target[prop], map);
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}
```
 -->

---

1. [【每日一题】深拷贝时有循环引用怎么解决？-技术圈](https://jishuin.proginn.com/p/763bfbd65bed)
