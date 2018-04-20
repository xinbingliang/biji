# 视频笔记

* `docker search` 搜索镜像
* `docker pull` 获取镜像
* `docker images` 查看镜像
* `docker rmi` 删除镜像
* `docker run --name -h hostname` 启动容器
* `docker stop CONTAINER ID` 停止容器
* `docker ps ` 查看容器
* `docker exec | docker attach` 进入容器
* `docker rm` 删除容器

## 网络访问管理

* `brctl show` 查看网桥
* `iptables -t nat -L` 
* `ip ro li` 查看路由
* `docker run -P `进行端口的随机映射，端口不会冲突
  * `docker run -d -P --name mynginx nginx` 
* `docker ps` 查看端口映射
* `docker run -p port:port` 指定端口映射，方便管理
  * `docker run -d -p 8080:80 --name mynginx2 nginx`
* `-p ip:hostPort:containerPort` 主机域名、端口映射容器端口，用于主机有多个ip地址的情况
* `-p ip::containerPort` 主机域名、随机端口映射容器端口
* `-p hostPort1:containerPort -p hostPort2:containerPort` 多个端口映射容器端口

## 数据管理

### 数据卷

* `-v /data` 将数据对应写入到物理主机
  * `docker run -it --name volume-test1 -h centos -v /data centos`
  * `cd root@public-test:/var/lib/docker/volumes/dbc201.../_data` 在该目录下的容器挂载文件下创建文件将能在容器中直接访问
* `-v src:dst`
  * `docker run -it --name volume-test2 -h centos -v /opt:/opt centos` 指定映射
  * `docker run -it --name volume-test2 -h centos -v /opt:/opt:ro centos` 指定映射并只读

### 数据卷容器

* `--volumes-from` 启动容器专门用于存数据
  * `docker run -it --name volume-test4 --volumes-from volume-test1 centos` 使用`volume-test1`创建时挂载的目录，容器间共享`/data`目录

##镜像构建

### 手动构建

1. `docker pull centos` 获得基础镜像

2. `docker run --name nginx-man -it centos ` 创建基础容器

3. 安装工具软件

   * `yum install -y wget gcc gcc-c++ make openssl-devel`

4. `mkdir test_install`

5. `cd test_install/`

6. `wget wget http://nginx.org/download/nginx-1.9.3.tar.gz` 到官网下载安装包

7. `wget ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/pcre-8.38.tar.gz` 依赖环境包

8. 解压

9. `mv pcre-8.38 /usr/local/src/` 

10. `useradd -s /sbin/nologin -M www`创建www用户

11. `./configure --prefix=/usr/local/nginx --user=www --group=www --with-http_ssl_module --with-http_stub_status_module --with-pcre=/usr/local/src/pcre-8.38`

12. `make && make install` 安装

13. `vi /etc/rc.local` 开机时启动（不需要这一步）

    ```
    /usr/local/nginx/sbin/nginx
    ```

14. `vi /usr/local/nginx/conf/nginx.conf`使其在前台运行

    ```
    daemon off;
    ```

