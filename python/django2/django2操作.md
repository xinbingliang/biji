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
   from django.urls import path
   from learn import views

   urlpatterns = [
       path('index', views.index),
   ]

   # 或
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
       path('add2/<int:a>/<int:b>/', views.add2, name='add2') # 注意匹配参数方式已经变化
   ]
   ```

   ```python
   from django.shortcuts import render,HttpResponse

   def add2(request, a, b):
       c = int(a) + int(b)
       return HttpResponse(str(c))
   ```

   * http://127.0.0.1:8000/learn/add2/2/3/

   | 转换格式类型 | 说明                                       |
   | ------ | ---------------------------------------- |
   | Str    | 匹配除分隔符（/）外的非空字符，默认类型<year>等价于<str:year>  |
   | Int    | 匹配0和正整数                                  |
   | Slug   | 匹配字母、数字、横杠、下划线组成的字符串，str的子集              |
   | Uuid   | 匹配格式化的UUID，如075194d3-6885-417e-a8a8-6c931e272f00 |
   | path   | 匹配任何非空字符串，包括路径分隔符，是全集                    |

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

### 模板中的逻辑操作

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
* `apt-get install libmysqlclient-dev python3-dev `
* `pip3 install mysqlclient` 安装客户端

### 创建模型对象

````python
# mysite/learn/models.py
from django.db import models

class Person(models.Model):
    name = models.CharField(max_length=30)
    age = models.IntegerField()
    
    class Meta:
        verbose_name = u"人类表" # 数据表名称
        verbose_name_plural = verbose_name # 避免加S
        db_table = "user_message" # 自定义表名称
        ordering = '-object_id' # 使用id进行倒叙
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

* `ManyToManyField` 使用set添加对象`entry.authors.set(Author.objects.all()[0:1])`，使用时该对象id需要先生成，添加的数据必须是列表

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

## QuerySet进阶

### models

```python
from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=50)
    qq = models.CharField(max_length=10)
    address = models.TextField()
    email = models.EmailField()

    def __str__(self):
        return self.name


class Article(models.Model):
    title = models.CharField(max_length=50)
    author = models.ForeignKey(Author, on_delete=models.DO_NOTHING)
    content = models.TextField()
    score = models.IntegerField()
    tags = models.ManyToManyField('tag')

    def __str__(self):
        return self.title


