# 进程

## Process

### 退出事件(exit)

````javascript
process.on('exit', function (code) {
  setTimeout(function () {
    console.log('This will not run');
  }, 0);

  console.log('exit code:', code);
});
````

### 信号事件

````javascript
process.stdin.resume();

process.on('SIGINT', function () {
  console.log('Got SIGINT.  Press Control-D to exit.')
});
````

### 属性

* process.stdin 标准输入
* process.stdout 标准输出
* process.stderr 标准错误


````javascript
'use strict';

process.stdin.setEncoding('utf8');

process.stdin.on('readable', function () {
  var chunk = process.stdin.read();
  if(chunk !== null){
    process.stdout.write('data:'+ chunk);
  }
});

process.stdin.on('end', function () {
  process.stdout.write('end');
})
````


### 方法

* process.cwd() 返回脚本运行工作目录
* process.chdir() 切换工作目录
* process.exit() 退出当前进程
* process.on() 添加 监听事件

## child_process

用于创建子进程

### child_process.spawn()

启动一个新的进程

````javascript
'use strict';

var spawn = require('child_process').spawn,
  ls = spawn('calc');

ls.stdout.on('data', function (data) {
  console.log('stdout:'+ data);
});

ls.stderr.on('data', function (data) {
  console.log('stderr:' + data);
});

ls.on('close', function (code) {
  console.log('child process exited with code:' + code);
});



var spawn = require('child_process').spawn,
    ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
});

ls.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
});

ls.on('close', function (code) {
    console.log('child process exited with code ' + code);
});
````

### child_process.exec()

执行一个命令并缓冲输出

````javascript
let exec = require('child_process').exec, child;

child = exec('dir "c:"', function (err, stdout, stderr) {
  if(err !== null){
    console.log('exec Error:' + err);
  } else {
    console.log('stdout:' + stdout);
    console.log('stderr:' + stderr)
  }
})


var exec = require('child_process').exec,
  child;

child = exec('cat *.js bad_file | wc -l', function (error, stdout, stderr) {
  console.log('stdout:' + stdout);
  console.log('stderr:'+ stderr);

  if (error !== null) {
    console.log('exec error:'+ error);
  }
})
````

### child_prcess.execFile()

与exec方法类似，执行特定程序文件，参数通过一个数组传送。

```javascript
// test_execfile.js
var child_process = require('child_process');

// exec: spawns a shell
child_process.exec('ls -lh /usr', function(error, stdout, stderr){
    console.log(stdout);
    console.log('******************');
});

// execFile: executes a file with the specified arguments
child_process.execFile('/bin/ls', ['-lh', '/usr'], function(error, stdout, stderr){
    console.log(stdout);
});
```

### child_process.fork()

直接创建一个子进程，此进程是node命令的子进程，`fork('./sub.js')`相当于`spwan('node', './sub.js')`。fork还会在父进程与子进程之间，建立一个通信管道，通过`child.send()`发送消息。

````javascript
// main.js
var cp = require('child_process');

var n = cp.fork(__dirname + '/sub.js');

n.on('message', function(m) {
  console.log('PARENT got message:', m);
});

n.send({ hello: 'world' });
````

````javascript
// sub.js
process.on('message', function(m) {
  console.log('CHILD got message:', m);
});

process.send({ foo: 'bar' });
````

## cluster

单个的Node实例运行在单个线程中。要发挥多核系统的能力，需要启动一个Node进程集群来处理负载。cluster模块就用于创建共享服务器端口的子进程。

````javascript
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;  // 获取CPU内核数

// master是主进程
// 此处判断是否为master进程
// 是则根据CPU内核数创建worker进程
if (cluster.isMaster) {
    // worker是运行节点
    // 根据CPU数量启动worker
    // Fork workers
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    Object.keys(cluster.workers).forEach(function(id) {
        console.log('I am running with ID : ' + cluster.workers[id].process.pid);
    });
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
} else {
    // cluster.isWorker == true
    // 运行到else中的代码
    // 说明当前进程是worker进程
    // 那么此worker进程就启动一个http服务
    http.createServer(function(req, res) {
        res.writeHead(200);
        res.end("hello world\n");
    }).listen(8000);
}
````

















