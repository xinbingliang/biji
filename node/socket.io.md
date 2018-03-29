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



##回调



## 广播



###跨浏览器WebSocket





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



## 集群



## 服务端API

### Server



### Namespace



### Socket



### Client



## 客户端API

### io



### io.Manager



### io.Socket





http://javacheng.oschina.io/socket.io/docs/rooms-and-namespaces/