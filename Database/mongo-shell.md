在 shell 中查看或操作数据会用到 4 个基本操作：创建、读取、更新和删除（即通常 所
说的 CRUD 操作）。

---

```bash
> db.version()
4.2.0
```

```bash
# 非常有用的命令
help
db.help();
```

```bash
# 查看当前 db 的连接服务器机器地址
> db.getMongo()
connection to 127.0.0.1:27017
```

```bash
# 当前的数据库
> db
test

> db.getName()
test
```

```bash
# 查看所有数据库
> show dbs
admin      0.000GB
bookMarks  0.000GB
config     0.000GB
local      0.000GB
```

```bash
# 切换数据库
> use bookMarks
switched to db bookMarks
```

```bash
# 显示当前 db 状态
> db.stats()
{
	"db" : "bookMarks",
	"collections" : 3,
	"views" : 0,
	"objects" : 5,
	"avgObjSize" : 60.2,
	"dataSize" : 301,
	"storageSize" : 77824,
	"numExtents" : 0,
	"indexes" : 3,
	"indexSize" : 77824,
	"scaleFactor" : 1,
	"fsUsedSize" : 79536001024,
	"fsTotalSize" : 121123069952,
	"ok" : 1
}
```

```bash
# 查询 名字交 posts 的这个 collection 里面的 documents
> db.posts.find()

{ "_id" : ObjectId("5da84c642394507c20ff7394"), "title" : "fake", "date" : ISODate("2019-10-17T11:11:32.566Z"), "__v" : 0 }
{ "_id" : ObjectId("5da84cba2394507c20ff7396"), "title" : "123", "date" : ISODate("2019-10-17T11:12:58.498Z"), "__v" : 0 }
```

```bash
# 查询一个,第一个
> db.posts.findOne()
{
	"_id" : ObjectId("5da84c642394507c20ff7394"),
	"title" : "fake",
	"date" : ISODate("2019-10-17T11:11:32.566Z"),
	"__v" : 0
}
>
```

MongoDB 是 NoSQL 数据库系统中比较流行的数据库之一。它也是最接近关系型数据库的，
一个数据库可以包含多个集合（Collection），类似于关系数据库中的表；而每个集合中可
以存储一组由列标识的记录，列是可以自由定义的，非常灵活，这就类似于关系数据库表中
的每一条记录。下面和大家一起熟悉下 MongoDB 的基本管理命令。

一、MongoDB 数据库常用命令 1、Help 查看命令提示 help db.help();
db.yourColl.help();

2、切换/创建数据库 use raykaeso; 当创建一个集合(table)的时候会自动创建当前数据库

4、删除当前使用数据库 db.dropDatabase();

5、从指定主机上克隆数据库 db.cloneDatabase(“127.0.0.1”); 将指定机器上的数据库的
数据克隆到当前数据库

6、从指定的机器上复制指定数据库数据到某个数据库 db.copyDatabase(“mydb”, “temp”,
“127.0.0.1”);将本机的 mydb 的数据复制到 temp 数据库中

7、修复当前数据库 db.repairDatabase();

12、查询之前的错误信息和清除 db.getPrevError(); db.resetError();

二、MongoDB Collection 聚集集合 1、创建一个聚集集合（table）
db.createCollection(“collName”, {size: 20, capped: 5, max: 100});//创建成功会显
示{“ok”:1} //判断集合是否为定容量 db.collName.isCapped();

2、得到指定名称的聚集集合（table） db.getCollection(“account”);

3、得到当前 db 的所有聚集集合 db.getCollectionNames();

4、显示当前 db 所有聚集索引的状态 db.printCollectionStats();

5、查询当前集合的数据条数 db.yourColl.count();

6、查看当前集合数据空间大小 db.yourColl.dataSize();

7、得到当前聚集集合所在的 db db.yourColl.getDB();

8、得到当前聚集的状态 db.coll.stats();

9、得到聚集集合总大小 db.coll.totalSize();

10、聚集集合储存空间大小 db.coll.storageSize();

11、聚集集合重命名 db.coll.renameCollection(“ray”); 将 coll 重命名为 ray

12、删除当前聚集集合 db.coll.drop();

三、MongoDB 用户相关 1、添加一个用户（创建） db.createUser({user: 'username',
pwd: 'xxxx', roles: [{role: 'readWrite', db: 'dbname'}]}); 添加用户、设置密码、
是否只读

2、数据库认证、安全模式(登录) db.auth(“ray”, “123456”);

3、显示当前所有用户 show users;

4、删除用户 db.removeUser(“userName”);

