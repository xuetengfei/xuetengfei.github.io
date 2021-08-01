```js
const { MongoClient } = require('mongodb');
require('dotenv/config');

const client = new MongoClient(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect(err => {
  if (err) throw err;
  const col = client.db('test');
  var myobj = { weather: 'sun', data: '1970-01-01' };
  col.collection('weather_table').insertOne(myobj, function (err, res) {
    if (err) throw err;
    console.log('res', res);
    console.log('文档插入成功');
    client.close();
  });
});
```

```sh
node index.js
res {
  acknowledged: true,
  insertedId: new ObjectId("610646db1ed82e77066c2a74")
}
文档插入成功
```

```sh
MongoDB Enterprise atlas-k1zxb1-shard-0:PRIMARY> show dbs
admin               0.000GB
local               6.717GB
sample_weatherdata  0.002GB
test                0.000GB
MongoDB Enterprise atlas-k1zxb1-shard-0:PRIMARY> use test
switched to db test
MongoDB Enterprise atlas-k1zxb1-shard-0:PRIMARY> show collections
weather_table
MongoDB Enterprise atlas-k1zxb1-shard-0:PRIMARY> db.weather_table.find().pretty()
{
	"_id" : ObjectId("610646db1ed82e77066c2a74"),
	"weather" : "sun",
	"data" : "1970-01-01"
}
MongoDB Enterprise atlas-k1zxb1-shard-0:PRIMARY>
```

> 注意

1. process.env.DB 里面存放是的 mongodb Atlas uri. 如果，账号和密码包含特殊字符
   如`: / ? # [ ] @`等需要
   encode.[Troubleshoot Connection Issues — MongoDB Atlas](https://docs.atlas.mongodb.com/troubleshoot-connection/)
