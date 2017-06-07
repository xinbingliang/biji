# net

## TCP Server

### 服务端

```javascript
"use strict";
const net = require('net');

let server = net.createServer(function (socket) {
  console.log('发生客户端的连接');
  socket.on('data', function (data) {
    console.log('接收到客户端的数据：', data.toString());
  })

  socket.on('end', function (data) {
    console.log('一次连接结束');
  })

  socket.write('Hello \r\n');
});

server.listen('9090', function (err) {
  if(!err){
    console.log('Listening 9090');
  }
});
```

### 客户端

````javascript
'use strict';

const net = require('net');

//连接服务器
var client = net.connect({port: 9090}, function () {
  console.log('连接到服务器');
  client.write('Hello\r\n');
});

//接受服务器的响应
client.on('data', function (data) {
  console.log('服务器应答:', data.toString());
  //断开连接
  client.end();
});

//监听断开事件
client.on('end', function () {
  console.log('服务断开');
});
````

## 简易聊天室

### 服务端

```javascript
"Use strict";
const net = require('net');

//创建TCP服务器
let server = net.createServer();

let sockets = [];


server.on('connection', function (socket) {
  console.log('发生一个新的连接');

  sockets.push(socket);

  socket.on('data', function (data) {
    console.log('接收的数据:', data.toString());

    //广播
    sockets.forEach(function (otherSocket) {
      if(otherSocket !== socket){
        otherSocket.write(data);
      }
    });

    //关闭退出的socket
    socket.on('close', function () {
      console.log('一个连接关闭');

      let index = sockets.indexOf(socket);
      sockets.splice(index, 1);
    })

  })
});

server.on('error', function (err) {
  console.log('Server error:', error.message);
});

server.on('close', function () {
  console.log('Server closed');
});

server.listen(9090, function (err) {
  if(!err){
    console.log('listening 9090');
  }
});
```

### 客户端

```javascript
const net = require('net');

process.stdin.resume();
process.stdin.setEncoding('utf8');

var client = net.connect({port: 9090}, function () {
  console.log('连接server');

  // 获取输入的字符串
  console.log('input:');
  process.stdin.on('data', function (data) {
    console.log('input:');
    client.write(data);

    //输入'close' 关闭连接
    if (data == 'close\n'){
      client.end();
    }
  })
});

// 获取服务端发送过来的数据
client.on('data', function (data) {
  console.log('接受服务端数据', data.toString());
});

client.on('end', function () {
  console.log('退出程序');
  process.exit();
});
```

### web socket

````javascript
"Use strict";
const net = require('net');
const crypto = require('crypto');


//创建TCP服务器
let server = net.createServer();

let sockets = [];
const mask = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';  //算法固定获得的数据

server.on('connection', function (socket) {
  console.log('发生一个新的连接');
  sockets.push(socket);

  let key;
  socket.on('data', function (data) {
    if(!key){
      key = data.toString().match(/Sec-WebSocket-Key: (.+)/)[1];
      console.log(key);
      key = crypto.createHash('sha1').update(key + mask).digest('base64');
      console.log(key);

      socket.write('HTTP/1.1 101 Switching Protocols\r\n');
      socket.write('Upgrade: websocket\r\n');
      socket.write('Connection: Upgrade\r\n');
      socket.write('Sec-WebSocket-Accept: ' + key + '\r\n');
      socket.write('\r\n');
    } else {
      socket.write('服务器发送的数据')
    }

    //广播
    /*sockets.forEach(function (otherSocket) {
      if(otherSocket !== socket){
        otherSocket.write(data);
      }
    });*/

    //关闭退出的socket
    socket.on('close', function () {
      console.log('一个连接关闭');

      let index = sockets.indexOf(socket);
      sockets.splice(index, 1);
    });

/*  socket.on('data', function (e) {

    key = e.toString().match(/Sec-WebSocket-Key: (.+)/)[1];
    key = crypto.createHash('sha1').update(key + WS).digest('base64');
    socket.write('HTTP/1.1 101 Switching Protocols\r\n');
    socket.write('Upgrade: websocket\r\n');
    socket.write('Connection: Upgrade\r\n');
    socket.write('Sec-WebSocket-Accept: ' + key + '\r\n');
    socket.write('\r\n');*/

  })
});

server.on('error', function (err) {
  console.log('Server error:', error.message);
});

server.on('close', function () {
  console.log('Server closed');
});

server.listen(9090, function (err) {
  if(!err){
    console.log('listening 9090');
  }
});
````

## UDP Server

### 服务端

````javascript
const dgram = require('dgram');

let server = dgram.createSocket('udp4');

server.on('error', function (err) {
  console.log(err);
  console.log('server error:\n' + err.stack);
  server.close();
});

// 接受来自客户端的消息
server.on('message', function (msg, rinfo) {
  console.log('Server got：'+ msg.toString() + " from " + rinfo.address + ":" +rinfo.port);
});

//监听服务
server.on('listening', function () {
  var address = server.address();
  console.log("server listening on" + address.address + ":" + address.port);
});

server.bind(41234);
````

### 客户端

````javascript
var dgram = require('dgram');

var client = dgram.createSocket('udp4');
var message = new Buffer("Hello shiyanlou");

client.send(message, 0, message.length, 41234, '127.0.0.1', function (err, bytes) {
  client.close();
})
````

