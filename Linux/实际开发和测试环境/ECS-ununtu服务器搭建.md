# ununtu服务器搭建

## 磁盘挂载

* `fdisk -l` 查看磁盘挂载情况。应该看到一块没有被使用的空闲磁盘
* `mkfs.ext4 /dev/vdb` 对磁盘进行格式化
* `mkdir /www` 创建挂载目录
* `mount /dev/vdb /www/` 挂载目录
* `df -lh` 查看挂载情况
* `blkid` 查看磁盘uuid
* `echo 'UUID="2347d891-b147-46b9-a4f8-9ce361babdcc /www ext4 defaults 0 0' >> /etc/fstab` 添加自动挂载

## 创建xin用户

* 'useradd xin' 创建用户
* 'vim /etc/sudoers' 
  * `xin ALL=(ALL:ALL) ALL `

## ssh配置

### 修改端口

* `cp /etc/ssh/sshd_config /etc/ssh/~sshd_config` 备份

* `vim /etc/ssh/sshd_config` 修改ssh端口

  ```shell
  Port 2002
  ```

### 禁止使用root用户、密码登录和禁止空密码登录

```shell
PermitRootLogin no
PasswordAuthentication no
PermitEmptyPasswords no
```

### 采用RSA证书

```
ServerKeyBits 1024
StrictModes yes

RSAAuthentication yes
PubkeyAuthentication yes
```

### 生成RSA

* ssh-keygen 生成公钥和私钥(可以使用工具)
* 将公钥文件保存在对应需要登录用户的家目录(.ssh/authorized_keys)中
* 私钥保存在自己本地家目录中
* `service ssh restart`


### 安装mysql

* `sudo apt-get update` 更新源
* `apt-get install mysql-server`

### 安装apache

* `apt-get install apache2 `



[](http://www.mr-wu.cn/aliyun-ecs-ubuntu/)
