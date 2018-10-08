# django对mongodb的操作

## 连接mongodb

````python
# 连接mongodb
from mongoengine import connect
connect('mgtest', host='mongodb://localhost:27017')
````

## 模型设置

```python
import mongoengine

class StudentModel(mongoengine.Document):
    name = mongoengine.StringField(max_length=16)
    age = mongoengine.IntField(default=0)
```

## 文档字段

- BinaryField
- `BooleanField` 布尔类型 
- ComplexDateTimeField
- `DateTimeField` 时间类型
- DecimalField
- `DictField` 字典类型
- DynamicField
- EmailField
- EmbeddedDocumentField
- FileField
- `FloatField` 字符串类型
- GenericEmbeddedDocumentField
- GenericReferenceField
- GeoPointField
- ImageField
- `IntField` 整数类型
- `ListField` 列表。列表里还可以传入字段规定列表内的字段类型，例如`ListField(StringField(max_length=30))`
- MapField
- ObjectIdField
- ReferenceField 这是一个保存相关文档的filed
- SequenceField 自动产生一个数列、 递增的
- SortedListField
- `StringField` 字符串类型
- URLField
- UUIDField


#### 字段限制

1. required，必须的。
2. max_length，最大长度。
3. default 默认值 也可以是一个函数 可调用类型
4. primary_key 插入数据是否重复
5. null 赋值是否可以为空
6. choices 列表的范围
7. unique 当前field只能是唯一的

## 数据库配置

```
DBNAME = 'Questions'
```

## models

```python
# from django.db import models
from mongoengine import *
from QADoorWebDjango.settings import DBNAME

connect(DBNAME)

# Create your models here.
class Questions(Document):

    _id = IntField(primary_key=True)
    url = URLField()
    title = StringField()
    content = StringField()
    is_solved = BooleanField(default=0)
    answer_count = IntField()
    view_count = StringField()
    vote_count = StringField()
    tags = ListField()
    answers = ListField()
    source = StringField()

    meta = {'collection': 'questions'}  # 指明连接数据库的哪张表

for i in Questions.objects[:10]:  # 测试是否连接成功
    print(i._id)
```