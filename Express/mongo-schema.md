前端来说，新用户注册的表单都会有一个 Form Validation.当提交了没有输入符合预期格式的信息的表单时，注册页面都会给你一个反馈，这些信息可能看起来像下面这样的：

```
“该字段是必填的”（该字段不能留空）
“请输入你的电话号码，它的格式是：xxx-xxxx”
“请输入一个合法的邮箱地址”
“你的密码长度应该是8至30位的，并且至少应该包含一个大写字母、一个符号以及一个数字”
```

那么，这个 Validation 规则相当于描述和规定了一个用户的必要信息。

在服务端的世界里面,服务是对数据的 CRUD,每一条数据都是若干个最小的元数据构成的。开发初期，设计数据库的时候就要设计不同的数据应该是什么样子。那么对数据的抽象描述就是，Schema(模型)。

?> Schema(模型)就是**元数据**的一个抽象集合,模型是用来构造文档(document)的类。

## Creating a Model

在 Mongoose 中，需要使用 models(模型)来 create、read、update 或 delete MongoDB 集合中的项。
要创建模型，需要创建 Schema(架构)。架构允许您在集合中 **定义条目** 的结构。此条目也称为文档 **document**

```javascript
// Schema.js
const mongoose = require('mongoose');

const _schema = new mongoose.Schema({
  weather: String,
});

const what = mongoose.model('Weather', _schema);
console.log('what: ', what);

module.exports = what;
```

```javascript
// index.js
const Weather = require('./Schema');

const o = new Weather({
  weather: 'sunny',
});

console.log('o: ', o);
```

```javascript
➜  node index.js
what:  function model(doc, fields, skipId) {
      model.hooks.execPreSync('createModel', doc);
      if (!(this instanceof model)) {
        return new model(doc, fields, skipId);
      }
      const discriminatorKey = model.schema.options.discriminatorKey;

      if (model.discriminators == null || doc == null || doc[discriminatorKey] == null) {
        Model.call(this, doc, fields, skipId);
        return;
      }

      // If discriminator key is set, use the discriminator instead (gh-7586)
      const Discriminator = model.discriminators[doc[discriminatorKey]] ||
        getDiscriminatorByValue(model, doc[discriminatorKey]);
      if (Discriminator != null) {
        return new Discriminator(doc, fields, skipId);
      }

      // Otherwise, just use the top-level model
      Model.call(this, doc, fields, skipId);
    }
o:  { _id: 5df72e7d79e647299a4d3e53, weather: 'sunny' }
```

## 发现

定义好的 schema,mongo 会自动变成复数的小些字母。
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Snipaste_2019-10-26_21-07-28-1572095316.png'/>

---

1. [Mongoose v5.8.1: Schemas](https://mongoosejs.com/docs/guide.html)
2. [Mongoose 101 | Zell Liew](https://zellwk.com/blog/mongoose/)
