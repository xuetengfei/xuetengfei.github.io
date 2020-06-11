序列是 Python 中最基本的数据结构。序列中的每个元素都分配一个数字 - 它的位置，或索引，第一个索引是 0，第二个索引是 1，依此类推。

Python 有 6 个序列的内置类型，但最常见的是列表和元组。

序列都可以进行的操作包括索引，切片，加，乘，检查成员。

此外，Python 已经内置确定序列的长度以及确定最大和最小的元素的方法。

列表是最常用的 Python 数据类型，它可以作为一个方括号内的逗号分隔值出现。

列表的数据项不需要具有相同的类型

创建一个列表，只要把逗号分隔的不同的数据项使用方括号括起来即可。

```python
list1 = ['Cupcake','Donut','Eclair','Froyo','Gingerbread','Honeycomb','IceCreamSandwish','Jellybean','Lollipop','Marshmallow']

# “杯形蛋糕”，“甜甜圈”，“奶油酥饼 ”，“酸奶甜品”，“姜饼”，“蜂巢”，“冰淇淋三明治”，“果冻”，“棒糖”，“棉花糖”。
```

```python
list1 = [
    'Cupcake', 'Donut', 'Eclair', 'Froyo', 'Gingerbread', 'Honeycomb',
    'IceCreamSandwish', 'Jellybean', 'Lollipop', 'Marshmallow'
]

# 长度
lenNum = len(list1)
print(lenNum)  # 10


# 取值
list2 = ['Cupcake', 'Donut', 'Eclair', 'Froyo']

print(list2[0])  # Cupcake
print(list2[1:3])  # ['Donut', 'Eclair']
print(list2[-1])  # Froyo
print(list2[:-1])  # ['Cupcake', 'Donut', 'Eclair']
print(list2[-3:-1])  # ['Donut', 'Eclair']


## 修改元素
list2 = ['Cupcake', 'Donut', 'Eclair', 'Froyo']

list2[2] = 'ZZZ'
print(list2)  # ['Cupcake', 'Donut', 'ZZZ', 'Froyo']


# 删除元素
list2 = ['Cupcake', 'Donut', 'Eclair', 'Froyo']
del list2[1]
print(list2)  # ['Cupcake', 'Eclair', 'Froyo']
```

## list

```python
list2 = [1, 12, 1, 4, 1, 3, 4]

# 计数
print(list2.count(1))  # 3

# 追加-1
newList = (23, 34, 5, 6)
list2.extend(newList)
print(list2)  # [1, 12, 1, 4, 1, 3, 4, 23, 34, 5, 6]

# 追加-2
list2 += newList
print(list2)  # [1, 12, 1, 4, 1, 3, 4, 23, 34, 5, 6]

# 复制
A = ['孑', '孓'] * 4
print(A)  # ['孑', '孓', '孑', '孓', '孑', '孓', '孑', '孓']


# 判断
flag = '子' in ['孑', '孓', '孑', '孓', '孑', '孓', '孑', '孓']
flag2 = '孓' in ['孑', '孓', '孑', '孓', '孑', '孓', '孑', '孓']
print(flag)  # False
print(flag2)  # True

# 插入
list2 = ['Cupcake', 'Donut', 'Eclair', 'Froyo']
list2.insert(1, 'ZZZ')
print(list2)  # ['Cupcake', 'ZZZ', 'Donut', 'Eclair', 'Froyo']
```

## string: format

```python
a = 'IceCreamSandwish'

print(a[0])
print(a[1:5])
print(a[-5:-3])
# I
# ceCr
# dw

b = 'IceCreamSandwish'

print(b[:6] + 'ZZZ')  # IceCreZZZ

print("C" in b)  # True

print(b * 2)  # IceCreamSandwishIceCreamSandwish

print("我叫 %s 今年 %d 岁!" % ('小明', 10))  # 我叫 小明 今年 10 岁!

#   %c	 格式化字符及其ASCII码
#   %s	 格式化字符串
#   %d	 格式化整数
#   %u	 格式化无符号整型
#   %o	 格式化无符号八进制数
#   %x	 格式化无符号十六进制数
#   %X	 格式化无符号十六进制数（大写）
#   %f	 格式化浮点数字，可指定小数点后的精度
#   %e	 用科学计数法格式化浮点数
#   %E	 作用同%e，用科学计数法格式化浮点数
#   %g	 %f和%e的简写
#   %G	 %f 和 %E 的简写
#   %p	 用十六进制数格式化变量的地址

```

```python
print("{:.2f}".format(3.1415926))
print("{:+.2f}".format(3.1415926))
print("{:,}".format(1000000))
print("{:.1%}".format(0.2536))
print("{:.2%}".format(0.25))
print("{:.3%}".format(0.2536))
print("{:0>2d}".format(5))
print("{:0<4d}".format(5))
print("{:x<4d}".format(5))
print("{:^10d}".format(5))
# 3.14
# +3.14
# 1,000,000
# 25.4%
# 25.00%
# 25.360%
# 05
# 5000
# 5xxx
#     5
```

## string: capitalize

```python
print('fuck'.capitalize())
print('@ Hello PYTHON"'.capitalize())
print('123 Hello PYTHON"'.capitalize())
# Fuck
# @ hello python"
# 123 hello python"

# str.endswith(suffix[, start[, end]])

Str = 'Fuck Job and Life...!!!'
suffix = '!!'
print(Str.endswith(suffix))
print(Str.endswith(suffix, 20))
suffix = 'run'
print(Str.endswith(suffix))
print(Str.endswith(suffix, 0, 19))

# True
# True
# False
# False
```

## string: isalnum isalpha isdigit

