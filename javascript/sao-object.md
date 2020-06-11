### get

```javascript
const get = (obj, path, defaultValue = null) =>
  String.prototype.split
    .call(path, /[,[\].]+?/)
    .filter(Boolean)
    .reduce(
      (a, c) => (Object.hasOwnProperty.call(a, c) ? a[c] : defaultValue),
      obj,
    );

const object = { a: [{ b: { c: 3, d: undefined } }] };
const R = get(object, 'a[0].b.c', 999);
console.log('R: ', R); // 3

const R_2 = get(object, 'a[0].b.d');
console.log(' R_2: ', R_2); // undefined

const R_3 = get(object, 'a[0].b.e', 999);
console.log('R_3 : ', R_3); // 999

const R_4 = get(object, 'a[0].b.f');
console.log(' R_4: ', R_4); // null
```

### omit

```javascript
var { a, c, ...result2 } = object;
console.log(result2);
// output: { 'b': '2' }
```

### pick: 选择一个对象中所需的属性

```javascript
// 1
function pick(object, keys) {
  return keys.reduce((obj, key) => {
    if (object && object.hasOwnProperty(key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
}

// 2
function pick(obj, keys) {
  return keys
    .map(k => (k in obj ? { [k]: obj[k] } : {}))
    .reduce((res, o) => Object.assign(res, o), {});
}

//   ----

var object = { a: 1, b: '2', c: 3 };
var result = pick(object, ['a', 'c']);

console.log(result); //  {a: 1, c: 3}

const table = [
  {
    id: 1,
    name: 'John Doe',
    code: 'MDAKW213',
  },
  {
    id: 3,
    name: 'Steve Doe',
    code: 'STV12JB',
  },
];

console.log(table.map(row => pick(row, ['id', 'name'])));

// > [ { id: 1, name: 'John Doe' }, { id: 3, name: 'Steve Doe' } ]
```

### 去除对象中 value 为空的属性

```javascript
console.log('===================================');
var object = {
  j: 0,
  a: 1,
  c: 3,
  b: null,
  k: true,
  d: false,
  e: undefined,
  f: NaN,
  g: '',
  h: [],
  i: {},
};

function compactObj(object) {
  const obj = {};
  for (const key in object) {
    if (
      object[key] !== null &&
      object[key] !== false &&
      object[key] !== undefined
    ) {
      obj[key] = object[key];
    }
  }
  return obj;
}
const R = compactObj(object);
console.log('R: ', R);

// { j: 0, a: 1, c: 3, k: true, f: NaN, g: '', h: [], i: {} }

// 2
function compactObj2(object) {
  const obj = Object.create(null);
  for (const key in object) {
    if (![null, false, undefined, NaN, ''].includes(object[key])) {
      obj[key] = object[key];
    }
  }
  return obj;
}
const R2 = compactObj2(object);
console.log('R2: ', R2);
// R2:  { j: 0, a: 1, c: 3, k: true, h: [], i: {} }

// 3
function compactObj3(object) {
  const obj = Object.create(null);
  for (const key in object) {
    if (!!object[key] !== false) {
      obj[key] = object[key];
    }
  }
  return obj;
}
const R3 = compactObj3(object);
console.log('R3: ', R3);
// R3:  { a: 1, c: 3, k: true, h: [], i: {} }
```

### 3、reject: 排除掉一个对象中不需要的属性，留下其他的属性

```javascript
function reject(obj, keys) {
  return Object.keys(obj)
    .filter(k => !keys.includes(k))
    .map(k => ({ [k]: obj[k] }))
    .reduce((res, o) => Object.assign(res, o), {});
}

console.log(reject({ a: 2, b: 3, c: 4, d: '123' }, ['a', 'b']));
// > { c: 4, d: '123' }
```

