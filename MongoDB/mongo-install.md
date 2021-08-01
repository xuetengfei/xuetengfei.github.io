> Install on MacOS

```shell
brew tap mongodb/brew
brew install mongodb-community@4.4
```

> 本地安装信息:

1. 配置文件:`/usr/local/etc/mongo.conf`
2. 日志文件路径:`/usr/local/var/log/mongodb`
3. 数据存放路径:`/usr/local/var/mongodb`

> 可以使用 brew 命令或 mongo 命令来启动服务

brew 启动:

```sh
brew services start mongodb-community@4.4
```

brew 停止:

```sh
brew services stop mongodb-community@4.4
```

> 使 mongo 命令来启动服务

```dotnetcli
mongod --config /usr/local/etc/mongod.conf
```

> 启动 mongoDB 的交互式 shell

```sh
mongo
```

### Screenshot

<figure>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/run-mongodb-1571318604.png'/>
  <figcaption>MongoDB CLI</figcaption>
</figure>

<figure>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/mongodb-compass-1572091376.png'/>
  <!-- <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/css-module-in-one-pic.png' width='600px'/> -->
  <figcaption>官方的 MongoDB Compass</figcaption>
</figure>

<!-- <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/mogodb-first-git-1550389054.gif'/> -->

> 使用 mongodb 的 Atlas 云服务

<img src='http://loremxuetengfei.oss-cn-beijing.aliyuncs.com/SS-20210801-142805.jpg'/>

---

1. [Install MongoDB Community Edition on macOS — MongoDB Manual](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
