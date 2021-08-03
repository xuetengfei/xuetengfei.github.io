> ODM

ORM:对象与关系形数据库映射 Object Relational Mapping  
ODM: Object Data Modeler

> Mongoose

Mongoose 是用于 MongoDB 和 Node.js 的对象数据建模 (ODM) 库。它管理数据之间的关系
，提供模式验证，并用于在代码中的对象和 MongoDB 中这些对象的表示之间进行转换。

<!-- Mongoose 是一个 ODM，可以用来来接 Node 前端框架和 MonogDB 数据库。提供了一种直接
的、基于模式的解决方案来为应用程序数据建模。它包括内置的类型转换、验证、查询构建
、业务逻辑挂钩等。 -->

<!-- Model 是由 Schema 编译而成的假想（fancy）构造器，具有抽象属性和行为。Model 的每
一个实例（instance）就是一个 document，document 可以保存到数据库和对数据库进行操
作。简单说就是 model 是由 schema 生成的模型，可以对数据库的操作。 -->

<!-- [mongoose - npm](https://www.npmjs.com/package/mongoose) -->

> 简单地演示

```javascript
const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv/config');

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 50,
  autoIndex: false,
});
mongoose.connection.once('open', () => {
  console.log('connected to database');
});
mongoose.connection.on('error', console.error);

function close() {
  mongoose.connection.close();
}

// document
const docs = mongoose.connection.useDb('myDB');

const CatSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

// create a model
const Cat = docs.model('Cat', CatSchema);

// create a mongoDB object entity
const kitty = new Cat({ name: '豆豆', age: 1 });

kitty.save(function (err, docs) {
  if (err) console.log('err', err);
  // saved!
  console.log('docs', docs);
  close();
});
```

```sh
MongoDB Enterprise > use myDB
switched to db myDB
MongoDB Enterprise > show collections
cats
MongoDB Enterprise > db.cats.find().pretty()
{
	"_id" : ObjectId("61092d1ba7ebfb39d1c60bcd"),
	"name" : "豆豆",
	"age" : 1,
	"__v" : 0
}
```

> 名词解释

Schema: 一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力  
Model: 由 Schema 发布生成的模型，具有抽象属性和行为的数据库操作对  
Entity: 由 Model 创建的实体，他的操作也会影响数据库

Schema、Model、Entity 的关系请牢记，Schema 生成 Model，Model 创造 Entity，Model
和 Entity 都可对数据库操作造成影响，但 Model 比 Entity 更具操作性。

Model 和 Entity 类似与 OOP 范式里面的'类'和'实例'

> Mongoose Schema

Mongoose 的一切都是从 Schema 开始的。每一个 Schema 对映到一个 MongoDB collection
并定义该 collection 中 document 的“样子”。

Schema 主要用于定义 MongoDB 中集合 Collection 里文档 document 的结构,可以理解为
mongoose 对表结构的定义(不仅仅可以定义文档的结构和属性，还可以定义文档的实例方法
、静态模型方法、复合索引等)，每个 schema 会映射到 mongodb 中的一个
collection，schema 不具备操作数据库的能力.

> Mongoose Model

```js
const docs = mongoose.connection.useDb('myDB');
const Cat = docs.model('Cat', CatSchema);

Cat.find(function (err, cats) {
  if (err) console.log('err', err);
  console.log('cats', cats);
  close();
});

// cats [ { _id: 61092d1ba7ebfb39d1c60bcd, name: '豆豆', age: 1, __v: 0 } ]
```

> Mongoose Entity

Entity 是具有数据库 CRUD 操作。如果要执行查询，需要依赖 Model，当然 Entity 也是
可以做到的

```js
const kitty = new Cat({ name: '豆豆', age: 1 });
kitty.save(/*...*/);
```

---

1. [Introduction to Mongoose for MongoDB](https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/)

<!--
Schema 不仅定义了文档结构和使用性能，还可以有扩展插件、实例方法、静态方法、复合
索引、文档生命周期钩子 Schema 可以定义插件，并且插件具有良好的可拔插性，请有兴趣
的读者继续往后阅读或者查阅官方资料。 -->

<!-- [Mongoose学习参考文档——基础篇 - CNode技术社区](https://cnodejs.org/topic/504b4924e2b84515770103dd) -->
