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
