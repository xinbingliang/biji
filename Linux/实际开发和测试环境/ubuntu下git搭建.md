# ubuntu下git服务搭建

## 安装基础支持

```
sudo apt-get install git-core openssh-server openssh-client
```

* git-core是git版本控制核心软件;


* 安装openssh-server和openssh-client是由于git需要通过ssh协议在服务器与客户端之间传输文件。 

## git安装与配置

```
sudo apt-get install git

git config --global user.name "your_name"   
git config --global user.email "******@gmail.com" 
```

## 创建Git管理员帐号

创建一个账号作为git服务器的管理员，用来管理其他用户的项目权限

```
useradd -m git
passwd git
```

## 客户端生成SSH公钥

```
ssh-keygen -t rsa -C '709464835@qq.com'
```

* -t 指定密钥类型，默认即 rsa ，可以省略；   


* -C 设置注释文字，比如你的邮箱；    

最后收集所有需要登录的用户的公钥，就是他们自己的id_rsa.pub文件，把所有公钥导入到/home/git/.ssh/authorized_keys文件里，一行一个。

## 拒绝git的SSH登录

## 仓库位置和权限

gitosis默认状态下会将仓库放在用户的repositories目录下，为了以后的便利，直接使用这个吧。我们需要设置为只有git账号拥有所有权限，其他用户没有任何权限。

```
sudo mkdir /home/git/repositories # 没有则创建
sudo chown git:git /home/git/repositories
chmod 700 /home/git/repositories # 修改权限
```

## 服务器上git仓库

任何版本控制系统都需要在服务器上创建仓库，Git也不例外。

使用git账户在服务器上创建一个目录（mytest.git）并初始化成git项目仓库。

```
cd /home/git/repositories/
mkdir mytest.git
sudo chown git:git mytest.git/
cd mytest.git/
git init --bare
```

## 客户端clone仓库

```
git clone git@IP:repositories/mytest.git
```

[](http://www.ttwshell.com/article/aliyun-ECS-Git-Server-Settings.html)

## ubuntu卸载软件

* `apt-get purge remove <package>` 删除软件及其配置文件

* `apt-get purge / apt-get –purge remove` 删除已安装包（不保留配置文件)。 

  删除已安装包（不保留配置文件)。 
  如软件包a，依赖软件包b，则执行该命令会删除a，而且不保留配置文件

* `apt-get autoremove `删除为了满足依赖而安装的，但现在不再需要的软件包（包括已安装包），保留配置文件。

* `apt-get remove` 删除已安装的软件包（保留配置文件），不会删除依赖软件包，且保留配置文件

* `apt-get autoclean`APT的底层包是dpkg, 而dpkg 安装Package时, 会将 *.deb 放在 /var/cache/apt/archives/中，apt-get autoclean 只会删除 /var/cache/apt/archives/ 已经过期的deb。

* `apt-get clean`使用 apt-get clean 会将 /var/cache/apt/archives/ 的 所有 deb 删掉，可以理解为 rm /var/cache/apt/archives/*.deb。

  ​

  ​

  ​