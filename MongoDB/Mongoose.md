> ODM

ORM:对象与关系形数据库映射 Object Relational Mapping  
ODM:对象与文档形数据库映射 Object Document Mapping

> Mongoose

Mongoose 是一个 ODM，可以用来来接 Node 前端框架和 MonogDB 数据库。提供了一种直接
的、基于模式的解决方案来为应用程序数据建模。它包括内置的类型转换、验证、查询构建
、业务逻辑挂钩等。

> Mongoose Schema

Mongoose 的一切都是从 Schema 开始的。每一个 Schema 对映到一个 MongoDB collection
并定义该 collection 中 document 的“样子”。

Schema 主要用于定义 MongoDB 中集合 Collection 里文档 document 的结构,可以理解为
mongoose 对表结构的定义(不仅仅可以定义文档的结构和属性，还可以定义文档的实例方法
、静态模型方法、复合索引等)，每个 schema 会映射到 mongodb 中的一个
collection，schema 不具备操作数据库的能力

<!-- Model 是由 Schema 编译而成的假想（fancy）构造器，具有抽象属性和行为。Model 的每
一个实例（instance）就是一个 document，document 可以保存到数据库和对数据库进行操
作。简单说就是 model 是由 schema 生成的模型，可以对数据库的操作。 -->
