# redis_docker集群

### 配置文件

````
bind 0.0.0.0 # 针对所有ip开放
daemonize no # 不以守护进程方式
requirepass abcd123456 # 运行时使用的密码
masterauth abcd123456 # 主从复制时的密码
logfile /var/log/redis/redis-server.log # 指定配置文件位置
cluster-enabled yes # 开启集群配置
cluster-config-file nodes-6379.conf # 节点配置信息
cluster-node-timeout 15000
````

## Dockerfile

```
FROM redis

MAINTAINER xinneirong xinneirong@gmail.com

ADD ./conf/redis.conf /usr/local/etc/redis/redis.conf
CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]
```

