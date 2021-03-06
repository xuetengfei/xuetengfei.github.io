算法复杂度分为时间复杂度和空间复杂度,（算法的复杂性体现在运行该算法时的计算机所需资源的多少上，计算机资源最重要的是时间和空间（即寄存器）资源，因此复杂度分为时间和空间复杂度）。

- 时间复杂度是指执行算法所需要的计算工作量；
- 而空间复杂度是指执行这个算法所需要的内存空间。

## 时间复杂度

O(f(n)) :为算法的渐进时间复杂度，简称时间复杂度。

f(n):算法中基本操作重复执行的次数个函数,f(n) 越小，算法的时间复杂度越低，算法的效率越高。

先从简单直观的 O(1) 和 O(n) 复杂度说起。

- O(1) 表示一次操作即可直接取得目标元素（比如字典或哈希表）
- O(n) 意味着先要检查 n 个元素来搜索目标
- O(log n):二分搜索一定有某种行为使其时间复杂度为 log n

https://github.com/xitu/gold-miner/blob/master/TODO/what-does-the-time-complexity-o-log-n-actually-mean.md

## 空间复杂度

S(n):定义为该算法所耗费的存储空间，它也是问题规模 n 的函数。
