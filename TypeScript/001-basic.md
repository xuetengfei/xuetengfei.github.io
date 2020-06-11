# Tutorial

<!-- ### main.ts -->

## Primitive data types

```javascript
/* main.ts */

export {};

// boolean
let isWork: boolean = false;
let isDone: boolean = null;
let isCode: boolean = undefined;

// number
let someNumber: number = 20;
let someNumberCopyOne: number = null;
let someNumberCopyTwo: number = undefined;

// string
let someString: string = `Hallelujah`;
let someStringCopyOne: string = null;
let someStringCopyTwo: string = undefined;
```

TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。
如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：

---

## Array

```javascript
// Array
let IdList: number[] = [1, 2, 3, 4];
let NameList: string[] = ['you', 'me', 'he', 'she'];
let otherList: any[] = [1, 'me', {}, undefined, [null]];

let idList: Array<number> = [1, 2, 3, 4];
let nameList: Array<string> = ['you', 'me', 'he', 'she'];
```

## Object: interface

TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。
接口（Interfaces）可以用于对「对象的形状（Shape）」进行描述。
在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。

```javascript
interface Person {
  firstName: string;
  age?: number; // age 是可选属性
}
let p = {
  firstName: 'xue',
  //   age: 100,
};
```

## function

```javascript
/* ts */
interface Person {
  firstName: string;
  lastName?: string;
}
function Name(o: Person): string {
  const { lastName, firstName } = o;
  if (lastName) return o.firstName + o.lastName;
  else return firstName;
}

let p = {
  firstName: 'xue',
};
Name(p);
console.log(Name(p));

/* compile to js */
var p = {
  firstName: 'xue',
};
function Name(o) {
  var lastName = o.lastName,
    firstName = o.firstName;
  if (lastName) return o.firstName + o.lastName;
  else return firstName;
}
Name(p);
console.log(Name(p));
```