class Tag(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

```

### 添加测试数据

* `python3 manage.py shell` 

  ```python
  import random
  from blog.models import Author,Article,Tag

  author_name_list = ['WeizhongTu', 'twz915', 'dachui', 'zhe', 'zhen']
  article_title_list = ['Django 教程', 'Python 教程', 'HTML 教程']

  for author_name in author_name_list:
    author, created = Author.objects.get_or_create(name=author_name)
    # 随机生成9位数的QQ，
    author.qq = ''.join(
    str(random.choice(range(10))) for _ in range(9)
    )
    author.addr = 'addr_%s' % (random.randrange(1, 3))
    author.email = '%s@ziqiangxuetang.com' % (author.addr)
    author.save()
    
  # 随机生成文章
  for article_title in article_title_list:
    # 从文章标题中得到 tag
    tag_name = article_title.split(' ', 1)[0]
    tag, created = Tag.objects.get_or_create(name=tag_name)
    random_author = random.choice(Author.objects.all())
   
   	for i in range(1, 21):
        title = '%s_%s' % (article_title, i)
        article, created = Article.objects.get_or_create(
  			title=title, defaults={
  				'author': random_author,  # 随机分配作者
                  'content': '%s 正文' % title,
                  'score': random.randrange(70, 101),  # 随机给文章一个打分
  			}
      )
      article.tags.add(tag)
  ```

### 查看 `Django queryset`执行的 `SQL`

* `str(Author.objects.all().query)` 查看执行的SQL语句
* `str(Author.objects.filter(name="WeizhongTu").query)` 

### values_list 获取元组形式结果

```python
In [13]: Author.objects.values_list('name', 'qq')
Out[13]: <QuerySet [('WeizhongTu', '542618033'), ('twz915', '177212133'), ('dachui', '288837236'), ('zhe', '750864042'), ('zhen', '410985914')]>
  
In [14]: authors = Author.objects.values_list('name', 'qq')

In [15]: list(authors)
Out[15]: 
[('WeizhongTu', '542618033'),
 ('twz915', '177212133'),
 ('dachui', '288837236'),
 ('zhe', '750864042'),
 ('zhen', '410985914')]

In [16]: Author.objects.values_list('name', flat=True)
Out[16]: <QuerySet ['WeizhongTu', 'twz915', 'dachui', 'zhe', 'zhen']>
```

### values获取字典形式的结果

````python
In [17]: Author.objects.values('name', 'qq')
Out[17]: <QuerySet [{'qq': '542618033', 'name': 'WeizhongTu'}, {'qq': '177212133', 'name': 'twz915'}, {'qq': '288837236', 'name': 'dachui'}, {'qq': '750864042', 'name': 'zhe'}, {'qq': '410985914', 'name': 'zhen'}]>

In [18]: list(Author.objects.values('name', 'qq'))
Out[18]: 
[{'qq': '542618033', 'name': 'WeizhongTu'},
 {'qq': '177212133', 'name': 'twz915'},
 {'qq': '288837236', 'name': 'dachui'},
 {'qq': '750864042', 'name': 'zhe'},
 {'qq': '410985914', 'name': 'zhen'}]
````

1. values_list 和 values 返回的并不是真正的 列表 或 字典，也是 queryset，他们也是 lazy evaluation 的（惰性评估，通俗地说，就是用的时候才真正的去数据库查）
2. 如果查询后没有使用，在数据库更新后再使用，你发现得到在是新内容！！！如果想要旧内容保持着，数据库更新后不要变，可以 list 一下
3. 如果只是遍历这些结果，没有必要 list 它们转成列表（浪费内存，数据量大的时候要更谨慎！！！）

### extra 实现别名、条件、排序

````python
# 实现别名
In [22]: str(Tag.objects.all().extra(select={'tag_name': 'name'}).query) # Tag.objects.all().extra(select={'tag_name': 'name'}).query.__str__()
Out[22]: 'SELECT (name) AS `tag_name`, `blog_tag`.`id`, `blog_tag`.`name` FROM `blog_tag`'

In [24]: tags = Tag.objects.all().extra(select={'tag_name': 'name'})
In [25]: tags[0].name
Out[25]: 'Django'
In [26]: tags[0].tag_name
Out[26]: 'Django'

# 只查询一次tag_name，不查询name
In [28]: Tag.objects.all().extra(select={'tag_name': 'name'}).defer('name').query.__str__() 
Out[28]: 'SELECT (name) AS `tag_name`, `blog_tag`.`id` FROM `blog_tag`'
````

### annotate 聚合计数、求和、平均数

````python
# 计数
In [29]: from django.db.models import Count

In [30]: Article.objects.all().values('author_id').annotate(count=Count('author')).values('author_id', 'count')
Out[30]: <QuerySet [{'count': 40, 'author_id': 3}, {'count': 20, 'author_id': 5}]>

In [31]: Article.objects.all().values('author_id').annotate(count=Count('author')).values('author_id', 'count').query.__str__()
Out[31]: 'SELECT `blog_article`.`author_id`, COUNT(`blog_article`.`author_id`) AS `count` FROM `blog_article` GROUP BY `blog_article`.`author_id` ORDER BY NULL'

In [33]: Article.objects.all().values('author__name').annotate(count=Count('author')).values('author__name', 'count')
Out[33]: <QuerySet [{'count': 40, 'author__name': 'dachui'}, {'count': 20, 'author__name': 'zhen'}]>
  
# 求和
In [35]: Article.objects.values('author_id').annotate(avg_score=Avg('score')).values('author_id', 'avg_score')
Out[35]: <QuerySet [{'avg_score': 84.075, 'author_id': 3}, {'avg_score': 84.75, 'author_id': 5}]>

In [36]: Article.objects.values('author_id').annotate(avg_score=Avg('score')).values('author_id', 'avg_score').query.__str__()
Out[36]: 'SELECT `blog_article`.`author_id`, AVG(`blog_article`.`score`) AS `avg_score` FROM `blog_article` GROUP BY `blog_article`.`author_id` ORDER BY NULL'

#平均值
In [37]: from django.db.models import Sum

In [38]: Article.objects.values('author__name').annotate(sum_score=Sum('score')).values('author__name', 'sum_score')
Out[38]: <QuerySet [{'sum_score': 3363, 'author__name': 'dachui'}, {'sum_score': 1695, 'author__name': 'zhen'}]>

In [39]: Article.objects.values('author__name').annotate(sum_score=Sum('score')).values('author__name', 'sum_score').query.__str__()
Out[39]: 'SELECT `blog_author`.`name`, SUM(`blog_article`.`score`) AS `sum_score` FROM `blog_article` INNER JOIN `blog_author` ON (`blog_article`.`author_id` = `blog_author`.`id`) GROUP BY `blog_author`.`name` ORDER BY NULL'
````

### select_related 优化一对一，多对一查询

这样当 DEBUG 为 True 的时候，我们可以看出 django 执行了什么 SQL 语句

```python
# settings.py 尾部加上
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django.db.backends': {
            'handlers': ['console'],
            'level': 'DEBUG' if DEBUG else 'INFO',
        },
    },
}

