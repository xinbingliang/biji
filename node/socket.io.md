# socket.io

## 基本使用

````js
//server.js
let app = require('http').createServer(handler)
let fs = require('fs')

let io = require('socket.io')(app)

app.listen(3000)  

function handler(req, res){
  fs.readFile(__dirname+'/index.html', (err, data)=>{
    if(err){
      res.writeHead(500);
      return res.end('Error loading index.html')
    }

    res.writeHead(200);
    res.end(data);
  })
}

io.on('connection', (socket)=>{
  console.log('有客户端发生链接')
  socket.emit('serverMsg', '来自服务端的数据')

  socket.on('clientMsg', (data)=>{
    console.log(data)
  })
})

````

````html
//index.html
<script src="/socket.io/socket.io.js"></script>
<script>
  let scoket = io('http://127.0.0.1:3000')
  scoket.on('connect', ()=>{
    console.log('连接到服务端')
    
    scoket.on('serverMsg', function(data){
      console.log(data)
    });

    scoket.emit('clientMsg', '来自客户端数据')
  })
</script>
````

## 结合express

```js
//server.js
let app = require('express')();
let server = require('http').Server(app)

let io = require('socket.io')(server)

server.listen(3000)

app.get('/', (req, res)=>{
  res.sendfile(__dirname + '/index.html');
})

io.on('connection', (socket)=>{
  socket.emit('serverMsg', '来自服务端的信息');

  socket.on('clientMsg', (data)=>{
    console.log(data);
  })
})
```

```html
//index.html
<script src="/socket.io/socket.io.js"></script>
<script>
  let socket = io.connect('http://localhost:3000');
  socket.on('serverMsg', function(data){
    console.log(data)

    socket.emit('clientMsg', '来自客户端数据')
  })
</script>
```

## 事件

### 系统事件

````js
//server.js
let app = require('express')();
let server = require('http').Server(app)

let io = require('socket.io')(server)

server.listen(3000)

app.get('/', (req, res)=>{
  res.sendfile(__dirname + '/index.html');
})

io.on('connection', (socket)=>{
  socket.emit('serverMsg', '来自服务端的信息');

  socket.on('clientMsg', (data)=>{
    console.log(data);
  });

  socket.on('disconnect', ()=>{
    console.log('客户端已经断开')
    io.emit('user disconnected')
  })
})
````

### 事件列表

```js
io.on('connect', onConnect);

function onConnect(socket){

  // 发送给当前客户端
  socket.emit('hello', 'can you hear me?', 1, 2, 'abc');

  // 发送给所有客户端，除了发送者
  socket.broadcast.emit('broadcast', 'hello friends!');

  // 发送给同在 'game' 房间的所有客户端，除了发送者
  socket.to('game').emit('nice game', "let's play a game");

  // 发送给同在 'game1' 或 'game2' 房间的所有客户端，除了发送者
  socket.to('game1').to('game2').emit('nice game', "let's play a game (too)");

  // 发送给同在 'game' 房间的所有客户端，包括发送者
  io.in('game').emit('big-announcement', 'the game will start soon');

  // 发送给同在 'myNamespace' 命名空间下的所有客户端，包括发送者
  io.of('myNamespace').emit('bigger-announcement', 'the tournament will start soon');

  // 发送给指定 socketid 的客户端（私密消息）
  socket.to(<socketid>).emit('hey', 'I just met you');

  // 包含回执的消息
  socket.emit('question', 'do you think so?', function (answer) {});

  // 不压缩，直接发送
  socket.compress(false).emit('uncompressed', "that's rough");

  // 如果客户端还不能接收消息，那么消息可能丢失
  socket.volatile.emit('maybe', 'do you really need it?');

  // 发送给当前 node 实例下的所有客户端（在使用多个 node 实例的情况下）
  io.local.emit('hi', 'my lovely babies');

};
```

##不稳定消息

部分客户端接收不到推送的消息不会造成服务受到影响

`````javascript
//server.js
let app = require('express')();
let server = require('http').Server(app)

let io = require('socket.io')(server)

server.listen(3000)

app.get('/', (req, res) => {
  res.sendfile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
  let tweets = setInterval(() => {
    // getBieberTweet((tweet) => {
      socket.volatile.emit('bieber tweet', '不稳定的信息')
    // })
  }, 1000);

  socket.on('disconnect', () => {
    clearInterval(tweets)
  })
})
`````

