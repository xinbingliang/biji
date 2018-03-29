## TCP

### 使用net创建服务端

```javascript
const net = require('net');

let server = net.createServer((conn)=>{
    console.log('有客户端正在尝试连接')
})

server.listen(3000, ()=>{
    console.log('listing 3000')
})
```

### 创建客户端

```javascript
const net = require('net');

let server = net.createServer((conn)=>{
    conn.write('\n Hello\n')
})

server.listen(3000, ()=>{
    console.log('listing 3000')
})
```

## UDP

### 创建udp服务端

```javascript
'use strict';

const dgram = require('dgram');

let server = dgram.createSocket('udp4');

//监听客户端发来的消息
server.on('message', function(msg, info){
    console.log('server got'+ msg +' from '+info.address+':'+info.port)
});

//监听错误事件
server.on('error', function(err){
    console.log('server error:'+err.stack)
})

//监听监听的信息
server.on('listening', function(){
    console.log('server is listening')
});


server.bind(2345); //端口绑定
```

### 创建udp客户端

```javascript
'use strict';

const dgram = require('dgram');

let socket =dgram.createSocket('udp4');

socket.bind(()=>{   //绑定并设置回调接口
    socket.setBroadcast(true);//使socket广播功能
})

let message = new Buffer('Hello world!');

socket.send(message, 0, message.length, 2345, '127.0.0.1', (error, bytes)=>{    //发送信息
    socket.close();
})
```

