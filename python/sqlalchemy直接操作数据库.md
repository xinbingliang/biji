# Sqlalchemy

## 简单使用

`````python 
# -*- coding:utf-8 -*-
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

__Author__ = "xinneirong"
__Email__ = "xinneirong@gmail.com"
__Time__ = "2019/6/12 13:53"

Base = declarative_base()

class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(25), nullable=False)

engine = create_engine("mysql+cymysql://root:root@localhost:3306/test")

# Base.metadata.create_all(engine)

Dbsession = sessionmaker(bind=engine)

session = Dbsession()
new_user = User(name='辛丙亮')
session.add(new_user)
session.commit()
session.close()
`````

## 构建模型

````python 
# -*- coding:utf-8 -*-
from sqlalchemy import Column, String, Integer, ForeignKey, create_engine
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base

__Author__ = "xinneirong"
__Email__ = "xinneirong@gmail.com"
__Time__ = "2019/8/13 9:54"

base_model = declarative_base()


class Student(base_model):
    __tablename__ = 'student'

    id = Column(Integer, autoincrement=True, primary_key=True, comment='编号')
    name = Column(String(10), nullable=False, comment='姓名')
    age = Column(Integer, nullable=False, comment='年龄')
    # grade = relationship('Grade', backref='student')


class Course(base_model):
    __tablename__ = 'course'

    id = Column(Integer, autoincrement=True, primary_key=True, comment='编号')
    name = Column(String(10), nullable=False, comment='课程名')
    # grade = relationship('Grade', backref='course')


class Grade(base_model):
    __tablename__ = 'grade'

    id = Column(Integer, autoincrement=True, primary_key=True, comment='编号')
    grade_num = Column(Integer, nullable=False, comment='分数')
    student = relationship('Student', backref='student')
    student_id = Column(Integer, ForeignKey('student.id'), comment='学生id')
    course = relationship('Course', backref='course')
    course_id = Column(Integer, ForeignKey('course.id'), comment='课程id')


engine = create_engine("mysql+cymysql://root:root@127.0.0.1:3310/test")

# dbsession = base_model.metadata.create_all(engine)
````

## 插入

### 单个插入

````python
# 1. 单个增加
user1 = Student()
user1.name = 'xin1'
user1.age = 12
session.add(user1)
session.commit()

user2 = Student(name='xin2', age=12)
session.add(user2)
session.commit()
session.close()
````

### 批量插入

````python
user_list = [
    Student(name='xin3', age=12),
    Student(name='xin4', age=12),
    Student(name='xin5', age=12),
    Student(name='xin6', age=12),
    Student(name='xin7', age=12),
    Student(name='xin8', age=12),
    Student(name='xin9', age=12),
]

session.add_all(user_list)
session.commit()

course_list = [
    Course(name='语文'),
    Course(name='数学'),
    Course(name='外语'),
    Course(name='历史'),
    Course(name='思想政治'), 
    Course(name='地理'),
    Course(name='化学'),
    Course(name='物理'),
    Course(name='生物')
]

session.add_all(course_list)
session.commit()
session.close()
````

### 数据解包

```python
from random import randint

grade_data = []
for i in range(1, 10):
    for j in range(1, 10):
        grade_data.append({'grade': randint(0, 101), 'student_id': i, 'course_id': j})

grade_data_list = []
for item in grade_data:
    grade_data_list.append(Grade(**item))

session.add_all(grade_data_list)
session.commit()
session.close()
```

### 一对多插入

#### 插入数据

`````python
grade = Grade(grade_num=100, student=Student(name='辛丙亮', age=28), course=Course(name='选修'))
session.add(grade_num)
session.commit()
`````

#### 反向插入数据

````python
student = Student(name='xin22', age=20)
student.student = [Grade(grade_num=99, course_id=1)]
session.add(student)
session.commit()
````

## 查询

### 基本查询

#### 查询所有数据

````python 
students = session.query(Student).all()
for student in students:
    print(student.id, student.name)
session.close()
````

#### 条件查询

````python 
students = session.query(Student).filter(Student.id < 20).all()
for student in students:
    print(student.id, student.name)
session.close()
````

#### 取出第一条

````python
student = session.query(Student).filter(Student.id < 20).first()
print(student.id, student.name)
session.close()
````

### 打印sql语句

`````python
sql1 = session.query(Student).filter(Student.id < 20)
print(sql1)

sql2 = session.query(Student)
print(sql2)
`````

### 复杂查询

#### and和or

`````python
from sqlalchemy.sql import and_, or_
ret1 = session.query(Student).filter(and_(Student.id < 3, Student.name == 'xin2')).all()
ret2 = session.query(Student).filter(or_(Student.id > 3, Student.name == 'xin2')).all()
`````

#### 使用别名

````python
ret1 = session.query(Student.name.label('username'), Student.id).first()
print(ret1.id, ret1.username)
````

#### filter 和filter_by区别

````python
print(session.query(Student).filter(Student.name == 'xin1').first().name)
print(session.query(Student).filter_by(name='xin1').first().name)
````

