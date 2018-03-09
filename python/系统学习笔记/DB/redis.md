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



### hash



### list



### set



### zset



## 高级



## 与python交互



## 应用示例

