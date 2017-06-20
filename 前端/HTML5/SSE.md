## SSE

WebSocket 更强大和灵活。因为它是全双工通道，可以双向通信；SSE 是单向通道，只能服务器向浏览器发送，因为流信息本质上就是下载。如果浏览器向服务器发送信息，就变成了另一次 HTTP 请求。

## sse和socket区别

- SSE 使用 HTTP 协议，现有的服务器软件都支持。WebSocket 是一个独立协议。
- SSE 属于轻量级，使用简单；WebSocket 协议相对复杂。
- SSE 默认支持断线重连，WebSocket 需要自己实现。
- SSE 一般只用来传送文本，二进制数据需要编码后传送，WebSocket 默认支持传送二进制数据。
- SSE 支持自定义发送的消息类型。

## 服务端的实现

````php
<?php  
 	header('Content-Type: text/event-stream'); //把报头 "Content-Type" 设置为 "text/event-stream",导致数据结束要使用`\n\n`
	header('Cache-Control: no-cache');	//规定不对页面进行缓存
	header('Connection: keep-alive');
	$time = date('r');

	echo "data: The Server time is：{$time}\n\n";	//数据输出必须用\n\n
	flush();
?>
````

## 客户端

### 校验客户端是否可用

````javascript
<script type="text/javascript">
	window.onload = function(){
		if('EventSource' in window){
			console.log('可以使用');
		}
	}
</script>
````

### 发起连接

````javascript
var source = new EventSource(url);
````

上面的`url`可以与当前网址同域，也可以跨域。跨域时，可以指定第二个参数，打开`withCredentials`属性，表示是否一起发送 Cookie。

`````
var source = new EventSource(url, { withCredentials: true });
`````

`EventSource`实例的`readyState`属性，表明连接的当前状态。该属性只读，可以取以下值。

* 0：相当于常量`EventSource.CONNECTING`，表示连接还未建立，或者断线正在重连。
* 1：相当于常量`EventSource.OPEN`，表示连接已经建立，可以接受数据。
* 2：相当于常量`EventSource.CLOSED`，表示连接已断，且不会重连。

**接口连接成功**

````javascript
source.addEventListener('open', function(event){
	console.log('成功建立连接');
});
````

### 监听数据改变事件

````javascript
source.onmessage = function(event){
	console.log(event.data)
}
````

### 发生错误

````javascript
//通信错误
source.addEventListener('error', function(event){
	console.log(event);
});
````

### 关闭连接

```javascript
source.close();
```

## 事件自定义

[field]: value\n

- data 数据
- event 事件
- id 数据标识，浏览器用lastEventId读取
- retry 指定浏览器重新发起连接的时间间隔，毫秒数。

**服务端**

````php
 	header('Content-Type: text/event-stream'); //把报头 "Content-Type" 设置为 "text/event-stream",导致数据结束要使用`\n\n`
	header('Cache-Control: no-cache');	//规定不对页面进行缓存
	header('Connection: keep-alive');
	$time = date('r');

	// echo "data: The Server time is：{$time}\n\n";	//数据输出必须用\n\n

	$data = "event: foo\ndata: The Server time is：{$time}\ndata: 哈哈\ndata: end\n\n";
	echo $data;

	flush();
````

**客户端**

````javascript
source.addEventListener('foo', function(event){
	console.log(event.data)
});
````

**JSON**

```
data: {\n
data: "foo": "bar",\n
data: "baz", 555\n
data: }\n\n
```

## node实现的服务端

```javascript
var http = require("http");

http.createServer(function (req, res) {
  var fileName = "." + req.url;

  if (fileName === "./stream") {
    res.writeHead(200, {
      "Content-Type":"text/event-stream",
      "Cache-Control":"no-cache",
      "Connection":"keep-alive",
      "Access-Control-Allow-Origin": '*',
    });
    res.write("retry: 10000\n");
    res.write("event: connecttime\n");
    res.write("data: " + (new Date()) + "\n\n");
    res.write("data: " + (new Date()) + "\n\n");

    interval = setInterval(function () {
      res.write("data: " + (new Date()) + "\n\n");
    }, 1000);

    req.connection.addListener("close", function () {
      clearInterval(interval);
    }, false);
  }
}).listen(8844, "127.0.0.1");
```

