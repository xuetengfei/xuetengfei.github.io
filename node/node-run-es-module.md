## 方法一:声明 package.json 中 type 为 module

[模块：包 | Node.js v17.3.0 文档](https://nodejs.org/api/packages.html#type)

```json
{
  "type": "module",
  "dependencies": {
    "lodash": "^4.17.21"
  }
}
```

```js
import _ from 'lodash';

const o = {
  a: 1,
};

console.log('res', _.get(o, 'a', 0));
```

```bash
➜   node index.js
(node:97849) ExperimentalWarning: The ESM module loader is experimental.
res 1
```

## 方法二 js 的后缀后修改为 mjs

[模块：ECMAScript 模块 | Node.js v17.3.0 文档](https://nodejs.org/api/esm.html)

```sh
.
├── index.mjs
└── package.json
```

```js
import _ from 'lodash';

const o = {
  a: 1,
};

console.log('res', _.get(o, 'a', 0));
```

```bash
➜   node index.mjs
(node:97849) ExperimentalWarning: The ESM module loader is experimental.
res 1
```
