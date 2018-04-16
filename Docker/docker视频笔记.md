# 视频笔记

* `docker search` 搜索镜像
* `docker pull` 获取镜像
* `docker images` 查看镜像
* `docker rmi` 删除镜像
*  `docker run --name -h hostname` 启动容器
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
2. ​

## 核心原理

###资源隔离和限制

### 网络和Registery













