# gitbook笔记

##镜像指令

* `docker pull ubuntu:16.04` 从镜像仓库中获得镜像
* `docker run -it --rm ubuntu:16.04 bash` 运行镜像，并在镜像交互结束后删除
* `docker images` 查看docker镜像
* `docker system df` 查看镜像、容器、数据卷所占用的空间
* `docker image ls -f dangling=true` 显示虚悬镜像
* `docker image prune` 删除虚悬镜像
* `docker image  ubuntu` 根据仓库名称列出镜像
* `docker image -f since=mongo:3.2`查看`mongo:3.2`之后建立的镜像
* `docker image -f before=mongo:3.2`查看`mongo:3.2`之前建立的镜像
* `docker image rm 50122` 移除一个进行
* `docker image rm $(docker image -q redis)` 删除所有仓库名称为`redis`的镜像
* `docker image rm $(docker image -q -f before=mongo:3.2)` 删除所有在 `mongo:3.2` 之前的镜像
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

#### 准备站点证书

1. `openssl genrsa -out "root-ca.key" 4096` 创建`CA`私钥
2. ` openssl req -new -key "root-ca.key" -out "root-ca.csr" -sha256 -subj '/C=CN/ST=hubei/L=wuhan/O=dailaoer/CN=wuhandailaokeji'` 利用私钥创建 `CA` 根证书请求文件
   *  `-subj` 参数里的 `/C` 表示国家，如 `CN`；
   *  `/ST` 表示省；
   *  `/L` 表示城市或者地区；
   *  `/O` 表示组织名；
   *  `/CN` 通用名称
3. 配置 `CA` 根证书，新建 `root-ca.cnf`

```
[root_ca]
basicConstraints = critical,CA:TRUE,pathlen:1
keyUsage = critical, nonRepudiation, cRLSign, keyCertSign
subjectKeyIdentifier=hash
```

4. `openssl genrsa -out 'dcoker.domain.com.key' 4096`生成站点 `SSL` 私钥。

5. `openssl req -new -key "docker.domain.com.key" -out "site.csr" -sha256 -subj '/C=CN/ST=hubei/L=wuhan/O=dailaoer/CN=wuhandailaokeji'`使用私钥生成证书请求文件

6. 配置证书，新建 `site.cnf` 文件

   ```
   [server]
   authorityKeyIdentifier=keyid,issuer
   basicConstraints = critical,CA:FALSE
   extendedKeyUsage=serverAuth
   keyUsage = critical, digitalSignature, keyEncipherment
   subjectAltName = DNS:docker.domain.com, IP:127.0.0.1
   subjectKeyIdentifier=hash
   ```

7. `openssl x509 -req -days 750 -in "site.csr" -sha256 -CA "root-ca.crt" -CAkey "root-ca.key"  -CAcreateserial -out "docker.domain.com.crt" -extfile "site.cnf" -extensions server`签署站点 `SSL` 证书

8. 新建 `ssl` 文件夹并将 `docker.domain.com.key` `docker.domain.com.crt` 这两个文件移入，删除其他文件

这样已经拥有了 `docker.domain.com` 的网站 SSL 私钥 `docker.domain.com.key` 和 SSL 证书 `docker.domain.com.crt`

#### 配置私有仓库

#### 生成http认证文件

#### 编辑docker-compose.yml

#### 修改host

#### 启动

#### 测试私钥仓库功能

#### 注意事项 

## 数据管理

### 数据卷

类似于`Linux`中的挂载

* 数据卷可以在容器之间共享和重用
* 对数据卷的修改会立马生效
* 对数据卷的更新，不会影响镜像
* 数据卷会一直存在，即便容器被删除

#### 创建数据卷

* `docker volume create my-vol` 创建一个数据卷
* `docker volume ls` 查看所有数据卷
* `docker volume inspect my-vol` 查看指定数据卷的信息

#### 启动一个挂载数据卷的容器

使用 `--mount` 标记来将 `数据卷` 挂载到容器里。在一次 `docker run` 中可以挂载多个 `数据卷`

* `docker run -d -P --name web -v my-vol:/wepapp training/webapp python app.py` 创建一个名为 `web` 的容器，并加载一个 `数据卷` 到容器的 `/webapp` 目录

#### 查看数据卷的具体信息

* `docker inspect web` 查看`web` 的信息

````
"Mounts": [ # 数据卷信息
    {
        "Type": "volume",
        "Name": "my-vol",
        "Source": "/var/lib/docker/volumes/my-vol/_data",
        "Destination": "/app",
        "Driver": "local",
        "Mode": "",
        "RW": true,
        "Propagation": ""
    }
],
````

