# Http

## 创建http server

通过Node.js创建http server非常简单，示例代码如下：

```javascript
// 文件名：demo.js

// 引入http模块
var http = require('http');

// 创建http server
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
```

运行此文件：

```
$ node demo.js

```

然后打开虚拟机浏览器，访问“[http://127.0.0.1:1337/”，就会看到页面上显示了“Hello](http://127.0.0.1:1337/%E2%80%9D%EF%BC%8C%E5%B0%B1%E4%BC%9A%E7%9C%8B%E5%88%B0%E9%A1%B5%E9%9D%A2%E4%B8%8A%E6%98%BE%E7%A4%BA%E4%BA%86%E2%80%9CHello) World”，说明我们的http server创建成功了。

## 自定义服务器

### 目录结构

在这个实验中，我们会创建一个简单的http server，所有的代码都放在app这个文件夹中。文件夹结构如下：

```
app
├── main.js
├── requestHandlers.js
├── router.js
├── server.js
└── views
    ├── 404.html
    ├── about.html
    └── home.html
```

### server.js

首先，新建一个app文件夹，在文件夹中新建`server.js`文件，输入如下代码（其中的注释为代码解释）：

```javascript
//
// 创建http server
//

// 加载所需模块
var http = require('http');
var url = require('url');
var fs = require('fs');

// 设置ip和端口
// 实际应用中，可以把这些写到配置文件中
var host = '127.0.0.1',
    port = 8080;

// 创建http server
function start(route, handle) {
    // 参数
    // route  判断url是否存在，存在则调用handle处理，不存在则返回404
    // handle 处理不同的url请求


    // 处理request请求
    function onRequest(req, res) {
        // 使用url.parse()方法解析url
        // 它会把url string转化为一个object
        // 这样我们就可以很方便的获取url中的host、port、pathname等值了
        var pathname = url.parse(req.url).pathname;
        console.log('Request for ' + pathname + ' received.');

        // 判断并处理不同url请求
        // 后面介绍此方法
        route(handle, pathname, res, req);
    }

    // 使用http.createSserver()方法创建http server
    // 并传入onRequest()方法
    // 然后使用listen()方法监听指定地址
    http.createServer(onRequest).listen(port, host);
    console.log('Server has started and listening on ' + host + ':' + port);
}

// 导出 start 方法
exports.start = start;
```

在文件的最后，我们导出了start方法，以便在主程序中使用。你肯定注意到了，在代码中使用了`route()`方法，它用于处理判断请求的url是否存在，现在我们就来编写这个方法。

### 创建路由

在app文件夹中新建`router.js`，输入如下代码：

```javascript
var fs = require('fs');

// 路由函数
// 处理不同url的请求
// 并返回相应内容

function route(handle, pathname, res, req) {
    console.log('About to route a request for ' + pathname);

    // 判断此url是否存在特定处理函数
    // 存在则调用handle处理
    // 不存在则返回404页面
    if (typeof handle[pathname] === 'function') {
        // 后面介绍handle函数
        handle[pathname](res, req);
    } else {
        console.log('No request handler found for ' + pathname);

        // 读取404页面
        // 所有页面都存放在view文件夹下
        var content = fs.readFileSync('./views/404.html');
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write(content);
        res.end();
    }
}
// 导出 route 方法
exports.route = route;
```

在此方法中，调用了`handle()`方法，这个方法用于处理不同的url请求。

### 处理路由请求

在app文件夹中新建`requestHandlers.js`文件，输入如下代码：

```javascript
// 处理url请求

var fs = require('fs');

// home.html 主页
function home(res) {
    console.log('Request handler "home" was called.');

    // 读取home.html文件
    var content = fs.readFileSync('./views/home.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(content);
    res.end();
}

// about.html 关于页面
function about(res) {
    console.log('Request handler "about" was called.');

    // 读取about.html文件
    var content = fs.readFileSync('./views/about.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(content);
    res.end();
}

// 导出页面处理函数
exports.home = home;
exports.about = about;
```

这个方法比较简单，就是读取文件，然后输出到response。

### 创建主程序

创建http server，判断url，处理url都写完了，那么我们可以写主程序来运行http server了，在app文件夹新建`main.js`文件，输入如下代码：

```javascript
// 主程序

// 引入server，router及requestHandler
var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

// 保存url处理方法
var handle = {};
handle['/'] = requestHandlers.home;
handle['/about'] = requestHandlers.about;

// 启动http server
server.start(router.route, handle);
```

到此，所有的服务器代码都写完了，那么我们来添加代码中用到的两个html文件吧。

### 创建HTML文件

在app文件夹中新建views文件夹，在views文件夹中，新建`home.html`文件、`about.html`文件和`404.html`文件。

文件中的代码如下所示：

`home.html`文件：

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Home page</title>
    </head>
    <body>
        <p>home page</p>
    </body>
</html>
```

`about.html`文件：

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>About page</title>
    </head>
    <body>
        <p>about page</p>
    </body>
</html>
```

`404.html`文件：

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>404 page</title>
    </head>
    <body>
        <p>404 page not found</p>
    </body>
</html>
```

HTML文件的代码写得比较简单，可自由发挥。

那么现在我们来运行程序吧：

```
$ node main.js

```

运行成功后，打开虚拟机桌面的浏览器，访问“[http://127.0.0.1:8080”就会看到页面显示“home](http://127.0.0.1:8080%E2%80%9D%E5%B0%B1%E4%BC%9A%E7%9C%8B%E5%88%B0%E9%A1%B5%E9%9D%A2%E6%98%BE%E7%A4%BA%E2%80%9Chome/) page”，访问“[http://127.0.0.1:8080/about”就会看到页面显示“about](http://127.0.0.1:8080/about%E2%80%9D%E5%B0%B1%E4%BC%9A%E7%9C%8B%E5%88%B0%E9%A1%B5%E9%9D%A2%E6%98%BE%E7%A4%BA%E2%80%9Cabout) page”，访问“[http://127.0.0.1:8080”下的其他页面就会看到页面显示“404](http://127.0.0.1:8080%E2%80%9D%E4%B8%8B%E7%9A%84%E5%85%B6%E4%BB%96%E9%A1%B5%E9%9D%A2%E5%B0%B1%E4%BC%9A%E7%9C%8B%E5%88%B0%E9%A1%B5%E9%9D%A2%E6%98%BE%E7%A4%BA%E2%80%9C404/) page not found”。







