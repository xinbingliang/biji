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

#### ADD 更高级的复制文件

#### CMD 容器启动命令

#### ENTRYPOINT 入口点

#### ENV 设置环境变量

#### ARG 构建参数

#### VOLUME 定义匿名卷

#### EXPOSE 暴露端口

#### WORKDIR 指定工作记录

#### USER 指定当前用户

#### HEALTHCHECK 健康检查

#### ONBUILD 在下一镜像构建时使用 







##容器操作

## 仓库访问

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

