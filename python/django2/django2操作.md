# django2 基本操作

[文档](https://code.ziqiangxuetang.com/django/django-tutorial.html)

## 基础操作

1. `django-admin startproject mysite`

2. `cd mysite && python3 manage.py startapp learn`

3. 添加应用

   ```python
   INSTALLED_APPS = (
       'django.contrib.admin',
       'django.contrib.auth',
       'django.contrib.contenttypes',
       'django.contrib.sessions',
       'django.contrib.messages',
       'django.contrib.staticfiles',
    
       'learn',
   )
   ```

4. 视图函数

   ```python
   from django.shortcuts import render,HttpResponse

   # Create your views here.
   def index(request):
       return HttpResponse(u"Hello world")
   ```

5. 路由

   ````python
   # mysite/urls.py
   from django.contrib import admin
   from django.urls import path,include

   urlpatterns = [
       path('admin/', admin.site.urls),
       path('learn/', include("learn.urls")),
   ]

   # 或
   from django.contrib import admin
   from django.urls import path,include

   urlpatterns = [
       path('admin/', admin.site.urls),
       path('learn/', include(("learn.urls", 'mylearn'), namespace="mylearn")),
   ]
   ````

   ````python
   # learn/urls.py
   from django.contrib import admin
   from django.urls import path
   from learn import views

   urlpatterns = [
       path('index', views.index),
   ]

   # 或
   from django.contrib import admin
   from django.urls import path
   from learn import views

   urlpatterns = [
       path('index', views.index, name='index'),
   ]
   ````

## 路由 

1. GET传递参数

   ```python
   # learn/urls.py
   from django.contrib import admin
   from django.urls import path
   from learn import views

   urlpatterns = [
       path('add/', views.add, name='add')
   ]
   ```

   ````python
   from django.shortcuts import render,HttpResponse

   def add(request):
       a = request.GET['a']
       b = request.GET['b']
       c = int(a)+int(b)

       return HttpResponse(str(c))
   ````

   * http://127.0.0.1:8000/learn/add/?a=1&b=2

2. 路由方式传递

   ```python
   # learn/urls.py
   from django.contrib import admin
   from django.urls import path
   from learn import views

   urlpatterns = [
       path('add2/<int:a>/<int:b>/', views.add2, name='add2')
   ]
   ```

   ```python
   from django.shortcuts import render,HttpResponse

   def add2(request, a, b):
       c = int(a) + int(b)
       return HttpResponse(str(c))
   ```

   * http://127.0.0.1:8000/learn/add2/2/3/

3. 使用URL_name

   ```python
   # learn/urls.py
   from django.contrib import admin
   from django.urls import path
   from learn import views

   urlpatterns = [
       path('index/', views.index),
       path('add2/<int:a>/<int:b>/', views.add2, name='add2')
   ]
   ```

   ```html
   //learn/templates/home.html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <title>Title</title>
   </head>
   <body>
   <a href="{% url 'mylearn:add2' 12 14 %}">test</a>
   </body>
   </html>
   ```

   ````python
   from django.shortcuts import render,HttpResponse

   def index(request):
       return render(request, 'home.html')

   def add2(request, a, b):
   	c = int(a) + int(b)
      	return HttpResponse(str(c))
   ````


   ````python
	# 自定义一个跳转
   # views.py
   from django.http import HttpResponseRedirect
   from django.core.urlresolvers import reverse  # Django 1.4.x - Django 1.10.x
   #  from django.urls import reverse  # Django 1.10.x - Django 2.x
    
    
   def old_add2_redirect(request, a, b):
       return HttpResponseRedirect(
           reverse('add2', args=(a, b))
       )
       
   # urls.py
   url(r'^add/(\d+)/(\d+)/$', calc_views.old_add2_redirect), # 原来的链接，被解析到新的位置
   url(r'^new_add/(\d+)/(\d+)/$', calc_views.add2, name='add2'),
   ````

## 模版

### for循环和List内容显示

```python
def index(request):
    myList = ["HTML", "CSS", "jQuery", "Python", "Django"]
    return render(request, 'home.html', {'myList': myList})
```

```html
<body>
{% for item in myList %}
    {{item}}
{% endfor %}
</body>
```

### 条件判断和 for 循环

```python
# -*- coding: utf-8 -*-
from django.shortcuts import render,HttpResponse

def index(request):
    List = map(str, range(100))
    return render(request, 'home.html', {'List': List})
  
  
<body>
{% for item in List %}
    {{item}}
    {% if not forloop.last %}
        ,
    {% endif %}
{% endfor %}
</body>
```

```html
# 列表中的空值
{% for athlete in athlete_list %}
    <li>{{ athlete.name }}</li>
{% empty %}
    <li>抱歉，列表为空</li>
{% endfor %}
```

|   forloop.counter   |              索引从 1 开始算               |
| :-----------------: | :----------------------------------: |
|  forloop.counter0   |              索引从 0 开始算               |
| forloop.revcounter  |              索引从最大长度到 1              |
| forloop.revcounter0 |              索引从最大长度到 0              |
|    forloop.first    |            当遍历的元素为第一项时为真             |
|    forloop.last     |            当遍历的元素为最后一项时为真            |
| forloop.parentloop  | 用在嵌套的 for 循环中， 获取上一层 for 循环的 forloop |

###模板中的逻辑操作

 ==, !=, >=, <=, >, < 这些比较都可以在模板中使用

and, or, not, in, not in 也可以在模板中使用

```
# 判断num是不是在0到100之间
{% if num <= 100 and num >= 0 %}
num在0到100之间
{% else %}
数值不在范围之内！
{% endif %}

# 判断'ziqiangxuetang'在不在一个列表变量List中
{% if 'ziqiangxuetang' in List %}
自强学堂在名单中
{% endif %}
```

## 模型

### 安装软件

* `pip3 install PyMySQL`
* pip3 install mysqlclient` 安装客户端

### 创建模型对象

````python
# mysite/learn/models.py
from django.db import models

class Person(models.Model):
    name = models.CharField(max_length=30)
    age = models.IntegerField()
````

### 生成表

* `python manage.py makemigrations`
* `python manage.py migrate`

### 测试

*  python manage.py shell
*  `from people.models import  Person`
*  `Person.objects.create(name="WeizhongTu", age=24)`
*  ``Person.objects.get(name``=``"WeizhongTu"``)`
*  `Person.objects.get(name="WeizhongTu")`

### 显示出名称

```python
from django.db import models

class Person(models.Model):
    name = models.CharField(max_length=30)
    age = models.IntegerField()

    def __str__(self):
      # 在Python3中使用 def __unicode__(self):
        return self.name
```

### 新建一个对象的操作

```python
Person.objects.create(name=name,age=age)
```

```
p = Person(name="WZ", age=23)
p.save()
```

```
p = Person(name="TWZ")
p.age = 23
p.save()
```

```
Person.objects.get_or_create(name="WZT", age=23)
```

### 获取对象的方法

* `Person.objects.all()`
* `Person.objects.all()[:10]` 切片操作，获取10个人，不支持负索引，切片可以节约内存
* `Person.objects.get(name=name)` 是用来获取一个对象的
* `Person.objects.filter(name="abc")`  等于Person.objects.filter(name__exact="abc") 名称严格等于 "abc" 的人
* `Person.objects.filter(name__iexact="abc")` 名称为 abc 但是不区分大小写，可以找到 ABC, Abc, aBC，这些都符合条件
* `Person.objects.filter(name__contains="abc")` 名称中包含 "abc"的人
* `Person.objects.filter(name__icontains="abc")` 名称中包含 "abc"，且abc不区分大小写
* `Person.objects.filter(name__regex="^abc") ` 正则表达式查询
* `Person.objects.filter(name__iregex="^abc")` 正则表达式不区分大小写 filter是找出满足条件的
* `Person.objects.exclude(name__contains="WZ")` 排除包含 WZ 的Person对象
* `Person.objects.filter(name__contains="abc").exclude(age=23)` 找出名称含有abc, 但是排除年龄是23岁的

## Django QuerySet

### 创建模型

````python
from django.db import models

class Blog(models.Model):
    name = models.CharField(max_length=100)
    tagline = models.TextField()

    def __str__(self):
        return self.name

class Author(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()

    def __str__(self):
        return self.name

class Entry(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    headline = models.CharField(max_length=255)
    body_text = models.TextField()
    pub_date = models.DateField()
    authors = models.ManyToManyField(Author)
    n_comments = models.IntegerField()
    n_pingbacks = models.IntegerField()
    rating = models.IntegerField()

    def __str__(self):
        return self.headline
````

### 模型创建时外键参考

````python
on_delete=None,               # 删除关联表中的数据时,当前表与其关联的field的行为
on_delete=models.CASCADE,     # 删除关联数据,与之关联也删除
on_delete=models.DO_NOTHING,  # 删除关联数据,什么也不做
on_delete=models.PROTECT,     # 删除关联数据,引发错误ProtectedError
# models.ForeignKey('关联表', on_delete=models.SET_NULL, blank=True, null=True)
on_delete=models.SET_NULL,    # 删除关联数据,与之关联的值设置为null（前提FK字段需要设置为可空,一对一同理）
# models.ForeignKey('关联表', on_delete=models.SET_DEFAULT, default='默认值')
on_delete=models.SET_DEFAULT, # 删除关联数据,与之关联的值设置为默认值（前提FK字段需要设置默认值,一对一同理）
on_delete=models.SET,         # 删除关联数据,
 a. 与之关联的值设置为指定值,设置：models.SET(值)
 b. 与之关联的值设置为可执行对象的返回值,设置：models.SET(可执行对象)
````

### 创建对象的方法

````python
from blog.models import Blog
b = Blog(name='Beatles Blog', tagline='All the latest Beatles news.')
b.save()
 
总之，一共有四种方法
# 方法 1
Author.objects.create(name="WeizhongTu", email="tuweizhong@163.com")
 
# 方法 2
twz = Author(name="WeizhongTu", email="tuweizhong@163.com")
twz.save()
 
# 方法 3
twz = Author()
twz.name="WeizhongTu"
twz.email="tuweizhong@163.com"
twz.save()
 
# 方法 4，首先尝试获取，不存在就创建，可以防止重复
Author.objects.get_or_create(name="WeizhongTu", email="tuweizhong@163.com")
# 返回值(object, True/False)

# 备注：前三种方法返回的都是对应的 object，最后一种方法返回的是一个元组，(object, True/False)，创建时返回 True, 已经存在时返回 False

# 当有一对多，多对一，或者多对多的关系的时候，先把相关的对象查询出来
from blog.models import Entry
entry = Entry.objects.get(pk=1)
cheese_blog = Blog.objects.get(name="Cheddar Talk")
entry.blog = cheese_blog
entry.save()
````

### 获取对象方法

```python
Person.objects.all() # 查询所有
Person.objects.all()[:10] 切片操作，获取10个人，不支持负索引，切片可以节约内存，不支持负索引，后面有相应解决办法，第7条
Person.objects.get(name="WeizhongTu") # 名称为 WeizhongTu 的一条，多条会报错
 
get是用来获取一个对象的，如果需要获取满足条件的一些人，就要用到filter
Person.objects.filter(name="abc") # 等于Person.objects.filter(name__exact="abc") 名称严格等于 "abc" 的人
Person.objects.filter(name__iexact="abc") # 名称为 abc 但是不区分大小写，可以找到 ABC, Abc, aBC，这些都符合条件
 
Person.objects.filter(name__contains="abc") # 名称中包含 "abc"的人
Person.objects.filter(name__icontains="abc") #名称中包含 "abc"，且abc不区分大小写
 
Person.objects.filter(name__regex="^abc") # 正则表达式查询
Person.objects.filter(name__iregex="^abc")# 正则表达式不区分大小写
 
# filter是找出满足条件的，当然也有排除符合某条件的
Person.objects.exclude(name__contains="WZ") # 排除包含 WZ 的Person对象
Person.objects.filter(name__contains="abc").exclude(age=23) # 找出名称含有abc, 但是排除年龄是23岁的
```

### 删除符合条件的结果

和上面类似，得到满足条件的结果，然后 delete 就可以(危险操作，正式场合操作务必谨慎)

```python
Person.objects.filter(name__contains="abc").delete() # 删除 名称中包含 "abc"的人
 
如果写成 
people = Person.objects.filter(name__contains="abc")
people.delete()
效果也是一样的，Django实际只执行一条 SQL 语句。
```

### 更新某个内容

批量更新，适用于 .all()  .filter()  .exclude() 等后面

```python
Person.objects.filter(name__contains="abc").update(name='xxx') # 名称中包含 "abc"的人 都改成 xxx
Person.objects.all().delete() # 删除所有 Person 记录
```

单个 object 更新，适合于 .get(), get_or_create(), update_or_create() 等得到的 obj，和新建很类似

```
twz = Author.objects.get(name="WeizhongTu")
twz.name="WeizhongTu"
twz.email="tuweizhong@163.com"
twz.save()  # 最后不要忘了保存！！！
```

### QuerySet 是可迭代的

```
es = Entry.objects.all()
for e in es:
    print(e.headline)
```

*  如果只是检查 Entry 中是否有对象，应该用 Entry.objects.all().exists()
*  QuerySet 支持切片 Entry.objects.all()[:10] 取出10条，可以节省内存
*  用 len(es) 可以得到Entry的数量，但是推荐用 Entry.objects.count()来查询数量，后者用的是SQL：SELECT COUNT(\*)
*  list(es) 可以强行将 QuerySet 变成 列表

### QuerySet 查询结果排序

```
Author.objects.all().order_by('name')
Author.objects.all().order_by('-name') # 在 column name 前加一个负号，可以实现倒序
```

### QuerySet 支持链式查询

````
Author.objects.filter(name__contains="WeizhongTu").filter(email="tuweizhong@163.com")
Author.objects.filter(name__contains="Wei").exclude(email="tuweizhong@163.com")
 
# 找出名称含有abc, 但是排除年龄是23岁的
Person.objects.filter(name__contains="abc").exclude(age=23)
````

### QuerySet 不支持负索引

```
Person.objects.all()[:10] 切片操作，前10条
Person.objects.all()[-10:] 会报错！！！
 
# 1. 使用 reverse() 解决
Person.objects.all().reverse()[:2] # 最后两条
Person.objects.all().reverse()[0] # 最后一条
 
# 2. 使用 order_by，在栏目名（column name）前加一个负号
Author.objects.order_by('-id')[:20] # id最大的20条
```

### QuerySet 重复的问题，使用 .distinct() 去重

````
qs1 = Pathway.objects.filter(label__name='x')
qs2 = Pathway.objects.filter(reaction__name='A + B >> C')
qs3 = Pathway.objects.filter(inputer__name='WeizhongTu')
 
# 合并到一起
qs = qs1 | qs2 | qs3
这个时候就有可能出现重复的
 
# 去重方法
qs = qs.distinct()
````









