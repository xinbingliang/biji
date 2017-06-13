# SuperAgent

## 基本使用

### get

`````javascript
const superagent = require('superagent');

superagent.get('https://cnodejs.org/').end(function (err, res) {
  console.log(res.text);
})

//或者

const superagent = require('superagent');

superagent("GET", 'https://cnodejs.org/').end(function (err, res) {
  console.log(res.text);
})
`````

### delete，head，post，put

```javascript
const superagent = require('superagent');

superagent.head('https://www.zhihu.com/').end(function (err, res) {

})
```

### delete

`delete`是一个特列,因为它是系统保留的关键字,所以应该用`.del()`这个名字

````javascript
request
  .del('/user/1')
  .end(function(res){

  });
````

### 单次修改多个头字段

````javascript
 request.get('/search').set({ 'API-Key': 'foobar', Accept: 'application/json' }).end(function(){
   
 });
````

## 设置头

```javascript
request.get('/search').set('API-Key', 'foobar').set('Accept', 'application/json').end(function(){
  
});
   
//或者
 request.get('/search').set({ 'API-Key': 'foobar', Accept: 'application/json' }).end(function(){
   
 });
```

## GET请求

当使用`get`请求传递查询字符串的时候，用`.query()`方法,传递一个对象就可以,下面的代码将产生一个`/search?query=Manny&range=1..5&order=desc`请求

```javascript
 request
   .get('/search')
   .query({ query: 'Manny' })
   .query({ range: '1..5' })
   .query({ order: 'desc' })
   .end(function(err, res){

   });
//或者
request
  .get('/search')
  .query({ query: 'Manny', range: '1..5', order: 'desc' })
  .end(function(err, res){

  });

//或者
request
    .get('/querystring')
    .query('search=Manny&range=1..5')
    .end(function(err, res){

    });
//或者
request
    .get('/querystring')
    .query('search=Manny')
    .query('range=1..5')
    .end(function(err, res){

    });
```

## POST和PUT请求

一个典型的json post请求看起来就像下面的那样，设置一个合适的`Content-type`头字段，然后写入一些数据

````javascript
const superagent = require('superagent');

superagent.post('http://www.study.com/')
  .set('Content-Type', 'application/json')
  .send('{"name":"tj","pet":"tobi"}')
  .end(function(error, res){
    console.log(res.text);
  })

//或者
request.post('/user')
    .send({ name: 'tj', pet: 'tobi' })
    .end(callback)

//或者
request.post('/user')
    .send({ name: 'tj' })
    .send({ pet: 'tobi' })
    .end(callback)
````

**注意服务端的写法**

```php
$data = file_get_contents('php://input');
exit($data);
```

**将`Content-type`为`application/x-www-form-urlencoded`**

```javascript
const superagent = require('superagent');

superagent.post('http://www.study.com/')
  .set('Content-Type', 'application/x-www-form-urlencoded')
  .send('{"name":"tj","pet":"tobi"}')
  .end(function(error, res){
    console.log(res.text);
  })
```

superagent的请求数据格式化是可以扩展的，不过默认支持`form`和`json`两种格式,想发送数据以`application/x-www-form-urlencoded`类型的话，则可以简单的调用`.type()`方法传递`form`参数就行，这里默认是`json`,下面的请求将会post`name=tj&pet=tobi`内容

````javascript
const superagent = require('superagent');

superagent.post('http://www.study.com/')
  .type('form')
  .send({name: 'tj'})
  .send({pet: 'tobi'})
  .end(function(err, res){
    console.log(res.text);
  })

````

## 设置Content-Type

### 使用set

```javascript
 request.post('/user')
   .set('Content-Type', 'application/json')
```

### 使用type

一个简便的方法是调用`.type()`方法，传递一个规范的`MIME`名称，包括`type/subtype`,或者一个简单的后缀就像`xml`,`json`,`png`这样

```javascript
 request.post('/user')
   .type('application/json')

 request.post('/user')
   .type('json')

 request.post('/user')
   .type('png')
```

## 设置接受类型

调用`.accept()`方法来设置接受类型，这个值将会被`request.types`所引用，支持传递一个规范的`MIME`名称，包括`type/subtype`,或者一个简单的后缀就像`xml`,`json`,`png`这样

````javascript
const superagent = require('superagent');

