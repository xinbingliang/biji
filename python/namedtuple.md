````python
# -*- coding:utf-8 -*-
from collections import namedtuple

__Author__ = "xinneirong"
__Email__ = "xinneirong@gmail.com"
__Time__ = "2019/9/4 9:09"

Animal = namedtuple('Animal', 'name age types')
xin = Animal(name='xin', age=12, types='人')
print(xin.name)

Student = namedtuple('Student', ['name', 'id'])
st = Student(name='xinbingliang', id=12)
print(st.name)
````

