# gitbook笔记

##镜像指令

* `coker pull ubuntu:16.04` 从镜像仓库中获得镜像
* `docker run -it --rm ubuntu:16.04 bash` 运行镜像，并在镜像交互结束后删除
* `docker images` 查看docker镜像
* `docker system df` 查看镜像、容器、数据卷所占用的空间
* `docker image ls -f dangling=true` 显示虚悬镜像
* `docker image prune` 删除虚悬镜像
* `docker image ls ubuntu` 根据仓库名称列出镜像
* `docker image ls -f since=mongo:3.2`查看`mongo:3.2`之后建立的镜像
* `docker image ls -f before=mongo:3.2`查看`mongo:3.2`之前建立的镜像
* `docker image rm 50122` 移除一个进行
* `docker image rm $(docker image ls -q redis)` 删除所有仓库名称为`redis`的镜像
* `docker image rm $(docker image ls -q -f before=mongo:3.2)` 删除所有在 `mongo:3.2` 之前的镜像
* `docker exec -it webserver /bin/bash` 进入到容器的交互式命令中
* `docker diff` 查看对容器的存储层的改动
* `docker commit --author 'xinbingliang' --message '修改默认网页' webserver nginx:v2` 将修改后的容器保存为镜像，不建议使用
* `docker history nginx:v2` 查看镜像的历史

## Dockerfile详解

### 简单使用

```shell
FROM nginx
# FROM scratch 一个空白镜像，使用 Go 语言 开发的应用很多会使用这种方式来制作镜像
RUN echo "<h1>Hello, Docker!</h1>" > /usr/share/nginx/html/index.html
```

* `run` 用来执行命令，每一个`run`都会新构建一层镜像，多个命令使用&&连接，注意镜像最后要做最后清理
  * `run <命令>` 以shell格式例如`RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html`
  * `RUN ["可执行文件", "参数1", "参数2"]` 以exec格式
* `docker build -t nginx:v3 .` 构建镜像
* `.dockerignore`  指定文件不传递给Docker引擎
* `docker build https://github.com/twang2218/gitlab-ce-zh.git` 通过`git repo`构建
* `docker build http://server/context.tar.gz` 通过压缩包构建
* `docker build - < Dockerfile`或`cat Dockerfile | docker build -`从标准输入中构建
* ` docker build - < context.tar.gz` 从标准输入中读取上下文压缩包进行构建

### Dockerfile指令

#### COPY 复制文件

`COPY` 指令将从构建上下文目录中 `<源路径>` 的文件/目录复制到新的一层的镜像内的 `<目标路径>` 位置

* `COPY <源路径>... <目标路径>`
* `COPY ["<源路径1>",... "<目标路径>"]`
* `COPY package.json /usr/src/app/`

#### ADD 更高级的复制文件

和`copy`命令类似，可以使用`URL`，

* `ADD ubuntu-xenial-core-cloudimg-amd64-root.tar.gz /` 

#### CMD 容器启动命令

用于执行命令，当运行时指定的命令参数会取代指定

- `shell` 格式：`CMD <命令>`
- `exec` 格式：`CMD ["可执行文件", "参数1", "参数2"...] `推荐使用的，一定要使用双引号 `"`
- 参数列表格式：`CMD ["参数1", "参数2"...]`。在指定了 `ENTRYPOINT` 指令后，用 `CMD` 指定具体的参数。
- `CMD ["nginx", "-g", "daemon off;"]`不能使用`CMD service nginx start`，会制导致执行后立即退出的问题，而是应该让程序直接在前台执行

#### ENTRYPOINT 入口点

和CMD作用一样都是在指定容器启动程序及参数，`ENTRYPOINT` 在运行时也可以替代，不过比 `CMD` 要略显繁琐，需要通过 `docker run` 的参数 `--entrypoint` 来指定。作用1：在run时使指定的参数当中参数发送给命令。2：容器在启动前做一些准备，将准备命令写成脚本，并接受命令参数

#### ENV 设置环境变量

设置环境变量

- `ENV <key> <value>`

- `ENV <key1>=<value1> <key2>=<value2>...`

  ```
  ENV NODE_VERSION 7.2.0

  RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz"
  ```

#### ARG 构建参数

* `ARG <参数名>[=<默认值>]`

构建参数和 `ENV` 的效果一样，都是设置环境变量。所不同的是，`ARG` 所设置的构建环境的环境变量，在将来容器运行时是不会存在这些环境变量的。

#### VOLUME 定义匿名卷

- `VOLUME ["<路径1>", "<路径2>"...]`
- `VOLUME <路径>`

为了防止运行时用户忘记将动态文件所保存目录挂载为卷

#### EXPOSE 暴露端口

声明运行时容器提供服务端口，在运行时并不会因为这个声明应用就会开启这个端口的服务。一个是帮助镜像使用者理解这个镜像服务的守护端口，以方便配置映射；另一个用处则是在运行时使用随机端口映射时，也就是 `docker run -P`时，会自动随机映射 `EXPOSE` 的端口。并不会自动在宿主进行端口映射。

