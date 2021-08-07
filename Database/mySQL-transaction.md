# 什么是事务

事务（transaction）这个词，它通常被用于 商务贸易或者经济活动中，但是在 RDBMS 中
，事务是对表中数据进行更 新的单位。简单来讲，事务就是 需要在同一个处理单元中执行
的一系列更 新处理的集合 。

对表进行更新需要使用 INSERT 、 DELETE 或者 UPDATE 三种语句。但通常情况下，更新处
理并不是执行一次就结束了， 而是需要执行一系列连续的操作。这时，事务就能体现出它
的价值了。

现在，请大家把自己想象为管理 Product （商品）表的程序员或者 软件工程师。销售部门
的领导对你提出了如下要求。

“某某，经会议讨论，我们决定把运动 T 恤的销售单价下调 1000 日元， 同时把 T 恤衫的
销售单价上浮 1000 日元，麻烦你去更新一下数据库。”

由于大家已经学习了更新数据的方法 —— 只需要使用 UPDATE 进行 更新就可以了，所以肯
定会直接回答“知道了，请您放心吧”。 此时的事务由如下两条更新处理所组成。

● 更新商品信息的事务

① 将运动 T 恤的销售单价降低 1000 日元

```sql
UPDATE Product
SET sale_price = sale_price - 1000
WHERE product_name = '运动T恤';
```

② 将 T 恤衫的销售单价上浮 1000 日元

```sql
UPDATE Product
SET sale_price = sale_price + 1000
WHERE product_name = 'T恤衫';
```

上述 ① 和 ② 的操作一定要作为同一个处理单元执行。如果只执行了 ① 的操作而忘记了执
行 ② 的操作，或者反过来只执行了 ② 的操作而忘记了执 行 ① 的操作，一定会受到领导的
严厉批评。遇到这种需要在同一个处理单 元中执行一系列更新操作的情况，一定要使用事
务来进行处理。

```mysql
START TRANSACTION;
    UPDATE Product
    SET sale_price = sale_price - 1000
    WHERE product_name = '运动T恤';

    UPDATE Product
    SET sale_price = sale_price + 1000
    WHERE product_name = 'T恤衫';
COMMIT;
```