# 查询文章时连作者也查询出来
In [3]: articles = Article.objects.all().select_related('author')[:10]

In [4]: a1=articles[0]
(0.001) SELECT `blog_article`.`id`, `blog_article`.`title`, `blog_article`.`author_id`, `blog_article`.`content`, `blog_article`.`score`, `blog_author`.`id`, `blog_author`.`name`, `blog_author`.`qq`, `blog_author`.`address`, `blog_author`.`email` FROM `blog_article` INNER JOIN `blog_author` ON (`blog_article`.`author_id` = `blog_author`.`id`) LIMIT 1; args=()

In [5]: a1.title
Out[5]: 'Django 教程_1'
  
In [6]: a1.author.name
Out[6]: 'dachui'
```

### prefetch_related 优化一对多，多对多查询

prefetch_related 用于 一对多，多对多；prefetch_related是通过再执行一条额外的SQL语句，然后用 Python 把两次SQL查询的内容关联（joining)到一起

````python
In [3]: articles = Article.objects.all().prefetch_related('tags')[:10]

In [4]: articles
(0.001) SELECT @@SQL_AUTO_IS_NULL; args=None
(0.011) SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED; args=None
(0.084) SELECT `blog_article`.`id`, `blog_article`.`title`, `blog_article`.`author_id`, `blog_article`.`content`, `blog_article`.`score` FROM `blog_article` LIMIT 10; args=()
(0.001) SELECT VERSION(); args=None
(0.076) SELECT (`blog_article_tags`.`article_id`) AS `_prefetch_related_val_article_id`, `blog_tag`.`id`, `blog_tag`.`name` FROM `blog_tag` INNER JOIN `blog_article_tags` ON (`blog_tag`.`id` = `blog_article_tags`.`tag_id`) WHERE `blog_article_tags`.`article_id` IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10); args=(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
Out[4]: <QuerySet [<Article: Django 教程_1>, <Article: Django 教程_2>, <Article: Django 教程_3>, <Article: Django 教程_4>, <Article: Django 教程_5>, <Article: Django 教程_6>, <Article: Django 教程_7>, <Article: Django 教程_8>, <Article: Django 教程_9>, <Article: Django 教程_10>]>

In [5]: articles = Article.objects.all()[:3]

In [6]: articles
(0.002) SELECT `blog_article`.`id`, `blog_article`.`title`, `blog_article`.`author_id`, `blog_article`.`content`, `blog_article`.`score` FROM `blog_article` LIMIT 3; args=()
Out[6]: <QuerySet [<Article: Django 教程_1>, <Article: Django 教程_2>, <Article: Django 教程_3>]>

In [7]: articles = Article.objects.all().prefetch_related('tags')[:3]

In [8]: for a in articles:
   ...:     print(a.title, '<-->', a.tags.all())
   ...:     
(0.001) SELECT `blog_article`.`id`, `blog_article`.`title`, `blog_article`.`author_id`, `blog_article`.`content`, `blog_article`.`score` FROM `blog_article` LIMIT 3; args=()
(0.003) SELECT (`blog_article_tags`.`article_id`) AS `_prefetch_related_val_article_id`, `blog_tag`.`id`, `blog_tag`.`name` FROM `blog_tag` INNER JOIN `blog_article_tags` ON (`blog_tag`.`id` = `blog_article_tags`.`tag_id`) WHERE `blog_article_tags`.`article_id` IN (1, 2, 3); args=(1, 2, 3)
Django 教程_1 <--> <QuerySet [<Tag: Django>]>
Django 教程_2 <--> <QuerySet [<Tag: Django>]>
Django 教程_3 <--> <QuerySet [<Tag: Django>]>
````

### defer 排除不需要的字段

在复杂的情况下，表中可能有些字段内容非常多，取出来转化成 Python 对象会占用大量的资源。

这时候可以用 defer 来排除这些字段，比如我们在文章列表页，只需要文章的标题和作者，没有必要把文章的内容也获取出来（因为会转换成python对象，浪费内存）

```python
In [9]: Article.objects.all()

