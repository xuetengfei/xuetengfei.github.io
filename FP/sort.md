## sort

`Array.prototype.sort()` 的方法很不错，可以用这个方法来给数组排序。`.sort()` 只接收一个参数(即一个用于比较两个元素的函数）。如果第一个元素在第二个元素的前面，结果返回的是负值。反之，则返回正值。

排序听起来非常简单，然而当需要给比一般数字数组复杂得多的数组排序时，可能就不那么简单了。下面例子里，有一个对象的数组，里面存的是以磅（lbs）或千克（kg）为单位的体重，需要对体重进行升序排列。

```javascript
// 比较函数的定义
var sortByWeight = function(x, y) {
  var xW = x.measurement == 'kg' ? x.weight : x.weight * 0.453592;
  var yW = y.measurement == 'kg' ? y.weight : y.weight * 0.453592;
  return xW > yW ? 1 : -1;
};

// 两组数据有细微差别
// 要根据体重来对它们进行排序
var firstList = [
  { name: 'John', weight: 220, measurement: 'lbs' },
  { name: 'Kate', weight: 58, measurement: 'kg' },
  { name: 'Mike', weight: 137, measurement: 'lbs' },
  { name: 'Sophie', weight: 66, measurement: 'kg' },
];
var secondList = [
  { name: 'Margaret', weight: 161, measurement: 'lbs', age: 51 },
  { name: 'Bill', weight: 76, measurement: 'kg', age: 62 },
  { name: 'Jonathan', weight: 72, measurement: 'kg', age: 43 },
  { name: 'Richard', weight: 74, measurement: 'kg', age: 29 },
];

// 用开头定义的函数,对两组数据进行排序
firstList.sort(sortByWeight); // Kate, Mike, Sophie, John
secondList.sort(sortByWeight); // Jonathan, Margaret, Richard, Bill
```

#### Filter

```javascript
// 一群人的数组
var myFriends = [
  { name: 'John', gender: 'male' },
  { name: 'Kate', gender: 'female' },
  { name: 'Mike', gender: 'male' },
  { name: 'Sophie', gender: 'female' },
  { name: 'Richard', gender: 'male' },
  { name: 'Keith', gender: 'male' },
];

// 基于性别的简易过滤器
var isMale = function(x) {
  return x.gender == 'male';
};

myFriends.filter(isMale); // John, Mike, Richard, Keith
```

```javascript
// 一组关于分数的数组
// 不是每一项都标注了人名
var highScores = [
  { score: 237, name: 'Jim' },
  { score: 108, name: 'Kit' },
  { score: 91, name: 'Rob' },
  { score: 0 },
  { score: 0 },
];

// 这些简单且能重复使用的函数
// 是用来查看每一项是否有名字
// 以及分数是否为正数
var hasName = function(x) {
  return typeof x['name'] !== 'undefined';
};
var hasNotName = function(x) {
  return !hasName(x);
};
var nonZeroHighScore = function(x) {
  return x.score != 0;
};

// 填充空白的名字，直到所有空白的名字都有“---”
while (!highScores.every(hasName)) {
  var highScore = highScores.find(hasNotName);
  highScore.name = '---';
  var highScoreIndex = highScores.findIndex(hasNotName);
  highScores[highScoreIndex] = highScore;
}

// 检查非零的分数是否存在
// 并在 console 里输出
if (highScores.some(nonZeroHighScore))
  console.log(highScores.filter(nonZeroHighScore));
else console.log('No non-zero high scores!');
```

#### reduce

```javascript
// 一个带有标签的文章的数组
var articles = [
  {
    title: 'Introduction to Javascript Scope',
    tags: ['Javascript', 'Variables', 'Scope'],
  },
  {
    title: 'Javascript Closures',
    tags: ['Javascript', 'Variables', 'Closures'],
  },
  { title: 'A Guide to PWAs', tags: ['Javascript', 'PWA'] },
  {
    title: 'Javascript Functional Programming Examples',
    tags: ['Javascript', 'Functional', 'Function'],
  },
  {
    title: 'Why Javascript Closures are Important',
    tags: ['Javascript', 'Variables', 'Closures'],
  },
];

// 一个能够将文章数组降为标签数组的函数
//
var tagView = function(accumulator, x) {
  // 针对文章的标签数组（原数组）里的每一个标签
  x.tags.forEach(function(currentTag) {
    // 写一个函数看看标签是否匹配
    var findCurrentTag = function(y) {
      return y.tag == currentTag;
    };
    // 检查是否该标签已经出现在累积器数组
    if (accumulator.some(findCurrentTag)) {
      // 找到标签并获得索引
      var existingTag = accumulator.find(findCurrentTag);
      var existingTagIndex = accumulator.findIndex(findCurrentTag);
      // 更新使用该标签的文章数目，以及文章标题的列表
      accumulator[existingTagIndex].count += 1;
      accumulator[existingTagIndex].articles.push(x.title);
    }
    // 否则就在累积器数组中增添标签
    else {
      accumulator.push({ tag: currentTag, count: 1, articles: [x.title] });
    }
  });
  // 返回累积器数组
  return accumulator;
};

// 转化原数组
articles.reduce(tagView, []);
// 输出:
/*
[
 {tag: "Javascript", count: 5, articles: [
    "Introduction to Javascript Scope", 
    "Javascript Closures",
    "A Guide to PWAs", 
    "Javascript Functional Programming Examples",
    "Why Javascript Closures are Important"
 ]},
 {tag: "Variables", count: 3, articles: [
    "Introduction to Javascript Scope", 
    "Javascript Closures",
    "Why Javascript Closures are Important"
 ]},
 {tag: "Scope", count: 1, articles: [ 
    "Introduction to Javascript Scope" 
 ]},
 {tag: "Closures", count: 2, articles: [
    "Javascript Closures",
    "Why Javascript Closures are Important"
 ]},
 {tag: "PWA", count: 1, articles: [
    "A Guide to PWAs"
 ]},
 {tag: "Functional", count: 1, articles: [
    "Javascript Functional Programming Examples"
 ]},
 {tag: "Function", count: 1, articles: [
    "Javascript Functional Programming Examples"
 ]}
]
*/
```

## Handle Data

#### Raw Data

```javascript
const data = {
  code: '1',
  data: [
    {
      billId: '2353',
      billStatus: '4',
      withholdDateStr: '2018/10/15',
      withholdDateYear: '2018',
      withholdMoney: '1788.78',
    },
    {
      billId: '2354',
      billStatus: '1',
      withholdDateStr: '2018/11/15',
      withholdDateYear: '2018',
      withholdMoney: '1788.78',
    },
    {
      billId: '2355',
      billStatus: '1',
      withholdDateStr: '2018/12/15',
      withholdDateYear: '2018',
      withholdMoney: '1788.78',
    },
    {
      billId: '2356',
      billStatus: '1',
      withholdDateStr: '2019/01/15',
      withholdDateYear: '2019',
      withholdMoney: '1788.78',
    },
    {
      billId: '2362',
      billStatus: '1',
      withholdDateStr: '2019/07/15',
      withholdDateYear: '2019',
      withholdMoney: '1788.78',
    },
    {
      billId: '2366',
      billStatus: '1',
      withholdDateStr: '2019/11/15',
      withholdDateYear: '2019',
      withholdMoney: '1788.78',
    },
    {
      billId: '2367',
      billStatus: '1',
      withholdDateStr: '2019/12/15',
      withholdDateYear: '2019',
      withholdMoney: '1788.78',
    },
    {
      billId: '2368',
      billStatus: '1',
      withholdDateStr: '2020/01/15',
      withholdDateYear: '2020',
      withholdMoney: '1788.78',
    },
  ],
};
```

#### FP Handle

```javascript
const pipe = fns => fns.reduce((f, g) => (...args) => g(f(...args)));

const rename = arr =>
  arr.map(v => ({
    id: v.billId,
    year: Number(v.withholdDateYear),
    date: v.withholdDateStr,
    money: v.withholdMoney,
  }));

const calcYearList = arr =>
  [...new Set(arr.map(v => v.year))].sort((a, b) => a - b);

const calcValues = (arr, v) => arr.filter(s => s.year == v);

const compose = arr => {
  const result = {};
  calcYearList(arr).forEach(v => {
    result[v] = calcValues(arr, v);
  });
  return result;
};

const result = pipe([rename, compose])(data.data);

console.log(result);
```

#### Produce

```javascript
{
  '2018': [
    { id: '2353', year: 2018, date: '2018/10/15', money: '1788.78' },
    { id: '2354', year: 2018, date: '2018/11/15', money: '1788.78' },
    { id: '2355', year: 2018, date: '2018/12/15', money: '1788.78' },
  ],
  '2019': [
    { id: '2356', year: 2019, date: '2019/01/15', money: '1788.78' },
    { id: '2362', year: 2019, date: '2019/07/15', money: '1788.78' },
    { id: '2366', year: 2019, date: '2019/11/15', money: '1788.78' },
    { id: '2367', year: 2019, date: '2019/12/15', money: '1788.78' },
  ],
  '2020': [{ id: '2368', year: 2020, date: '2020/01/15', money: '1788.78' }],
};
```
