## 类装饰器

```python
class Test():
    def __call__(self):
        print('--- test ---')

t = Test()
t()
```

将函数指向对象

```python
class Test():
    def __init__(self, func):
        print('--- 初始化 ---')
        print('func name is %s' % func.__name__)
        self.__func = func


    def __call__(self):
        print('执行类装饰器中的功能')
        self.__func()

@Test
def test():
    print('--- test ---')

test()
```

##元类