```javascript
//index.html
<script src="/socket.io/socket.io.js"></script>
<script>
  let scoket = io('http://127.0.0.1:3000')
  scoket.on('connect', () => {
    console.log('连接到服务端')

    scoket.on('bieber tweet', function (data) {
      console.log(data)
    });
  })
</script>
```

##回调

```javascript
//server.js
let app = require('express')();
let server = require('http').Server(app)

let io = require('socket.io')(server)

server.listen(3000)

app.get('/', (req, res) => {
  res.sendfile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
  socket.on('clientMsg', (name, cb)=>{
    console.log(name)

    cb('服务端接收到回调')
  })

  socket.on('disconnect', () => {
    console.log('客户端断开')
  })
})
```

```html
//index.html
<script src="/socket.io/socket.io.js"></script>
<script>
  let scoket = io('http://127.0.0.1:3000')
  scoket.on('connect', () => {
    console.log('连接到服务端')

    scoket.emit('clientMsg', '客户端携带信息', function(data){
      console.log(data)
    })
  })
</script>
```

## 广播

```javascript
//server.js
let app = require('express')();
let server = require('http').Server(app)

let io = require('socket.io')(server)

server.listen(3000)

app.get('/', (req, res) => {
  res.sendfile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
  socket.broadcast.emit('toOther', '给其他用户的信息')

  socket.on('disconnect', () => {
    console.log('客户端断开')
  })
})
```

````html
//index.html
<script src="/socket.io/socket.io.js"></script>
<script>
  let scoket = io('http://127.0.0.1:3000')
  scoket.on('connect', () => {
    console.log('连接到服务端')

    scoket.on('toOther', function(data){
      console.log(data)
    })
  })
</script>
````

###跨浏览器WebSocket

```javascript
//server.js
let app = require('express')();
let server = require('http').Server(app)

let io = require('socket.io')(server)

server.listen(3000)

app.get('/', (req, res) => {
  res.sendfile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
  socket.on('message', function(msg){
    console.log(msg)
  })

  socket.send('23333')

  socket.on('disconnect', () => {
    console.log('客户端断开')
  })
})
```

````html
<script src="/socket.io/socket.io.js"></script>
<script>
  let scoket = io('http://127.0.0.1:3000')
  scoket.on('connect', () => {
    console.log('连接到服务端')

    scoket.send('hi');

    scoket.on('message', function(msg){
      console.log('ok')
    })
  })
</script>
````

## 命名空间和房间

###命名空间

````javascript
//server.js 
let express = require('express')
let http = require('http')
let sio = require('socket.io')
let app = express()
let server = http.createServer(app)

app.get('/', (req, res)=>{
  res.sendfile(__dirname + '/index.html');
})

server.listen(3000, '127.0.0.1', ()=>{
  console.log('开始监听3000')
})

let io = sio.listen(server)
let chart = io.of('/chat').on('connection', (socket)=>{
  socket.send("欢迎访问chat空间");

  socket.on('message', function(msg){
    console.log('chat命名空间接收到信息:' + msg);
  });
})

let news = io.of("/news").on('connection', (socket)=>{
  socket.emit('send message', "欢迎访问news空间")

  socket.on('send message', (data)=>{
    console.log("news命名空间接受到send message事件,数据为:"+data)
  })
})
````

````html
//index.html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<body>
</body>
<script src="/socket.io/socket.io.js"></script>
<script>
  var chat = io.connect("http://localhost:3000/chat"),
    news = io.connect("http://localhost:3000/news");
  chat.on("connect", function () {
    chat.send("你好.");
    chat.on("message", function (msg) {
      console.log("从char空间接收到消息:" + msg);
    });
  });
  news.on("connect", function () {
    news.emit("send message", "hello");
    news.on("send message", function (data) {
      console.log("从news命名空间接收到send message事件,数据位:" + data);
    });
  });
</script>

</html>
````

### 房间

