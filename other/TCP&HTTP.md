#TCP和HTTP
|传输层协议|应用层协议|
|---|---|
|TCP|HTTP、FTP、SMTP|
|UDP|HTTP、XMPP、POP|

##TCP的三次握手四次挥手
![图解三次握手四次挥手](http://image.jeepshoe.org/upload/2/4f/24fda0ff0adc2974a0dd8bec83d9fe8a_thumb.png)

1. 通信方向服务方发送SYN报文(第一次握手)       
2. 服务方向通信返回一个带SYN的ACK(应答)报文(第二次握手)，服务端告诉客户端接受到SYN报文
3. 通信方向服务端给ACK报文(第三次握手)

断开链接是指服务端和客户端都断开彼此的socket

1. 客户端发起一个表示终端连接的FIN数据包，服务端接受到后进入半关闭的状态
2. 服务端对第一次挥手返回一个ACK     
************************
客户端告诉服务端要关闭连接，服务端同意关闭连接
************************
3. 服务端告诉客户端要关闭连接，发送一个FIN数据给客户端
4. 客户端对服务端做ACK应答，表示客户端知晓服务端关闭socket

##HTTP
###HTTP REQUEST协议格式
1. {请求方法}{/相对路径}HTTP/{http版本}\r\n
****************
请求方法：POST或GET     
相对路径：接在域名后的路径     
http版本：1.1一般      
****************
2. Header-Name-1:value\r\n   头信息，名称和值可以有多个头信息
3. \r\n 空的表示数据写完了
4. Optional Request Body 可选的只有POST有

例子
GET /js/o.js HTTP/1.1  头         
Host ss0.bdstatic.com 指定访问的域名           
Accept	text/css,*/*;q=0.1 表示接受的数据类型          
User-Agent	Mozilla/5.0 (Windows NT 6.1; rv:47.0) Gecko/20100101 Firefox/47.0 客户端代理标识          
Referer	https://www.baidu.com/index.php?tn=monline_3_dg 从哪个地方发几次请求           
Accept-Encoding	gzip, deflate, br 声明浏览器支持的编码类型           
Accept-Language	zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3 告诉服务器浏览器可以支持什么语言          
Cache-Control max-age=0 阻止缓存对请求或响应造成不利干扰的行为              
Connection	keep-alive          
Cookie BIDSID=sdfgsdfgksfkdhiuywr2398r83275           
If-None-Match W/"57a42af4-63c6"           
If-Modified-Since Fri, 05 Aug 2016 05:58:12 GMT            

###HTTP RESPOSE协议格式
1. HTTP/{version}{status-code}{message}\r\n
****************
status-code 响应码 500 404
message 信息
****************
2. Header-Name-1:value\r\n响应头信息 可以有多个
3. \r\n 空的结尾
4. Optional Response Body 数据，内容












