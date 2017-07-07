# express

```javascript
var express = require('express');	
var app = express();

app.listen(8080, function(err){
	if(err){
      console.log(err)
	} else {
      console.log('server listening.....8080');
	}
})
```

## get请求

* app.get(path,function(request, response));

````javascript
app.get('/', function(request, response){
  response.send('Welcome to the homepage!');
});

app.get('/about', function(request, response){
  ....
})

app.get('*', function(request, response){
  .....
})
````

## 中间件

中间件(middleware)就是处理HTTP请求的函数，用来完成各种特定的任务，比如检查用户是否登录、分析数据、以及其他在需要最终将数据发送给用户之前完成的任务。

````javascript
function Middleware(request, response, next){
  next();	//传递给下一个中间件
}

function Middleware(request, response, next){
  next('出错了!');	//如果它带有参数，则代表抛出一个错误，参数为错误文本
}
````

## all函数

如果使用all函数定义中间件，那么就相当于所有请求都必须先通过此该中间件。

* app.all(path,function(request, response));

````javascript
app.all("*", function(request, response, next){
  .....
  next();
})
````

## use用法

* app.use([path], function(request, response, next){}); path默认为`/`

````javascript
//连续调用两个中间件
app.use(function(request, response, next){
    console.log("method："+request.method+" ==== "+"url："+request.url);
    next();
});
 
app.use(function(request, response){
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    response.end('示例：连续调用两个中间件');
});
````

````javascript
//针对具体的请求
app.use(function(request, response, next) {
　　if(request.url == "/") {
　　　　response.send("Welcome to the homepage!");
　　}else {
　　　　next();
　　}
});
 
app.use(function(request, response, next) {
　　if(request.url == "/about") {
　　　　response.send("Welcome to the about page!");
　　}else {
　　　　next();
　　}
});
app.use(function(request, response) {
　　response.send("404 error!");
});
````

## 获取主机名、路径名

* req.host  返回请求头里取的主机名(不包含端口号)
* req.path 返回请求的URL的路径名

## query基本用法

```javascript
// /search?n=Lenka
console.log(req.query.n)

// /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
req.query.order // "desc"
req.query.shoe.color // "blue"
req.query.shoe.type // "converse"
```

## param基本用法

```javascript
// /?n=Lenka
req.param('n')

app.get("/user/:name/", function(req, res) {
　　console.log(req.param("name")); //mike
　　res.send("使用req.param属性获取具有路由规则的参数对象值!");
});
```

````javascript
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
````

## params基本用法

````javascript
app.get("/user/:name/", function(req, res) {
　　console.log(req.params.name); //mike
　　res.send("使用req.params属性获取具有路由规则的参数对象值!");
});

app.get("/user/:name/:id", function(req, res) {
　　console.log(req.params.id); //"123"
　　res.send("使用req.params属性复杂路由规则的参数对象值!");
});
````

## send基本用法

1. 当参数为一个String时，Content-Type默认设置为"text/html"。

2. 当参数为Array或Object时，Express会返回一个JSON。

3. 当参数为一个Number时，并且没有上面提到的任何一条在响应体里，Express会帮你设置一个响应体，比如：200会返回字符"OK"。

   `````
   res.send(200); // OK
   res.send(404); // Not Found
   res.send(500); // Internal Server Error
   `````


## 模版引擎

* `npm install ejs`

````javascript
// 修改模板文件的后缀名为html
app.set( 'view engine', 'html' );
// engine注册模板引擎的函数，处理指定的后缀名文件。默认ejs模板只支持渲染以ejs为扩展名的文件，可能在使用的时候会觉得它的代码书写方式很不爽还是想用html的形式去书写，该怎么办呢，这时就得去修改模板引擎了，也就会用到express的engine函数。"__express"，ejs模块的一个公共属性，表示要渲染的文件扩展名。
app.engine( '.html', require( 'ejs' ).__express );
````

## 静态资源

```javascript
<link rel="stylesheet" media="screen" href="/css/index.css"> //在模版中指定

app.use(express.static(require('path').join(__dirname, 'public'))); //指定静态文件的存放位置
```

## 添加视图

* app.set('views', __dirname); //指定视图存放位置

## 视图的访问

````javascript
app.get('/', function(req, res) {
    res.render('index');	
});
````

## url重定向

```javascript
res.redirect("http://www.hubwiz.com");
res.redirect("login");
```

## post请求

```javascript
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/login', function(req, res){
  console.log(req.body.username)
})
```

## 页面发送值

使用EJS模板变量值使用`<%= variable_name %>`输出方式，字符串输出时默认经过escape转义编码。 当我们想要输出一些动态生成的HTML标签时可使用`<%- variable_nam %>`输出方式，这种方式不会被escape转义编码，`{logout}` 退出

## 使用session

* `npm install express-session`

```javascript
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
```












