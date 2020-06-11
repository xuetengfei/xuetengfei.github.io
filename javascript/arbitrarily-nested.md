# cannot read property of undefined

### 我们获取一个嵌套对象的某一个属性，书写方式或许是这样的

```javascript
const favorites = {
  video: {
    movies: ['Casablanca', 'Citizen Kane', 'Gone With The Wind'],
    shows: ['The Simpsons', 'Arrested Development'],
    vlogs: null,
  },
  audio: {
    podcasts: ['Shop Talk Show', 'CodePen Radio'],
    audiobooks: null,
  },
  reading: null,
};

const favoriteMovie =
  favorites.video && favorites.video.movies && favorites.video.movies[0];
// Casablanca

const favoriteVlog = favorites.video && favorites.video.vlogs && favorites.video.vlogs[0];
// null
```

<!-- ```javascript
const meals = {
  breakfast: null,
  lunch: {
    protein: 'Chicken',
    greens: 'Spinach',
  },
  dinner: {
    protein: 'Soy',
    greens: 'Kale',
  },
};

const breakfastProtein = meals.breakfast && meals.breakfast.protein; // null
const lunchProtein = meals.lunch && meals.lunch.protein; // 'Chicken'
``` -->

写起来很啰嗦，我们可以使用[idx Library](https://github.com/facebookincubator/idx)。
相同的库有,[Lodash Object#get](https://lodash.com/docs/4.17.11#get)和[Ramda R.path](https://ramdajs.com/docs/#path)

?> idx:用于访问 JavaScript 对象上任意嵌套的、可能为空的属性的库。

### 安装

```javascript
$ npm install idx
// or
$ yarn add idx
```

现在，可以像下面这样书写

```javascript
idx(props, _ => _.user.friends[0].friends);
```

第二个参数必须是一个返回一个或多个嵌套成员表达式的函数。任何其他表达式都有未定义的可能性。

### 代码演示

```javascript
// /user.js
const user = {
  job: null,
  grilfriend: null,
  colleague: [],
  friends: [
    {
      chinese: [
        {
          name: 'xtf',
          age: 25,
        },
      ],
    },
  ],
};
exports.user = user;
```

```javascript
const idx = require('idx');
const user = require('./user.js').user;

const job = idx(user, _ => _.job);
console.log(job); // null

const colleague = idx(user, _ => _.colleague);
console.log(colleague); // []

const friendName = idx(user, _ => _.friends[0].chinese[0].name);
console.log(friendName); // xtf

const friendName2 = idx(user, _ => _.friends[1].chinese[0].name);
console.log(friendName2); // undefined

const userAge = idx(user, _ => _.age);
console.log(userAge); // undefined
```

### 工作原理

```javascript
import idx from 'idx';

function getFriends() {
  return idx(props, _ => _.user.friends[0].friends);
}
```

最后，编译成下面的这个样子

```javascript
function getFriends() {
  props.user == null ? props.user :
  props.user.friends == null ? props.user.friends :
  props.user.friends[0] == null ? props.user.friends[0] :
  return props.user.friends[0].friends
}
```

其实，这个库非常迷你，查看源码就 20 行。下面是源码。

```javascript
'use strict'; // eslint-disable-line strict

function idx(input, accessor) {
  try {
    return accessor(input);
  } catch (error) {
    if (error instanceof TypeError) {
      if (nullPattern.test(error)) {
        return null;
      } else if (undefinedPattern.test(error)) {
        return undefined;
      }
    }
    throw error;
  }
}

var nullPattern = /^null | null$|^[^(]* null /i;
var undefinedPattern = /^undefined | undefined$|^[^(]* undefined /i;

idx.default = idx;
module.exports = idx;
```

### 在线编译

进入网站[Babel repl](https://babeljs.io/repl),左侧设置插件，搜索 idx，得到'babel-plugin-idx',添加该插件。

源码如下

```javascript
import idx from 'idx';

const user = {
  job: null,
  grilfriend: null,
  colleague: [],
  friends: [
    {
      chinese: [
        {
          name: 'xtf',
          age: 25,
        },
      ],
    },
  ],
};

const friendName = idx(user, _ => _.friends[0].chinese[0].name);
console.log(friendName);
```

编译后

```javascript
'use strict';

var _ref;

var user = {
  job: null,
  grilfriend: null,
  colleague: [],
  friends: [
    {
      chinese: [
        {
          name: 'xtf',
          age: 25,
        },
      ],
    },
  ],
};

var friendName =
  (_ref = user) != null
    ? (_ref = _ref.friends) != null
      ? (_ref = _ref[0]) != null
        ? (_ref = _ref.chinese) != null
          ? (_ref = _ref[0]) != null
            ? _ref.name
            : _ref
          : _ref
        : _ref
      : _ref
    : _ref;
console.log(friendName);
```

---

## 一个可选的方法是用一个可复用的工具函数封装 try...catch

```javascript
const favorites = {
  video: {
    movies: ['Casablanca', 'Citizen Kane', 'Gone With The Wind'],
    shows: ['The Simpsons', 'Arrested Development'],
    vlogs: null,
  },
  audio: {
    podcasts: ['Shop Talk Show', 'CodePen Radio'],
    audiobooks: null,
  },
  reading: null,
};

const tryFn = (fn, fallback = null) => {
  try {
    return fn();
  } catch (error) {
    return fallback;
  }
};

const favoriteBook = tryFn(() => favorites.reading.book[0], console.log('NOT FIND'));
const favoriteMovie = tryFn(() => favorites.video.movies[0]);

// NOT FIND
// favoriteBook:  null
// favoriteMovie:  Casablanca
```

---

## 未来：可选链式调用

目前 TC39 提案中有一个功能叫『可选链式调用』。这个新的运算符看起来像这样：

```javascript
console.log(favorites?.video?.shows[0]); // 'The Simpsons'
console.log(favorites?.audio?.audiobooks[0]); // undefined
```

`?.` 运算符通过短路方式运作：如果 `?.` 运算符的左侧计算值为 `null` 或者 `undefined`，则整个表达式会返回`undefined`并且右侧不会被计算。
为了有一个自定义的默认值，我们可以使用 `||` 运算符以应对未定义的情况。

```javascript
console.log(favorites?.audio?.audiobooks[0] || 'The Hobbit');
```

[@babel/plugin-proposal-optional-chaining - npm](https://www.npmjs.com/package/@babel/plugin-proposal-optional-chaining)

---

### Native get

```javascript
const get = (obj, path, defaultValue = null) =>
  String.prototype.split
    .call(path, /[,[\].]+?/)
    .filter(Boolean)
    .reduce((a, c) => (Object.hasOwnProperty.call(a, c) ? a[c] : defaultValue), obj);

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
