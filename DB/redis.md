# Redis

高速写入，集中持久化

## 安装

* 下载

  ````
  Tcl-8.5.10的安装 
  下载 http://downloads.sourceforge.net/tcl/tcl8.5.10-src.tar.gz
  tar -xf
  cd unix && ./configure --prefix=/usr  --enable-threads  --mandir=/usr/share/man 
  make
  make install 
  ````

  ​

* tar -zxfv  .tar.gz

* cd 

* make

* make PREFIX=/usr/local/redis  install  指定安装位置

* cd /usr/local/redis

### 安装文件说明

* `redis-benchmark` 性能测试
* `redis-check-aof` 检查aof日志
* `redis-check-dump` 检查`rbd`日志
* `redis-cli` 连接使用的客户端
* `redis-server` 服务进程

### 启动

* `cp /usr/local/src/redis/redis.cof 和bin同级`
* `redis-server ../redis.conf` 启动(修改配置daemonize 为yes则在后台运行)

### 连接

* `redis-cli` 连接

## 键值操作(通用)

````
set name 辛丙亮 //设置键值
select 1 切换库
flushdb
````

### keys pattern

* `keys *` //*表示0到多个字符
* `keys s*` 
* `keys sit[ey]` //在ey中的一个
* `keys si?e ` // ?表示一个字符

### 任意的key

* `randomkey` 随机一个key

### 判断key类型

* `type site` //site key是什么类型

### 存在性检测

* `exists site` //key的存在性检测

### 删除key

* `del site `

### 修改名称(重名覆盖)

* `rename site` 网址

### 修改名称（已经存在名称）

* `renamenx site ` 不冲突修改，冲突不操作

### 移动数据库

* `move site 1` 将当前数据库数据移动到1号上

### 设置有效期

* `ttl site` 查看生命周期
* `expire site 1000` 将site的声明周期设置为1000秒
* `pttl site` 毫秒查询
* `persist site`  毫秒级
* `persist site` 改为永久有效

## 数据类型

* `set key value [ex 秒数] | [px 毫秒数] [nx]/[xx]` 设置时指定生存周期

  * nx 表示key不存在的时候执行操作
  * xx 表示key必须存在时执行操作，替换

* `mset multi set` 一次性设置多个键值

  ````
  mset a aman b bold c controller
  keys *
  ````

* `mget key1 key2` 一次获取多个key

* `setrange key offset value ` 将字符串的偏移字节改成value

  ```
  set word hello
  setrange word 2 ??
  ```

* `append key value` 把value追加到key的原值上

* `getrange key start stop` 获取字符串中[start, stop]范围的值

* `getset key newvalue` 获取并返回旧值，设置新值(状态调整)

* `incr key` 指定key的值加一，并返回加一后的值

* `decr key` 指定的key减一，并返回操作后的值

* `incrby key number` 指定增加幅度

* `decr key bnumber` 

* `incrbyfloat key 0.5` 浮点数增加

### 链表(list)

* `lpush key value` 将值插入到list的头部
* `rpush key value` 
* `rpop key` 返回并删除链表的尾部
* `rpush lpop`
* `lrange key start stop` 返回链表中[start, stop]中的元素
* `lrem key count value` 从key链表中删除value值，count>0从头开始，count<0从尾部开始，count指个数
* ` ltrim key start stop` 剪切key 对应的链表,且将[start, stop]重新赋值给key
* `lindex key index` 返回index索引上的值
* `llen key` 计算链表的元素个数
* `linsert key after|before seach value` 在key链表上寻找seach值前|后插入value,找到就结束，不会插入多个
* `rpop|push source dest` 将source的尾部取出放到dest头部，常做安全队列
* `brop,blpop key timeout` 弹出key的头/尾部元素,timeout为超时时间，time为0则一直等待

### 字符串



### 哈希结构集合



### 有序集合



## 事务



## 消息订阅



## 持久化



## 集群



## PHP-redis



## 运维