```javascript
//server.js
let app = require('express')();
let server = require('http').Server(app)

let io = require('socket.io')(server)

server.listen(3000)

app.get('/', (req, res) => {
  res.sendfile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
  socket.join('room1')

  io.to('room1').emit('romm1Msg', '来自房间1的消息')

  socket.on('disconnect', () => {
    console.log('客户端断开')
  })
})
```

```html
<script src="/socket.io/socket.io.js"></script>
<script>
  let scoket = io('http://127.0.0.1:3000')
  scoket.on('connect', () => {
    scoket.on('romm1Msg', function(msg){
      console.log(msg)
    })
  })
</script>
```

* `leave` 离开该频道

Socket.IO 中的每个 `Socket` 都使用一个随机、不可预测、唯一的 `Socket#id` 标识符来标识。为了简便，每个 socket 自动进入一个使用自身 id 标识的房间。

````javascript
io.on('connection', function(socket){
  socket.on('say to someone', function(id, msg){
    socket.broadcast.to(id).emit('my message', msg);
  });
});
````

断开连接时， sockets 会自动 `leave` 所有频道，不需要你做任何处理。

## 服务端API

### Server

#### new Server(httpServer[, options])

创建一个`socket`服务器

* httpServer 指被绑定的http服务器
* options (object) 参数
  * path (string) 要捕获的路径名称
  * serverClient (布尔) 是否提供客户端文件(true)
  * adapter (适配器) 适配器的使用
  * origins (字符串) 允许的源

````javascript
let io = require('socket.io')()

let server = require('socket.io')
let io = new server()
````

#### new Server(port[, options])

* port (Number) 监听的端口
* options 参数同上

#### new Server(options)

* options 参数同上

#### server.sockets

* 命名空间

#### server.serveClient([value])

* value(Boolean)
* 返回值 server|Boolean

````javascript
// pass a server and the `serveClient` option
var io = require('socket.io')(http, { serveClient: false });

let io = require('socket.io')()
let client = io.serveClient(true);
io.attach(http);
````

#### server.path([value])

设置静态文件的路径，默认为`/socket.io`

* value (字符串)
* 返回值 Server|String

#### server.adapter([value])

提供适配器实例

* value (适配器)
* 返回 Server|Adapter

#### server.origins([value])

设置允许的源

* value (字符串)
* 返回 Server|String

#### server.origins(fn)

为函数提供两个参数`origin:String`和`callback(error, success)`

* fn (功能)
* 返回 Server

#### server.attach(httpServer[, options])

附加的服务器

- `httpServer` *（http.Server）*要附加到的服务器
- `options`

#### server.attach(port[, options])

附加服务器

- `port` *（数字）*要监听的端口
- `options` 

#### server.listen(httpServer[, options])

同attach()

#### server.listen(port[, options])

同attach()

#### server.bind(engine)

绑定引擎

#### server.onconnection(socket)

创建新的客户端

#### server.of(nsp)

切换到某一命名空间

* nsp (字符串)
* 返回 命名空间

#### server.close([callback])

关闭socket.io服务器

### Namespace

#### namespace.name

命名空间标识符

#### namespace.connected

连接到此命名空间对象的哈希，索引为id

#### namespace.emit(eventName[, ...args])

向该命名空间下的连接发送消息

```javascript
var io = require('socket.io')();

io.emit('an event sent to all connected clients'); // main namespace

var chat = io.of('/chat');
chat.emit('an event sent to all connected clients in chat namespace');
```

#### namespace.clients(callback)

获取连接到此名称空间的客户端ID列表

```javascript
var io = require('socket.io')();
io.of('/chat').clients(function(error, clients){
  if (error) throw error;
  console.log(clients); // => [PZDoMHjiu8PYfRiKAAAF, Anw2LatarvGVVXEIAAAD]
});

var io = require('socket.io')();
io.of('/chat').in('general').clients(function(error, clients){
  if (error) throw error;
  console.log(clients); // => [Anw2LatarvGVVXEIAAAD]
});

var io = require('socket.io')();
io.clients(function(error, clients){
  if (error) throw error;
  console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
});
```

#### namespace.use(fn)

注册一个中间件

```javascript
var io = require('socket.io')();
io.use(function(socket, next){
  if (socket.request.headers.cookie) return next();
  next(new Error('Authentication error'));
});
```

