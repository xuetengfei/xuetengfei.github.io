# 初学者案例

---

# 判断奇偶数

```python
# 判断奇偶数
import time

nowTime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
divide = '------------------------{time}---------------'
s = divide.format(time=nowTime)
print(s)

numbers = [12, 37, 5, 42, 8, 3]
even = []
odd = []

while len(numbers) > 0:
    v = numbers.pop()
    if (v % 2 == 0):
        even.append(v)
    else:
        odd.append(v)
print('even is', even)
print('odd is', odd)
```

```
------------------------2018-11-02 21:31:25---------------
even is [8, 42, 12]
odd is [3, 5, 37]
```

<img src="http://www.runoob.com/wp-content/uploads/2013/11/loop-over-python-list-animation.gif" >

# 判断列表是否包含某个元素

```python
theList = ['a', 'b', 'c']
if 'a' in theList:
    print('a in the list')

if 'd' not in theList:
    print('d is not in the list')

# a in the list
# d is not in the list
```

```python
excludeList = [2, 1, 5]
count = 10
while count > 0:
    if count not in excludeList:
        print('当前变量是：', count)
    count -= 1

# 当前变量是： 10
# 当前变量是： 9
# 当前变量是： 8
# 当前变量是： 7
# 当前变量是： 6
# 当前变量是： 4
# 当前变量是： 3
```

```python
a_list = ['a', 'a', 'b', 'c', 'hello']

# 判断元素是否在列表
print('a' in a_list)  # True

# 判断元素是否不再在列表
print('d' in a_list)  # False

# 元素出现的次数
print(a_list.count('a'))  # 2

# 元素第一次出现的索引数
print(a_list.index('a'))  # 0

# 在切片内，元素第一次出现的索引数
print(a_list.index('a', 1, 3))  # 1
```

```python
a = ['图片1', '图片2', '图片3', 'a']

b = [i for i, x in enumerate(a) if x.find('图片') != -1]
print(b)  # [0,1,2]
```

# 冒泡排序

```python
def bubbleSort(alist):
    for passnum in range(0, len(alist) - 1, 1):
        for i in range(0, len(alist) - passnum - 1, 1):
            if (alist[i] > alist[i+1]):
                tmp = alist[i+1]
                alist[i+1] = alist[i]
                alist[i] = tmp


alist = [54, 26, 93, 17, 77, 31, 44, 55, 20]
bubbleSort(alist)
print(alist)
```

# 斐波纳契数列

```python
# coding=utf-8

# 1
def Fibonacci(length=10):
    list = [0]*length
    list[0] = 0
    list[1] = 1
    for i in range(2, len(list)):
        list[i] = list[i-1] + list[i-2]
    return list


end = Fibonacci(10)
print(end)
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]


# 2
def Fibonacci2(length=10):
    a, b = 0, 1
    list = [a, b]
    count = 0
    while count < length-2:
        count += 1
        a, b = b, a+b
        list.append(b)
    return list


end2 = Fibonacci2(7)
print(end2)
# [0, 1, 1, 2, 3, 5, 8]

```

# list 中所有的字符串大小写

```python
# coding=utf-8

L = ['hello', "World", "Python"]

lower = [s.lower() for s in L]
upper = [s.upper() for s in L]

print(lower)
print(upper)

# ['hello', 'world', 'python']
# ['HELLO', 'WORLD', 'PYTHON']

```

# 列出当前目录下的所有文件和目录名

```python
# coding=utf-8
import os
folder = [d for d in os.listdir('.')]
print(folder)

# ['temp.md', 'tempCodeRunnerFile.py', 'temp', 'some.py', 'list.py', '2.py', '123.py', '3.py', 'oop1.py', '__pycache__', '4.py', '111.py', '5.py', 'oop.py', '1.py', '.vscode', 'der.py', 'effects', 'lanmda.py', 'BubbleSort.py']
```

# 字典反转键值对

```python
dic_1 = {"A": "a", "B": "b", "E": 'e'}
dic_2 = {y: x for x, y in dic_1.items()}

print(dic_2)
# {'a': 'A', 'b': 'B', 'e': 'E'}
```

# 合并去重

```python
list1 = [2, 3, 4, 5, 6, 6, 7, 7, 9]
list2 = [0, 7, 9, 11, 2, 4, 5]

allList = list1 + list2
print(allList)  # [2, 3, 4, 5, 6, 6, 7, 7, 9, 0, 7, 9, 11, 2, 4, 5]
print(set(allList))  # set([0, 2, 3, 4, 5, 6, 7, 9, 11])
print(list(set(allList)))  # [0, 2, 3, 4, 5, 6, 7, 9, 11]
```
