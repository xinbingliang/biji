# redis

## 安装

* `tar zxvf redis-3.2.5.tar.gz` 解压
* `mv -r redis-3.2.3/* /usr/local/redis/` 
* `make`
* `make test`
* `make install` 将redis的命令安装到/usr/bin/目录
* `redis-server ../redis.conf`启动(修改配置daemonize 为yes则在后台运行)

## 基本配置

### 配置文件

* `bind 127.0.0.1` 如果需要远程访问，可将此行注释

* `port 6379` 端口，默认为6379

* `daemonize no|yes` 是否以守护进程运行

* `dbfilename dump.rdb`数据文件

* 数据文件存储路径

  ```
  dir的默认值为./，表示当前目录
  推荐改为：dir /var/lib/redis
  ```

###使用配置文件方式启动

* `cp /usr/local/redis/redis.conf /etc/redis/`一般配置文件都放在/etc/目录下

* `redis-server /etc/redis/redis.conf`推荐指定配置文件启动

* 停止服务

  ```
  ps ajx|grep redis
  sudo kill -9 redis的进程id
  ```

## 数据操作

- 字符串string
- 哈希hash
- 列表list
- 集合set
- 有序集合zset

### string

- string是redis最基本的类型
- 最大能存储512MB数据
- string类型是二进制安全的，即可以为任何数据，比如数字、图片、序列化对象等

#### 设置

* `set key value` 设置键值
* `setex key seconds value` 设置键值及过期时间，以秒为单位
* `mset key value [key value ....]`设置多个键值

#### 获取

* `GET key`根据键获取值，如果不存在此键则返回nil
* `MGET key [key ...]`根据多个键获取多个值

#### 运算

* `INCR key`将key对应的value加1
* `INCRBY key increment`将key对应的value加整数
* `DECR key`将key对应的value减1
* `DECRBY key decrement` 将key对应的value减整数

#### 其他

* `APPEND key value` 追加值
* `STRLEN key` 获取值长度

### 键命令

* `KEYS *` 查看所有键`KEYS pattern`
* `EXISTS key [key ...]` 判断键是否存在
* `TYPE key` 查看键对应的value的类型
* `DEL key [key ...]`删除键及对应的值
* `EXPIRE key seconds` 以秒为单位设置过期时间

### hash

#### 设置

* `HSET key field value` 设置单个属性
* `HMSET key field value [field value ...]` 设置多个属性

#### 获取

* `HGET key field` 获取一个属性的值
* `HMGET key field [field ...]` 获取多个属性的值
* `HGETALL key` 获取所有属性和值
* `HKEYS key`获取所有的属性
* `HLEN key` 返回包含属性的个数
* `HVALS key`获取所有值

#### 其他

* `HEXISTS key field` 判断属性是否存在
* `HDEL key field [field ...]`删除属性及值
* `HSTRLEN key field` 返回值的字符串长度

### list

- 列表的元素类型为string
- 按照插入顺序排序
- 在列表的头部或者尾部添加元素

#### 设置

* `LPUSH key value [value ...]` 在头部插入数据
* `RPUSH key value [value ...]` 在尾部插入数据
* `LINSERT key BEFORE|AFTER pivot value` 在一个元素的前|后插入新元素



* 设置指定索引的元素值
* 索引是基于0的下标
* 索引可以是负数，表示偏移量是从list尾部开始计数，如-1表示列表的最后一个元素
* `LSET key index value`

#### 获取

* `LPOP key` 移除并且返回 key 对应的 list 的第一个元素
* `RPOP key` 移除并返回存于 key 的 list 的最后一个元素
* 返回存储在 key 的列表里指定范围内的元素
* start 和 end 偏移量都是基于0的下标
* 偏移量也可以是负数，表示偏移量是从list尾部开始计数，如-1表示列表的最后一个元素

```
LRANGE key start stop
```

#### 其他

- 裁剪列表，改为原集合的一个子集
- start 和 end 偏移量都是基于0的下标
- 偏移量也可以是负数，表示偏移量是从list尾部开始计数，如-1表示列表的最后一个元素