```python
# isalnum() 方法检测字符串是否由字母和数字组成。
str1 = "whatisyouname"  # 字符串没有空格
print(str1.isalnum())
# True

str2 = "www.abc.com"
print(str2.isalnum())
# False

str3 = "深圳shenzhen"
print(str3.isalnum())
# True

# Python isalpha() 方法检测字符串是否只由字母组成。

str4 = "深圳shenzhen"
print(str4.isalpha())  # True

str5 = "深圳shenzhen233"
print(str5.isalpha())  # False
print(str5.isdigit())  # False
```

```python
str = "This Is String Example...Wow!!!"
print (str.istitle())

str = "This is string example....wow!!!"
print (str.istitle())

# True
# False
```

## string: join

```python
print(list('IceCreamSandwish'))
# ['I', 'c', 'e', 'C', 'r', 'e', 'a', 'm', 'S', 'a', 'n', 'd', 'w', 'i', 's', 'h']
a = [
    'I', 'c', 'e', 'C', 'r', 'e', 'a', 'm', 'S', 'a', 'n', 'd', 'w', 'i', 's',
    'h'
]

divide = '-'
divide2 = ''

print(divide.join(a))  # I-c-e-C-r-e-a-m-S-a-n-d-w-i-s-h
print(divide2.join(a))  # IceCreamSandwish

```

## string : split

```python
a = 'IceCreamSandwish'
print(len(a))  # 16

str2 = "this is string example....is it?  is sis wow!!!"
print(str2.replace("is", "was", 10))
# thwas was string example....was it?  was swas wow!!!

print(str2.replace("is", "was", 2))
# thwas was string example....is it?  is sis wow!!!

str3 = 'IceCream Sandwish'

print(str3.split())
print(str3.split('e'))
print(str3.split('e', 1))
# ['IceCream', 'Sandwish']
# ['Ic', 'Cr', 'am Sandwish']
# ['Ic', 'Cream Sandwish']
```

## tuple

```python
tup1 = ('Cupcake', 'Donut', 'Eclair', 'Froyo', 'Gingerbread')
print(tup1[0])
print(tup1[1:4])
# Cupcake
# ('Donut', 'Eclair', 'Froyo')

list1 = ['Cupcake', 'Donut', 'Eclair', 'Froyo', 'Gingerbread']
print(tuple(list1))
# ('Cupcake', 'Donut', 'Eclair', 'Froyo', 'Gingerbread')

```

## dictionary

```python
dict1 = {'Alice': '2341', 'Beth': '9102', 'Cecil': '3258'}
print(dict1['Alice'])
dict1['Alice'] = 9999
print(dict1)
dict1['zzz'] = 'zzz'
print(dict1)
del dict1['zzz']
print(dict1)
print(len(dict1))
print(str(dict1))
print(type(dict1))

# 2341
# {'Alice': 9999, 'Beth': '9102', 'Cecil': '3258'}
# {'Alice': 9999, 'Beth': '9102', 'Cecil': '3258', 'zzz': 'zzz'}
# {'Alice': 9999, 'Beth': '9102', 'Cecil': '3258'}
# 3
# {'Alice': 9999, 'Beth': '9102', 'Cecil': '3258'}
# <class 'dict'>
```

## dictionary

```python
dict1 = {'Alice': '2341', 'Beth': '9102', 'Cecil': '3258'}

print(dict1.items())
# dict_items([('Alice', '2341'), ('Beth', '9102'), ('Cecil', '3258')])

print(list(dict1.items()))
# [('Alice', '2341'), ('Beth', '9102'), ('Cecil', '3258')]

print(dict1.keys())
# dict_keys(['Alice', 'Beth', 'Cecil'])

print(list(dict1.keys()))
# ['Alice', 'Beth', 'Cecil']

print(dict1.values())
# dict_values(['2341', '9102', '3258'])

print(list(dict1.values()))
# ['2341', '9102', '3258']

dict1.pop('Alice')
print(dict1)
# {'Beth': '9102', 'Cecil': '3258'}

```

## 集合（set）去重

可以使用大括号 { } 或者 set() 函数创建集合，注意：创建一个空集合必须用 set() 而不是 { }，因为 { } 是用来创建一个空字典。

```python

UnityOne = {
    'Cupcake', 'Donut', 'Donut', 'Donut', 'Eclair', 'Froyo', 'Gingerbread'
}

print(UnityOne)  # {'Cupcake', 'Gingerbread', 'Eclair', 'Froyo', 'Donut'}

print('Donut' in UnityOne)  # True

```

```python
a = set('abracadabra')
print(a)  # {'r', 'b', 'c', 'a', 'd'}

b = set('alacazam')
print(b)  # {'m', 'c', 'a', 'l', 'z'}

# a独有的
print(a - b)  # {'b', 'r', 'd'}
# b独有的
print(b - a)  # {'m', 'z', 'l'}

# a b 相加
print(a | b)  # {'m', 'r', 'c', 'b', 'a', 'd', 'l', 'z'}

# a b 交集
print(a & b)  # {'a', 'c'}

# 不同时包含于a和b的元素
print(a ^ b)  # {'m', 'l', 'r', 'b', 'z', 'd'}

print(((a - b) | (b - a)) == (a ^ b))  # True

# 列表推导式
c = {x for x in 'abracadabra' if x not in 'abc'}
print(c)  # {'r', 'd'}
```

```python

```

```python

```

```python

```

```python

```

```python

```

```python

```

```python

```

```python

```

```python

```

```python

```

```python

```

```python

```

```python

```

```python

```

```python

```

```python

```

```python

```

```python

```

```python

```

```python

```

```python

```

```python

```

```python

```

```python

```

```python

```

```python

```
