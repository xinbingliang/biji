# Redis-Sentinel

## 运行方式

1. `redis-sentinel /path/to/sentinel.conf`
2. `redis-server /path/to/sentinel.conf --sentinel`

以上两种方式，都必须指定一个sentinel的配置文件sentinel.conf，如果不指定，将无法启动sentinel。sentinel默认监听26379端口，所以运行前必须确定该端口没有被别的进程占用。

## Sentinel的配置

```
sentinel monitor mymaster 127.0.0.1 6379 2
sentinel down-after-milliseconds mymaster 60000
sentinel failover-timeout mymaster 180000
sentinel parallel-syncs mymaster 1

sentinel monitor resque 192.168.1.3 6380 4
sentinel down-after-milliseconds resque 10000
sentinel failover-timeout resque 180000
sentinel parallel-syncs resque 5
```

上面的配置项配置了两个名字分别为mymaster和resque的master，配置文件只需要配置master的信息就好啦，不用配置slave的信息，因为slave能够被自动检测到(master节点会有关于slave的消息)。需要注意的是，配置文件在sentinel运行期间是会被动态修改的，例如当发生主备切换时候，配置文件中的master会被修改为另外一个slave。这样，之后sentinel如果重启时，就可以根据这个配置来恢复其之前所监控的redis集群的状态。

## 配置说明

配置大多以`sentinel <option_name> <master_name> <option_value>`格式

1. `sentinel monitor mymaster 127.0.0.1 6379 2`

   这一行代表sentinel监控的master的名字叫做`mymaster`，地址为`127.0.0.1:6379`，最后的2表示测试两次

2. down-after-milliseconds 

   在设置的时间范围内不回应或者回应错误，那么认为master已经不可用，单位为毫秒，但是需要其他从服务器一起确认

3. parallel-syncs

   在发生failover主备切换时，这个选项指定了最多可以有多少个slave同时对新的master进行同步，这个数字越小，完成failover所需的时间就越长，但是如果这个数字越大，可以通过将这个值设为 1 来保证每次只有一个slave处于不能处理命令请求的状态。

4. failover-timeout

   当已经确定新住服务器后，在某从服务请求新主服务后，其他从服务器在等待该时间后请求主服务器

5. `sentinel can-failover def_master yes` 

    监控到master失效，是否切换，只有一台为yes，即自己切换为master。多台sentinel使用

* `info replication` 使用命令查看信息
* `slave-priority` 每个redis配置文件都用该配置，设置优先级，越小优先切换为master

 







