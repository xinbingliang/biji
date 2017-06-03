# Events





## events.evebtEmitter

### 自定义事件

````javascript
var events = require('events');
var emitter = new events.EventEmitter();

emitter.on('myevent', function (arg) {
  console.log(arg);
});

setTimeout(function () {
  emitter.emit('myevent', '传值');
}, 3000);
````

#### 只执行一次监听器

````javascript
var events = require('events');
var emitter = new events.EventEmitter();

emitter.once('myevent', function (arg) {
  console.log(arg);
});


setInterval(function () {
  emitter.emit('myevent', '传值');
}, 3000);
````

#### 移除监听器

````javascript
var events = require('events');
var emitter = new events.EventEmitter();

function call(arg) {
  console.log(arg);
}

emitter.on('myevent', call);


setInterval(function () {
  emitter.removeListener('myevent', call)
  emitter.emit('myevent', '传值');
}, 500);
````

#### 移除所有监听器

````javascript
var events = require('events');
var emitter = new events.EventEmitter();

function call(arg) {
  console.log(arg);
}

emitter.on('myevent', call);


setInterval(function () {
  emitter.removeAllListeners('myevent')
  emitter.emit('myevent', '传值');
}, 500);
````

#### 设置监听最大绑定数

```javascript
var events = require('events');
var emitter = new events.EventEmitter();

function call1(arg) {
  console.log(arg, 1);
}

function call2(arg) {
  console.log(arg, 2);
}

function call3(arg) {
  console.log(arg, 3);
}

emitter.setMaxListeners(2);			//触发提醒信息

emitter.on('myevent', call1);
emitter.on('myevent', call2);
emitter.on('myevent', call3);


setTimeout(function () {
  emitter.emit('myevent', '传值');
}, 500);
```

`emitter.setMaxListeners(n)`可以设置同一事件的监听器最大绑定数，默认情况下，超过10个就会警告提示，这能帮我们快速找到内存泄露的地方。显然，不是所有的事件触发器都限制在10个监听器，通过这个方法可以设置，如果设置为0就是无限制。

#### 查看事件绑定的监听数量

````javascript
var events = require('events');
var emitter = new events.EventEmitter();

function call1(arg) {
  console.log(arg, 1);
}

function call2(arg) {
  console.log(arg, 2);
}

function call3(arg) {
  console.log(arg, 3);
}


emitter.on('myevent', call1);
emitter.on('myevent', call2);
emitter.on('myevent', call3);


setTimeout(function () {
  console.log(events.EventEmitter.listenerCount(emitter, 'myevent'));
}, 500);
````

### 有趣的现象

````javascript
var events = require('events');
var emitter = new events.EventEmitter();

//第一个监听函数
var cinnecthandler = function () {
  console.log('第一个事件被触发');

  emitter.emit('dataEvent');

  console.log('第一个监听事件完成')
};


//监听第一个函数
emitter.on('myEvent', cinnecthandler);

//第二个监听函数
emitter.on('dataEvent', function () {
  console.log('第二个事件被触发');
});

//触发第一个监听函数
emitter.emit('myEvent');

console.log('Ending...')
````

### 其他模块对其使用

````javascript
var http = require('http');
var server = http.createServer();

// 为request事件绑定处理函数，事件只会执行一次
server.once('request', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('shiyanlou');
    console.log('shiyanlou');
    res.end();
});

server.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
````

本质上很多node内置类继承了Event









