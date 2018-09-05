# python3之Django多数据库

## 定义数据库

在django项目中, 一个工程中存在多个APP应用很常见；有时候希望不同的APP连接不同的数据库，这个时候需要建立多个数据库连接。
在Django的setting中使用DATABASES设置定义数据库，可以将数据库映射到特定的别名字典中;DATABASES定义的是要给嵌套字典，该设置必须配置default默认数据库。默认使用SQLite进行单一数据库设置：

````python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'mydatabase',
    }
}
````

如不使用默认数据库定义可以将默认配置为空字典形式：

````
'default':{}
````

### DATABASES内部选项：

ATOMIC_REQUESTS：为True时数据库事务包装每个视图，默认为False

AUTOCOMMIT：为False时禁用Django事务管理，默认为True

ENGINE：设置数据库类型

`````
'django.db.backends.postgresql'
'django.db.backends.mysql'
'django.db.backends.sqlite3'
'django.db.backends.oracle'
`````

HOST：指定连接的主机名或ip地址，如果使用（‘/’）正斜杠开头则通过套接字连接：

````
'HOST':'127.0.0.1'   #TCP套接字连接
'HOST':'/var/run/mysql'   #UNIX套接字
````

CONN_MAX_AGE：数据库连接的生命周期，默认为0请求结束时关闭数据库，设置为None无限持久连接。

OPTIONS：链接到数据库时使用的额外参数，可用参数因数据库类型而异。

````
'OPTIONS':{'read_default_file':'path/to/my.cnf',} #优先于NAME,USER,PASSWORD,HOST,PORT

#设置mysql启用严格模式
'OPTIONS':{'init_command':"SET sql_mode='STRICT_TRANS_TABLES'"}
````

PASSWORD：设置密码，不与SQLite一起使用

PORT：指定端口

TIME_ZONE：设置时区

DISABLE_SERVER_SIDE_CURSORS：True时禁用服务器端游标

USER：链接用户名

TEST：测试数据库

### 自定义数据库

`````python
#自定义两个mysql数据库映射到db1和db2上
'db1':{
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'db1',
        'USER': 'root',
        'PASSWORD': '123.com',
        'HOST': '172.16.32.133',
        'PORT': '3306',
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'", 
        },   #mysql使用严格模式，不指定会有警告信息
    },
    'db2':{
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'db2',
        'USER': 'root',
        'PASSWORD': '123.com',
        'HOST': '172.16.32.133',
        'PORT': '3306',
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        }
`````

如果访问没有在DATABASES中定义的数据库，Django会报:django.db.utils.ConnectionDoesNotExist 异常。

## 同步数据库

migrate管理命令会同时在每一个数据库上运行，默认情况下它在default数据库上运行 ，可以通过选项 --database来指定需要同步的数据库。如不指定会同步到default数据库上。

迁移同步命令：

makemigrations：根据简称到的变化创建新的迁移。

migrate：将模型和迁移数据同步到数据库中。

通过上面的列子，将每个应用程序同步到特定的数据库：

````
#python manage.py migrate   #同步默认数据库
#python manage.py migrate --database=db1
#python manage.py migrate --database=db2
````

多个数据库导出：

```
python manage.py dumpdata app01 --database=db1 > app1_fixture.json
python manage.py dumpdata app02 --database=db2 > app2_fixture.json
python manage.py dumpdata auth > auth_fixture.json
```

多个数据库导入：

```
python manage.py loaddata app1_fixture.json --database=db1
python manage.py loaddata app2_fixture.json --database=db2
```

## 自动数据库路由

使用多个数据库时最简单的方法是设置数据库路由方案，以保证对象对原始数据库的“粘性",默认所有的查询都会返回到default数据库中。

数据库路由器是一个最多提供四种方法的类：

 db_for_read(model,**hints)  ：应用于读取类型对象的数据库模型，如果数据库提供附加信息会在hints字典中提供，最后如果没有则返回None

db_for_write(model,**hints)：应用于写入类型对象的数据库模型，hints字典提供附加信息，如果没有则返回None

allow_relation(obj1,obj2,**hints)：外键操作，判断两个对象之间是否是应该允许关系，是返回True,否则返回False，如果路由允许返回None

allow_migrate(db,app_label,model_name=None,**hints)：db确定是否允许在具有别名的数据库上运行迁移操作，操作运行返回True，否则返回False，或者返回None，如果路由器没有意见。