#### 事件： 'connect'

#### 事件： 'connection'

#### 标志： 'volatile'

#### 标志： 'local'

### Socket

#### socket.id

唯一标识，来自客户端

#### socket.rooms

客户所在房间的字符串散列

#### socket.client

对基础`client` 对象的引用

#### socket.conn

对底层`client` 传输连接，这允许访问IO传输层，它仍然（大部分）抽象出实际的TCP / IP套接字。

#### socket.request

一个getter代理，用于将引用返回给`request`源自底层engine.io的引用`Client`。用于访问诸如`Cookie`or的请求标头`User-Agent`。

#### socket.use(fn)

注册一个中间件，该中间件是一个函数，可以为每个入站接收`Packet`并作为参数接收数据包，还可以选择将执行延迟到下一个注册的中间件。

```javascript
var io = require('socket.io')();
io.on('connection', function(socket){
  socket.use(function(packet, next){
    if (packet.doge === true) return next();
    next(new Error('Not a doge error'));
  });
});
```

#### socket.send([...args][, ack])

发送一个`message`事件。

#### socket.emit(eventName[, ...args][, ack])

- `eventName` *（串）*
- `args`
- `ack` *（功能）*
- **返回** `Socket`

向由字符串名称标识的套接字发出事件。

```javascript
socket.emit('hello', 'world');
socket.emit('with-binary', 1, '2', { 3: '4', 5: new Buffer(6) });

var io = require('socket.io')();
io.on('connection', function(client){
  client.emit('an event', { some: 'data' });

  client.emit('ferret', 'tobi', function (data) {
    console.log(data); // data will be 'woot'
  });

  // the client code
  // client.on('ferret', function (name, fn) {
  //   fn('woot');
  // });

});
```

#### socket.on(eventName, callback)

- `eventName` *（串）*
- `callback` *（功能）*
- **返回** `Socket`

为给定事件注册一个新的处理程序。

```javascript
socket.on('news', function (data) {
  console.log(data);
});
```

#### socket.join(room[, callback])

向客户端添加客户端`room`，并可选择触发带`err`签名的回调（如果有的话）。

- `room` *（串）*
- `callback` *（功能）*
- `Socket`链接**返回**

```javascript
io.on('connection', function(socket){
  socket.join('room 237', function(){
    console.log(socket.rooms); // [ <socket.id>, 'room 237' ]
    io.to('room 237', 'a new user has joined the room'); // broadcast to everyone in the room
  });
});

io.on('connection', function(client){
  client.on('say to someone', function(id, msg){
    // send a private message to the socket with the given id
    client.broadcast.to(id).emit('my message', msg);
  });
});
```

#### socket.join(rooms[, callback])

- `rooms` *（阵列）*
- `callback` *（功能）*
- ****`Socket`链接**返回**

将客户端添加到房间列表中，并可选择触发带`err`签名的回调（如果有）。

#### socket.leave(room[, callback])

- `room` *（串）*
- `callback` *（功能）*
- ****`Socket`链接**返回**

从中删除客户端`room`，并可选择触发带`err`签名的回叫（如果有的话）。

#### socket.to(room)

- `room` *（串）*
- ****`Socket`链接**返回**

为后续事件发射设置一个修饰符，该事件只会被*广播*给已加入给定的客户端`room`。

要发射到多个房间，您可以`to`多次拨打电话。

```
var io = require('socket.io')();
io.on('connection', function(client){
  // to one room
  client.to('others').emit('an event', { some: 'data' });
  // to multiple rooms
  client.to('room1').to('room2').emit('hello');
});
```

#### socket.in(room)

类on

#### socket.compress(value)

- `value` *（布尔）*是否对后续数据包进行压缩
- ****`Socket`链接**返回**

为后续事件发射设置修饰符，该事件数据仅在该值为时才被*压缩*`true`。默认为`true`不调用该方法时。

#### socket.disconnect(close)

- `close` *（布尔）*是否关闭底层连接
- **返回** `Socket`

断开这个客户端。如果close的值是`true`，则关闭底层连接。否则，它只是断开命名空间。

#### 标志： 'broadcast'

广播