*  `EXPOSE <端口1> [<端口2>...]`

#### WORKDIR 指定工作记录

使用 `WORKDIR` 指令可以来指定工作目录（或者称为当前目录），以后各层的当前目录就被改为指定的目录，如该目录不存在，`WORKDIR` 会帮你建立目录。

*  `WORKDIR <工作目录路径>`

#### USER 指定当前用户

改变之后层的执行 `RUN`, `CMD` 以及 `ENTRYPOINT` 这类命令的身份，只是帮助你切换到指定用户而已，这个用户必须是事先建立好的

* `USER <用户名>`
* 切换用户推荐使用`gosu`

#### HEALTHCHECK 健康检查

用于定时检查容器运行状态

- `HEALTHCHECK [选项] CMD <命令>`：设置检查容器健康状况的命令
- `HEALTHCHECK NONE`：如果基础镜像有健康检查指令，使用这行可以屏蔽掉其健康检查指令

#### ONBUILD 在下一镜像构建时使用 

它后面跟的是其它指令，比如 `RUN`, `COPY` 等，而这些指令，在当前镜像构建时并不会被执行。只有当以当前镜像为基础镜像，去构建下一级镜像的时候才会被执行

### 其他方式

* `docker import [选项] <文件>|<URL>|- [<仓库名>[:<标签>]]` 从 rootfs 压缩包导入，压缩包可以是本地文件、远程 Web 文件，甚至是从标准输入中得到。压缩包将会在镜像 `/` 目录展开，并直接作为镜像第一层提交。

  ```
   docker import http://download.openvz.org/template/precreated/ubuntu-14.04-x86_64-minimal.tar.gz 
  ```

* `docker save alpine | gzip > alpine-latest.tar.gz`使用 `docker save` 命令可以将镜像保存为归档文件。

* `docker load -i alpine-latest.tar.gz` 复制到了到了另一个机器上，可以用下面这个命令加载镜像

##容器操作

### 启动

* `docker run -t -i ubuntu:14.04 /bin/bash` 启动一个 bash 终端，允许用户进行交互
  * `-t` 选项让Docker分配一个伪终端
  * `-i` 则让容器的标准输入保持打开
* `docker container start` 直接将一个已经终止的容器启动运行

### 守护态运行

* `docker run -d ubuntu:17.10 /bin/sh -c "while true; do echo hello world; sleep 1; done"`让 Docker 在后台运行而不是直接把执行命令的结果输出在当前宿主机下，此时容器会在后台运行并不会把输出的结果，打印内容通过`docker logs`查看

### 终止

* `docker  start xxxx ` 
* `docker stop xxxx`
* `docker restart xxx`

### 进入容器

#### attach

* `docker attach 243c` 进入容器的交互式命令。

#### exec 推荐使用

* `docker exec -i 243c bash` 由于没有分配伪终端，界面没有我们熟悉的 Linux 命令提示符，但命令执行结果仍然可以返回。
* `docker exec -it 243c bash` 分配终端

### 导入和导出

#### 导出容器

* `docker export 243c > ubuntu.tar` 

#### 导入容器快照

* `cat ubuntu.tar | docker import - test/ubuntu:v1.0` 容器快照文件中再导入为镜像
* `docker import http://example.com/exampleimage.tgz example/imagerepo` 从远程导入镜像

### 删除

* `docker rm xxx` 删除容器
* `docker container prune` 删除所有停止状态的容器

## 仓库访问

### Docker Hub

####登录

* `docker login` 在命令行中登录到Docker Hub
* `docker logout` 退出Docker Hub

####拉取镜像

* `docker search centos` 查找`centos`镜像
* `docker pull centos` 拉取镜像

####推送镜像

* `docker tag ubuntu:17.10 username/ubuntu:17.10` 打一个tag
* `docker tag ubuntu:17.10 username/ubuntu:17.10` 给镜像打一个标签
* `docker push username/ubuntu:17.10` 将镜像推送到自己的Docker Hub中
* `docker search xinneirong` 查找镜像

#### 自动创建

### 私有仓库

#### 安装运行

* ` docker run -d -p 5000:5000 --restart=always --name registry registry` 
* `docker run -d -p 5000:5000 -v /opt/data/registry:/var/lib/registry registry` 将宿主机的目录挂载在容器中

####私有仓库操作

* `docker tag ubuntu:latest 127.0.0.1:5000/ubuntu:latest` 给镜像打上标签
* `docker push 127.0.0.1:5000/ubuntu` 上传指定的镜像
* `curl 127.0.0.1:5000/v2/_catalog` 查看镜像
* `docker pull 127.0.0.1:5000/ubuntu:latest` 从本地库中获取
* `/etc/docker/daemon.json` 

###私有仓库高级配置

## 数据管理

## 使用网络

## 高级网络

## Compose

## Machine

## Swarm

## 安全

## 底层

## Etcd

## CoreOS

## Kubernetes

## Mesos

## 云计算

## 操作系统

## CI/CD

## LinuxKit