```javascript
const user = {
  id: 100,
  name: 'XueTengfei',
  password: 'Password!',
};

const removeProperty_ = prop => ({ [prop]: _, ...rest }) => {
  //                    ----       ------
  //                        \   /
  //                  dynamic destructuring

  console.log('_: ', _);
  return rest;
};

console.log(removeProperty('id')(user));

// _:  100
// { name: 'XueTengfei', password: 'Password!' }

// _ 是个啥玩意？
```

### 调整对象属性的排序位置

```javascript
const user3 = {
  password: 'Password!',
  name: 'XueTengfei',
  id: 300,
  age: 18,
};

const organize = object => ({ id: undefined, ...object });
console.log(organize(user3));
/// { id: 300, password: 'Password!', name: 'XueTengfei', age: 18 }

const organize2 = object => ({
  id: undefined,
  age: undefined,
  name: undefined,
  password: undefined,
  ...object,
});
console.log(organize2(user3));
// { id: 300, age: 18, name: 'XueTengfei', password: 'Password!' }

const organize3 = ({ password, ...object }) => ({ ...object, password });
console.log(organize3(user3));
// { name: 'XueTengfei', id: 300, age: 18, password: 'Password!' }
```

### 有条件地添加属性

```javascript
const user = { id: 100, name: 'XueTengfei' };
const password = 'Has Password!';

const userWithPassword = {
  ...user,
  id: 100,
  ...(password && { password }),
};

console.log(userWithPassword);
// { id: 100, name: 'XueTengfei', password: 'Has Password!' }
```

---

### 删除无效属性:排除掉对象中的`null`、`undefined`、`''`

```javascript
const excludeFalsely = obj => {
  const result = {};
  const validKeyList = Object.keys(obj).filter(v => {
    if (obj[v] || typeof obj[v] == 'number') {
      return v;
    }
  });
  validKeyList.forEach(v => {
    result[v] = obj[v];
  });
  return result;
};

const a = {
  name: 'xtf',
  home: null,
  money: undefined,
  title: '',
  recently: {},
  level: 0,
};

console.log(excludeFalsely(a));
// > { name: 'xtf', recently: {}, level: 0 }
```

---

### 对象解构 - 删除不必要的属性

```javascript
const { a, b, ...rest } = { a: 'qwe', b: 'asd', c: 'ccc' };
console.log(rest); //  {c:'ccc'}
```

### 对象解构 - 解构嵌套对象

```javascript
const res = { data: { total: 11 } };
const { data } = res;
const {
  data: { total },
} = res;
console.log(data); //   { total: 11 }
console.log(total); // 11
```

### 对象解构 - 合并对象

```javascript
let object1 = { a:1, b:2,c:3 }
let object2 = { b:30, c:40, d:50}
let merged = {…object1, …object2} //spread and re-add into merged
console.log(merged) // {a:1, b:30, c:40, d:50}
```

### 修改对象属性

```javascript
let object1 = { a: 1, b: 2, c: 3 };
let object2 = { ...object1, a: 0 };
console.log(object2); // { a: 0, b: 2, c: 3 }
```

### 比较对象

```javascript
function diff(obj1, obj2) {
  var o1 = obj1 instanceof Object;
  var o2 = obj2 instanceof Object;
  if (!o1 || !o2) {
    return obj1 === obj2;
  }
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }
  for (var attr in obj1) {
    var t1 = obj1[attr] instanceof Object;
    var t2 = obj2[attr] instanceof Object;
    if (t1 && t2) {
      return diff(obj1[attr], obj2[attr]);
    } else if (obj1[attr] !== obj2[attr]) {
      return false;
    }
  }
  return true;
}

const Boy = {
  Motherland: 'China',
  Nation: 'Han',
  Profile: {
    Gender: 'Male',
    Age: 25,
    Education: 'Undergraduate',
  },
};

const Boy2 = {
  Motherland: 'China',
  Nation: 'Han',
  Profile: {
    Gender: 'Male',
    Age: 18,
    Education: 'Undergraduate',
  },
};

console.log(diff(Boy, Boy2)); //false
```
