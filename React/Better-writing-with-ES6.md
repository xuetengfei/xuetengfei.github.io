## 嵌套 props 解构

可以通过解构从 React 组件中的 props 中提取变量

```javascript
const { user } = this.props;
```

但是如果 user 是一个对象并且你想从 `this.props.user.id` 提取到变量`id`呢？

您可以使用嵌套解构：

```javascript
const {
  user: { id },
} = this.props;
```

现在有一个变量`id`是 `this.props.user.id` 的内容

## 传下所有 props

可以将 props 传递给子组件。

```javascript
<MyChild shoe={this.props.shoe} cup={this.props.cup} />
```

将所有 props 传递给具有扩展语法的子组件。

```javascript
<MyChild {...this.props} />
```

现在，MyChild 可以访问 shoe，cup 以及父组件可以访问的所有其他 props！

## props 解构

你已经知道你可以用箭头函数来构造 props

```javascript
const MyComponent = ({ shoe, car }) => /* do something */
```

但是，如果您还想访问 props 对象呢？

这可能是这样的：

```javascript
const MyComponent = ({ shoe, car, ...props }) => /* do something */
```

props 现在包含除 shoe 和 car 以外的所有 props。

## 作为参数的函数

将箭头函数作为参数传递给其他函数，例如 map 和 forEach

```javascript
myList.map(a => toUpperCase(a));
```

当您只在箭头函数中使用一个参数并将该参数传递给新函数时，您可以像这样编写它。

```javascript
myList.map(toUpperCase);
```

```javascript
const ToUpperCase = str => str.toUpperCase();
const myList = ['apple', 'coffee', 'tea'];

const end = myList.map(a => ToUpperCase(a));
console.log(end); // [ 'APPLE', 'COFFEE', 'TEA' ]

const res = myList.map(ToUpperCase);
console.log(res); // [ 'APPLE', 'COFFEE', 'TEA' ]
```

## 列表解构

```javascript
const [first, ...rest] = ['a', 'b', 'c'];
console.log(first); // a
console.log(rest); //  [ 'b', 'c' ]
```