四、MongoDB 聚集集合查询 1、查询所有记录 db.userInfo.find(); 相当于：select\*
from userInfo; 默认每页显示 20 条记录，当显示不下的情况下，可以用 it 迭代命令查
询下一页数据。注意：键入 it 命令不能带“;” 但是你可以设置每页显示数据的大小，用
DBQuery.shellBatchSize= 50;这样每页就显示 50 条记录了。

2、查询去掉后的当前聚集集合中的某列的重复数据 db.userInfo.distinct(“name”); 会过
滤掉 name 中的相同数据相当于：select distict name from userInfo;

3、查询 age = 22 的记录 db.userInfo.find({“age”: 22}); 相当于： select \* from
userInfo where age = 22;

4、条件查询的记录 MongoDB 中条件操作符有： (>) 大于 – $gt (<) 小于 – $lt (>=) 大
于等于 – $gte (<= ) 小于等于 – $lte db.userInfo.find({age: {\$gt: 22}}); 相当于
：select \* from userInfo where age>22;

db.userInfo.find({age:
{$lt: 22}});
相当于：select * from userInfo where age<22; db.userInfo.find({age: {$gte:
25}}); 相当于：select \* from userInfo where age >= 25;

db.userInfo.find({age:
{$lte: 25}});
相当于：select * from userInfo where age <= 25; 5、and查询 db.userInfo.find({age: {$gte:
23, \$lte: 26}}); 相当于：select _ from userInfo wher age >=23 and age <=26
db.userInfo.find({name: ‘raykaeso’, age: 22}); 相当于：select _ from userInfo
where name = ‘raykaeso’ and age = ‘22′;

6、字符模糊查询 db.userInfo.find({name: /mongo/}); //相当于%% [code]select \*
from userInfo where name like ‘%mongo%';

7、查询指定列数据 db.userInfo.find({}, {name: 1, age: 1}); 相当于：select name,
age from userInfo; 当然 name 也可以用 true 或 false

8、按条件查询指定列数据 db.userInfo.find({age: {\$gt: 25}}, {name: 1, age: 1});
相当于：select name, age from userInfo where age <25;

9、排序升序：db.userInfo.find().sort({age: 1}); 降序
：db.userInfo.find().sort({age: -1});

10、查询前 5 条数据 db.userInfo.find().limit(5); 相当于：select \* from userInfo
limit 5;

11、查询 10 条以后的数据 db.userInfo.find().skip(10); 相当于：select count()
from userInfo as total; select from userInfo limit 10,total;

12、查询在 5-10 之间的数据 db.userInfo.find().limit(10).skip(5); 可用于分页
，limit 是 pageSize，skip 是第几页 pageSize 相当于：select from userInfo limit
5,10;

13、or 与 查询 db.userInfo.find({\$or: [{age: 22}, {age: 25}]}); 相当于
：select \* from userInfo where age = 22 or age = 25;

14、查询第一条数据 db.userInfo.findOne(); db.userInfo.find().limit(1); 相当于
：select \* from userInfo limit 1;

15、查询某个结果集的记录条数 db.userInfo.find({age: {\$gte: 25}}).count(); 相当
于：select count(\*) from userInfo where age >= 20;

五、MongoDB 索引 1、创建索引 db.userInfo.ensureIndex({name: 1});
db.userInfo.ensureIndex({name: 1, ts: -1});

2、查询当前聚集集合所有索引 db.userInfo.getIndexes();

3、查看总索引记录大小 db.userInfo.totalIndexSize();

4、读取当前集合的所有 index 信息 db.users.reIndex();

5、删除指定索引 db.users.dropIndex(“name_1″);

6、删除所有索引索引 db.users.dropIndexes();

六、MongoDB 修改、添加、删除集合数据 1、添加 db.users.save({name: ‘zhangsan’,
age: 25, sex: true}); 添加的数据的数据列，没有固定，根据添加的数据为准

2、修改 db.users.update({age: 25},
{$set: {name: ‘changeName’}}, false, true);
相当于：update users set name = ‘changeName’ where age = 25;
db.users.update({name: ‘Lisi’}, {$inc:
{age: 50}}, false, true); 相当于：update users set age = age + 50 where name =
‘Lisi'; db.users.update({name: ‘Lisi’}, {$inc: {age: 50}, $set: {name: ‘hoho’}},
false, true); 相当于：update users set age = age + 50, name = ‘hoho’ where name
= ‘Lisi';

3、删除 db.users.remove({age: 132});

4、查询修改删除 db.users.findAndModify({ query: {age:
{$gte: 25}},
sort: {age: -1},
update: {$set: {name: ‘a2′}, \$inc: {age: 2}},
remove: true });

---

1. [mongo Shell Methods — MongoDB Manual](https://docs.mongodb.com/manual/reference/method/)
2. [Database Commands — MongoDB Manual](https://docs.mongodb.com/manual/reference/command/)
