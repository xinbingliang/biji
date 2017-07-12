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
* `srem value1 value2` 删除集合中集为value1 value2 的元素
* `spop key` 返回并删除集合中key中1个随机元素
* `srandmember key` 返回集合key中随机的一个元素
* `smembers key` 返回集合中的所有元素
* `sismember key value` 判断value是否在key集合中
* `scard key` 返回集合中元素的个数
* `smove source dest value` 将source中的value删除并添加到dest中
* `sinter key1 key2 key3` 求出三个集合的交集并返回
* `sinterstore dest key1 key2 key3` 求出多个几个的交集并dest
* `suion key1 key2 ...` 求出并集并返回
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
* `zinterstore destination numkeys key1 [key2...] [weights weight [weight...]] [AGGREGATE SUM|MIN|MAX]` 求key1，key2交集，权重分别是weight1,weight2 聚合方法用sum|minmax 结果保存在dest中

### 哈希结构集合







## 事务



## 消息订阅



## 持久化



## 集群



## PHP-redis



## 运维











