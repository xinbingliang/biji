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



## Docker的网络



## Docker的持久化存储和数据共享



## Docker Compose多容器的部署



## Docker Swarm 



## DevOps



## Kubernetes



## 容器的运维和监控



## Docker + DevOps实战

