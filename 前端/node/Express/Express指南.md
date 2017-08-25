# Express指南

## 开始

````javascript
'use strict';
const express = require('express');
let app = express();

app.get('/', function(req, res){
    res.send('Hello World!');
});

let server = app.listen(8080, function(){
    let host = server.address().address;
    let port = server.address().port;

    console.log(server.address());
});
````

## 应用生成器

通过应用生成器工具 `express` 可以快速创建一个应用的骨架。

通过如下命令安装：

```shell
$ npm install express-generator -g
```

`-h` 选项可以列出所有可用的命令行选项：

```shell
$ express -h

  Usage: express [options] [dir]

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -e, --ejs           add ejs engine support (defaults to jade)
        --hbs           add handlebars engine support
    -H, --hogan         add hogan.js engine support
    -c, --css <engine>  add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory
```

例如，下面的示例就是在当前工作目录下创建一个命名为 *myapp* 的应用。

```shell
$ express myapp

   create : myapp
   create : myapp/package.json
   create : myapp/app.js
   create : myapp/public
   create : myapp/public/javascripts
   create : myapp/public/images
   create : myapp/routes
   create : myapp/routes/index.js
   create : myapp/routes/users.js
   create : myapp/public/stylesheets
   create : myapp/public/stylesheets/style.css
   create : myapp/views
   create : myapp/views/index.jade
   create : myapp/views/layout.jade
   create : myapp/views/error.jade
   create : myapp/bin
   create : myapp/bin/www
```

然后安装所有依赖包：

```shell
$ cd myapp 
$ npm install
```

启动这个应用（MacOS 或 Linux 平台）：

```shell
$ DEBUG=myapp npm start
```

Windows 平台使用如下命令：

```shell
> set DEBUG=myapp & npm start
```

然后在浏览器中打开 `http://localhost:3000/` 网址就可以看到这个应用了。i

通过 Express 应用生成器创建的应用一般都有如下目录结构：

```shell
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes 
│   ├── index.js
│   └── users.js
└── views
    ├── error.jade
    ├── index.jade
    └── layout.jade

7 directories, 9 files
```

## 基本路由

````javascript
// 对网站首页的访问返回 "Hello World!" 字样
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// 网站首页接受 POST 请求
app.post('/', function (req, res) {
  res.send('Got a POST request');
});

// /user 节点接受 PUT 请求
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

// /user 节点接受 DELETE 请求
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
````

## 静态文件

### 指定静态文件目录

````javascript
app.use(express.static('public'));

// http://localhost:3000/images/kitten.jpg
// http://localhost:3000/css/style.css
// http://localhost:3000/js/app.js
// http://localhost:3000/images/bg.png
// http://localhost:3000/hello.html
````

### 多个静态文件目录

````javascript
app.use(express.static('public'));
app.use(express.static('files'));
````

### 静态虚拟目录

````javascript
app.use('/static', express.static('public'))

// http://localhost:3000/static/images/kitten.jpg
// http://localhost:3000/static/css/style.css
````

## 路由

路由是指如何定义应用的端点（URIs）以及如何响应客户端的请求。

路由是由一个 URI、HTTP 请求（GET、POST等）和若干个句柄组成，它的结构如下： `app.METHOD(path, [callback...], callback)`， `app` 是 `express`对象的一个实例， `METHOD` 是一个 [HTTP 请求方法](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)， `path` 是服务器上的路径， `callback` 是当路由匹配时要执行的函数。

````javascript
'use strict';
const express = require('express');
let app = express();

app.get('/', function(req, res){
    res.send('Hello World!');
});

let server = app.listen(8080, function(){
    let host = server.address().address;
    let port = server.address().port;

    console.log(server.address());
});
````

### 路由方法

Express 定义了如下和 HTTP 请求对应的路由方法： `get`, `post`, `put`, `head`, `delete`, `options`, `trace`, `copy`, `lock`, `mkcol`, `move`, `purge`, `propfind`, `proppatch`, `unlock`, `report`, `mkactivity`, `checkout`, `merge`, `m-search`, `notify`, `subscribe`, `unsubscribe`, `patch`, `search`, 和 `connect`。 `app['m-search']('/'`

