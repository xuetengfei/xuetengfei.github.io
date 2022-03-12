[JS 刷题总结*笔经面经*牛客网](https://www.nowcoder.com/discuss/72658)

```bash
// 求数组一半长度
halfLen = a.length >> 1;

// 不过需要注意右移运算符>>优先级别加号+还低，例如
console.log(3 + (5 - 3 >> 1)); // 2
console.log(3 + ~~((5 - 3) / 2)); // 4

// 因此在于其他操作符号想结合时候可以适当增加括号,例如求中位
mid = left + (right - left >> 1);
mid = left + ~~((right - left) / 2);
// 不建议使用mid = (left + right)>>1;，因为加号操作可能造成溢出

// ~~等价于Math.floor(),|0也等价于Math.floor()
halfLen = ~~(a.length / 2);
halfLen = a.length / 2 | 0;

// 判断奇偶
evenNum & 1 === 0; // 偶数
oddNum & 1 === 1; // 奇数

// 善用异或
5 ^ 5; // 0
5 ^ 5 ^ 6 ^ 6 ^ 7; // 7

// 判断数是否是2的幂次方
num & num - 1 === 0;

// 翻转数的第K位
num ^= 1 << k;

// 将第K位设为0
num &= ~(1 << k);

// 将第K位设为1
num |= 1 << K;

// 判断第K位是否为0
num & 1 << k === 0;

```
