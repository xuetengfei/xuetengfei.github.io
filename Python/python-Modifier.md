```python
def zhihu(func):
    def demo():
        print('谢邀')
        func()
        print('以上')
    return demo


@zhihu
def answer():
    print('我的回答')


answer()

# 谢邀
# 我的回答
# 以上

```
