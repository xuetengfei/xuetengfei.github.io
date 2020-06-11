ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了`字符串—值`的对应，Map 结构提供了`值—值`的对应，是一种更完善的 `Hash 结构`实现。Map 比 Object 更合适 “键值对”的数据结构。

```javascript
/* 
为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。
 */
const m = new Map();
console.log('m: ', m); //  m:  Map {}

/* 
作为构造函数，Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。 */
const map = new Map([['name', '张三'], ['title', 'Author']]);

/* 上面代码在新建 Map 实例时，就指定了两个键name和title。 */

console.log('map: ', map); //   map:  Map {'name' => '张三', 'title' => 'Author' }

map.size; // 2

map.get('name'); // "张三"
map.has('title'); // true
map.get('title'); // "Author"

const pair = a => b => [a, b];
const [a, b] = pair('first')('second');
console.log(a); // first
console.log(b); // second
```

### simple use

```javascript
import React from 'react';
// { useState, useEffect, useRef }
import css from './index.module.scss';

export default function Circular(props) {
  const actions = new Map([
    [1, ['processing', 'IndexPage']],
    [2, ['fail', 'FailPage']],
    [3, ['fail', 'FailPage']],
    [4, ['success', 'SuccessPage']],
    [5, ['cancel', 'CancelPage']],
    ['default', ['other', 'Index']],
  ]);
  /**
   * 按钮点击事件
   * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 商品售罄 4 开团成功 5 系统取消
   */
  const onButtonClick = status => {
    let action = actions.get(status) || actions.get('default');
    console.log('actions: ', actions);
    console.log('action: ', action);
  };

  return (
    <div className="c">
      <button
        className="btn"
        onClick={() => {
          onButtonClick(2);
        }}
      >
        Click Me
      </button>
    </div>
  );
}
```

#### 枚举

```javascript
const actions = new Map([
  [
    { identity: 'guest', status: 1 },
    () => {
      console.log('return 1');
    },
  ],
  [
    { identity: 'guest', status: 2 },
    () => {
      console.log('return 2');
    },
  ],
]);

const onButtonClick = (identity, status) => {
  let action = [...actions].filter(
    ([key, value]) => key.identity == identity && key.status == status,
  );
  action.forEach(([key, value]) => value.call(this));
};

onButtonClick('guest', 2);

// return 2
```

#### 可以使用正则表达式

```javascript
const actions = () => {
  const functionA = () => {
    console.log('run functionA');
  };
  const functionB = () => {
    console.log('run functionB');
  };
  const functionC = () => {
    console.log('run functionC');
  };
  return new Map([
    [/^guest_[1-4]$/, functionA],
    [/^guest_5$/, functionB],
    [/^guest_.*$/, functionC],
  ]);
};

const onButtonClick = (identity, status) => {
  let action = [...actions()].filter(([key, value]) => key.test(`${identity}_${status}`));
  action.forEach(([key, value]) => value());
};

onButtonClick('guest', '2');
// run functionA
// run functionC

onButtonClick('guest', 'whatever');
// run functionC
```

---

1. [Map 数据结构](http://es6.ruanyifeng.com/?search=map&x=7&y=3#docs/set-map#Map)