15. yum clean all` 清理掉所有的下载缓存

16. 退出容器

17. `docker commit -m 'my nginx' 57db7b44f92e xin/my-nginx:v1` 生成一个镜像

18. `docker images` 查看镜像

19. `docker run -d -p 9000:80 xin/my-nginx:v2 /usr/local/nginx/sbin/nginx` 运行容器

### Dockerfile

#### 包含的内容

* 基础镜像信息
* 维护者信息
* 镜像操作指令
* 容器启动时执行指令

1. `FROM ` 它的妈妈是谁（基础镜像）
2. `MAINTAINER` 告诉别人，你创建了它（维护者信息）
3. `RUN` 你想让他干点啥（把命令前面加上RUN） 
4. `ADD ` 往它肚子里放点文件（COPY 文件， 会自动解压）
5. `WORKDIR` 就是cd（当前工作的目录）
6. `VOLUME` 一个存放行李的地方（目录挂载）
7. `EXPOSE` 打开的门是啥（端口）
8. `RUN` 奔跑吧（进程要一直运行下去）

#### 创建过程

1. 创建目录

2. 创建Dockerfile

   ```
   # This is my first Dcokerfile
   # Version 1.0
   # Author: xinneirong

   # Base image
   FROM centos

   # MAINTAINER
   MAINTAINER xinneirong

   # ADD,会自动解压
   ADD pcre-8.38.tar.gz /usr/local/src
   ADD nginx-1.9.3.tar.gz /usr/local/src

   # RUN
   RUN yum install -y gcc gcc-c++ make openssl-devel && useradd -s /sbin/nologin -M www

   # WORKDIR
   WORKDIR /usr/local/src/nginx-1.9.3

    RUN ./configure --prefix=/usr/local/nginx --user=www --group=www --with-http_ssl_module --with-http_stub_status_module --with-pcre=/usr/local/src/pcre-8.38 && make && make install && echo "daemon off;" >> /usr/local/nginx/conf/nginx.conf

   ENV PATH /usr/local/nginx/sbin:$PATH

   EXPOSE 80

   CMD ["nginx"]

   ```

3. `docker build -t nginx-file:v1 .`构建


## 核心原理

* 文件系统隔离：每个容器都有自己的root文件系统
* 进程隔离：每个容器都运行在自己的进程环境中
* 网络隔离：容器间灯虚拟网络接口和IP地址都是分开的
* 资源隔离和分组：使用cgroup将cpu和内存之类的资源独立分配给每个Docker容器
* ​

###资源隔离和限制

####隔离

LXC (Kernel namespace)

* `pid` 不同进程的`pidnamespace`进行隔离（进程隔离）
* `net` netnamespace进行隔离（管理网络接口）
* `Ipc` 进程间交互隔离（管理跨进程通信访问）
* `mnt` 进程在特定目录下执行（管理挂载点）
* `uts` 使得容器拥有自己的hostname（隔离内核和版本标识）
* `User` 使容器拥有不同的用户和组

#### 限制

cgroup

进行资源限制，优先级设定，资源计量，资源控制

* `cpu` 
* `内存`

#### 测试

1. 创建目录
2. `wget http://mirrors.aliyun.com/repo/epel-6.repo` 
3. 创建`Dockerfile`

```
FROM centos

ADD epel-6.repo /etc/yum.repos.d/
RUN yum -y install stress && yum clean all

ENTRYPOINT ["stress"]
```

* `docker build -t stress-centos .` 构建镜像
* `docker -c ` 指定`cpu`配额
* `cat /proc/cpuinfo`
* `docker run -it --rm stress-centos --cpu 1` 占用一个cpu
* `docker run -it --rm -c 512 stress-centos --cpu 1` 占一个cpu
* `docker run -it --rm --cpuset-cpus=0,1 stress-centos --cpu 1` 指定两个CPU，当两个容器时，各占一半
* `docker run -it --rm -m 128m stress-centos --vm 1 --vm-bytes 120m --vm-hang 0`  容器只使用128M内存，并且不能超出

#### 网络

- 默认使用桥接（bridge），每创建一个就创建一个接口
- HOST直接和物理机使用同一个
- 使用其他容器的网络

#### Registery

1. `docker run -d -p 5000:5000 registry` 运行私有仓库
2. `docker tag 8fea8a5899fc 127.0.0.1:5000/test/test-django:v1`
3. `docker images`
4. `docker push 127.0.0.1:5000/test/test-django:v1`

#穆课视频

* `docker run -d` 使得容器在后台运行
* `docker logs ` 输出容器的日志
  * `-f` 跟踪显示所有输出
  * `-t` 输出时间 
* `docker attach 97a6249869aa` 进入容器的交互
* `docker top 97a6` 查看容器中运行的进程
* `docker exec [-d] [-i] [-t]` 在运行的容器中启动新的进程
  * `docker exec -it 97 /bin/bash` 
* `docker stop` 停止容器
* `docker kill` 杀死容器
* `docker run -p` 指定端口
* `docker run -P` 随机端口
* `ctrl+P+Q` 使得容器运行在后台中
* `docker port web` 查看端口映射
* `docker inspect ` 查看容器的信息
* `docker rmi ` 删除镜像
* `docker search` 镜像查找
* `docker commit` 通过容器构建镜像
  * `-a` 指定作者
  * `-m` 构建信息
  * `-p`  不暂停运行容器
  * `docker commit -a 'xinneirong xinneirong@gmail.com' -m 'test' b2a46b4ee5b9 xin/mytest:v0.1`
* `docker build ` 使用Dockerfile构建镜像
  * `-t` 指定镜像名称
### Dockerfile

* `FROM` 指定基础镜像
* `MAINTAINER` 说明作者和联系信息
* `RUN`  运行linux指令，每一个RUN就是镜像的一层
* `EXPOSE` 对外暴露的端口
* `CMD` 在容器启动时指定的命令，当自己指定时该指令会被直接覆盖
  * `CMD ['executable', 'param1', 'param2']` 
