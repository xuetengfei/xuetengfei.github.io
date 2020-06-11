如果你想调用一个方法，并不填其中的一个参数时，JavaScript 就会报错。

```javascript
> method('parameter1', , 'parameter3');
Uncaught SyntaxError: Unexpected token
```

人们常用的解决方法是传递 `null` 或 `undefined`.

```javascript
> method('parameter1', null, 'parameter3') // or
> method('parameter1', undefined, 'parameter3');
```

?> 使用 `ES6` 中对扩展运算符。数组是松散的，所以给它传空值是可以的。

```javascript
> method(...['parameter1', , 'parameter3']); // works!
```
