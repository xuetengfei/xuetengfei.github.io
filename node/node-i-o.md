# 使用 node 读写文件

```
.
├── index.js
└── test.txt

0 directories, 2 files
```

```javascript
// test.txt

this is a txt file!
```

```javascript
// index.js
const fs = require('fs');
let temp = fs.readFileSync('test.txt', 'utf8');
fs.writeFileSync('writeFile.txt', temp);
console.log(temp); // this is a txt file!
```

```javascript
.
├── index.js
├── test.txt
└── writeFile.txt

0 directories, 3 files
```

```javascript
// writeFile.txt

this is a txt file!
```
