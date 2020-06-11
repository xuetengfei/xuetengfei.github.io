1. [rollup.js 官网](https://rollupjs.org/guide/zh)
2. [rollup.js 中文文档](https://rollupjs.org/guide/zh)
3. [rollup.js GitBook](https://chenshenhai.github.io/rollupjs-note/note/chapter00/01.html)

---

```javascript
.
├── dist
│   └── bundle.js
├── package.json
├── rollup.config.js
└── src
    ├── bar.js
    └── main.js

2 directories, 5 files
```

```javascript
// main.js
import { version } from '../package.json';
import { statusMap } from './bar';

export default function() {
  console.log(statusMap);
  console.log('version ' + version);
}
```

```javascript
// bar.js
const ALLMAPArray = [
  [1, '待支付', 'Waiting'],
  [2, '已取消', 'Cancel'],
  [3, '支付中', 'Paymenting'],
  [4, '已支付', 'Paymented'],
  [5, '已抵扣', 'Deducted'],
];
const objectFromPairs = arr => arr.reduce((a, v) => ((a[v[0]] = v[1]), a), {});

export const statusMap = objectFromPairs(ALLMAPArray.map(v => [v[0], v[1]]));
```

```bash
# 编译且监听源文件是否有改动，如果有改动，重新打包
rollup -c -w
```

```javascript
// bundle.js
'use strict';

var version = '1.0.0';

const ALLMAPArray = [
  [1, '待支付', 'Waiting'],
  [2, '已取消', 'Cancel'],
  [3, '支付中', 'Paymenting'],
  [4, '已支付', 'Paymented'],
  [5, '已抵扣', 'Deducted'],
];
const objectFromPairs = arr => arr.reduce((a, v) => ((a[v[0]] = v[1]), a), {});

const statusMap = objectFromPairs(ALLMAPArray.map(v => [v[0], v[1]]));

function main$1() {
  console.log(statusMap);
  console.log('version ' + version);
}

module.exports = main$1;
```

---

## rollup.config.js

```javascript
import json from "rollup-plugin-json";
import { uglify } from "rollup-plugin-uglify";
import babel from "rollup-plugin-babel";
const path = require("path");

const resolve = function(filePath) {
  return path.join(__dirname, "..", filePath);
};

export default {
  input: resolve("src/main.js"),
  output: {
    file: resolve("dist/index.js"),
    format: "es"
  },
  plugins: [
    json(),
    babel({
      exclude: "node_modules/**", // 排除node_modules
      presets: [
        [
          "latest",
          {
            es2015: {
              modules: false
            }
          }
        ]
      ],
      plugins: ["transform-object-rest-spread"]
    })
    uglify()
  ]
};

```