In [10]: Article.objects.all().defer('content')
```

### only仅选择需要的字段

和 defer 相反，only 用于取出需要的字段，假如我们只需要查出 作者的名称

```
In [13]: Author.objects.all().only('name')
```

### 自定义聚合功能

## 自定义Field

````python
# 自定义文件fields.py
# -*- coding: utf-8 -*-
from django.db import models
import ast

class CompressedTextField(models.TextField):
    # __metaclass__ = models.SubfieldBase

    def to_python(self, value):
        if not value:
            return value

        try:
            return value.decode('base64').decode('bz2').decode('utf-8')
        except Exception:
            return value

    def get_prep_value(self, value):
        if not value:
            return value

        try:
            value.decode('base64')
            return value
        except Exception:
            try:
                tmp = value.encode('utf-8').encode('bz2').encode('base64')
            except Exception:
                return value
            else:
                if len(tmp) > len(value):
                    return value
                return tmp


class ListField(models.TextField):
    # __metaclass__ = models.SubfieldBase
    description = "Stores a python list"

    def __init__(self, *args, **kwargs):
        super(ListField, self).__init__(*args, **kwargs)

    def to_python(self, value):
        if not value:
            value = []

        if isinstance(value, list):
            return value

        return ast.literal_eval(value)

    def get_prep_value(self, value):
        if value is None:
            return value

        return unicode(value)

    def value_to_string(self, obj):
        value = self._get_val_from_obj(obj)
        return self.get_db_prep_value(value)
````

````python
from django.db import models
from .fields import CompressedTextField, ListField

class Article(models.Model):
    labels = ListField()
    content = CompressedTextField(null=True, default='')
````

```python
# test
>>> from app.models import Article
>>> d = Article()
>>> d.labels
[]
>>> d.labels = ["Python", "Django"]
>>> d.labels
["Python", "Django"]

# ***************
>>> from blog.models import Article
 
>>> a = Article()
>>> a.labels.append('Django')
>>> a.labels.append('custom fields')
 
>>> a.labels
['Django', 'custom fields']
 
>>> type(a.labels)
<type 'list'>
 
>>> a.content = u'我正在写一篇关于自定义Django Fields的教程'
>>> a.save()
```

## 后台



