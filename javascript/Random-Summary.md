## 随机数构成的数组

```javascript
/**
 * 由随机数组成的数组：长度和随机数范围可自定义
 * @param {number} length 数组的长度
 * @param {number} limit 随机数的范围
 */
const genNumArr = (length, limit) => {
  // Array.from第二个参数 类似数组的map方法，对每个元素进行处理，将处理后的值放入返回的数组
  return Array.from({ length }, () => Math.floor(Math.random() * limit));
};
console.log(genNumArr(20, 10));
// 数组长度为20，每个元素的范围在0-9之间
// > [ 8, 1, 0, 8, 5, 7, 7, 4, 3, 7, 4, 1, 5, 7, 6, 9, 4, 2, 3, 0 ]
```

## Shuffle array (随机排列数组)

```javascript
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const shuffle = arr => arr.sort(() => Math.random() - 0.5);
console.log(shuffle(arr)); // [ 1, 5, 2, 3, 6, 4, 7, 9, 0, 8 ]
```

## 定时随机打印数组元素

```javascript
var array = ['apple', 'fox', 'cat', 'mima', 'lorem', 'vued', 'heko', 'arxk'];
setInterval(function() {
  console.log(array[Math.floor(Math.random() * 10)]);
}, 500);
```

## 设置条件生成一个随机数

```javascript
// 随机整数

const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

console.log(randomIntegerInRange(0, 5)); // 3
```

```javascript
// 随机数

const randomInRange = (min, max) => Math.random() * (max - min) + min;

console.log(randomInRange(1, 10)); // 6.295866359219117
```

```javascript
// 指定长度的随机数
const randomInRange = (min, max, length) =>
  String(Math.random() * (max - min) + min).substr(0, length + 1);

console.log(randomInRange(1, 10, 5)); //8.0744
```

## 数组取样，随机获取数组中的 1 个元素

使用 Math.random() 生成一个随机数，乘以 length，并使用 Math.floor() 舍去小数获得到最接近的整数。这个方法也适用于字符串。

```javascript
const sample = arr => arr[Math.floor(Math.random() * arr.length)];
// sample([3, 7, 9, 11]) -> 9
```

## 使用 JS 生成随机字符串-1

```javascript
Math.random()
  .toString(36)
  .substring(2);
```

`Math.random()` 返回 0 到 1 的随机数，长度也是随机的。机数转变成三十六进制，实际就相当于变成了数字+字母的随机字符串。类似于`'0.dyphg9qcxd5'` ，取小数点后的字符串就完成了。

```javascript
const randomString = (length = 10) => {
  let num = length - 10 > 0 ? Math.ceil((length - 10) / 10) : 1;
  let str = '';
  for (let i = 0; i < num; i++) {
    str += Math.random()
      .toString(36)
      .substring(2);
  }
  return str.substring(0, length);
};

log(randomString()); // lp0sd7rtlh
log(randomString(6)); // z0m3fp
log(randomString(200)); // 05oti5...n...xsynift9
```

## 随机生成指定长度的字符串-2

```javascript
function strFn(n) {
  let str = 'abcdefghijklmnopqrstuvwxyz9876543210!@## $%^&*()"><?';
  let tmp = '',
    len = str.length;
  for (i = 0; i < n; i++) {
    tmp += str.charAt(Math.floor(Math.random() * len));
  }
  return tmp;
}

let str81 = strFn(10);
console.log(str81); // d!7m1ivhmy
```

## 生成随机姓名