superagent.post('http://www.study.com/')
  .send({name: 'tj'})
  .send({pet: 'tobi'})
  .accept('application/json')
  .end(function(err, res){
    console.log(res.text);
  })
````

简写

```javascript
 request.get('/user')
   .accept('json')

 request.get('/user')
   .accept('png')
```

## 查询字符串

当用`.send(obj)`方法来发送一个post请求，并且希望传递一些查询字符串，可以调用`.query()`方法,比如向`?format=json&dest=/login`发送post请求

```
request
  .post('/')
  .query({ format: 'json' })
  .query({ dest: '/login' })
  .send({ post: 'data', here: 'wahoo' })
  .end(callback);
```

*****

````javascript
const superagent = require('superagent');

superagent.post('http://www.study.com/')
  .query({format: 'json'})
  .query({dest: 'login'})
  .send({
    post: 'data',
    here: 'whodo'
  })
  .end(function(err, res){
    console.log(res.text)
  })
````

### 解析响应内容

superagent会解析一些常用的格式给请求者，当前支持`application/x-www-form-urlencoded`,`application/json`,`multipart/form-data`.

#### JSON/Urlencoded

`res.body`是解析后的内容对象,比如一个请求响应`'{"user":{"name":"tobi"}}'`字符串,`res.body.user.name`将会返回`tobi`,同样的，`x-www-form-urlencoded`格式的`user[name]=tobi`解析完的值，也是一样的.

#### Multipart

`nodejs`客户端通过`Formidable`模块来支持`multipart/form-data`类型,当解析一个`multipart`响应时,`res.files`属性就可以用.假设一个请求响应下面的数据:

```
--whoop
Content-Disposition: attachment; name="image"; filename="tobi.png"
Content-Type: image/png

... data here ...
--whoop
Content-Disposition: form-data; name="name"
Content-Type: text/plain

Tobi
--whoop--
```

你将可以获取到`res.body.name`名为’Tobi’,`res.files.image`为一个`file`对象,包括一个磁盘文件路径，文件名称，还有其它的文件属性.

### 响应属性

响应一般会提供很多有用的标识以及属性,都在`response`对象里，按照`respone.text`,解析后的`response.body`,头字段，一些标识的顺序来排列.

### Response text

`res.text`包含未解析前的响应内容，一般只在`mime`类型能够匹配`text/`,`json`,`x-www-form-urlencoding`的情况下，默认为nodejs客户端提供,这是为了节省内存.因为当响应以文件或者图片大内容的情况下影响性能.

### Response body

跟请求数据自动序列化一样，响应数据也会自动的解析，当为一个`Content-Type`定义一个解析器后，就能自动解析，默认解析包含`application/json`和`application/x-www-form-urlencoded`,可以通过访问`res.body`来访问解析对象.

### Response header fields

`res.header`包含解析之后的响应头数据,键值都是node处理成小写字母形式，比如`res.header['content-length']`.

### Response Content-Type

`Content-Type`响应头字段是一个特列，服务器提供`res.type`来访问它，默认`res.charset`是空的,如果有的话，则自动填充，例如`Content-Type`值为`text/html; charset=utf8`,则`res.type`为`text/html`,`res.charst`为`utf8`.

### Response status

响应状态标识可以用来判断请求是否成功，除此之外，可以用superagent来构建理想的`restful`服务器,这些标识目前定义为:

```
var type = status / 100 | 0;

 // status / class
 res.status = status;
 res.statusType = type;

 // basics
 res.info = 1 == type;
 res.ok = 2 == type;
 res.clientError = 4 == type;
 res.serverError = 5 == type;
 res.error = 4 == type || 5 == type;

 // sugar
 res.accepted = 202 == status;
 res.noContent = 204 == status || 1223 == status;
 res.badRequest = 400 == status;
 res.unauthorized = 401 == status;
 res.notAcceptable = 406 == status;
 res.notFound = 404 == status;
 res.forbidden = 403 == status;
```

### 中止请求

可以通过`req.abort()`来中止请求.

### 请求超时

可以通过`req.timeout()`来定义超时时间,然后当超时错误发生时，为了区别于别的错误,`err.timeout`属性被定义为超时时间,注意,当超时错误发生后，后续的请求都会被重定向.不是每个请求.

### 基础验证

nodejs客户端可以通过两种方式来达到验证的目的,第一个是传递一个像这样的url,`user:pass`:

```
request.get('http://tobi:learnboost[@local](/user/local)').end(callback);
```

