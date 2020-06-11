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
