想把两个变量,组合成键值对

```javascript
const key = 'name';
const val = 'tom';

// ==>

{
    name:'tom
}
```

es6 的写法

```
{[key]:val}
```

这里的`[ ]`是关键,里面可以是任何有效的`变量`或者`表达式`

示例代码

```javascript
{
    [1+2]:3
}
// { '3': 3 }
```

```javascript
{
    [(()=>'name')()]:'tom'
}
// { name: 'tom' }
```

```javascript
const name = 'xuetengfei' + '_';
let a = {
  [name + 'age']: 25,
};

a[name + 'sex'] = 'male';

console.log(a);

// { xuetengfei_age: 25, xuetengfei_sex: 'male' }
```