第二种是调用`.auth()`方法:

```
request
  .get('http://local')
  .auth('tobo', 'learnboost')
  .end(callback);
```

### 跟随重定向

默认是向上跟随5个重定向，不过可以通过调用`.res.redirects(n)`来设置个数:

```
request
  .get('/some.png')
  .redirects(2)
  .end(callback);
```

### 管道数据

nodejs客户端允许使用一个请求流来输送数据,比如请求一个文件作为输出流:

```
var request = require('superagent')
  , fs = require('fs');

var stream = fs.createReadStream('path/to/my.json');
var req = request.post('/somewhere');
req.type('json');
stream.pipe(req);
```

或者输送一个响应流到文件中:

```
var request = require('superagent')
  , fs = require('fs');

var stream = fs.createWriteStream('path/to/my.json');
var req = request.get('/some.json');
req.pipe(stream);
```

### 复合请求

superagent用来构建复合请求非常不错,提供了低级和高级的api方法.

低级的api是使用多个部分来表现一个文件或者字段，`.part()`方法返回一个新的部分,提供了跟`request`本身相似的api方法.

```
var req = request.post('/upload');

 req.part()
   .set('Content-Type', 'image/png')
   .set('Content-Disposition', 'attachment; filename="myimage.png"')
   .write('some image data')
   .write('some more image data');

 req.part()
   .set('Content-Disposition', 'form-data; name="name"')
   .set('Content-Type', 'text/plain')
   .write('tobi');

 req.end(callback);
```

### 附加文件

上面提及的高级api方法，可以通用`.attach(name, [path], [filename])`和`.field(name, value)`这两种形式来调用.添加多个附件也比较简单，只需要给附件提供自定义的文件名称,同样的基础名称也要提供.

```
request
  .post('/upload')
  .attach('avatar', 'path/to/tobi.png', 'user.png')
  .attach('image', 'path/to/loki.png')
  .attach('file', 'path/to/jane.png')
  .end(callback);
```

### 字段值

跟html的字段很像,你可以调用`.field(name,value)`方法来设置字段,假设你想上传一个图片的时候带上自己的名称和邮箱，那么你可以像下面写的那样:

```
 request
   .post('/upload')
   .field('user[name]', 'Tobi')
   .field('user[email]', 'tobi[@learnboost](/user/learnboost).com')
   .attach('image', 'path/to/tobi.png')
   .end(callback);
```

### 压缩

nodejs客户端本身就提供了压缩响应内容，所以你不需要做任何其它事情.

### 缓冲响应

为了强迫缓冲`res.text`这样的响应内容,可以调用`req.buffer()`方法,想取消默认的文本缓冲响应像`text/plain`,`text/html`这样的，可以调用`req.buffer(false)`方法

当缓冲`res.buffered`标识提供了，那么就可以在一个回调函数里处理缓冲和没缓冲的响应.

### 跨域资源共享

`.withCredentials()`方法可以激活发送原始cookie的能力,不过只有在`Access-Control-Allow-Origin`不是一个通配符(*),并且`Access-Control-Allow-Credentials`为’true’的情况下才行.

```
request
  .get('http://localhost:4001/')
  .withCredentials()
  .end(function(res){
    assert(200 == res.status);
    assert('tobi' == res.text);
    next();
  })
```

### 异常处理

当发送错误时，superagent首先会检查回调函数的参数数量,当`err`参数提供的话，参数就是两个,如下:

```
request
 .post('/upload')
 .attach('image', 'path/to/tobi.png')
 .end(function(err, res){

 });
```

当省略了回调函数,或者回调只有一个参数的话,可以添加`error`事件的处理.

```
request
  .post('/upload')
  .attach('image', 'path/to/tobi.png')
  .on('error', handle)
  .end(function(res){

  });
```

注意:superagent默认情况下,对响应4xx和5xx的认为不是错误,例如当响应返回一个500或者403的时候,这些状态信息可以通过`res.error`,`res.status`和其它的响应属性来查看,但是没有任务的错误对象会传递到回调函数里或者`emit`一个`error`事件.正常的`error`事件只会发生在网络错误,解析错误等.

当产生一个4xx或者5xx的http错误响应,`res.error`提供了一个错误信息的对象，你可以通过检查这个来做某些事情.

```
if (res.error) {
  alert('oh no ' + res.error.message);
} else {
  alert('got ' + res.status + ' response');
}
```





