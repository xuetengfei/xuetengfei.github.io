负载均衡时，假设现有 3 台服务器（编号分别为 0、1、2），使用哈希取模的计算方式则是：对访问者的 IP，通过固定算式 hash(IP) % N（N 为服务器的个数），使得每个 IP 都可以定位到特定的服务器。

```java
String ip = "10.58.34.31";
int v1 = hash(ip) % 3;
System.out.println("访问服务器：" + v1);// 访问服务器：2

hash = hashFunc(key)
index = hash % arraySize


```

这里有一个问题，数字 3 是硬编码。如果，2 号服务去宕机了，那么计算结果为 2 的 IP 对应的用户都访问异常，比如 10.58.34.31 这个 IP。
服务器集群里面添加、删除一台服务器，都会导致修改这个算法里面的数字 3

一致性哈希算法，有效解决这种分布式存储结构下动态增加或删除节点所带来的问题

---

1. [Consistent Hashing · carlosgaldino](http://blog.carlosgaldino.com/consistent-hashing.html)
2. [How we implemented consistent hashing efficiently - Ably: Serious, serverless realtime infrastructure - Medium](https://medium.com/ably-realtime/how-to-implement-consistent-hashing-efficiently-fe038d59fff2)
3. [分布式系统中一致性哈希算法 - DockOne.io](http://weekly.dockone.io/article/10024)
