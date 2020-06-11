这里主要讲解 express 集成 MongoDB。

### 1. Use MongoDB Native Driver

```javascript
const MongoClient = require('mongodb').MongoClient;
const dbName = 'people';
const url = 'mongodb://127.0.0.1:27017';
let db;

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err);
  db = client.db(dbName);
  console.log(`Connected MongoDB: ${url}`);
  console.log(`Database: ${dbName}`);
});

// Connected MongoDB: mongodb://127.0.0.1:27017
// Database: people
```

### 2. Use Mongoose

[mongoose](https://github.com/Automattic/mongoose)

```
npm install mongoose
const mongoose = require('mongoose');
```

<!--
### 使用 dotenv

使用 [dotenv](https://github.com/motdotla/dotenv#readme) 加载项目环境变量，可以避免敏感信息的暴露。**npm install dotenv** 安装依赖，在项目的根目录中创建一个**.env** 文件。在新行上以** NAME = VALUE **的形式添加特定于环境的变量。例如

```javascript
DB_NAME=mongodb://127.0.0.1:27017/my_db
DB_HOST=localhost
DB_USER=root
```
 编码 **index.js** 引入 **dotenv** 后,集成数据库。

 -->

```javascript
// Connect Td DB!
const url = 'mongodb://127.0.0.1:27017/people';
mongoose.connect(url, { useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', _ => {
  console.log('Database connected:', url);
});

db.on('error', err => {
  console.error('connection error:', err);
});

// Database connected:mongodb://127.0.0.1:27017/people
```
