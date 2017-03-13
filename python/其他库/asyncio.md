# python协程和异步I/O

> `Python3.4+`中`asyncio`，一个支持异步编程的库

## 概念解释

* 协程：运行在单线程当中的“并发”，一般使用回调，协程相比多线程一大优势就是省去了多线程之间的切换开销，获得了更大的运行效率

## 生成器创建协程

**案例1**

```python
>>> def coroutine():
	reply = yield 'hello'
	yield reply

	
>>> c = coroutine()
>>> next(c)
'hello'
>>> c.send('world')
'world'
```

**案例2：模拟多个同学向一个老师提交作业**

````python
from collections import deque

def student(name, homeworks):
	for homework in homeworks.items():
		yield (name, homework[0], homework[1]) # 学生生成作业给老师

class Teacher(object):
	def __init__(self, students):
		self.students = deque(students)

	def handle(self):
		"""老师处理学生作业"""
		while len(self.students):
			student = self.students.pop()
			try:
				homework = next(student)
				print('handling', homework[0], homework[1], homework[2])
			except Exception as e:
				print('error')
			else:
				self.students.appendleft(student)

Teacher([
    student('Student1', {'math': '1+1=2', 'cs': 'operating system'}),
    student('Student2', {'math': '2+2=4', 'cs': 'computer graphics'}),
    student('Student3', {'math': '3+3=5', 'cs': 'compiler construction'})
]).handle()
````

