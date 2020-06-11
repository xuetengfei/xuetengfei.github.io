?> 可以创建一个 100％ 纯对象，它不会从 Object 继承任何属性或方法（例如，constructor，toString() 等）。

## 实现方法一: Object.create(null)

```javascript
const pureObject = Object.create(null);
console.log(pureObject); //=> {}
console.log(pureObject.constructor); //=> undefined
console.log(pureObject.toString); //=> undefined
console.log(pureObject.hasOwnProperty); //=> undefined
```

```javascript
const dirtyMap = {};
const cleanMap = Object.create(null);

dirtyMap.constructor; // function Object() { [native code] }
cleanMap.constructor; // undefined

for (let key in dirtyMap) {
  if (dirtyMap.hasOwnProperty(key)) {
    // Check to avoid iterating over inherited properties.
    console.log(key + ' -> ' + dirtyMap[key]);
  }
}

for (let key in cleanMap) {
  console.log(key + ' -> ' + cleanMap[key]);
  // No need to add extra checks, as the object will always be clean
}
```

## 实现方法二: obj.\_\_proto\_\_ = null;

```javascript
const object = { key: 'value' };
object.__proto__ = null;

const clearobject = { key: 'value' };
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/clear-object-1557026975.jpg' width='600px'/>
