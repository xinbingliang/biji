# EventProxy 

EventProxy 仅仅是一个很轻量的工具，但是能够带来一种事件式编程的思维变化。有几个特点：

1. 利用事件机制解耦复杂业务逻辑
2. 移除被广为诟病的深度callback嵌套问题
3. 将串行等待变成并行等待，提升多异步协作场景下的执行效率
4. 友好的Error handling
5. 无平台依赖，适合前后端，能用于浏览器和Node.js
6. 兼容CMD，AMD以及CommonJS模块环境

## 多类型异步协作

```javascript
const eventproxy = require('eventproxy');
const fs = require('fs');


let ep = new eventproxy();

ep.all('tpl1', 'tpl2', function(tpl1, tpl2){
    console.log(tpl1, tpl2);
})

//制造异步
fs.readFile('data.txt', 'utf-8', function(err, content){
    ep.emit('tpl1', content);
});

fs.readFile('data.txt', 'utf-8', function(err, content){
    ep.emit('tpl2', content);
});
```

`all`方法将handler注册到事件组合上。当注册的多个事件都触发后，将会调用handler执行，每个事件传递的数据，将会依照事件名顺序，传入handler作为参数。

## create静态方法

快速创建 EventProxy提供了`create`静态方法，可以快速完成注册`all`事件

```javascript
const eventproxy = require('eventproxy');
const fs = require('fs');

let ep = eventproxy.create('tpl1', 'tpl2', function(tpl1, tpl2){
    console.log(tpl1, tpl2);
}); 

//制造异步
fs.readFile('data.txt', 'utf-8', function(err, content){
    ep.emit('tpl1', content);
});

fs.readFile('data.txt', 'utf-8', function(err, content){
    ep.emit('tpl2', content);
});
```

## 重复异步操作

此处以读取目录下的所有文件为例，在异步操作中，我们需要在所有异步调用结束后，执行某些操作。

```javascript
var ep = new EventProxy();
ep.after('got_file', files.length, function (list) {
  // 在所有文件的异步执行结束后将被执行 
  // 所有文件的内容都存在list数组中 
});
for (var i = 0; i < files.length; i++) {
  fs.readFile(files[i], 'utf-8', function (err, content) {
    // 触发结果事件 
    ep.emit('got_file', content);
  });
}


const eventproxy = require('eventproxy');
const fs = require('fs');

let ep = new eventproxy();

ep.after('readfile', 10, function(list){
    console.log(list);
});

for (let i = 0; i < 10; i++){
    fs.readFile('data.txt', 'utf-8', function(err, content){
        ep.emit('readfile', i);
    })
}

```

`after`方法适合重复的操作，比如读取10个文件，调用5次数据库等。将handler注册到N次相同事件的触发上。达到指定的触发数，handler将会被调用执行，每次触发的数据，将会按触发顺序，存为数组作为参数传入。

## 持续异步协作

此处以股票为例，数据和模板都是异步获取，但是数据会持续刷新，视图会需要重新刷新。

````javascript
const eventproxy = require('eventproxy');
const fs = require('fs');

let ep = new eventproxy();

ep.tail('tpl', 'data', function(tpl, data){
    console.log(tpl, data);
});

fs.readFile('./data.txt', 'utf-8', function(error, content){
    ep.emit('tpl', content);
});

let count = 0;
setInterval(function(){
    ep.emit('data', count);
    count++;
}, 2000)
````

`tail`与`all`方法比较类似，都是注册到事件组合上。不同在于，指定事件都触发之后，如果事件依旧持续触发，将会在每次触发时调用handler，极像一条尾巴。

## 基本事件

通过事件实现异步协作是EventProxy的主要亮点。除此之外，它还是一个基本的事件库。携带如下基本API

- `on`/`addListener`，绑定事件监听器
- `emit`，触发事件
- `once`，绑定只执行一次的事件监听器
- `removeListener`，移除事件的监听器
- `removeAllListeners`，移除单个事件或者所有事件的监听器

为了照顾各个环境的开发者，上面的方法多具有别名。

