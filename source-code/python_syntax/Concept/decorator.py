# 装饰器
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
