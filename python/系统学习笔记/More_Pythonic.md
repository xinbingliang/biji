# More Pythonic

## 变量交换

- Pythonic写法

```
a, b = b, a

```

- 普通写法

```
tmp = a;
a = b;
b = tmp;

```

## 循环遍历区间元素

```
# 生成器与列表更加节省内存
# range(start, end, step)
# [start, end) 包含开头不包含结尾
for i in range(1, 1000, 2) # python3
for i in range(6) # python3
for i in xrange(6) #python2

```

> 在Python2中，有`range`和`xrange`2种写法，xrange是生成器写法，更节省内存。Python3中的`range`等价于Python2中的`xrange`。

> 生成器，只有在使用时才会动态生成，而且只能使用1次，比如range(1000000)，Python2中会在内存中生成1百万个元素的列表，而在Python3不会生成列表，而是生成器，占用很小的内存。

> **如何你还在使用Python2，建议用xrange代替range**

- Java的写法

```
for(int i = start; i < end; i += step) {
    // ....
}

```

- 生成器扩展

```
# 定义一个生成器
odd = (num for num in range(10) if num % 2 == 1)
for num in odd:
    print(num)

```

```
# 定义一个生成器
def fib(max):
    n, a, b = 0, 0, 1
    while n < max:
        yield b
        a, b = b, a + b
        n = n + 1

>>> type(fib(3)) 
<generator object fib at 0x10e610728>
>>> for num in fib(3):
...     print(num)
... 
1
1
2

```

```
def odd():
    print('step 1')
    yield 1
    print('step 2')
    yield 3
    print('step 3')
    yield 5

gen = odd()

print(next(gen))
print(next(gen))
print(next(gen))

```

## 索引

- Pythonic写法

```
num_list = [1, 4, 9]
for i, val in enumerate(num_list):
    print(i, '-->', val)

```

- 普通写法

```
num_list = [1, 4, 9]
for i in range(len(num_list))
    print(i, '-->', num_list[i])

```

> 显然，Pythonic写法更加直观，优雅。

## 字符串拼接

- Pythonic写法

```
names = ['Tom', 'Jack', 'Sam']
','.join(names) 

```

- 普通写法

```
names = 'Tom' + 'Jack' + 'Sam'

```

> 每次+操作都会产生新字符串，造成内存浪费，而join，整个过程中只会产生一个字符串对象

## 文件打开与关闭

- Pythonic写法

```
# 写法二
with open('a.txt') as f:
    data = f.read()

```

- 普通写法

```
f = open('a.txt')
try:
    data = f.read()
finally:
    f.close()

```

> 使用with，Python将自动管理文件流的打开与关闭，无需手动操作。

## 列表操作

- Pythonic写法

```
from collections import deque


names = deque(['c', 'd', 'e'])
names.popleft()
names.appendleft('b')
names.append('f')

# names => deque(['b', 'd', 'e', 'f'])

```

- 普通写法

```
names = list['c', 'd', 'e']
names.pop(0)
names.insert(0, 'b')
names.append('f')

```

> list也可以用`pop(0)`来删除第一个元素，但是list在内存中是顺序存储的，删除第一个元素，会导致之后的所有元素都会前移，效率很低，插入类似。

> 开头如果有大量的删除和插入操作，避免使用list。

## 解构赋值

- Pythonic写法

```
student = ['Tom', 18, 'male']
name, age, gender = student
print(name, age, gender)
# Tom 18 male

num_list = [100, 19, 20, 98]
first, *left_num_list, last = num_list
print(first, left_num_list, last)
# 100 [19, 20] 98

```

```
student = [['Tom', (98, 96, 100)], ['Jack', (98, 96, 100)]]

for name, (first, second, third) in student:
    print(name, first, second, third)

```

```
student = {
    'name': 'Tom',
    'age': 18
}

# python3
for k, v in student.items():
    print('k', '-->', v)

# python2
for k, v in student.iteritems():
    print('k', '-->', v)

```

> 字典也类似，在Python2中，字典的`items`方法将返回列表，当字典比较大时，这样会很耗内存。而`iteritems`方法返回的是生成器。

> Python3中，没有`iteritems`，`items`等价于Python2的`iteritems`。

> 如果在使用Python2，请用`iteritems`代替`items`

## 推导式

- Pythonic写法

```
# 生成1-100的奇数
odd = [i for i in range(1, 100) if i % 2 == 1]

# 集合a，b分别去一个数，找出和大于100的所有组合
result = [(x, y) for x in a_set for y in b_set if x + y > 100]

```

- 普通写法

```
# 生成1-100的奇数
result = []
for i in range(100):
    if i % 2 == 1:
        result.append(i)
        
# 集合a，b分别去一个数，找出和大于100的所有组合
result = []
for x in a_set:
    for y in b_set:
        if x + y > 100:
        result.append((x, y))
```

#### 为多个变量赋值

有时，有多个变量需要赋值，这时你会怎么赋值呢？

