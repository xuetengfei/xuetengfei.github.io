### 基本路由语法

```javascript
/* app.METHOD(PATH, HANDLER) */

app.get('/', function(req, res) {
  res.send('Hello World!');
});
```

### express 基本使用

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`App listening on port ${port}!`));
```
