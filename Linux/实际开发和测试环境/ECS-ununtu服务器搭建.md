# ununtu服务器搭建

## 修改主机名称

* `hostname xin77.com` 临时修改为新主机名

```
iZ2zee150isb39wr4ijkpmZ
```

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


### 安装mysql相关文件

apt-get install libapache2-mod-php5 php5 php5-cli php-pear php5-xcache libapache2-mod-perl2 libapache2-mod-auth-mysql php5-mysql php5-mcrypt



* apt-get install libapache2-mod-php5
* `apt-get install php5`
* a2enmod php5
* `apt-get install php5-mysql`


* `service mysql restart`
* `service apache2 restart`

### 测试

````php
<?php
phpinfo();
?>
和
echo mysql_connect('localhost', 'root', 'xIn772333@')?'ok':'error';
````

### 修改项目根目录

* `cd /etc/apache2/sites-available/`
* `vim /etc/apache2/sites-available/default`

```
<VirtualHost *:80>
        ServerAdmin webmaster@localhost
        DocumentRoot /www
```

### 配置虚拟主机

* `mkdir /www/mark2` 

* `chmod -R 755 /www/mark2`

* 创建测试文件

* 设置配置文件

  1. `cp /etc/apache2/sites-available/default /etc/apache2/sites-available/mark2`

  2. 编辑内部内容

     ````
     <VirtualHost *:80>
     	ServerName www.xin77.xyz

     	ServerAdmin ********@qq.com

     	DocumentRoot /www/mark2
     	<Directory /www/mark2>
     		Options Indexes FollowSymLinks MultiViews
     		AllowOverride None
     		Order allow,deny
     		allow from all
     	</Directory>

     	ScriptAlias /cgi-bin/ /usr/lib/cgi-bin/
     	<Directory "/usr/lib/cgi-bin">
     		AllowOverride None
     		Options +ExecCGI -MultiViews +SymLinksIfOwnerMatch
     		Order allow,deny
     		Allow from all
     	</Directory>

     	ErrorLog ${APACHE_LOG_DIR}/mark2_error.log

     	# Possible values include: debug, info, notice, warn, error, crit,
     	# alert, emerg.
     	LogLevel warn

     	CustomLog ${APACHE_LOG_DIR}/mark2_access.log combined

         Alias /doc/ "/usr/share/doc/"
         <Directory "/usr/share/doc/">
             Options Indexes MultiViews FollowSymLinks
             AllowOverride None
             Order deny,allow
             Deny from all
             Allow from 127.0.0.0/255.0.0.0 ::1/128
         </Directory>

     </VirtualHost>
     ````

  3. `ln -s /etc/apache2/sites-available/mark2  /etc/apache2/sites-enabled/mark2`

  4. `apache2ctl configtest` 测试配置

  5. `vim /etc/host`

     ```
     60.205.218.119	www.xin77.xyz
     ```

  6. `service apache2 restart`

> **注意：** `apache2`和`apache4`的`apache2.conf `内容是不同的，主义修改主目录的时候也要修改该文件





[](http://www.mr-wu.cn/aliyun-ecs-ubuntu/)