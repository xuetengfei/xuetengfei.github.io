1. [TypeScript](https://www.typescriptlang.org/)
2. [Online TypeScript Playground](https://www.typescriptlang.org/play/index.html)
3. [前言 - TypeScript 入门教程](https://ts.xcatliu.com/)

---

?> What is a TypeScript

TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持，它由 Microsoft 开发，代码开源于 GitHub 上。
TypeScript 只是 JavaScript 的一个附加层，在开始使用它之前，不需要知道 TypeScript 附带的每一个语法。

?> Install the TypeScript compiler

**npm install -g typescript**,会在全局环境下安装 **tsc** 命令。编译一个 TypeScript 文件很简单：**tsc hello.ts**。
约定使用 TypeScript 编写的文件以 **.ts** 为后缀，用 TypeScript 编写 React 时，以 **.tsx** 为后缀

?> Create a **tsconfig.json** file

**tsconfig.json**文件用于配置 TypeScript 项目设置。 **tsconfig.json**文件应放在项目的根目录中。 该文件允许使用不同的选项配置 TypeScript 编译器。
[Compiler Options · TypeScript](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

## 类型

类型注解：是一种轻量级的为函数或变量添加约束的方式。

```javascript
// greeting.ts
const greeting = (person: string): void => {
  console.log('Good day ' + person);
};

greeting('Tom');
```

```javascript
// greeting.js
var greeting = function (person) {
  console.log('Good day ' + person);
};

greeting('Tom');
```

## 原始数据类型

> 原始数据类型包括：boolean、number、string、null、undefined Symbol

```javascript
// boolean
let isAwesome: boolean = true;
let isAwesome: boolean = new Boolean(1);
let isAwesome: boolean = Boolean(1);

// number
let decimalNumber: number = 42;
let binaryNumber: number = 0b101010; // => 42

// string
let person: string = 'Tom';
let greet: string = `Good day${person}`;

// null、 undefined
let _u: undefined = undefined;
let _n: null = null;

// any 任意值类型
let someNumber: any = 'seven';
someNumber = 7;

// JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数
let unusable: void = undefined;

function consoleName(): void {
  console.log('My name is Tom');
}
```

## 类型推论

TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。

## 联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种。

```javascript
// ts
let someThing: string | number;
someThing = 'seven';
someThing = 7;
// js
let someThing;
someThing = 'seven';
someThing = 7;
```

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，只能访问此联合类型的所有类型里共有的属性或方法.

<figure>
  <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/ts-error-1579576241.jpg'/>
  <figcaption>length 不是 string 和 number 的共有属性，所以会报错。访问 string 和 number 的共有属性 toString 是ok的</figcaption>
</figure>

## 对象的类型—接口

在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。  
**在 TypeScript 中，使用接口（Interfaces）来定义对象的类型**

### 接口:强制保持一致

赋值的时候，变量的形状必须和接口的形状保持一致

```javascript
// ts
interface Person {
  name: string;
  age: number;
}

let tom: Person = {
  name: 'Tom',
  age: 25,
};
// js
let tom = {
  name: 'Tom',
  age: 25,
};
```

### 可选属性

<figure>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/ts-1579587796.jpg'/>
  <figcaption>可选属性</figcaption>
</figure>

### 接口:允许有任意的属性

<figure>
  <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/ts-propName-1579587497.jpg'/>
  <figcaption>允许有任意的属性</figcaption>
</figure>

### 接口:只读属性

<figure>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/ts-interface-err-1579587121.jpg'/>
  <figcaption>只读属性</figcaption>
</figure>

<!-- ```javascript
// array
let myPetFamily: string[] = ['rocket', 'fluffly', 'harry'];
``` -->

## 数组

在 TypeScript 中，数组类型有多种定义方式，比较灵活。

<figure>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/ts-array-1579588325.jpg'/>
  <figcaption>数组类型</figcaption>
</figure>

## 函数

一个函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出都考虑到，其中函数声明的类型定义较简单：

<figure>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/ts-fn-1579590304.jpg'/>
  <figcaption>定义函数输入和输出</figcaption>
</figure>

<figure>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/ts-fn-1579591003.jpg'/>
  <figcaption>函数参数的定义</figcaption>
</figure>

## 类型断言

类型断言（Type Assertion）可以用来手动指定一个值的类型。

```javascript
// ts
function getLength(something: string | number): number {
    if ((<string>something).length) {
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}
```

```javascript
// js
function getLength(something) {
  if (something.length) {
    return something.length;
  } else {
    return something.toString().length;
  }
}
```

## 枚举

```javascript
enum Days { Sun, Mon, Tue, Wed, Thu, Fri, Sat };

console.log(Days["Sun"] === 0); // true

enum ThemeColors {
    Primary = 'primary',
    Secondary = 'secondary',
    Dark = 'dark',
    DarkSecondary = 'darkSecondary',
}
```

```javascript
'use strict';
var Days;
(function (Days) {
  Days[(Days['Sun'] = 0)] = 'Sun';
  Days[(Days['Mon'] = 1)] = 'Mon';
  Days[(Days['Tue'] = 2)] = 'Tue';
  Days[(Days['Wed'] = 3)] = 'Wed';
  Days[(Days['Thu'] = 4)] = 'Thu';
  Days[(Days['Fri'] = 5)] = 'Fri';
  Days[(Days['Sat'] = 6)] = 'Sat';
})(Days || (Days = {}));
console.log(Days['Sun'] === 0); // true

var ThemeColors;
(function (ThemeColors) {
  ThemeColors['Primary'] = 'primary';
  ThemeColors['Secondary'] = 'secondary';
  ThemeColors['Dark'] = 'dark';
  ThemeColors['DarkSecondary'] = 'darkSecondary';
})(ThemeColors || (ThemeColors = {}));
```

## 常数枚举

```javascript
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

```javascript
'use strict';
let directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```

## 泛型

```javascript
function RepeatArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

RepeatArray < string > (3, 'x'); // ['x', 'x', 'x']
```

```javascript
'use strict';
function RepeatArray(length, value) {
  let result = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
RepeatArray(3, 'x'); // ['x', 'x', 'x']
```

<iframe
     src="https://codesandbox.io/embed/great-cerf-o0os9?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="TypeScript with React"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>
   
---

1. [Adding TypeScript](https://create-react-app.dev/docs/adding-typescript/)
2. [TypeScript Playground - TypeScript with React](https://www.typescriptlang.org/play/index.html?jsx=2&esModuleInterop=true&e=196#example/typescript-with-react)
