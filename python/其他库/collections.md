# collections

提供非内置的集合类型

## defaultdict 

1. 同键不同值的内容合并（list）

   ```python
   >>> from collections import defaultdict
   >>> s = [('red', 1), ('blue', 2), ('red', 3), ('blue', 4), ('red', 1), ('blue', 4)]
   # d可以看作一个dict(字典)，dict的value是一个list(列表)
   >>> d = defaultdict(list)
   >>> for k, v in s:
   	d[k].append(v)

   	
   >>> d
   defaultdict(<class 'list'>, {'blue': [2, 4, 4], 'red': [1, 3, 1]})
   ```

2. 同键不同值内容合并，同值合并(set)

   ````python
   >>> d = defaultdict(set)
   >>> for k,v in s:
   	d[k].add(v)

   	
   >>> d
   defaultdict(<class 'set'>, {'blue': {2, 4}, 'red': {1, 3}})
   ````

3. 统计字符串中的每个字符数量

   ```python
   >>> s = 'hello world'
   >>> d = defaultdict(int)
   >>> for k in s:
   	d[k] += 1

   	
   >>> d
   defaultdict(<class 'int'>, {'d': 1, 'e': 1, 'h': 1, 'o': 2, 'r': 1, 'w': 1, ' ': 1, 'l': 3})
   ```

## OrderedDict

1. 对字典的排序

   ````python
   >>> from collections import OrderedDict

   # 无序的dict
   >>> d = {'banana': 3, 'apple': 4, 'pear': 1, 'orange': 2}

   # 将d按照key来排序
   >>> OrderedDict(sorted(d.items(), key = lambda t: t[0]))
   OrderedDict([('apple', 4), ('banana', 3), ('orange', 2), ('pear', 1)])

   # 将d按照value来排序
   >>> OrderedDict(sorted(d.items(), key = lambda t: t[1]))
   OrderedDict([('pear', 1), ('orange', 2), ('banana', 3), ('apple', 4)])
   ````


   >>> OrderedDict(sorted(d.items(), key=lambda t: len(t[0])))
   >>>    OrderedDict([('pear', 1), ('apple', 4), ('orange', 2), ('banana', 3)])
   ````

2. 创建先进后出和先进先出

   ````python
   >>> d = {'banana': 3, 'spple': 4, 'pear': 1, 'orange': 2}

   # 将d按照key来排序
   >>> d = OrderedDict(sorted(d.items(), key = lambda t: t[0]))
   >>> d
   OrderedDict([('banana', 3), ('orange', 2), ('pear', 1), ('spple', 4)])

   # 使用popitem()方法来移除最后一个key-value对
   >>> d.popitem()
   ('spple', 4)

   # 使用popitem(last = False)来一移除第一个key-value对
   >>> d.popitem(last = False)
   ('banana', 3)
   ````

1. 改变插入的顺序

   ```python
   >>> d = OrderedDict.fromkeys('abcde')
   >>> d
   OrderedDict([('a', None), ('b', None), ('c', None), ('d', None), ('e', None)])

   # 将key为b的key-value对移动到dict的最后
   >>> d.move_to_end('b')
   >>> d
   OrderedDict([('a', None), ('c', None), ('d', None), ('e', None), ('b', None)])
   >>> ''.join(d.keys())
   'acdeb'

   # 将key为b的key-value对移动到dict的最前面
   >>> d.move_to_end('b', last=False)
   >>> ''.join(d.keys())
   'bacde'
   ```



## deque

list存储数据的优势在于按找索引查找元素会很快，但是插入和删除元素就很慢了，因为它是是单链表的数据结构。deque是为了高效实现插入和删除操作的双向列表，适合用于队列和栈，而且线程安全。

list只提供了append和pop方法来从list的尾部插入/删除元素，但是deque新增了**appendleft/popleft**允许我们高效的在元素的开头来插入/删除元素。而且使用deque在队列两端添加（append）或弹出（pop）元素的算法复杂度大约是O(1)，但是对于list对象改变列表长度和数据位置的操作例如 pop(0)和insert(0, v)操作的复杂度高达O(n)。

## ChainMap

ChainMap用来将多个dict(字典)组成一个list(只是比喻)，可以理解成合并多个字典，但和update不同，而且效率更高。

````python
>>> from collections import ChainMap
>>> a = {'a': 'A', 'c': 'C'}
>>> b = {'b': 'B', 'c': 'D'}
# 构造一个ChainMap对象
>>> m = ChainMap(a, b)
>>> m
ChainMap({'c': 'C', 'a': 'A'}, {'c': 'D', 'b': 'B'})
>>> m['a']
'A'
>>> m['b']
'B'
>>> m['c']
'C'
# 将m变成一个list
>>> m.maps
[{'c': 'C', 'a': 'A'}, {'c': 'D', 'b': 'B'}]
````

````python
# 更新a中的值也会对ChainMap对象造成影响
>>> a['c'] = 'E'
>>> m['c']
'E'

# 从m复制一个ChianMap对象，更新这个复制的对象并不会对m造成影响
>>> m2 = m.new_child()
>>> m2['c'] = 'f'
>>> m['c']
'E'
>>> a['c']
'E'
>>> m2.parents
ChainMap({'c': 'E', 'a': 'A'}, {'c': 'D', 'b': 'B'})
````

## Counter

Counter也是dict的一个subclass，它是一个无序容器，可以看做一个计数器，用来统计相关元素出现的个数。

````python
>>> from collections import Counter
>>> cnt = Counter()

# 统计列表中元素出现的个数
>>> for word in ['red', 'blue', 'red', 'green', 'blue', 'blue']:
	cnt[word] += 1

	
>>> cnt
Counter({'blue': 3, 'red': 2, 'green': 1})

# 统计字符串中元素出现的个数
>>> cnt = Counter()
>>> for ch in 'hello':
	cnt[ch] = cnt[ch] + 1

	
>>> cnt
Counter({'l': 2, 'e': 1, 'h': 1, 'o': 1})
````

使用`elements()`方法按照元素的出现次数返回一个iterator(迭代器)，元素以任意的顺序返回，如果元素的计数小于1，将忽略它。

````python
>>> from collections import Counter
>>> c = Counter(a=4, b=2, c=0, d=-2)
>>> c
Counter({'a': 4, 'b': 2, 'c': 0, 'd': -2})

# 排序
>>> sorted(c.elements())
['a', 'a', 'a', 'a', 'b', 'b']
````

使用most_common(n)返回一个list, list中包含Counter对象中出现最多前n个元素。

````python
>>> c = Counter('abracadabra')
>>> c
Counter({'a': 5, 'r': 2, 'b': 2, 'd': 1, 'c': 1})
>>> c.most_common(3)
[('a', 5), ('r', 2), ('b', 2)]
````

## namedtuple

使用namedtuple(*typename*, *field_names*)命名tuple中的元素来使程序更具可读性

```python
>>> from collections import namedtuple
>>> Point = namedtuple('PointExtension', ['x', 'y'])
>>> P = Point(1, 2)
>>> P.__class__.__name__
'PointExtension'
>>> P.x
1
>>> P.y
2
```