#### 进行排序

`````python
from sqlalchemy import desc

students = session.query(Student).order_by(desc(Student.id)).all()
for student in students:
    print(student.id)
`````

````python
student_list = session.query(Student).order_by(Student.id.desc()).all()
for item in student_list:
    print(item.id)
    
session.query(Student).filter(Student.name.like('xin%')).order_by(Student.id.asc()).all()
````

#### 使用字符串匹配

````python
from sqlalchemy import text
print(session.query(Student).filter(text(
    'id < :id and name = :name')).params(id=4, name='xin1').order_by(Student.id).all())
````

#### 使用原生sql查询

````python
from sqlalchemy import text
print(session.query(Student).from_statement(text("SELECT * FROM student where name=:name")).params(name='xin1').all())
````

#### 查询出一列

````python
student_list = session.query(Student.name).all()
for item in student_list:
    print(item.name)
````

#### 区间

````python
student_list = session.query(Student).filter(Student.id.between(1, 4)).all()
for item in student_list:
    print(item.id)
````

#### 使用in

`````python
student_list = session.query(Student).filter(Student.id.in_([1, 3, 5, 7])).all()  # 在这些选项中
for item in student_list:
    print(item.id)

student_list = session.query(Student).filter(~Student.id.in_([1, 3, 5, 7])).all()  # 在这些选项之外
for item in student_list:
    print(item.id)
`````

#### 子查询

````python
grades = session.query(Grade).filter(Grade.student_id.in_(session.query(Student.id).filter_by(name='xin1'))).all()

for grade in grades:
    print(grade.grade_num)
````

#### 查询条件很多

````
ret = session.query(User).filter(
    or_(
        User.id < 2,
        and_(User.name == 'eric', User.id > 3),
        User.extra != ""
    )).all()
# select * from User where id<2 or (name="eric" and id>3) or extra != "" 
````

#### 通配符

````python
session.query(Student).filter(Student.name.like('xin%')).all()
````

#### 分组查询

````
set @@global.sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
````

````python
# 每一科最高分
from sqlalchemy import func

grades = session.query(func.max(Grade.grade), Grade.course_id, Grade.student_id).group_by(Grade.course_id).all()
for grade in grades:
    print(grade)
````

````python
# 每一科最高分，并大于90
from sqlalchemy import func

grades = session.query(func.max(Grade.grade), Grade.course_id, Grade.student_id).group_by(Grade.course_id).having(func.max(Grade.grade > 90)).all()

for grade in grades:
    print(grade)
````

### 一对多查询

#### 联表查询

````python
grade_list = session.query(Grade).all()
for row in grade_list:
    print(row.grade_num, row.student.name, row.course.name)
````

####反向查询

`````python
student_list = session.query(Student).all()

for row in student_list:
    for row2 in row.student:
        print(row.name, row2.course.name, row2.grade_num)
`````

## 修改

### 基本修改

````python
res = session.query(Grade).filter(Grade.id == 10).update({"grade_num": 0})
print(res)
session.commit()
session.close()
````

### 原有数据上修改

```python
res = session.query(Grade).filter(Grade.id == 10).update({Grade.grade_num: Grade.grade_num + 1},  synchronize_session="evaluate")
session.commit()
session.close()

res = session.query(Grade).filter(Grade.id == 10).update({'grade_num': Grade.grade_num + 1},  synchronize_session="evaluate")
```

### 一对多修改

````
class_info = db_session.query(ClassTable).filter(ClassTable.name=="OldBoyS1").first()
db_session.query(Student).filter(Student.class_id == class_info.id).update({"name":"NBDragon"})
db_session.commit()

db_session.close()
````

## 删除

### 基本删除

````
res = db_session.query(User).filter(User.id==20).delete()
print(res)
db_session.commit()
````

### 一对多删除

````
class_info = db_session.query(ClassTable).filter(ClassTable.name=="OldBoyS1").first()
db_session.query(Student).filter(Student.class_id == class_info.id).delete()
db_session.commit()

db_session.close()
````

## 多对多

### 模型

`````python
# -*- coding:utf-8 -*-
from sqlalchemy import Column, String, Integer, ForeignKey, create_engine
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base

base_model = declarative_base()

class Hotel(base_model):
    __tablename__ = 'n_hotel'
    id = Column(Integer, primary_key=True)
    girl_id = Column(Integer, ForeignKey('n_girl.id'))
    body_id = Column(Integer, ForeignKey('n_boy.id'))

class Girl(base_model):
    __tablename__ = 'n_girl'
    id = Column(Integer, primary_key=True)
    name = Column(String(32), index=True)

    boys = relationship('Boy', secondary='hotel', backref='girl2boy')

class Boy(base_model):
    __tablename__ = 'n_boy'
    id = Column(Integer, primary_key=True)
    name = Column(String(32), index=True)

engine = create_engine("mysql+cymysql://root:root@127.0.0.1:3310/test")
# dbsession = base_model.metadata.create_all(engine)
Dbsession = sessionmaker(bind=engine)
session = Dbsession()
`````

