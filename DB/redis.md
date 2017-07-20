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

* `decrby key bnumber`  指定减少幅度

* `incrbyfloat key 0.5` 浮点数增加

### 链表(list)

* `lpush key value [value1.....]` 将值插入到list的头部
* `rpush key value`  将新数据插入到尾部
* `rpop key` 返回并删除链表的尾部
* `lpop key` 在链表头部弹出
* `lrange key start stop` 返回链表中[start, stop]中的元素，返回所有值`lrange name 0 -1`
* `lrem key count value` 从key链表中删除value值，count>0从头开始，count<0从尾部开始，count指个数
* ` ltrim key start stop` 剪切key 对应的链表,且将[start, stop]重新赋值给key
* `lindex key index` 返回index索引上的值
* `llen key` 计算链表的元素个数
* `linsert key after|before seach value` 在key链表上寻找seach值前|后插入value,找到就结束，不会插入多个
* `RPOPLPUSH source dest` 将source的尾部取出放到dest头部，常做安全队列
* `brpop,blpop key timeout` 弹出key的头/尾部元素,timeout为超时时间，time为0则一直等待

## 集合

集合拥有无序性，确定性和唯一性的的特点

* `sadd key value1 value2` 向集合key中增加元素
* `srem key value1 value2` 删除集合中集为value1 value2 的元素
* `spop key` 返回并删除集合中key中1个随机元素
* `srandmember key` 返回集合key中随机的一个元素
* `smembers key` 返回集合中的所有元素
* `sismember key value` 判断value是否在key集合中
* `scard key` 返回集合中元素的个数
* `smove source dest value` 将source中的value删除并添加到dest中
* `sinter key1 key2 key3` 求出三个集合的交集并返回
* `sinterstore dest key1 key2 key3` 求出多个几个的交集并赋值dest
* `sunion key1 key2 ...` 求出并集并返回
* `sdiff key1 key2 key3`求出差集并返回

### 有序集合（order set）

元素声明时要指定排序

* `zadd key source1 value1 score2 value2` 添加元素
* `zrem key value1 value2` 删除集合中的元素
* `zremrangebyscore key min max` 按照scocre来删除元素，在min 和max之间
* `zremrangebyrank key start end` 按排名删除元素,删除名次在[start, end]之间
* `zrank key member` 查询member的排名(升序0开始)
* `zrevrank key memeber` 查询member 的排名(降序0开始)
* `zrange key start stop [withscores] `集合排序后返回名次[start, stop]的元素,默认升序
* `zrevrange key start stop` 把集合降序降序排列，取名字[start, stop]之间的元素
* `zrangebyscore key min max [withscores] limit offset N` 集合(升序)排列后取scre在[min,  max]内的元素
* `zcard key` 返回元素的个数 
* `zcount key min max` 返回[min, max]区间内元素的数量
* `zinterstore destination numkeys key1 [key2...] [weights weight [weight...]] [AGGREGATE SUM|MIN|MAX]` 求key1，key2交集，权重分别是weight1,weight2 聚合方法用sum|min|max 结果保存在dest中

### 哈希结构集合

* `hset key value` 设置键值对，如果有就覆盖
* `hmset key field1 value1 [files2 value2]`  设置多个键值对key = array(field=>value1)
* `hget key field` 返回key中的field域的值
* `hmget key field1 field2 fieldN` 返回对应的键值
* `hgetall key` 返回key中所有的键和值
* `hdel key field` 删除key中的field域
* `hlen key` 返回元素量
* `hexists key field` 判断key中有没有field域
* `hinrby key field value` 把key中的field域的值增长整型值value
* `hinrby float key field value` 把key的filed值增长浮点数value
* `hkeys key` 返回key中所有的field
* `kvals key` 返回key中所有的value
* `hkeys user2`  返回所有域
* `hvalues user2` 返回所有值



## 事务

|      | Mysql             | Redis      |
| ---- | ----------------- | ---------- |
| 开启   | start transaction | muitl      |
| 语句   | 普通sql             | 普通命令       |
| 失败   | rollback回滚        | discard 取消 |
| 成功   | commit            | exec       |

```
set wang 200
set zhao 700
multi
decrby zhao 100
incrby wang 100
exec 执行队列
```

### 监视

悲观锁和乐观锁，redis使用乐观锁

* `watch key1 key2` 监视，有一个值变化事务就会取消

```
set ticket 1
watch ticket
multi
decr ticket
decrby list 1000
exec
```

* `uwatch` 取消监视

## 消息订阅

* `publish news 'message'` 声明频道，发布内容
* `subscribe news` 订阅频道
* `psubscribe new*` 订阅一系列频道
* `pubsub numsub ` 返回给定频道的订阅者数量
* `pubsub NUMSUB news。。。` 返回一系列订阅的数量 

