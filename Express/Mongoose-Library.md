[Mongoose v5.8.1: Getting Started](https://mongoosejs.com/docs/index.html)
[Mongoose v5.8.1: Schemas](https://mongoosejs.com/docs/guide.html)

Mongoose 是一个使 MongoDB 更容易使用的库。它有两个作用

1. Mongoose 为 MongoDB 集合提供了结构，
2. Mongoose 为开发者提供了有用的方法

Connecting to MongoDB with a Node server
When we build applications, we connect to MongoDB through our applications (not through Mongo Shell nor MongoDB Compass).

To connect to MongoDB, we need to use the mongodb package. Alternatively, you can also use Mongoose.

Creating a Model
In Mongoose, you need to use models to create, read, update, or delete items from a MongoDB collection.

To create a Model, you need to create a Schema. A Schema lets you** define the structure of an entry** in the collection. This entry is also called a document.

Here’s how you create a schema:

<!-- <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/mongoose-schema-1576480647.jpg'/> -->
