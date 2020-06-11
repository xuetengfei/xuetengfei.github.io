# 列表推导式

vec = [2, 4, 6]

end = [3*v for v in vec]
end2 = [[v, 3*v] for v in vec if v > 3]

print(end)  # [6, 12, 18]
print(end2)  # [ [4, 12], [6, 18]]


freshfruit = ['  banana', '  loganberry ', 'passion fruit  ']

a = [len(v.strip()) for v in freshfruit]
print(a)  # [6, 10, 13]

dicta = dict(sape=4139, guido=4127, jack=4098)
print(dicta)
# {'sape': 4139, 'guido': 4127, 'jack': 4098}