## 持久化

### rdb(快照持久化)

每隔N分钟或N次写操作后，从内存dump数据形成rdb文件，压缩放到备份目录

**快照导出配置**

* `save 900 1` 刷新快照到硬盘中，必须满足两者要求才会触发，即900秒后至少1个关键字发生变化
* `stop-writes-on-bgsave-error yes` 后台存储错误停止写
* `rdbcompression yes` 使用LZF压缩rdb文件
* `rdbchecksum yes` 存储和加载rdb文件时校验，导入时
* `dbfilename dump.rdb` 设置rdb文件名
* `dir ./` 设置工作目录，rdb文件会写入该目录

**rdb快照缺陷**

* 2个保存点之间会丢失

```
redis-benchmark -n 10000 执行10000个测试命令
```

### aof(日志持久化)

记录操作

**配置**

* `appendonly yes`  开启日志
* `appendfilename /var/xxx.aof` 文件放置在那里
* `appendfsync everysec` 折中方案每秒写1次
* `appendfsync no` 写入公共交给操作系统，由操作系统判断缓冲区大小写入到aof同步频率低，速度快。
* `no-appendfsync-on-rewrite yes` 正在导出rdb快照过程中要不要停止aof
* `auto-aof-rewrite-percentage 100` 文件大小比起上次重写的增长率100%时重写
* `auto-aof-rewrite-min-size 64m` aof文件至少超过64M时重写


```
bgrewriteaof //命令aof重写
```


## 集群(主从复制)

### 作用

* 主从备份防止主机宕机
* 读写分离，分担master的任务
* 任务分离，如从服务器分别分担计算工作和备份任务

### 使用

- 复制配置文件两份，并修改pid文件和端口，同时将将主服务不开启rdb，备份服务器开启rdb，一般主服务器依然运行aof
- 设置从服务器`slaveof  host port`，即指定host本服务器作为主服务器
- 并设置`slave-read-only yes` 即只读
- 另外一台关闭rdb和aof，并只读
- 启用服务器
- 当组主务器使用密码后，从服务器必须加上密码`masterauth passwd`
- 从服务器不要同时启动

## 运维

```
slowlog-log-slower-than 1000 指定慢日志时间
slowlog-max-len 128 限制慢日志记录数目
slowlog get 返回慢命令
```

* `TIME` 查看时间戳和微秒数
* `DBSIZE` 查看当前库中key数量
* `BGREWRIEAOF` 后台进程重写aof
* `BGSAVE` 后台保存rdb快照
* `SAVE` 保存rdb快照
* `LASTSAVE` 上次保存时间
* `SLAVEOF` 设为slave服务器
* `FLUSHDB` 清空当前db
* `FLUSHALL` 清空所有db
* `SHUTDOWN[""|save|nosave]` 断开连接关闭服务器
* `SLOWLOG` 显示慢查询
* `INFO` 显示服务器信息
* `CONFIG GET`获取配置信息
* `CONFIG SET` 设置配置信息
* `MONITOR` 打开控制台
* `SYNC` 主从同步
* `CLIENT LIST` 客户端列表
* `CLIENT KILL` 关闭某个客户端
* `CLIENT SETNAME` 为客户端设置名字
* `CLIENT GETNAME` 获取客户端名字

### 备份恢复

* 当遭遇执行清除服务，立即`shutdown nosave`防止重写aof
* 删除aof最后三行
* 重启 
* `redis-check-dump /var/rdb/` 检查rdb

### sentinel监控

* `sentinel monitor def_master 127.0.0.1 6379 2` 最后一位是尝试次数
* `sentinel auth-pass def_master 012_345^678-90 ` 密码
* `<mastername> <millseconds>  `默认为30秒，master被当前sentinel实例认定为“失效”的间隔时间，
* 如果当前sentinel与master直接的通讯中，在指定时间内没有响应或者响应错误代码，那么当前sentinel就认为master失效(SDOWN，“主观”失效)  
* `sentinel down-after-milliseconds def_master 30000`当前sentinel实例是否允许实施“failover”(故障转移)，no表示当前sentinel为“观察者”(只参与"投票".不参与实施failover)，全局中至少有一个为yes
* `sentinel can-failover def_master yes` 监控到master失效，是否切换，只有一台为yes，即自己切换为master
* `sentinel notification-script mymaster /var/redis/notify.sh`
* `redis-server sentinel.cof --sentinel ` 启动监控
* `slave-priority 100` 在redis配置文件中设置优先级

## Key设计原则







## PHP-redis



## 











