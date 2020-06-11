# 联合类型 Union Types

表示取值可以为多种类型中的一种。联合类型使用 | 分隔每个类型。

```javascript
/* ts */
let _variable: string | number;
_variable = 'seven';
_variable = 7;

/* compile to js */
var _variable;
_variable = 'seven';
_variable = 7;
```

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，只能访问此联合类型的所有类型里共有的属性或方法。可以使用 `<TypeName>variable`或者`as`做进行类型断言

```javascript
/* ts */
function getLength(something: string | number) {
  if ((something as string).length) {
    return (<string>something).toLocaleUpperCase();
  } else {
    return something as number;
  }
}

console.log(getLength('qwe'));
console.log(getLength(123));

/* compile to js */
function getLength(something) {
    if (something.length) {
        return something.toLocaleUpperCase();
    }
    else {
        return something;
    }
}
console.log(getLength('qwe'));
console.log(getLength(123));

```