- YUI3使用者，`subscribe`和`fire`你应该知道分别对应的是`on`/`addListener`和`emit`。
- jQuery使用者，`trigger`对应的方法是`emit`，`bind`对应的就是`on`/`addListener`。
- `removeListener`和`removeAllListeners`其实都可以通过别名`unbind`完成。

所以在你的环境下，选用你喜欢的API即可。

## 异常处理

````javascript
const eventproxy = require('eventproxy');
const fs = require('fs');

exports.getContent = function(callback, errorHandle){
    let ep = new eventproxy();

    ep.all('tpl', 'data', function(tpl, data){
        //成功回调
        callback(null, {
            template: tpl,
            data: data
        });
    });

    ep.fail(errorHandle);

    fs.readFile('data.txt', 'utf-8', ep.done('tpl'));
    fs.readFile('data.txt', 'utf-8', ep.done('data'));    
}


const test = require('./testeventproxy');

test.getContent(function(data1, data2){
    console.log(data1, data2);
}, function(err){
    console.log(err);
});
````

## fail

````javascript
ep.fail(callback);
// 由于参数位相同，它实际是 
ep.fail(function (err) {
  callback(err);
});
 
// 等价于 
ep.bind('error', function (err) {
  // 卸载掉所有handler 
  ep.unbind();
  // 异常回调 
  callback(err);
});
````

`fail`方法侦听了`error`事件，默认处理卸载掉所有handler，并调用回调函数。

### 神奇的 throw

`throw` 是 `ep.emit('error', err)` 的简写。

```php
var err = new Error();
ep.throw(err);
// 实际是 
ep.emit('error', err);
```

### 神奇的done

```php
ep.done('tpl');
// 等价于 
function (err, content) {
  if (err) {
    // 一旦发生异常，一律交给error事件的handler处理 
    return ep.emit('error', err);
  }
  ep.emit('tpl', content);
}
```

在Node的最佳实践中，回调函数第一个参数一定会是一个`error`对象。检测到异常后，将会触发`error`事件。剩下的参数，将触发事件，传递给对应handler处理。

#### done也接受回调函数

`done`方法除了接受事件名外，还接受回调函数。如果是函数时，它将剔除第一个`error`对象(此时为`null`)后剩余的参数，传递给该回调函数作为参数。该回调函数无需考虑异常处理。

```php
ep.done(function (content) {
  // 这里无需考虑异常 
  // 手工emit 
  ep.emit('someevent', newcontent);
});
```

当然手工emit的方式并不太好，我们更进一步的版本：

```php
ep.done('tpl', function (tpl) {
  // 将内容更改后，返回即可 
  return tpl.trim();
});
```

#### 注意事项

如果`emit`需要传递多个参数时，`ep.done(event, fn)`的方式不能满足需求，还是需要`ep.done(fn)`，进行手工`emit`多个参数。

### 神奇的group

`fail`除了用于协助`all`方法完成外，也能协助`after`中的异常处理。另外，在`after`的回调函数中，结果顺序是与用户`emit`的顺序有关。为了满足返回数据按发起异步调用的顺序排列，`EventProxy`提供了`group`方法。

```
var ep = new EventProxy();
ep.after('got_file', files.length, function (list) {
  // 在所有文件的异步执行结束后将被执行 
  // 所有文件的内容都存在list数组中，按顺序排列 
});
for (var i = 0; i < files.length; i++) {
  fs.readFile(files[i], 'utf-8', ep.group('got_file'));
}
```

`group`秉承`done`函数的设计，它包含异常的传递。同时它还隐含了对返回数据进行编号，在结束时，按顺序返回。

```
ep.group('got_file');
// 约等价于 
function (err, data) {
  if (err) {
    return ep.emit('error', err);
  }
  ep.emit('got_file', data);
};
```

当回调函数的数据还需要进行加工时，可以给`group`带上回调函数，只要在操作后将数据返回即可：

```
ep.group('got_file', function (data) {
  // some code 
  return data;
});
```

### 异步事件触发: emitLater && doneLater

在node中，`emit`方法是同步的，EventProxy中的`emit`，`trigger`等跟node的风格一致，也是同步的。看下面这段代码，可能眼尖的同学一下就发现了隐藏的bug:

