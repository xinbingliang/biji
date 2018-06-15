# django2 基本操作

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



### 获取当前网址，当前用户等