#### 标志： 'volatile'

#### 事件： 'disconnect'

#### 事件： 'error'

#### 事件： 'disconnecting'

断线

### Client

#### client.conn

- *（engine.Socket）*

对底层`engine.io` `Socket`连接的引用。

#### client.request

- *（请求）*

一个getter代理，用于将引用返回给`request`发起engine.io连接的引用。用于访问诸如`Cookie`or的请求标头`User-Agent`。

## 客户端API

### io

#### io.protocol

协议修订号

#### io(url[, options])

使用url创建一个新的对象，并可以进行后续调用

- `url` 字符串
- `options` 参数
- **返回** `Socket`

### io.Manager

####new Manager(url[, options])

- `url` 字符串
- options 参数
  - `path` 捕获的路径名称
  - `reconnection` （布尔）是否自动重新连接（`true`）
  - `reconnectionAttempts` *（Number）*放弃之前的重新连接尝试次数（`Infinity`）
  - `reconnectionDelay` *（数量）*尝试重新连接之前最初等待的时间（`1000`）。受+/-影响`randomizationFactor`，
    例如默认的初始延迟时间在500到1500毫秒之间。
  - `reconnectionDelayMax` *（数量）*重新连接之间等待的最长时间（`5000`）。
    如上所述，每次尝试都将重新连接延迟与随机化一起增加2倍
  - `randomizationFactor` *（Number）*（`0.5`），0 <= randomizationFactor <= 1
  - `timeout` *（Number）* a `connect_error`和`connect_timeout`事件发出之前的连接超时（`20000`）
  - `autoConnect` *（布尔）*通过设置这个错误，你必须打电话，`manager.open`
    只要你决定它是适当的
- **返回** `Manager`

####manager.reconnection([value])

设置是否重新连接，如果没有参数就是获取这一参数

* value 布尔

####manager.reconnectionAttempts([value])

####manager.reconnectionDelay([value])

#### manager.reconnectionDelayMax([value])

#### manager.timeout([value])

####manager.open([callback])

* callback回调函数
* 返回 Manager

启动一个新的连接尝试

#### manager.connect([callback])

同上

####manager.socket(nsp, options)

- `nsp` *（串）*
- `options` *（目的）*
- **返回** `Socket`

根据命名空间创建一个新的

#### 事件： 'connect_error'

连接遇到错误

#### 事件： 'connect_timeout'

连接超时

#### 事件： 'reconnect'

重新连接

#### 事件： 'reconnect_attempt'

#### 事件： 'reconnecting'

#### 事件： 'reconnect_error'

在重新连接尝试错误时触发

#### 事件： 'reconnect_failed'

在无法重新连接时触发

#### 事件： 'ping'

ping数据包写入服务器时触发

#### 事件： 'pong'

### io.Socket

#### socket.id

套接字会话的唯一标识符。

```javascript
var socket = io('http://localhost');

console.log(socket.id); // undefined

socket.on('connect', function(){
  console.log(socket.id); // 'G5p5...'
});
```

#### socket.open()

打开一个socket

#### socket.connect()

同上

#### socket.send([...args][, ack])

发送一个`message`事件

#### socket.emit(eventName[, ...args][, ack])

发送一个定义事件

```
socket.emit('hello', 'world');
socket.emit('with-binary', 1, '2', { 3: '4', 5: new Buffer(6) });
```

####socket.on(eventName, callback)

监听事件

####socket.compress(value)

为后续事件发射设置修饰符，

####socket.close()

手动断开套接字。

####socket.disconnect()

同上

####事件： 'connect'

####事件： 'connect_error'

####事件： 'connect_timeout'

####事件： 'error'

####事件： 'disconnect'

####事件： 'reconnect'

####事件： 'reconnect_attempt'

####事件： 'reconnecting'

####事件： 'reconnect_error'

####事件： 'reconnect_failed'

## 集群



http://javacheng.oschina.io/socket.io/docs/rooms-and-namespaces/

https://blog.csdn.net/sirlzf/article/details/48826137

http://cnodejs.org/topic/543f9484de346cb1644302b5

https://blog.csdn.net/kelong_xhu/article/details/50846483

https://www.oschina.net/translate/websocket-nginx