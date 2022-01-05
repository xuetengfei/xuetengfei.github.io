所谓哈希（hash），就是将不同的输入映射成独一无二的、固定长度的值（又称"哈希值"）。它是最常见的软件运算之一。

如果不同的输入得到了同一个哈希值，就发生了"哈希碰撞"（collision）

举例来说，很多网络服务会使用哈希函数，产生一个 token，标识用户的身份和权限。

```javascript
AFGG2piXh0ht6dmXUxqv4nA1PU120r0yMAQhuc13i8;
```

上面这个字符串就是一个哈希值。如果两个不同的用户，得到了同样的 token，就发生了哈希碰撞。服务器将把这两个用户视为同一个人，这意味着，用户 B 可以读取和更改用户 A 的信息，这无疑带来了很大的安全隐患。黑客攻击的一种方法，就是设法制造"哈希碰撞"，然后入侵系统，窃取信息。

一个班级，如果至少两个同学生日相同的概率不超过 5%，那么这个班只能有 7 个人。事实上，一个 23 人的班级有 50%的概率，至少两个同学生日相同；50 人班级有 97%的概率，70 人的班级则是 99.9%的概率。

16 个二进制位的哈希值，产生碰撞的可能性是 65536 分之一。也就是说，如果有 65537 个用户，就一定会产生碰撞。哈希值的长度扩大到 32 个二进制位，碰撞的可能性就会下降到 4,294,967,296 分之一。

更长的哈希值意味着更大的存储空间、更多的计算，将影响性能和成本。开发者必须做出抉择，在安全与成本之间找到平衡。在满足安全要求的前提下，找出哈希值的最短长度。

[哈希碰撞与生日攻击 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2018/09/hash-collision-and-birthday-attack.html)