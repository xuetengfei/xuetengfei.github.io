不同的导出方法和相应的导入方法。

#### Name

```javascript
export const name = 'value';

import { name } from '...';
```

#### Renaming Export & Renaming Import

```javascript
const name1 = 'value1';
const name2 = 'value2';
export { name1, name2 as newName2 };

import { name1 as newName1, newName2 } from '...';
```

#### Default

```javascript
export default 'value';

import anyName from '...';
```

#### Mixing Default + Name

```javascript
export const name = 'value';
export default 'value';

import anyName, { name } from '...';
```

#### Export List

```javascript
const name1 = 'value1';
const name2 = 'value2';
export { name1, name2 };

import { name1, name2 } from '...';
```

#### Import All

```javascript
export const name = 'value';
export default 'defaultValue';

import * as anyName from '...';
console.log(anyName.name); // 'value'
console.log(anyName.default); // 'defaultValue'
```

#### The combination of export and import

```javascript
export * from './utils';
export * from './handle';
export * from './Comp';
export { foo as myFoo } from 'my_module';
export { default as SearchComp } from './search';
```

---

1. [Module 的语法 - ECMAScript 6 入门](https://es6.ruanyifeng.com/#docs/module)
