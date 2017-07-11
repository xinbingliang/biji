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

### 字符串



### 链表



### 哈希结构集合



### 有序集合



## 事务



## 消息订阅



## 持久化



## 集群



## PHP-redis



## 运维











