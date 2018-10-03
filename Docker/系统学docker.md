# 系统学docker

## Docker环境的各种搭建方法

### mac 系统上的安装

### windows 上安转

* `VirtualBox` 安装
* `Vagrant` 安装
  * 创建一个文件夹
  * `vagrant init centos/7` 创建初始化文件`vagrantfile`
  * `more vagrantfile` 查看这个文件
  * `vagrant up` 创建虚拟机
  * `vagrant ssh` 连接进虚拟机
  * `exit` 退出虚拟机
  * `vagrant status` 当前运行虚拟机的状态
  * `vagrant halt` 停止运行中的机器
  * `vagrant destroy` 删除掉机器

### Docker Machine 

* `docker-machine version` 查看版本
* `docker-machine create demo`创建一个安装好docker 的虚拟机
* `docker-machine ls` 列出创建好docker虚拟机
* `docker-machine ssh demo` 进入到docker虚拟机中
* `docker-machine stop demo1` 停掉一台docker虚拟机

### Docker Machine 在阿里云上创建机器

* [在阿里云上使用docker machine ](https://docs.docker.com/machine/get-started-cloud/#3rd-party-driver-plugins)

## Docker的镜像和容器

* `docker version` 查看客户端和服务端的版本
* `ps -ef | grep docker` 查看进程

### 底层技术支持

* `NameSpace` 做隔离`pid`、`net`、`ipc`、`mnt`、`uts`
* `Control groups` 资源限制
* `Union file systems` Container 和images的分层

### Docker Images

```
FROM ubuntu:14.04
LABEL maintainer="xinbingliang"
RUN apt-get update && apt-get install -y redis-server 
EXPOSE 6379
ENTRYPOINT ["/usr/bin/redis-server"]
```

* `docker build -t xin/redis:v0.0.1 .`
* `docker pull ubuntu:14.04`

### 创建Base Image

* `sudo groupadd docker`
* `sudo gpasswd -a xin docker`
* `service docker restart`
* 重新登录shell
* `docker pull hello-world`
* `docker run hello-world`
* `docker history acca11` 查看docker的分层
* `docker run -it centos` 交互式运行，退出容器结束运行
* `docker ps -a` 查看容器
* `docker rm xxxx` 删除一个容器
* `docker image rm 67759` 删除镜像
* `docker rmi f2a91` 简写的删除镜像
* `docker container ls -aq` 列出所以id
* `docker rm $(docker container ls -aq)` 清除掉所有的镜像
* `docker rm $(docker container ls -f "status = exited" -q)`

### 将容器提交成镜像

* `docker commit` 把容器变成镜像（不提倡）

  * `docker run -it centos` 交互环境下运行容器
  * `yum install -y vim` 安装一个vim
  * `exit`
  * `docker commit 0176c467244c xin/centos_vim:0.01` 形成新的images
  * `docker history 5e933ef9bb07` 查看层

* `docker build `

  ```
  FROM centos
  
  RUN yum install -y vim
  ```

  * `docker build -t xin/centos_vim:v0.0.1 .` 构建

### Dockerfile 语法

````dockerfile
FROM  scratch # 制作base image,从头开始
FROM centos # 制作base image
From ubuntu:14.04

LABEL maintainer="xinneirong@gmail.com" # 定义信息，类是注释
LABEL version="1.0"
LABEL description="This is description"

RUN yum update && yum install -y vim python-dev
RUN apt-get update && apt-get install -y perl pwgen --bo-install-recommends && rm -rf /var/lib/apt/lists/8 # 注意清理cache, 尽量写成一行
RUN /bin/bash -c 'source $HOME/.bashrc;echo $HOME'

WORKDIR /root # 切换目录使用workdir,使用绝对目录

WORKDIR /test # 如果没有会自动创建test目录
WORKDIR demo
RUN pwd # 输出结果为/test/demo

ADD hell0 / 
ADD test.tar.ge / # 将其添加到根目录并且解压

WORKDIR /root 
ADD hello test/ # /root/test/hello

WORKDIR /root 
COPY hello test/ # /root/test/hello # 添加远程文件需要使用curl或wget

ENV MYSQL_VERSION 5.6 # 设置常量
RUN apt-get install -y mysql-server = "${MYSQL_VERSION}" && rm -rf /var/lib/apt/list/* # 引用

VOLUME and EXPOSE 
CMD and ENTRYPOINT 
````

* [docker-library](https://github.com/docker-library)

### CMD and ENTRYPOINT 

* RUN：执行命令并创建新的Image Layer

* CMD：设置容器启动后默认执行的命令和参数

  * 如果docker run指定了其他命令，CMD命令会被忽略
  * 如果定义了多个CMD，只有最后一个被执行

* ENTRYPOINT：设置容器启动时运行的命令

  * 让容器以应用程序或服务的形式运行

  * 不会被忽略，一定会执行

  * 最佳实践：写一个shell脚本作为entrypoint

    ````
    COPY docker-entrypoint.sh  /usr/local/bin
    ENTRYPOINT ["docker-entrypoint.sh"]
    
    EXPOSE 27017
    CMD ["mongod"]
    ````

#### Shell格式

```
RUN apt-get install -y vim
CMD echo "hello docker"
ENTRYPOINT echo "hello docker"
```

#### Exec 格式

````
RUN [ "apt-get", "install", "-y", "vim" ]
CMD [ "/bin/echo", "hello docker" ]
ENTRYPOINT [ "/bin/echo", "hello docker" ]
````

### Docker File 实践

#### 创建Flask项目

````dockerfile
FROM python:2.7
LABEL maintainer="xinneirong<xinneirong@gmail.com>"
RUN pip install flask
COPY app.py /app/ # COPY app.py /app 将app.py复制为app文件了，而不是目录
WORKDIR /app
EXPOSE 5000
CMD ["python", "app.py"]
````

```python
from flask import Flask
app = Flask(__name__)
@app.route('/')
def hello():
    return "hello docker"
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
```

* `docker build -t 192.168.113.131:5000/flask:v0.0.1 .` 构建镜像
* `docker run -it 8f687f19c0cf /bin/bash` 进入出错中间层查看问题根源
* `docker run -d 8f687f19c0cf` 后台运行运行创建好的镜像

#### 创建压力测试工具

1. `docker run -it ubuntu` 
2. `apt-get update && apt-get install -y stress` 
3. `which stress`
4. `stress --vm 1 --verbose `
5. `stress --vm 1 --vm-bytes 500000M --verbose`

* `mkdir stress` 创建目录

* 创建Dockerfile

  ````dockerfile
  FROM ubuntu
  RUN apt-get update && apt-get install -y stress
  ENTRYPOINT ["/usr/bin/stress"]
  CMD [] # 用于接收上一命令的参数
  ````

*  `docker build -t xinneirong/ubuntu_stress:v0.0.01 .` 构建镜像

* `docker run -it xinneirong/ubuntu_stress:v0.0.01 --vm 1 --verbose`

### 镜像发布

* `docker login` 登录到docker hub
* `docker push xinneirong/centos:v0.0.1`  向仓库中push镜像，名称和自己仓库名要相同

#### registry

* `docker run -d -p 5000:5000 --restart always --name registry registry:2` 服务机器获得registry并安装

* `telnet 192.168.113.131 5000`  客户机测试registry 运行状况

* `docker build -t 192.168.113.131:5000/hello-world .` 创建一个新的镜像

* `vim /etc/docker/daemon.json` 客户机向配置中加入配置

  ```
  {
    "registry-mirrors": ["https://x2fvikf9.mirror.aliyuncs.com"],
    "insecure-registries": ["192.168.113.131:5000"]
  }
  ```

* `vim /lib/systemd/system/docker.service` 客户机配置文件

  ```
  EnvironmentFile=-/etc/docker/daemon.json
  ```

* `service docker restart` 重启docker服务

* `192.168.113.131:5000/v2/_catalog` 浏览器访问，查看镜像

* `docker push 192.168.113.131:5000/hello-world` 向registry中push一个镜像

* `docker pull  192.168.113.131:5000/hello-world` pull回来

### 容器的操作

* `docker exec -it 608598711df8 /bin/bash ` 交互式进入容器
* `docker exec -it 608598711df8 ip a` 打印运行中容器的IP地址
* `docker stop 608598711df8` 停止容器
* `docker rm $(docker ps -aq)` 删除所有容器
* `docker run -d --name=demo 8f687f19c0cf` 指定容器名
* `docker start demo` 启动容器
* `docker inspect 2225810169b9` 显示容器的信息
* `docker logs 2225810169b9` 显示容器的日志

### 容器资源的限制



## Docker的网络



## Docker的持久化存储和数据共享



## Docker Compose多容器的部署



## Docker Swarm 



## DevOps



## Kubernetes



## 容器的运维和监控



## Docker + DevOps实战

