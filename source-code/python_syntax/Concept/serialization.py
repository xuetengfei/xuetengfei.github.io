# 数据序列化是将结构化数据转换成允许以共享或存储的格式，可恢复其原始结构的概念。
# 在某些情况下，数据序列化的第二个目的是将要序列化数据的大小最小化，从而使磁盘空间 或带宽要求最小化。

import pickle

grades = {'Alice': 89, 'Bob': 72, 'Charles': 87}

# Use dumps to convert the object to a serialized string
serial_grades = pickle.dumps(grades)

print(serial_grades)
# b'\x80\x03}q\x00(X\x05\x00\x00\x00Aliceq\x01KYX\x03\x00\x00\x00Bobq\x02KHX\x07\x00\x00\x00Charlesq\x03KWu.'

# Use loads to de-serialize an object
received_grades = pickle.loads(serial_grades)
print(received_grades)

# {'Alice': 89, 'Bob': 72, 'Charles': 87}