###### 常规方法：

常规方法是给变量逐个赋值。

```
a = 0
b = 1
c = 2

```

###### 优雅方法：

直接按顺序对应一一赋值。

```
a, b, c = 0, 1, 2

```

#### 序列解包

需要取出列表中的元素。

###### 常规方法：

一般我们知道可以通过下标获取具体元素。

```
info = ['brucepk', 'man', 'python']
name = info[0]
sex = info[1]
tech = info[2]
print(name,sex,tech)

# 结果
brucepk man python

```

###### 优雅方法：

给出对应变量接收所有元素。

```
info = ['brucepk', 'man', 'python']
name,sex,tech = info
print(name,sex,tech)

# 结果
brucepk man python

```

#### 优雅你的判断语句

我们用判断语句来定义一个绝对值函数。

###### 常规方法：

```
x = -6
if x < 0:
    y = -x
else:
    y = x
print(y)

# 结果
6

```

###### 优雅方法：

```
x = -6
y = -x if x<0 else x
print(y)

# 结果
6

```

#### 区间判断

使用 and 连续两次判断的语句，条件都符合时才执行语句。

###### 常规方法：

```
score = 82
if score >=80 and score < 90:
    level = 'B'
print(level)

# 结果
B

```

###### 优雅方法：

使用链式判断。

```
score = 82
if  80 <= score < 90:
    level = 'B'
print(level)

# 结果
B

```

#### 多个值符合条件判断

多个值任意一个值符合条件即为 True 的情况。

###### 常规方法：

```
num = 1
if num == 1 or num == 3 or num == 5:
    type = '奇数'
print(type)

# 结果
奇数

```

###### 优雅方法：

使用关键字 in，让你的语句更优雅。

```
num = 1
if num in(1,3,5):
    type = '奇数'
print(type)

# 结果
奇数

```

#### 判断是否为空

判断元素是空还是非空。

###### 常规方法：

一般我们想到的是 len() 方法来判断元素长度，大于 0 则为非空。

```
A,B,C =[1,3,5],{},''
if len(A) > 0:
    print('A 为非空')
if len(B) > 0:
    print('B 为非空')
if len(C) > 0:
    print('C 为非空')

# 结果
A 为非空

```

###### 优雅方法：

在之前的文章 [零基础学 python 之 if 语句](http://mp.weixin.qq.com/s?__biz=MzU4NjUxMDk5Mg==&mid=2247483938&idx=1&sn=59ed255a85cafad78a7fabcd45f79e26&chksm=fdfb65ddca8ceccb10b672f76aceb7fcd2ba367046575965a2a6960f10c8b50332eb31dc25a6&scene=21#wechat_redirect) 中讲过，if 后面的执行条件是可以简写的，只要条件 是非零数值、非空字符串、非空 list 等，就判断为 True，否则为 False。

```
A,B,C =[1,3,5],{},''
if A:
    print('A 为非空')
if B:
    print('B 为非空')
if C:
    print('C 为非空')

# 结果
A 为非空

```

#### 多条件内容判断至少一个成立

###### 常规方法：

用 or 连接多个条件。

```
math,English,computer =90,80,88
if math<60 or English<60 or computer<60:
    print('not pass')

# 结果
not pass

```

###### 优雅方法：

使用 any 语句。

```
math,English,computer =90,59,88
if any([math<60,English<60,computer<60]):
    print('not pass')

# 结果
not pass

```

#### 多条件内容判断全部成立

###### 常规方法：

使用 and 连接条件做判断。

```
math,English,computer =90,80,88
if math>60 and English>60 and computer>60:
    print('pass')

# 结果
pass

```

###### 优雅方法：

使用 all 方法。

```
math,English,computer =90,80,88
if all([math>60,English>60,computer>60]):
    print('pass')

# 结果
pass

```

#### 遍历序列的元素和元素下标

###### 常规方法：

使用 for 循环进行遍历元素和下标。

```
L =['math', 'English', 'computer', 'Physics']
for i in range(len(L)):
    print(i, ':', L[i])

# 结果
0 : math
1 : English
2 : computer
3 : Physics

```

###### 优雅方法：

使用 enumerate 函数。

```
L =['math', 'English', 'computer', 'Physics']
for k,v in enumerate(L):
    print(k, ':', v)

# 结果
0 : math
1 : English
2 : computer
3 : Physics

```

#### 循环语句优化

之前的文章 [零基础学 Python 之列表生成式](https://www.itcodemonkey.com/article/7137.html) 中讲过列表生成时的用法，举例：生成 [1x1,2x2,3x3，4x4，5x5]。

###### 常规方法：

使用简单的 for 循环可以达到目的。

```
L = []
for i in range(1, 6):
    L.append(i*i)
print(L) 

#结果：
[1, 4, 9, 16, 25]

```

###### 优雅方法：

使用列表生成式，一行代码搞定。

```
print([x*x for x in range(1, 6)]) 

#结果：
[1, 4, 9, 16, 25]
```