```javascript
function getName() {
  var familyNames = new Array(
    '赵',
    '钱',
    '孙',
    '李',
    '周',
    '吴',
    '郑',
    '王',
    '冯',
    '陈',
    '褚',
    '卫',
    '蒋',
    '沈',
    '韩',
    '杨',
    '朱',
    '秦',
    '尤',
    '许',
    '何',
    '吕',
    '施',
    '张',
    '孔',
    '曹',
    '严',
    '华',
    '金',
    '魏',
    '陶',
    '姜',
    '戚',
    '谢',
    '邹',
    '喻',
    '柏',
    '水',
    '窦',
    '章',
    '云',
    '苏',
    '潘',
    '葛',
    '奚',
    '范',
    '彭',
    '郎',
    '鲁',
    '韦',
    '昌',
    '马',
    '苗',
    '凤',
    '花',
    '方',
    '俞',
    '任',
    '袁',
    '柳',
    '酆',
    '鲍',
    '史',
    '唐',
    '费',
    '廉',
    '岑',
    '薛',
    '雷',
    '贺',
    '倪',
    '汤',
    '滕',
    '殷',
    '罗',
    '毕',
    '郝',
    '邬',
    '安',
    '常',
    '乐',
    '于',
    '时',
    '傅',
    '皮',
    '卞',
    '齐',
    '康',
    '伍',
    '余',
    '元',
    '卜',
    '顾',
    '孟',
    '平',
    '黄',
    '和',
    '穆',
    '萧',
    '尹',
  );
  var givenNames = new Array(
    '子璇',
    '淼',
    '国栋',
    '夫子',
    '瑞堂',
    '甜',
    '敏',
    '尚',
    '国贤',
    '贺祥',
    '晨涛',
    '昊轩',
    '易轩',
    '益辰',
    '益帆',
    '益冉',
    '瑾春',
    '瑾昆',
    '春齐',
    '杨',
    '文昊',
    '东东',
    '雄霖',
    '浩晨',
    '熙涵',
    '溶溶',
    '冰枫',
    '欣欣',
    '宜豪',
    '欣慧',
    '建政',
    '美欣',
    '淑慧',
    '文轩',
    '文杰',
    '欣源',
    '忠林',
    '榕润',
    '欣汝',
    '慧嘉',
    '新建',
    '建林',
    '亦菲',
    '林',
    '冰洁',
    '佳欣',
    '涵涵',
    '禹辰',
    '淳美',
    '泽惠',
    '伟洋',
    '涵越',
    '润丽',
    '翔',
    '淑华',
    '晶莹',
    '凌晶',
    '苒溪',
    '雨涵',
    '嘉怡',
    '佳毅',
    '子辰',
    '佳琪',
    '紫轩',
    '瑞辰',
    '昕蕊',
    '萌',
    '明远',
    '欣宜',
    '泽远',
    '欣怡',
    '佳怡',
    '佳惠',
    '晨茜',
    '晨璐',
    '运昊',
    '汝鑫',
    '淑君',
    '晶滢',
    '润莎',
    '榕汕',
    '佳钰',
    '佳玉',
    '晓庆',
    '一鸣',
    '语晨',
    '添池',
    '添昊',
    '雨泽',
    '雅晗',
    '雅涵',
    '清妍',
    '诗悦',
    '嘉乐',
    '晨涵',
    '天赫',
    '玥傲',
    '佳昊',
    '天昊',
    '萌萌',
    '若萌',
  );

  var i = parseInt(10 * Math.random()) * 10 + parseInt(10 * Math.random());
  var familyName = familyNames[i];
  var j = parseInt(10 * Math.random()) * 10 + parseInt(10 * Math.random());
  var givenName = givenNames[i];
  var name = familyName + givenName;

  return `${name}(假)`;
}

console.log(getName());

// > 范佳欣(假)
```

## 随机汉字

```javascript
function tohanzi() {
  let data = '\\u' + (Math.round(Math.random() * 20901) + 19968).toString(16);
  data = data.split('\\u');
  var str = '';
  for (var i = 0; i < data.length; i++) {
    str += String.fromCharCode(parseInt(data[i], 16).toString(10));
  }
  return str;
}

console.log(tohanzi()); // > 媌 抬 ...
```

## 也是随机字符串,哈哈

```javascript
const ff = (number = 3) => {
  let name = [];
  const str =
    '习近平强调中俄双方要深化共建一带一路和欧亚经济联盟对接合作扩大能源农业科技创新金融等领域合作推动重点项目稳步实施加强前沿科学技术共同研发利用好今明两年中俄地方合作交流年契机调动两国更多地方积极性开展更加广泛合作习近平指出相互支持对方举办大型活动是中俄双方的好传统东方经济论坛是总统先生亲自倡议举办已成为各方凝聚智慧共商地区合作的重要平台相信这届论坛将为双方深化包括远东合作在内的地方合作带来新契机习近平强调中俄同为联合国安理会常任理事国和主要新兴市场国家肩负维护世界和平稳定促进发展繁荣的重任中俄要在联合国上海合作组织金砖国家等多边框架内密切沟通和配合同国际社会一道推动热点问题政治解决进程携手维护国际公平正义和世界和平稳定坚定不移维护联合国宪章宗旨和原则共同反对单边主义和贸易保护主义推动构建新型国际关系和人类命运共同体';
  const sample = arr => arr[Math.floor(Math.random() * arr.length)];
  for (let i = 0; i < number; i++) {
    name.push(sample(str));
  }
  return name.join('');
};

console.log(ff()); // 携坛为
```

## 随机生成颜色

```javascript
var getRandomColor = function() {
  return '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6);
};

// #bc9ee3
```
