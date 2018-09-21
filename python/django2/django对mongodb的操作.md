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
- BooleanField
- ComplexDateTimeField
- DateTimeField
- DecimalField
- DictField
- DynamicField
- EmailField
- EmbeddedDocumentField
- FileField
- FloatField
- GenericEmbeddedDocumentField
- GenericReferenceField
- GeoPointField
- ImageField
- IntField
- ListField
- MapField
- ObjectIdField
- ReferenceField
- SequenceField
- SortedListField
- StringField
- URLField
- UUIDField









