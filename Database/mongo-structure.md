# Mongo Structure

<figure>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/SQL-MongoDB Correspondence-1588431511.png'/>
  <figcaption>MongoDB 体系结构</figcaption>
</figure>

### MongoDB 数据库文件

在 MongoDB 中，多个文档(document)组成集合(collection)，而多个集合可以组成数据库
(database)。一个 MongoDB 实例可以承载多个数据库，每个数据库拥有若干个集合。每个
数据库都有独立的权限，即便是在磁盘上，不同的数据库也放置在不同的文件中。按照经验
，我们将有关一个应用程序的所有数据都存储在同一个数据库中。要想在同一个 MongoDB
服务器上存放多个应用程序或者用户的数据，就需要使用不同的数据库。

数据库通过名称来标识，这点与集合类似。数据库名可以是满足以下条件的任意 UTF-8 字
符串。要记住一点，数据库最终会变成文件系统里面的文件，而数据库名就是相应的文件名
。MongoDB 默认情况下使用默认数据库文件目录，如果该目录不存在或者没有读写的权限，
服务就会失败。

MongoDB 默认情况下使用默认数据库文件目录

### MongoDB shell

```
$ mongo
MongoDB shell version: 2.4.0 connecting to: test
>
```

### 开发者应该掌握 MongoDB 的哪些知识

学习前，我们需要明白自身定位：专业 DBA 或者日常开发使用。

1. MongoDB 在各个平台的安装方法
2. MongoDB 数据库和集合的基本操作
3. MongoDB 文档 CRUD 操作，包括能够丰富 CRUD 的投影和修饰符等
4. MongoDB 流式聚合操作，这能够在数据库层面轻松完成复杂数据的处理，而不是用编程
   语言来处理
5. MongoDB 的数据模型，虽然它可以存储不规则的文档，但有些情况下定义数据模型可以
   提高查询效率

   进阶学习

6. MongoDB 执行计划和索引，执行计划可以让我们清楚的了解到查询语句的效率，而索引
   则是优化查询效率的常用手段
7. MongoDB 的复制集，这是提高 MongoDB 可用性，保证数据服务不停机的最佳手段
8. MongoDB 的分片，分片能够在数据量变得庞大之后保证效率
9. MongoDB 的事务，如果将 MongoDB 用于 WEB 网站，那么事务是你必须学习的知识
10. MongoDB 数据库备份和还原，有了复制集后，备份就显得不是那么重要了，但并不是没
    有这个需求。而且 MongoDB 的备份可以精细到文档，这就非常有意义了。

---

<!-- [如何学好 MongoDB | 静觅](https://cuiqingcai.com/7121.html) -->

<!-- ### 学习的选择和困境 -->
<!--
有一定工作经验的开发者，大多数情况下都会选择自学。有些在网上搜索对应的文章，有些则直接翻阅官方文档。我推荐的方式是翻阅官方文档，在遇到难以理解的观点时通过搜索引擎查找网友分享的文章。

自学的优点很多，缺点也很明显。例如：

断断续续的学习，难以保持专注导致知识吸收不好
耗费时间很长，虽然知道应该学习哪些方面的知识，但文档并不是按你所想而规划的，所以翻阅文档要费很多功夫
知识不成体系，东看看西看看，没有归纳容易忘记
学习就需要记笔记，这又是一件很费时间的事情
官方文档有些观点难以理解，卡在半路很难受
零星学了一两个月，也不确定学会了没有，内心毫无把握
如果不自学，就得找一些成体系的课程来帮助自己快速进步，少走弯路。知识付费时代，在条件允许的情况下适当地投入也是很好的选择。但面对动辄几百块的视频课程，不少开发者还是感觉略有压力，毕竟我们搬砖的经济压力也非常大。培训班就更不用说了，很少有专业教授单个数据库知识的，而且费用比视频课程更贵。 -->

1. [Introduction to MongoDB — MongoDB Manual](https://docs.mongodb.com/manual/introduction/)
2. [Query Documents — MongoDB Manual](https://docs.mongodb.com/manual/tutorial/query-documents/)
3. [mongo Shell Quick Reference — MongoDB Manual](https://docs.mongodb.com/manual/reference/mongo-shell/#mongo-shell-quick-reference)
