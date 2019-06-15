# python thrift

https://diwakergupta.github.io/thrift-missing-guide/#_constants

````
namespace py mytest

service Transmit {
    string sayMsg (1:string msg);
    string invoke (1:i32 cmd, 2:string token, 3:string data)
}
````

* `thrift --gen py --out ./ mytest.thrift` 生成

## 概念

* Handler

服务端业务处理逻辑。这里就是业务代码，比如 计算两个字符串 相似度

* Processor

从Thrift框架 转移到 业务处理逻辑。因此是RPC调用，客户端要把 参数发送给服务端，而这一切由Thrift封装起来了，由Processor将收到的“数据”转交给业务逻辑去处理

* Protocol

数据的序列化与反序列化。客户端提供的是“字符串”，而数据传输是一个个的字节，因此会用到序列化与反序列化。

* Transport

传输层的数据传输。

* TServer

服务端的类型。服务器以何种方式来处理客户端请求，比如，一次Client请求创建一个新线程呢？还是使用线程池？

TSimpleServer —— 单线程服务器端使用标准的阻塞式 I/O

TThreadPoolServer —— 多线程服务器端使用标准的阻塞式 I/O

TNonblockingServer —— 多线程服务器端使用非阻塞式 I/O

## 服务端

````python
# -*- coding:utf-8 -*-
import json
import socket
from mytest import Transmit
from thrift.transport import TSocket, TTransport
from thrift.protocol import TBinaryProtocol
from thrift.server import TServer

__Author__ = "xinneirong"
__Email__ = "xinneirong@gmail.com"
__Time__ = "2019/6/13 9:48"

class TransmitHandler:
    def __init__(self):
        self.log = {}

    def sayMsg(self, msg):
        msg = json.loads(msg)
        print("sayMsg("+ msg +")")
        return "say "+ msg + " from " + socket.gethostbyname(socket.gethostname())

    def invoke(self, cmd, token, data):
        cmd = cmd
        token = token
        data = data

        if cmd == 1:
            return json.dumps({token: data})
        else:
            return "CMD不匹配"

if __name__ == '__main__':
    handler = TransmitHandler()
    processor = Transmit.Processor(handler)
    transport = TSocket.TServerSocket('127.0.0.1', 8080)
    tfactory = TTransport.TBufferedTransportFactory()
    pfactory = TBinaryProtocol.TBinaryProtocolFactory()
    server = TServer.TSimpleServer(processor, transport, tfactory, pfactory)
    print("service python server ......")
    server.serve()
````

## 客户端

````python
# -*- coding:utf-8 -*-
import json
from mytest import Transmit
from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol

__Author__ = "xinneirong"
__Email__ = "xinneirong@gmail.com"
__Time__ = "2019/6/13 10:23"

transport = TSocket.TSocket('127.0.0.1', 8080)
transport = TTransport.TBufferedTransport(transport)
protocol = TBinaryProtocol.TBinaryProtocol(transport)
client = Transmit.Client(protocol)

transport.open()

cmd = 1
token = "1111-2222-3333-4444"
data = json.dumps({"name": "辛丙亮"})
msg = client.invoke(cmd, token, data)
print(msg)
transport.close()

# msg = client.sayMsg('{"name": "辛丙亮"}')
# print(msg)
# transport.close()

````

## 数据类型

### 基本类型

* `bool`：布尔值，true 或 false，对应 C#的 bool
* `byte`：8 位有符号整数，对应 C#的 byte
* `i16`：16 位有符号整数，对应 C#的 short
* `i32`：32 位有符号整数，对应 C#的 int
* `i64`：64 位有符号整数，对应 C#的 long
* `double`：64 位浮点数，对应 C#的 double
* `string`：未知编码文本或二进制字符串，对应 C#的 string
* **void**，空类型，对应C/C++/java中的void类型；该类型主要用作函数的返回值，例如：void testVoid(),

### 结构体类型

* struct：定义公共的对象，类似于 C 语言中的结构体定义，在 C#中是一个实体类

### 容器类型

* `list`：对应 C#的 List<T> 有序集合
* `set`：对应 C#的 HashSet<T>无序但是不能重复的集合
* `map`：对应 C#的 Dictionary<TKey,TValue>键值对集合，键不能重复

### 异常类型

* `exception`：对应 C#的 Exception

### 服务类型

* `service`：对应服务的类

## 协议

* `TBinaryProtocol` 二进制编码格式进行数据传输使
* `TCompactProtocol` 高效率的、密集的二进制编码格式进行数据传输
* `TJSONProtocol` 使用JSON 的数据编码协议进行数据传输
* `TBinaryProtocol` 提供JSON只写协议, 生成的文件很容易通过脚本语言解析
* `TDebugProtocol` 使用易懂的可读的文本格式，以便于debug

## 传输层

* `TSocket` 使用阻塞式 I/O 进行传输，是最常见的模式，由于C#语言的限制无法使用非阻塞同步传输和非阻塞异步传输的方式
* `TFramedTransport` 以frame为单位进行传输，非阻塞式服务中使用
* `TFileTransport` 以文件形式进行传输
* `TMemoryTransport` 将内存用于I/O，java实现时内部实际使用了简单的ByteArrayOutputStream
* `TZlibTransport` 使用zlib进行压缩， 与其他传输方式联合使用，当前无java实现；

## 服务端类型

* `TSimpleServer` 单线程服务器端使用标准的阻塞式 I/O，简单的单线程服务模型，常用于测试
* `TThreadPoolServer` 多线程服务器端使用标准的阻塞式I/O，多线程服务模型，使用标准的阻塞式IO
* `TNonblockingServer` 多线程服务模型，使用非阻塞式IO（需使用TFramedTransport数据传输方式）



https://blog.csdn.net/WinWill2012/column/info/16012

`````
namespace py message

// 定义异常
exception MyException {
    1: i32 what,
    2: string why
}

// 定义一个list
typedef map<string, string> Xin
typedef set<string> Bing

service MessageService {
    MyException email(1:string number, 2: string msg)
}
`````