#### 删除数据卷

* `docker volume rm my-vol` 删除数据卷
* `docker rm -v` 删除容器时同时移除数据卷
* `docker volume prune` 清理无主数据卷

### 监听主机目录

#### 挂载一个主机目录作为数据卷

* `docker run -d -P --name web -v /src/webapp:/opt/webapp training/webapp python app.py` 将本地的一个目录挂载到容器中的`/opt/webapp`上，`-v`不存在的本地目录将被创建
* `docker run -d -P --name web -v /src/webapp:/opt/webapp:ro training/webapp python app.py` 以只读形式挂载一个目录，试图再容器中进行写操作会被禁止

#### 挂载一个本地主机文件作为数据卷

* `docker run --rm -it -v $HOME/.bash_history:/root/.bash_history ubuntu:17.10 bash`记录bash操作命令到某个文件

## 使用网络

### 外部访问容器

####随机映射

* `docker run -d -P training/webapp python app.py` 会随机映射一个的端口到内部容器开放的网络端口
* `docker container ls` 查看端口映射
* `-p` 标记可以多次使用来绑定多个端口

#### 指定映射

* `docker run -d -p 5000:5000 training/webapp python app.py` 

#### 指定特定地址

* `docker run -d -p 127.0.0.1:5000:5000 training/webapp python app.py`

####映射到指定地址的任意端口

* `docker run -d -p 127.0.0.1::5000 training/webapp python app.py` 用 `ip::containerPort` 绑定 localhost 的任意端口到容器的 5000 端口，本地主机会自动分配一个端口

#### 查看当前端口配置

* `docker port nostalgic_morse 5000`使用 `docker port` 来查看当前映射的端口配置，也可以查看到绑定的地址

### 容器互联

#### 新建网络

* `docker network create -d bridge my-net` 创建一个新的 Docker 网络

####连接容器

* `docker run -it --rm --name busybox1 --network my-net busybox sh` 运行一个容器并连接到新建的 `my-net` 网络
* `docker run -it --rm --name busybox2 --network my-net busybox sh`
* `ping busybox2` 在同一个网段

### 配置DNS

* `mount` 查看挂载信息
* `/etc/docker/daemon.json` 配置全部容器

## 高级网络

### 快速配置指南

其中有些命令选项只有在 Docker 服务启动的时候才能配置，而且不能马上生效。

- `-b BRIDGE` 或 `--bridge=BRIDGE` 指定容器挂载的网桥
- `--bip=CIDR` 定制 docker0 的掩码
- `-H SOCKET...` 或 `--host=SOCKET...` Docker 服务端接收命令的通道
- `--icc=true|false` 是否支持容器之间进行通信
- `--ip-forward=true|false` 请看下文容器之间的通信
- `--iptables=true|false` 是否允许 Docker 添加 iptables 规则
- `--mtu=BYTES` 容器网络中的 MTU

下面2个命令选项既可以在启动服务时指定，也可以在启动容器时指定。在 Docker 服务启动的时候指定则会成为默认值，后面执行 `docker run` 时可以覆盖设置的默认值。

- `--dns=IP_ADDRESS...` 使用指定的DNS服务器
- `--dns-search=DOMAIN...` 指定DNS搜索域

最后这些选项只有在 `docker run` 执行时使用，因为它是针对容器的特性内容。

- `-h HOSTNAME` 或 `--hostname=HOSTNAME` 配置容器主机名
- `--link=CONTAINER_NAME:ALIAS` 添加到另一个容器的连接
- `--net=bridge|none|container:NAME_or_ID|host` 配置容器的桥接模式
- `-p SPEC` 或 `--publish=SPEC` 映射容器端口到宿主主机
- `-P or --publish-all=true|false` 映射容器所有端口到宿主主机

### 容器访问控制

通过 Linux 上的 `iptables` 防火墙来进行管理和实现

#### 容器访问外部网络

* 容器要想访问外部网络，需要本地系统的转发支持，检查转发是否打开

  ````shell
  sysctl net.ipv4.ip_forward
  net.ipv4.ip_forward = 1
  ````

* `sysctl -w net.ipv4.ip_forward=1`手动打开，再启动docker指定`--ip-forward=true`，Docker会自动设置系统参数

#### 容器之间的访问

