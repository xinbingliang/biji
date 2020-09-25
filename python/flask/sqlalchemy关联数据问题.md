# sqlalchemy关联数据问题

`````python
class TopicType(Base):
    """题目分类"""
    id = Column(Integer, primary_key=True, comment='题目分类主键')
    name = Column(String(50), nullable=False, comment="分类名称")
    father_id = Column(Integer, default=0, comment="上级组织")
    icon = Column(String(250), default="", nullable=False, comment="书籍图标")
    topics = db.relationship('Topic', backref='topic_type', cascade="all, delete-orphan", passive_deletes=True)
`````

* none：在保存，删除或修改当前对象时，不对其附属对象（关联对象）进行级联操作。它是默认值。
* save-update：在保存，更新当前对象时，级联保存，更新附属对象(临时对象，游离对象)。
* delete：在删除当前对象时，级联删除附属对象。
* all：所有情况下均进行级联操作，即包含save-update和delete等等操作。
* delete-orphan：删除此对象的同时删除与当前对象解除关系的孤儿对象(仅仅使用于一对多关联关系中)。

````python
class Topic(Base):
    """题干"""
    id = Column(Integer, primary_key=True, comment='题目主键')
    type_id = Column(Integer, db.ForeignKey('topic_type.id'), ondelete='CASCADE', comment="题目分类")
    question = Column(String(250), nullable=False, comment="问题主干")
    correct = Column(String(30), nullable=False, comment="正确答案")
    type = Column(SmallInteger, nullable=False, comment="1单选题， 2多选题， 3判断题")
    parsing = Column(String(250), nullable=True, comment="解析")
    answers = db.relationship('Answer', backref='topic')
````

`relationship`中设置`cascade='all, delete-orphan', passive_deletes=True`

在`ForeignKey`中设置`ondelete='CASCADE'`

 cascade 默认值是` save-update, merge `。 cascade 参数的典型替代设置为` all `或者更常见 `all, delete-orphan `。这个` all `符号是` save-update, merge, refresh-expire, expunge, delete `，并将其与` delete-orphan `指示子对象在所有情况下都应跟随其父对象，并且在不再与该父对象关联后将其删除。

