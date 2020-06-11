## 解释器的运行环境 - 源文件的字符编码

Python 编译的时候出现错误：

[2. 使用 Python 解释器 — Python 3.7.3rc1 文档](https://docs.python.org/zh-cn/3/tutorial/interpreter.html#the-interpreter-and-its-environment)

```python
SyntaxError: Non-ASCII character '\xe5' in file Test1.py on line 8,
but no encoding declared;
see http://www.python.org/peps/pep-0263.html for details
```

python 的默认编码文件是用的 ASCII 码，将文件存成了 UTF-8，编译就可以通过。或在在 py 文件开头（必须是第一行）加入下面的代码

```
#coding=utf-8
```

或者

```
# -*- coding:utf-8 -*-
```