- 容器的网络拓扑是否已经互联。默认情况下，所有容器都会被连接到 `docker0` 网桥上。
- 本地系统的防火墙软件 -- `iptables` 是否允许通过

1. 访问所有端口

   默认会添加一条转发策略到 iptables 的 FORWARD 链上。策略为通过（`ACCEPT`）还是禁止（`DROP`）取决于配置`--icc=true`（缺省值）还是 `--icc=false`。当然，如果手动指定 `--iptables=false` 则不会添加 `iptables` 规则。

   可见，默认情况下，不同容器之间是允许网络互通的。如果为了安全考虑，可以在 `/etc/default/docker` 文件中配置 `DOCKER_OPTS=--icc=false` 来禁止它

2. 访问指定的端口

   在通过 `-icc=false` 关闭网络访问后，还可以通过 `--link=CONTAINER_NAME:ALIAS` 选项来访问容器的开放端口。

   例如，在启动 Docker 服务时，可以同时使用 `icc=false --iptables=true` 参数来关闭允许相互的网络访问，并让 Docker 可以修改系统中的 `iptables` 规则。

   此时，系统中的 `iptables` 规则可能是类似

   ```
   $ sudo iptables -nL
   ...
   Chain FORWARD (policy ACCEPT)
   target     prot opt source               destination
   DROP       all  --  0.0.0.0/0            0.0.0.0/0
   ...

   ```

   之后，启动容器（`docker run`）时使用 `--link=CONTAINER_NAME:ALIAS` 选项。Docker 会在 `iptable` 中为 两个容器分别添加一条 `ACCEPT` 规则，允许相互访问开放的端口（取决于 `Dockerfile` 中的 `EXPOSE` 指令）。

   当添加了 `--link=CONTAINER_NAME:ALIAS` 选项后，添加了 `iptables` 规则。

   ```
   $ sudo iptables -nL
   ...
   Chain FORWARD (policy ACCEPT)
   target     prot opt source               destination
   ACCEPT     tcp  --  172.17.0.2           172.17.0.3           tcp spt:80
   ACCEPT     tcp  --  172.17.0.3           172.17.0.2           tcp dpt:80
   DROP       all  --  0.0.0.0/0            0.0.0.0/0

   ```

   注意：`--link=CONTAINER_NAME:ALIAS` 中的 `CONTAINER_NAME` 目前必须是 Docker 分配的名字，或使用 `--name` 参数指定的名字。主机名则不会被识别。

### 端口映射实现

####访问外部

容器所有到外部网络的连接，源地址都会被 NAT 成本地系统的 IP 地址。这是使用 `iptables` 的源地址伪装操作实现的。

查看主机的 NAT 规则。

```
$ sudo iptables -t nat -nL
...
Chain POSTROUTING (policy ACCEPT)
target     prot opt source               destination
MASQUERADE  all  --  172.17.0.0/16       !172.17.0.0/16
...

```

其中，上述规则将所有源地址在 `172.17.0.0/16` 网段，目标地址为其他网段（外部网络）的流量动态伪装为从系统网卡发出。MASQUERADE 跟传统 SNAT 的好处是它能动态从网卡获取地址。

#### 外部访问

容器允许外部访问，可以在 `docker run` 时候通过 `-p` 或 `-P` 参数来启用。

不管用那种办法，其实也是在本地的 `iptable` 的 nat 表中添加相应的规则。

使用 `-P` 时：

```
$ iptables -t nat -nL
...
Chain DOCKER (2 references)
target     prot opt source               destination
DNAT       tcp  --  0.0.0.0/0            0.0.0.0/0            tcp dpt:49153 to:172.17.0.2:80

```

使用 `-p 80:80` 时：

```
$ iptables -t nat -nL
Chain DOCKER (2 references)
target     prot opt source               destination
DNAT       tcp  --  0.0.0.0/0            0.0.0.0/0            tcp dpt:80 to:172.17.0.2:80

```

注意：

- 这里的规则映射了 `0.0.0.0`，意味着将接受主机来自所有接口的流量。用户可以通过 `-p IP:host_port:container_port` 或 `-p IP::port` 来指定允许访问容器的主机上的 IP、接口等，以制定更严格的规则。
- 如果希望永久绑定到某个固定的 IP 地址，可以在 Docker 配置文件 `/etc/docker/daemon.json` 中添加如下内容。

```
{
  "ip": "0.0.0.0"
}
```

### 配置docker0网桥

### 自定义网桥

### 工具和示例

### 编辑网络配置文件

### 实例：创建一个点到点连接

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