app_label：位置参数是正在迁移的应用程序的标签。

model_name：多个迁移操作设置模型的值，如：model._meta.app_label

### 定义数据库路由方法类

在项目工程根路径下(与 settings.py 文件一级）创建数据库路由表，app应用会根据指定的路由选择数据库：

app01，app02分别使用db1和db2数据库：

````python
#!/usr/bin/env python
#coding:utf8
from django.conf import settings

DATABASE_MAPPING = settings.DATABASE_APPS_MAPPING   #在setting中定义的路由表

class DatabaseAppsRouter(object):
    def db_for_read(self, model, **hints):
        if model._meta.app_label in DATABASE_MAPPING:
            return DATABASE_MAPPING[model._meta.app_label]
        return None

    def db_for_write(self, model, **hints):
        
        if model._meta.app_label in DATABASE_MAPPING:
            return DATABASE_MAPPING[model._meta.app_label]
        return None

    def allow_relation(self, obj1, obj2, **hints):
       
        db_obj1 = DATABASE_MAPPING.get(obj1._meta.app_label)
        db_obj2 = DATABASE_MAPPING.get(obj2._meta.app_label)
        if db_obj1 and db_obj2:
            if db_obj1 == db_obj2:
                return True
            else:
                return False
        return None

    def allow_syncdb(self, db, model):

        if db in DATABASE_MAPPING.values():
            return DATABASE_MAPPING.get(model._meta.app_label) == db
        elif model._meta.app_label in DATABASE_MAPPING:
            return False
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if db in DATABASE_MAPPING.values():
            return DATABASE_MAPPING.get(app_label) == db
        elif app_label in DATABASE_MAPPING:
            return False
        return None
````

### 使用路由数据库

在setting.py中配置DATABASE_ROUTERS指定自由路由文件：

```
#test_django为项目名，database_router为路由文件名，DatabaseAppsRouter为路由中创建的类名

DATABASE_ROUTERS = ['test_django.database_router.DatabaseAppsRouter']
```

在setting.py中DATABASE_ROUTERS下面设置app与数据库匹配路由表，采用字典方式app名对应数据库映射名：

````
DATABASE_APPS_MAPPING = {
     'app01':'db1',
     'app02':'db2',
　　
 }
````

### 生成数据表并同步数据

分别在app01和app02下创建model类，用于生成数据表：

app01:

````python
from django.db import models

# Create your models here.
class ap1(models.Model):
    username = models.CharField(max_length=30)
    class Meta:
        #app_label = 'app02'  #如果指定将在app02对应的数据库下创建数据表

class ap2(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    birth_date = models.DateField()
````

app02:

````python
from django.db import models

class ap3(models.Model):
    app2_name = models.CharField(max_length=50)
    sex = models.CharField(max_length=50)
    data = models.DateField()

class ap4(models.Model):
    app2 = models.CharField(max_length=50)
    sex1 = models.CharField(max_length=50)
    data1 = models.DateField()
    class Meta:
        db_table = 'mytable' #自定义表名称
````

migrate管理命令一次只能操作一个数据库，默认操作default数据库，使用--database指定同步的数据库：

```
#python manage.py migrate  #生成表数据同步
#python manage.py makemigrations #创建变动数据
#python manage.py migrate --database=db1 #同步指定数据库
#python manage.py migrate --database=db2
```

需要注意：在多个app分库时，必须指定每个app对应的数据库，否则在同步数据 库时将没指定的app模板都同步到同步数据库中。

## 手动选择数据库

使用using()指定查询的数据库的别名：

````
>>> # So will this.
>>> Author.objects.using('default').all()

>>> # This will run on the 'other' database.
>>> Author.objects.using('other').all()
````

保存数据，Model.save()指定将数据保存到哪个数据库中：

````
>>> my_object.save(using='legacy_users')

#会将数据保存到legacy_users数据库中，如不指定会保持到默认数据库中。

>>> my_object.delete(using='legacy_users')
#删除指定数据库
````

移动对象到另一个数据库时会发生主键冲突，可以使用obj.pk方法清除主键再保存对象。

```
>>> p = Person(name='Fred')
>>> p.save(using='first')
>>> p.pk = None # Clear the primary key.
>>> p.save(using='second') # Write a 
```

