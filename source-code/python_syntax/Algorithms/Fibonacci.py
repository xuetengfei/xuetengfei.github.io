# 斐波纳契数列
# 111


def Fibonacci(length=10):
    list = [0]*length
    list[0] = 0
    list[1] = 1
    for i in range(2, len(list)):
        list[i] = list[i-1] + list[i-2]
    return list


end = Fibonacci(10)
print(end)  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]


# 222
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
