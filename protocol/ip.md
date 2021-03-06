## IP 协议

规定网络地址的协议，叫做 IP 协议。它所定义的地址，就被称为 IP 地址。目前，广泛采用的是 IP 协议第四版，简称 IPv4。IPv4 这个版本规定，网络地址由 32 个二进制位组成。习惯上，用分成四段的十进制数表示 IP 地址，从 0.0.0.0 一直到 255.255.255.255。

```
172.16.254.1   >>>   10101100.00010000.11111110.00000001
```

## IP 地址

互联网上的每一台计算机，都会分配到一个 IP 地址。这个地址分成两个部分，前一部分代表网络，后一部分代表主机。比如，IP 地址 172.16.254.1，这是一个 32 位的地址，假定它的网络部分是前 24 位（172.16.254），那么主机部分就是后 8 位（最后的那个 1）。处于同一个子网络的电脑，它们 IP 地址的网络部分必定是相同的，也就是说 172.16.254.2 应该与 172.16.254.1 处在同一个子网络。

但是，问题在于单单从 IP 地址，我们无法判断网络部分。还是以 172.16.254.1 为例，它的网络部分，到底是前 24 位，还是前 16 位，甚至前 28 位，从 IP 地址上是看不出来的。

那么，怎样才能从 IP 地址，判断两台计算机是否属于同一个子网络呢？这就要用到另一个参数"子网掩码"（subnet mask）。

## 子网掩码

所谓"子网掩码"，就是表示子网络特征的一个参数。它在形式上等同于 IP 地址，也是一个 32 位二进制数字，它的网络部分全部为 1，主机部分全部为 0。比如，IP 地址 172.16.254.1，如果已知网络部分是前 24 位，主机部分是后 8 位，那么子网络掩码就是 11111111.11111111.11111111.00000000，写成十进制就是 255.255.255.0。

知道"子网掩码"，我们就能判断，任意两个 IP 地址是否处在同一个子网络。方法是将两个 IP 地址与子网掩码分别进行 AND 运算（两个数位都为 1，运算结果为 1，否则为 0），然后比较结果是否相同，如果是的话，就表明它们在同一个子网络中，否则就不是。

比如，已知 IP 地址 172.16.254.1 和 172.16.254.233 的子网掩码都是 255.255.255.0，请问它们是否在同一个子网络？两者与子网掩码分别进行 AND 运算，结果都是 172.16.254.0，因此它们在同一个子网络。

总结一下，IP 协议的作用主要有两个，一个是为每一台计算机分配 IP 地址，另一个是确定哪些地址在同一个子网络。

<!--
[网络编程懒人入门(一)：快速理解网络通信协议（上篇）-网络编程/专项技术区 - 即时通讯开发者社区!](http://www.52im.net/forum.php?mod=viewthread&tid=1095#lastpost)
 -->