* `ENTERYPOINT`在容器启动时指定的命令，当自己指定时该指令不被覆盖
  * `ENTERYPOINT ['executable', 'param1', 'param2']`
  * `docker run --entrypoint` 覆盖掉设定的指令
* `ADD` 复制文件到镜像中并解压
  * `ADD A:B`
* `COPY` 复制文件到镜像，单纯复制文件推荐使用该命令
* `VOLUME` 提供共享数据或数据持久化的作用
* `WORKDIR` 指定工作目录，使用绝对路径
* `ENV` 设置环境变量
* `USER` 指定镜像运行时的角色
* `ONBUILD` 当一个镜像被当作其他镜像基础时执行
  * `ONBUILD copy index.html /usr/share/nginx/html/`
* `docker build --no-cache` 构建过程中不使用缓存
* `docker history` 查看镜像构建过程

### 网络

#### 虚拟网桥

* `apt-get install bridge-utils` 网桥工具
* `brctl show` 
* `docker run -it --name network1 ubuntu /bin/bash`
* `brctl show`

#### 自定义虚拟网桥

* `brctl addbr br0` 添加一个虚拟网桥叫br0

* `ifconfig br0 192.168.100.1 netmask 255.255.255.0` 为虚拟网桥添加ip和子网掩码

* `vim /etc/default/docker`

  ```
  DOCKER_OPTS="b=br0"
  ```

* 重启docker

#### 容器之间的连接

```
FROM ubuntu:16.04
RUN apt-get update 
RUN apt-get install -y iputils-ping
RUN apt-get install -y nginx 
RUN apt-get install -y curl
EXPOSE 80
CMD ['/bin/bash']
```

* `docker build -t xin/nettest:v1 .`
* `docker run -it --name cct1 xin/nettest:v1`
* `nginx` 启动`nginx`服务
* `docker run -it --name cct2 xin/nettest:v1`
* `ping 172.17.0.2` 在一个容器中ping另外一个
* `curl http://172.17.0.2:80` 访问web服务
* 重启容器后`ip`会发生变化

##### 允许所有容器互联

* `icc=true` 允许容器间相互连接，默认
* `docker run --link=[CONTAINER_NMAE]:[ALIAS]` 指定容器间访问的代号
  * `docker run -it --link=cct1:webtest --name cct3 xin/nettest:v1` 启动容器时指定连接到`cct1`并且名称为`webtest`
* `ping webtest` 

##### 拒绝容器间互联

* `icc=false` 拒绝所有容器间互联

  ```
  # /etc/default/docker 

  DOCKER_OPTS = '--icc=false'
  ```

* `service docker restart `

##### 允许特定容器间的连接

1. `--icc=false`

2. `--iptables=true` 允许使用iptables

   ```
   # /etc/default/docker 

   DOCKER_OPTS = '--icc=false --iptables=true'
   ```

3. `--link`

4. `service docker restart `

5. `iptables -L -n` 查看iptable

6. `iptables -F` 清空

#### 容器外网访问

* `--ip_forward=true` 决定系统是否转发流量
  * `sysctl net.ipv4.conf.all.forwarding` 
* `iptables` 
  * 表（table）
  * 链（chain）
  * 规则（rule）
    * ACCEPT
    * REJECT
    * DROP
  * `iptables -L -n` 查看iptable

### 数据卷

为一个或多个容器提供访问

1. 容器启动时初始化
2. 可以在容器之间进行共享和重用
3. 可以直接对数据卷中的内容进行修改
4. 数据卷的变化不会影响镜像的更新
5. 卷会一直存在，即便容器被删除

* `docker run -it -v /docker-test/data:/data ubuntu:14.04 /bin/bash`
* `docker run -it -v /docker-test/data:/data:ro ubuntu:14.04 /bin/bash` 数据卷只读
* `VOLUME ['pathto1', 'pathto2']` 在Dockerfile中构建两个数据卷

#####数据卷容器

* `docker run --volumes-from ` 指定数据卷容器
* `docker run -it --volumes-from 3dbec11a2c05  ubuntu:14.04 /bin/bash`

##### 数据卷备份

1. `docker run --volumes-from 1971792594b7 -v ~/backup:/backup --name back-cn ubuntu:14.04 tar cvf /backup/back.tar /data` 

###跨主机访问

##### 使用网桥实现跨主机连接



##### 使用Open vSwitch实现跨主机容器连接

* GRE 通用路由协议

##### 使用weave实现跨主机容器连接