```javascript
app.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

app.post('/', function (req, res) {
  res.send('POST request to the homepage');
});
```

`app.all()` 是一个特殊的路由方法，没有任何 HTTP 方法与其对应，它的作用是对于一个路径上的所有请求加载中间件。

```javascript
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});

//用来处理所有没有被捕获的请求
app.all('*',function(req, res){
    console.log('没有定义的请求');
    res.send('404 not found!');
});
```

### 路由路径

#### 字符串路径

````javascript
// 匹配根路径的请求
app.get('/', function (req, res) {
  res.send('root');
});

// 匹配 /about 路径的请求
app.get('/about', function (req, res) {
  res.send('about');
});

// 匹配 /random.text 路径的请求
app.get('/random.text', function (req, res) {
  res.send('random.text');
});
````

#### 字符串模式

?、+、* 和 () 是正则表达式的子集

````javascript
// 匹配 acd 和 abcd
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});

// 匹配 abcd、abbcd、abbbcd等
app.get('/ab+cd', function(req, res) {
  res.send('ab+cd');
});

// 匹配 abcd、abxcd、abRABDOMcd、ab123cd等
app.get('/ab*cd', function(req, res) {
  res.send('ab*cd');
});

// 匹配 /abe 和 /abcde
app.get('/ab(cd)?e', function(req, res) {
 res.send('ab(cd)?e');
});
````

#### 正则表达式

````javascript
// 匹配任何路径中含有 a 的路径：
app.get(/a/, function(req, res) {
  res.send('/a/');
});

// 匹配 butterfly、dragonfly，不匹配 butterflyman、dragonfly man等
app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});
````

### 路由句柄

调用 `next('route')` 方法而略过其他路由回调函数

````javascript
// 一个回调函数处理路由
app.get('/example/a', function(){})
// 多个回调函数处理路由
app.get('/example/b', function(){next();}, function(){})

// 多个处理函数
let cb0 = function(req, res, next){next();}
let cb1 = function(req, res, next){next();}
let cb2 = function(req, res){}
app.get('/example/c', [cb0, cb1, cb2]);

// 混合使用函数和函数处理路由
let cb0 = function(req, res, next){next();}
let cb1 = function(req, res, next){next();}

app.get('/example/d', [cb0, cb1], function(req, res, next){
  next();
}, function(req, res){})
````

### 响应方法

