使用移动硬盘储存文件，如果只有一个 1T 移动硬盘，容量不够用了怎么办？有两种解决方
案。

第一种方案：升级设备，既再买一个更大容量的移动硬盘。 1T 移动硬盘升级到 2T 移动硬
盘,相当于更新了设备。这个就是叫垂直缩放。

第二种方案：使用 NAS 这类的东西。把多个移动硬盘，组成一个 NAS 系统，容量不够用的
话，再买一个小的移动硬盘，插入 NAS 系统。这就是水平扩展。

---

水平扩展是指通过向资源池中添加的更多的机器，垂直扩展指的是向已存在的机器中添加更
大的功率（CPU，RAM）。

比如下面这张图，服务器机架上的机器。

我们是在水平方向的添加更多的机器，在垂直的方向上添加更多的资源。

![scaling-horizontally-and-vertically.png](https://blog-1252349778.cos.ap-beijing.myqcloud.com/2018/scaling-horizontally-and-vertically.png)

---

虽然术语“可伸缩性”可以指任何系统处理不断增长的工作的能力，但当我们讨论是否进行纵
向扩展和横向扩展时，我们经常指的是数据库和数据（大量数据）。

对于应用开发人员而言，数据库可伸缩性是最重要的。假设一个新的应用推出，全球范围内
对它的需求从少数用户增长到数百万用户。帮助应用开发人员跟上需求并最大限度地减少停
机时间的最重要能力之一是高效缩放的能力。

---

相关链接:

1. [数据库水平和垂直缩放之间的差异 - Thinbug](https://stackoverflow.com/questions/11707879/difference-between-scaling-horizontally-and-vertically-for-databases)
2. [可扩展性 - 维基百科](https://en.wikipedia.org/wiki/Scalability#Horizontal_and_vertical_scaling)
3. [横向扩展与纵向扩展 | Microsoft Azure](https://azure.microsoft.com/zh-cn/overview/scaling-out-vs-scaling-up/#solutions)
