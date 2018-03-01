# Docker常用命令

##容器命令

* `docker pull training/webapp` 载入docker镜像
* `docker run -d -P training/webapp python app.py` 运行一个镜像，`-d` 让容器在后台运行，`-P` 容器端口映射到随机宿主机端口上，`-p` 容器端口映射到指定的端口上
* `docker ps` 查看容器信息
* `docker port 3dd` 查看容器端口
* `docker logs -f 3dd` 查看容器标准输出
* `dcoker top 3dd` 查看容器运行的进程
* `docker inspect 3dd` 查看容器的配置和状态信息
* `docker stop 3dd` 停止容器
* `docker start 3dd` 重启容器
* `docker rm 3dd` 删除容器

## 镜像命令

* `docker images` 列出本地上的镜像

  * `REPOSITORY` 镜像的仓库源
  * `TAG` 镜像的标签，同一仓库源可以有多个 TAG，代表这个仓库源的不同个版本
  * `IMAGE ID` 镜像的ID
  * `CREATED` 创建镜像时间

* `docker pull ubuntu:13.10` 获取镜像 

* `docker search httpd` 搜索镜像

  * `NAME` 镜像仓库源的名称
  * `DESCRIPTION` 镜像的描述
  * `OFFICIAL` 是否是docker官方发布

* `docker commit -m="has update" -a="runoob" e218edb10161 runoob/ubuntu:v2` 提交一个容器的副本

  * `-m` 提交的描述信息
  * `-a` 指定镜像作者
  * `e21` 容器id
  * `runoob/ubuntu:v2` 指定要创建的目标镜像名称

* 从`Dockerfile`来构建镜像

  ```shell
  runoob@runoob:~$ cat Dockerfile 
  FROM    centos:6.7
  MAINTAINER      Fisher "fisher@sudops.com"

  RUN     /bin/echo 'root:123456' |chpasswd
  RUN     useradd runoob
  RUN     /bin/echo 'runoob:123456' |chpasswd
  RUN     /bin/echo -e "LANG=\"en_US.UTF-8\"" >/etc/default/local
  EXPOSE  22
  EXPOSE  80
  CMD     /usr/sbin/sshd -D
  ```

  * FROM，指定使用哪个镜像源
  * RUN 指令告诉docker 在镜像内执行命令，安装了什么
  * `docker build -t runoob/centos:6.7 .`
    * `-t`指定创建目标的名称

* `docker tag 796f runppb/centos:dev` 给镜像打个标签，此时会创建一个新的镜像

