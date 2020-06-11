'''
for letter in 'Python':     # 第一个实例
    print('当前字母 :', letter)
fruits = ['banana', 'apple',  'mango']
for fruit in fruits:        # 第二个实例
    print('当前水果 :', fruit)
print("Good bye!")
fruits = ['banana', 'apple',  'mango']
a = range(len(fruits))
print(a)



for num in range(10, 20):  # 迭代 10 到 20 之间的数字
    for i in range(2, num):  # 根据因子迭代
        if num % i == 0:      # 确定第一个因子
            j = num/i          # 计算第二个因子
            print('%d 等于 %d * %d' % (num, i, j))
            break            # 跳出当前循环
    else:                  # 循环的 else 部分
        print(num, '是一个质数')


i = 2
while(i < 100):
    j = 2
    while(j <= (i/j)):
        if not(i % j):
            break
        j = j + 1
    if (j > i/j):
        print(i, " 是素数")
    i = i + 1

print("Good bye!")
'''

""" for letter in 'Python':     # 第一个实例
    if letter == 'h':
        break
    print('当前字母 :', letter) """
excludeList = [2, 1, 5]
count = 10
while count > 0:
    if count not in excludeList:
        print('当前变量是：', count)
    count -= 1

count1 = 10
while count1 > 0:
    if count1 != 5:
        print('', count1)
    count1 -= 1


n = 0
while n < 10:
    n = n + 1
    if n % 2 == 0:      # 如果n是偶数，执行continue语句
        continue        # continue语句会直接继续下一轮循环，后续的print()语句不会执行
    print(n)


theList = ['a', 'b', 'c']
if 'a' in theList:
    print('a in the list')

if 'd' not in theList:
    print('d is not in the list')
