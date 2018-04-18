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

###资源隔离和限制

####隔离

LXC (Kernel namespace)

* `pid` 不同进程的`pidnamespace`进行隔离
* `net` netnamespace进行隔离
* `Ipc` 进程间交互隔离
* `mnt` 进程在特定目录下执行
* `uts` 使得容器拥有自己的hostname
* `User` 使容器拥有不同的用户和组

#### 限制

cgroup

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

### 网络和Registery

# 穆课视频

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