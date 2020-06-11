## spread:数组/对象扩展运算符

```javascript
const Software = {
    occupation: 'Software developer',
};

const Bill = {
    ...Software,
    Name: 'Bill',
};
```

```javascript
const numbers1 = [1, 2, 3, 4, 5];
const numbers2 = [...numbers1, 1, 2, 6, 7, 8];

//numbers2: -> [1, 2, 3, 4, 5, 1, 2, 6, 7, 8]
```

## rest 运算符

使用函数的参数时，无论是完全替换参数还是与函数的参数一起替换参数，这三个点也称为 rest 运算符。rest 操作符使开发人员能够创建可以获取无限数量的参数的函数，也称为变量 arity 或可变函数。

```javascript
function sum(...numbers) {
    return numbers.reduce((accumulator, current) => {
        return (accumulator += current);
    });
}

sum(1, 2); // 3
sum(1, 2, 3, 4, 5); // 15
```