```
LTRIM key start stop
```

- 返回存储在 key 里的list的长度

```
LLEN key
```

- 返回列表里索引对应的元素

```
LINDEX key index
```

### set

- 无序集合
- 元素为string类型
- 元素具有唯一性，不重复

####设置

- 添加元素

```
SADD key member [member ...]

```

####获取

- 返回key集合所有的元素

```
SMEMBERS key

```

- 返回集合元素个数

```
SCARD key

```

#### 其它

- 求多个集合的交集

```
SINTER key [key ...]

```

- 求某集合与其它集合的差集

```
SDIFF key [key ...]

```

- 求多个集合的合集

```
SUNION key [key ...]

```

- 判断元素是否在集合中

```
SISMEMBER key member
```

### zset

- sorted set，有序集合
- 元素为string类型
- 元素具有唯一性，不重复
- 每个元素都会关联一个double类型的score，表示权重，通过权重将元素从小到大排序
- 元素的score可以相同

#### 设置

- 添加

```
ZADD key score member [score member ...]
```

#### 获取

- 返回指定范围内的元素

```
ZRANGE key start stop
```

- 返回元素个数

```
ZCARD key
```

- 返回有序集key中，score值在min和max之间的成员

```
ZCOUNT key min max
```

- 返回有序集key中，成员member的score值

```
ZSCORE key member
```

## 高级

### 发布订阅

#### 消息的格式

- 推送消息的格式包含三部分
- part1:消息类型，包含三种类型
  - subscribe，表示订阅成功
  - unsubscribe，表示取消订阅成功
  - message，表示其它终端发布消息
- 如果第一部分的值为subscribe，则第二部分是频道，第三部分是现在订阅的频道的数量
- 如果第一部分的值为unsubscribe，则第二部分是频道，第三部分是现在订阅的频道的数量，如果为0则表示当前没有订阅任何频道，当在Pub/Sub以外状态，客户端可以发出任何redis命令
- 如果第一部分的值为message，则第二部分是来源频道的名称，第三部分是消息的内容

#### 命令

- 订阅

```
SUBSCRIBE 频道名称 [频道名称 ...]

```

- 取消订阅
- 如果不写参数，表示取消所有订阅

```
UNSUBSCRIBE 频道名称 [频道名称 ...]

```

- 发布

```
PUBLISH 频道 消息
```

### 主从

- 一个master可以拥有多个slave，一个slave又可以拥有多个slave，如此下去，形成了强大的多级服务器集群架构
- 比如，将ip为192.168.1.10的机器作为主服务器，将ip为192.168.1.11的机器作为从服务器
- 设置主服务器的配置

```
bind 192.168.1.10
```

- 设置从服务器的配置
- 注意：在slaveof后面写主机ip，再写端口，而且端口必须写

```
bind 192.168.1.11
slaveof 192.168.1.10 6379
```

- 在master和slave分别执行info命令，查看输出信息
- 在master上写数据

```
set hello world
```

- 在slave上读数据

```
get hello
```

## 与python交互

### 安装

* `sudo pip install redis` 安装包

### 代码交互

- 引入模块

```
import redis
```

- 连接

```
try:
    r=redis.StrictRedis(host='localhost',port=6379)
except Exception,e:
    print e.message
```

- 方式一：根据数据类型的不同，调用相应的方法，完成读写
- 更多方法同前面学的命令

```
r.set('name','hello')
r.get('name')
```

- 方式二：pipline
- 缓冲多条命令，然后一次性执行，减少服务器-客户端之间TCP数据库包，从而提高效率

```
pipe = r.pipeline()
pipe.set('name', 'world')
pipe.get('name')
pipe.execute()
```

### 封装

```
import redis
class RedisHelper():
    def __init__(self,host='localhost',port=6379):
        self.__redis = redis.StrictRedis(host, port)
    def get(self,key):
        if self.__redis.exists(key):
            return self.__redis.get(key)
        else:
            return ""
    def set(self,key,value):
        self.__redis.set(key,value)
```