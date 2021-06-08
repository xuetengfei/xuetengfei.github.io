# Enum

Enum:枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天。

## 普通枚举

枚举项有两种类型：常数项（constant member）和计算所得项（computed member）。

```js
/* ts */

enum Days {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

const oneDay: Days = Days.Sun;
console.log(Days['Sun'] === 0); // true
console.log(Days[0] === 'Sun'); // true

/* compile to js */
var Days;
(function (Days) {
    Days[Days["Sun"] = 0] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["Thu"] = 4] = "Thu";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sat"] = 6] = "Sat";
})(Days || (Days = {}));
var oneDay = Days.Sun;
console.log(Days['Sun'] === 0); // true
console.log(Days[0] === 'Sun'); // true
```

## 常数枚举

在编译阶段被删除，并且不能包含计算成员。

```js
/* ts */
// 手动赋值:默认情况下，枚举值，从 0 开始为元素编号，递增加一。 也可以手动的指定成员的数值。
const enum Color {
  Red = 1,
  Yellow = 3,
  Green = 4,
}

let someColor: Color = Color.Green;
console.log('someColor: ', someColor);

/* compile to js */
var someColor = 4 /* Green */;
console.log('someColor: ', someColor);
```
