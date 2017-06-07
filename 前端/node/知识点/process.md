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
* process.stdout 标准
* ​







### 方法





## child_process



### child_process



### child_process.spawn()



### child_process.exec()





### child_process.execFile()





### child_process.fork()















## cluster



















