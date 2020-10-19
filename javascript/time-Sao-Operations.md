> 1.创建过去七天的数组，如果将代码中的减号换成加号，你将得到未来 7 天的数组集合

```javascript
// 创建过去七天的数组
[...Array(7).keys()].map(days => new Date(Date.now() - 86400000 * days));
```

```javascript
[
Fri May 03 2019 13:30:09 GMT+0800 (中国标准时间),
Thu May 02 2019 13:30:09 GMT+0800 (中国标准时间),
Wed May 01 2019 13:30:09 GMT+0800 (中国标准时间),
Tue Apr 30 2019 13:30:09 GMT+0800 (中国标准时间),
Mon Apr 29 2019 13:30:09 GMT+0800 (中国标准时间),
Sun Apr 28 2019 13:30:09 GMT+0800 (中国标准时间),
Sat Apr 27 2019 13:30:09 GMT+0800 (中国标准时间)
]
```


> 2.date-object-tips

```javascript
// 计算2016年7月份有多少天?
const days = new Date(2015, 7, 0).getDate();
// js的月份从0开始,我们其实求的是8月0号，就会得到7月31号
console.log('days', days); // 31

// 比如计算2015年7月20号,再过20天的日期?
const After_20Days = new Date(2015, 6, 20 + 20);
// 日期超过了31号，js会自动计算到下个月
console.log(new Date(After_20Days).toLocaleDateString()); // 2015-8-9
```
