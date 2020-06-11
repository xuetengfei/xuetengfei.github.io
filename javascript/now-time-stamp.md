## dayJS

---

0. [iamkun/dayjs: ⏰ Day.js 2KB immutable date library alternative to Moment.js with the same modern API](https://github.com/iamkun/dayjs)
1. [dayjs/API-reference.md at dev · iamkun/dayjs](https://github.com/iamkun/dayjs/blob/dev/docs/zh-cn/API-reference.md)

---

```javascript
// 第一种方式:获取当前时间戳
var timestamp2 = Date.parse(new Date()) / 1000;
console.log(timestamp2); // 1540321846

// 第二种方式:获取当前时间戳
const a = Math.round(new Date().getTime() / 1000);
console.log(a); //  1540321847

// 获取某个时间格式的时间戳
var stringTime = '2014-07-10 10:21:12';
var timestamp2 = Date.parse(new Date(stringTime)) / 1000;
console.log(timestamp2); // 1404958872
```

格式化

```javascript
function formatDate(now) {
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
}

var d = new Date();
console.log(d); // 2018-10-23T19:19:41.095Z
console.log(formatDate(d)); // 2018-10-24 3:19:41
```

---

1. [JavaScript Date 对象](http://www.w3school.com.cn/jsref/jsref_obj_date.asp)
