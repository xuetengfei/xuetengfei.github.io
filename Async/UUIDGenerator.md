UUID 是 通用唯一识别码（Universally Unique Identifier）的缩写，是一种软件建构的标准，亦为开放软件基金会组织在分布式计算环境领域的一部分。其目的，是让分布式系统中的所有元素，都能有唯一的辨识信息，而不需要通过中央控制端来做辨识信息的指定。如此一来，每个人都可以创建不与其它人冲突的 UUID。在这样的情况下，就不需考虑数据库创建时的名称重复问题。简单来说，UUID 就是一个类似 hash 值的计算，给出一个编码。

UUIDGenerator 是一个 generator 函数，它使用当前时间和随机数计算 UUID ，并在每次执行时返回一个新的 UUID 。

```javascript
function* UUIDGenerator() {
  let d, r;
  while (true) {
    yield 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      r = (new Date().getTime() + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }
}
const UUID = UUIDGenerator();

setInterval(() => {
  console.log(UUID.next().value);
}, 300);
```

```
861b9ff5-1062-41ff-967c-bdb81e812d3f
26a146a1-4faf-4ade-8c66-dcb78517c810
3ebd10ab-2f6c-410f-9468-898aa1fb863b
b902cc25-6045-4c6a-b74f-a662bb8f40a5
c4335709-8465-4224-9e98-c9faaf5f67fe
c2fd5656-ba06-4ec5-bd3c-ea72739f692d
61af8f22-18af-47aa-aa18-e864c2041f04
a1bab68c-9ee8-41fd-b7a7-b67ca144a844
7516a5cc-f4ce-4abf-8eea-6373557a738a
8ec1ddb0-d439-4dd9-b242-c77e760def95
b7c6bd5e-2487-4626-8d29-21dc72c8297b
b8ab5f70-e0d3-4101-850c-acc878522089
346e57f1-5ae2-4ccd-a214-f38fe71a1e84
a87d3644-ca51-4b16-8955-1272339d196c
90f0fbc0-660a-4c96-a828-78637aa934d5
```