| 方法                                       | 描述                             |
| ---------------------------------------- | ------------------------------ |
| [res.download()](http://www.expressjs.com.cn/4x/api.html#res.download) | 提示下载文件。                        |
| [res.end()](http://www.expressjs.com.cn/4x/api.html#res.end) | 终结响应处理流程。                      |
| [res.json()](http://www.expressjs.com.cn/4x/api.html#res.json) | 发送一个 JSON 格式的响应。               |
| [res.jsonp()](http://www.expressjs.com.cn/4x/api.html#res.jsonp) | 发送一个支持 JSONP 的 JSON 格式的响应。     |
| [res.redirect()](http://www.expressjs.com.cn/4x/api.html#res.redirect) | 重定向请求。                         |
| [res.render()](http://www.expressjs.com.cn/4x/api.html#res.render) | 渲染视图模板。                        |
| [res.send()](http://www.expressjs.com.cn/4x/api.html#res.send) | 发送各种类型的响应。                     |
| [res.sendFile](http://www.expressjs.com.cn/4x/api.html#res.sendFile) | 以八位字节流的形式发送文件。                 |
| [res.sendStatus()](http://www.expressjs.com.cn/4x/api.html#res.sendStatus) | 设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。 |

### app.route()

```javascript
app.route('/book').get(function(){}).post(function(){}).put(function(){})
```

### express.Router

````javascript
//birds.js
var express = require('express');
var router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// 定义网站主页的路由
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// 定义 about 页面的路由
router.get('/about', function(req, res) {	//对应多级子目录
  res.send('About birds');
});

module.exports = router;

//index.js
var birds = require('./birds');

app.use('/birds', birds);
````

## 中间件

**功能**

* 执行任何代码
* 修改请求和响应对象
* 终结请求-响应循环
* 调用堆栈中的下一个中间件

### 应用级中间件

```javascript
var app = express();

// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// 路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});

// 一个中间件栈，对任何指向 /user/:id 的 HTTP 请求打印出相关信息
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});


```

如果需要在中间件栈中跳过剩余中间件，调用 `next('route')`，但接下去的路由还是被执行

```javascript
// 一个中间件栈，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
  // 如果 user id 为 0, 跳到下一个路由
  if (req.params.id == 0) next('route');
  // 否则将控制权交给栈中下一个中间件
  else next(); //
}, function (req, res, next) {
  // 渲染常规页面
  res.render('regular');
});

// 处理 /user/:id， 渲染一个特殊页面
app.get('/user/:id', function (req, res, next) {
  res.render('special');
});
```

### 路由级中间件

```javascript
var app = express();
var router = express.Router();

// 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// 一个中间件栈，显示任何指向 /user/:id 的 HTTP 请求的信息
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// 一个中间件栈，处理指向 /user/:id 的 GET 请求
router.get('/user/:id', function (req, res, next) {
  // 如果 user id 为 0, 跳到下一个路由
  if (req.params.id == 0) next('route');
  // 负责将控制权交给栈中下一个中间件
  else next(); //
}, function (req, res, next) {
  // 渲染常规页面
  res.render('regular');
});

// 处理 /user/:id， 渲染一个特殊页面
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});

// 将路由挂载至应用
app.use('/', router);
```

### 错误处理中间件

```javascript
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

### 内置中间件

#### express.static(root, [options])

`express.static` 是 Express 唯一内置的中间件。它基于 [serve-static](https://github.com/expressjs/serve-static)，负责在 Express 应用中提托管静态资源。

参数 `root` 指提供静态资源的根目录。

可选的 `options` 参数拥有如下属性。

| 属性             | 描述                                       | 类型       | 缺省值          |
| -------------- | ---------------------------------------- | -------- | ------------ |
| `dotfiles`     | 是否对外输出文件名以点（`.`）开头的文件。可选值为 “allow”、“deny” 和 “ignore” | String   | “ignore”     |
| `etag`         | 是否启用 etag 生成                             | Boolean  | `true`       |
| `extensions`   | 设置文件扩展名备份选项                              | Array    | `[]`         |
| `index`        | 发送目录索引文件，设置为 `false` 禁用目录索引。             | Mixed    | “index.html” |
| `lastModified` | 设置 `Last-Modified` 头为文件在操作系统上的最后修改日期。可能值为 `true` 或 `false`。 | Boolean  | `true`       |
| `maxAge`       | 以毫秒或者其[字符串格式](https://www.npmjs.org/package/ms)设置 Cache-Control 头的 max-age 属性。 | Number   | 0            |
| `redirect`     | 当路径为目录时，重定向至 “/”。                        | Boolean  | `true`       |
| `setHeaders`   | 设置 HTTP 头以提供文件的函数。                       | Function |              |

下面的例子使用了 `express.static` 中间件，其中的 `options` 对象经过了精心的设计。

```
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}

app.use(express.static('public', options));
```

每个应用可有多个静态目录。

```
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('files'));
```

### 第三方中间件

通过使用第三方中间件从而为 Express 应用增加更多功能。

````javascript
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// 加载用于解析 cookie 的中间件
app.use(cookieParser());

app.get('/', function(req, res){
    res.cookie('uid', 1234)
	//res.clearCookie(name [, options]); // cookie的删除
    console.log(req.cookies);
    res.send('8080')
})

````

* res.cookie(name, value [, options]);

  * name: 类型为String
  * value: 类型为String和Object，**如果是Object会在cookie.serialize()之前自动调用JSON.stringify对其进行处理**
  * Option: 类型为对象，可使用的属性如下

  ````
  domain：cookie在什么域名下有效，类型为String,。默认为网站域名
     expires: cookie过期时间，类型为Date。如果没有设置或者设置为0，那么该cookie只在这个这个session有效，即关闭浏览器后，这个cookie会被浏览器删除。
     httpOnly: 只能被web server访问，类型Boolean。
     maxAge: 实现expires的功能，设置cookie过期的时间，类型为String，指明从现在开始，多少毫秒以后，cookie到期。
     path: cookie在什么路径下有效，默认为'/'，类型为String
     secure：只能被HTTPS使用，类型Boolean，默认为false
     signed:使用签名，类型Boolean，默认为false。`express会使用req.secret来完成签名，需要cookie-parser配合使用`
  ````

**使用session**

* `npm install express-session`

````javascript
var session = require('express-session');

app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*10  //过期时间设置(单位毫秒)
    }
}));


//设置中间件
app.use(function(req, res, next){
    res.locals.user = req.session.user;
    var err = req.session.error;
    res.locals.message = '';
    if (err) res.locals.message = '<div style="margin-bottom: 20px;color:red;">' + err + '</div>';
    next();
});
````

## 模版引擎

- `views`, 放模板文件的目录，比如： `app.set('views', './views')`
- `view engine`, 模板引擎，比如： `app.set('view engine', 'jade')`

一旦 `view engine` 设置成功，就不需要显式指定引擎，或者在应用中加载模板引擎模块，Express 已经在内部加载，如下所示。

```javascript
app.set('view engine', 'jade');
```

在 `views` 目录下生成名为 `index.jade` 的 Jade 模板文件，内容如下：

```
html
  head
    title!= title
  body
    h1!= message
```

然后创建一个路由渲染 `index.jade` 文件。如果没有设置 `view engine`，您需要指明视图文件的后缀，否则就会遗漏它。

```javascript
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
```

### ejs

* `npm install ejs`

````javascript
// 修改模板文件的后缀名为html
app.set( 'view engine', 'html' );
// engine注册模板引擎的函数，处理指定的后缀名文件。默认ejs模板只支持渲染以ejs为扩展名的文件，可能在使用的时候会觉得它的代码书写方式很不爽还是想用html的形式去书写，该怎么办呢，这时就得去修改模板引擎了，也就会用到express的engine函数。"__express"，ejs模块的一个公共属性，表示要渲染的文件扩展名。
app.engine( '.html', require( 'ejs' ).__express );
````

#### 添加视图

* app.set('views', __dirname); //指定视图存放位置

````javascript
app.get('/', function(req, res) {
    res.render('index');	
});
````

## 错误处理

定义错误处理中间件和定义其他中间件一样，除了需要 4 个参数，而不是 3 个，其格式如下 `(err, req, res, next)`。例如：

```javascript
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

在其他 `app.use()` 和路由调用后，最后定义错误处理中间件，比如：

```javascript
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(function(err, req, res, next) {
  // 业务逻辑
});
```

中间件返回的响应是随意的，可以响应一个 HTML 错误页面、一句简单的话、一个 JSON 字符串，或者其他任何您想要的东西。

为了便于组织（更高级的框架），您可能会像定义常规中间件一样，定义多个错误处理中间件。比如您想为使用 XHR 的请求定义一个，还想为没有使用的定义一个，那么：

```javascript
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
```

`logErrors` 将请求和错误信息写入标准错误输出、日志或类似服务：

```javascript
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
```

`clientErrorHandler` 的定义如下（注意这里将错误直接传给了 `next`）：

```javascript
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something blew up!' });
  } else {
    next(err);
  }
}
```

`errorHandler` 能捕获所有错误，其定义如下：

```javascript
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}
```

如果向 `next()` 传入参数（除了 ‘route’ 字符串），Express 会认为当前请求有错误的输出，因此跳过后续其他非错误处理和路由/中间件函数。如果需做特殊处理，需要创建新的错误处理路由，如下节所示。

如果路由句柄有多个回调函数，可使用 ‘route’ 参数跳到下一个路由句柄。比如：

```javascript
app.get('/a_route_behind_paywall', 
  function checkIfPaidSubscriber(req, res, next) {
    if(!req.user.hasPaid) { 
    
      // 继续处理该请求
      next('route');
    }
  }, function getPaidContent(req, res, next) {
    PaidContent.find(function(err, doc) {
      if(err) return next(err);
      res.json(doc);
    });
  });
```

在这个例子中，句柄 `getPaidContent` 会被跳过，但 `app` 中为 `/a_route_behind_paywall` 定义的其他句柄则会继续执行。

当添加了一个自定义的错误处理句柄后，如果已经向客户端发送包头信息了，你还可以将错误处理交给 Express 内置的错误处理机制。

```javascript
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}
```

## 请求相关

### 获取主机名和路径名

* `req.host ` 返回请求里面的主机名(不含端口号)
* `req.path` 返回请求里面的路径名

### query

````javascript
// /search?n=Lenka
console.log(req.query.n)

// /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
req.query.order // "desc"
req.query.shoe.color // "blue"
req.query.shoe.type // "converse"
````

### param

```javascript
// /?n=Lenka
req.param('n')

app.get("/user/:name/", function(req, res) {
　　console.log(req.param("name")); //mike
　　res.send("使用req.param属性获取具有路由规则的参数对象值!");
});
```

```javascript
'use strict';
const express = require('express');
const path = require('path');

let app = express();

app.param('id', function(req, res, next, id){
   console.log(id);
   next();
})


app.get('/user/:id', function(req, res){
    res.send('.....');
})

app.listen(8080, function(err){
    if(err){
        console.log(err);
    } else {
        console.log('service listening 8080');
    }
})
```

### params基本用法

```javascript
app.get("/user/:name/", function(req, res) {
　　console.log(req.params.name); //mike
　　res.send("使用req.params属性获取具有路由规则的参数对象值!");
});

app.get("/user/:name/:id", function(req, res) {
　　console.log(req.params.id); //"123"
　　res.send("使用req.params属性复杂路由规则的参数对象值!");
});
```

### send基本用法

1. 当参数为一个String时，Content-Type默认设置为"text/html"。

2. 当参数为Array或Object时，Express会返回一个JSON。

3. 当参数为一个Number时，并且没有上面提到的任何一条在响应体里，Express会帮你设置一个响应体，比如：200会返回字符"OK"。

   ````javascript
   res.send(200); // OK
   res.send(404); // Not Found
   res.send(500); // Internal Server Error
   ````


### URL重定向

````javascript
res.redirect("http://www.hubwiz.com");
res.redirect("login");
````

### POST请求

```javascript
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/login', function(req, res){
  console.log(req.body.username)
})
```

### 文件上传

```javascript
'use strict';

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');

let app = express();

app.use(express.static('Public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({dest: '/tmp/'}).array('image'))

app.get('/', function(req, res){
    res.sendFile(__dirname + '/' + 'index.html');
})

app.post('/file_upload', function(req, res){
    let response;

    console.log(req.files[0].originalname); 
    

    let des_file = __dirname + "/" + req.files[0].originalname;

    fs.readFile(req.files[0].path, function(err, data){
        fs.writeFile(des_file, data, function(err){
            if(err){
                console.log(err);
            } else {
                response = {
                    message: 'File uploaded successfully',
                    filename: req.files[0].originalname
                };
            }
            
        });
    })
    console.log(response);
    res.end(JSON.stringify(response));
})


var server = app.listen(8080, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>文件上传</title>
</head>
<body>
    <form action="/file_upload" method="post" enctype="multipart/form-data">
        <input type="file" name="image" size="50">
        <button type="submit">提交</button>
    </form>
</body>
</html>
```

### cookie

```
var express      = require('express')
var cookieParser = require('cookie-parser')
 
var app = express()
app.use(cookieParser())
 
app.get('/', function(req, res) {
  console.log("Cookies: ", req.cookies)
})
 
app.listen(8081)
```

## 调试



## 代理



##数据库



[express中文](http://www.expressjs.com.cn/)















