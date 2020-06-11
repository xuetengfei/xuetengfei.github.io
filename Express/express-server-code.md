文件组织·

```javascript
.
├── app.js
├── node_modules
├── package-lock.json
└── package.json

1 directories, 3 files
```

### app.js

```javascript
// app.js
var express = require('express');
var app = express();
app.get('/', function(req, res) {
  res.send('Frist node app');
});

app.listen(2333, function() {
  console.log('app is listening at port 2333');
});
```

### package.json

```json
{
  "name": "node_serve",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "express": "^4.16.4",
    "nodemon": "^1.18.9"
  }
}
```

### run

```javascript
npm run start
```

```javascript
> node_serve@1.0.0 start /Users/_code/node_serve
> nodemon app.js

[nodemon] 1.18.9
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node app.js`
app is listening at port 2333
```