```
var ep = EventProxy.create();
 
db.check('key', function (err, permission) {
  if (err) {
    return ep.emit('error', err);
  }
  ep.emit('check', permission);
});
 
ep.once('check', function (permission) {
  permission && db.get('key', function (err, data) {
    if (err) {
      return ep.emit('error');
    }
    ep.emit('get', data);
  });
});
 
ep.once('get', function (err, data) {
  if (err) {
    return ep.emit('error', err);
  }
  render(data);
});
 
ep.on('error', errorHandler);
```

没错，万一`db.check`的`callback`被同步执行了，在`ep`监听`check`事件之前，它就已经被抛出来了，后续逻辑没办法继续执行。尽管node的约定是所有的`callback`都是需要异步返回的，但是如果这个方法是由第三方提供的，我们没有办法保证`db.check`的`callback`一定会异步执行，所以我们的代码通常就变成了这样:

```
var ep = EventProxy.create();
 
ep.once('check', function (permission) {
  permission && db.get('key', function (err, data) {
    if (err) {
      return ep.emit('error');
    }
    ep.emit('get', data);
  });
});
 
ep.once('get', function (err, data) {
  if (err) {
    return ep.emit('error', err);
  }
  render(data);
});
 
ep.on('error', errorHandler);
 
db.check('key', function (err, permission) {
  if (err) {
    return ep.emit('error', err);
  }
  ep.emit('check', permission);
});
```

我们被迫把`db.check`挪到最后，保证事件先被监听，再执行`db.check`。`check`->`get`->`render`的逻辑，在代码中看起来变成了`get`->`render`->`check`。如果整个逻辑更加复杂，这种风格将会让代码很难读懂。

这时候，我们需要的就是 **异步事件触发**：

```
var ep = EventProxy.create();
 
db.check('key', function (err, permission) {
  if (err) {
    return ep.emitLater('error', err);
  }
  ep.emitLater('check', permission);
});
 
ep.once('check', function (permission) {
  permission && db.get('key', function (err, data) {
    if (err) {
      return ep.emit('error');
    }
    ep.emit('get', data);
  });
});
 
ep.once('get', function (err, data) {
  if (err) {
    return ep.emit('error', err);
  }
  render(data);
});
 
ep.on('error', errorHandler);
```

上面代码中，我们把`db.check`的回调函数中的事件通过`emitLater`触发，这样,就算`db.check`的回调函数被同步执行了，事件的触发也还是异步的，`ep`在当前事件循环中监听了所有的事件，之后的事件循环中才会去触发`check`事件。代码顺序将和逻辑顺序保持一致。 当然，这么复杂的代码，必须可以像`ep.done()`一样通过`doneLater`来解决：

```
var ep = EventProxy.create();
 
db.check('key', ep.doneLater('check'));
 
ep.once('check', function (permission) {
  permission && db.get('key', ep.done('get'));
});
 
ep.once('get', function (data) {
  render(data);
});
 
ep.fail(errorHandler);
```

最终呈现出来的，是一段简洁且清晰的代码。

## 案例

`````javascript
"use strict";

const superagent = require('superagent');
const cheerio = require('cheerio');
const eventproxy = require('eventproxy');
const url = require('url');

let cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl).end(function(err, res){
  if(err){
    return console.log(err);
  }


  let topicUrls = [];
  let $ = cheerio.load(res.text);

  $('#topic_list .topic_title').each(function(idx, element){
    let href = url.resolve(cnodeUrl, $(element).attr('href'));
    topicUrls.push(href);
  })
  
  let ep = new eventproxy();

  ep.after('topic_html', topicUrls.length, function(topics){
    topics = topics.map(function(topicPair){
      let topicUrl = topicPair[0];
      let topicHtml = topicPair[1];
      var $ = cheerio.load(topicHtml);

      return {
        title: $('.topic_full_title').text().trim(),
        href: topicUrl,
        comment1: $('.reply_content').eq(0).text().trim()
      };
    });

    console.log('final:');
    console.log(topics);
  });


  topicUrls.forEach(function(topicUrl){
    superagent.get(topicUrl).end(function(err, res){
        console.log('fetch ' + topicUrl + ' successful');
        ep.emit('topic_html', [topicUrl, res.text])
    })
  })
})
`````

