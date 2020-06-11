# 基本函数：map()、reduce()、filter()

## map( )

```
map(*func, *iterable1, iterable2)
```

基本语法(注:加星号\*代表是必填参数,其他的参数是非必填参数)

map()需要两个必填参数，第一个参数是一个函数名，第二个参数是一个可迭代的对象，如列表、元组等。

map()实现的功能很简单，就是将第二个参数（iterable）中的每一个元素分别传给第一个参数（func），依次执行函数得到结果，并将结果组成一个新的 list 对象后进行返回。返回结果永远都是一个 list。

```python
def double(x):
    return 2 * x

row = [1, 2, 3, 4, 5]
res = map(double, row)

print(res)
# <map object at 0x0000021F8CB5E828>

print(list(res))
# [2, 4, 6, 8, 10]
```

除了传入一个可迭代对象这种常见的模式外，map()还支持传入多个可迭代对象。

```python
def add(x, y):
    return 2 * x + y

row = [1, 2, 3, 4, 5]
row2 = [2, 4, 6, 8, 10, 12]

addRes = map(add, row, row2)

print(list(addRes))  # [4, 8, 12, 16, 20]
```

## reduce( )

```python
reduce(func, iterable[, initializer])
```

在 Python3 中，reduce() 函数已经被从全局名字空间里移除了，它现在被放置在 fucntools 模块里，如果想要使用它，则需要通过引入 functools 模块来调用 reduce() 函数：

```python
from functools import reduce
def plus(x, y):
    return x + y

a = reduce(plus, [1, 2, 3, 4, 5])
b = reduce(plus, [1, 2, 3, 4, 5], 10)

print(a)  # 15
print(b)  # 25
```

```javascript
// javascript的写法

[1, 2, 3, 4, 5].reduce((init, v) => {
  return init + v;
}, 10);

// 25
```

## filter( )

```
filter(func, iterable)
```

```javascript
// javascript的写法

[1, 2, 3, 4, 5].filter(v => v > 3); // [ 4, 5 ]
```

```python
def mode(x):
    return x % 2

a = filter(mode, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

print(list(a))  # [1, 3, 5, 7, 9]
```

## 条件控制

在对条件控制进行替换之前，回顾对布尔表达式求值时进行的“短路”处理。

在 javascript 中

```
A || B   A && B
```

在 python 中, `||` 变成`or`,`&&`变成`and`

```
A or B   A and B
```

## 循环控制

使用 map() 替换 for in 循环

```python
def square(x):
    return x * x

a = []
for x in [1, 2, 3, 4, 5]:
    a.append(square(x))

print(a)  # [1, 4, 9, 16, 25]

b = map(square, [1, 2, 3, 4, 5])
print(list(b))  # [1, 4, 9, 16, 25]

```

## 递归

使用递归来替代 while 循环语句

```python
def factorial(n):
    if (n in (0, 1)):
        return 1
    return (n * factorial(n - 1))


print(factorial(6))
# 720
```
