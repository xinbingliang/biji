# Ubuntu更换阿里源

## 备份

```
#普通管理员sudo cp /etc/apt/source.list /etc/apt/source.list.backup#root用户cp /etc/apt/source.list /etc/apt/source.list.backup
```

## 将下面的内容粘贴到source.list文件中

```
# deb cdrom:[Ubuntu 16.04 LTS _Xenial Xerus_ - Release amd64 (20160420.1)]/ xenial main restricteddeb-src http://archive.ubuntu.com/ubuntu xenial main restricted #Added by software-propertiesdeb http://mirrors.aliyun.com/ubuntu/ xenial main restricteddeb-src http://mirrors.aliyun.com/ubuntu/ xenial main restricted multiverse universe #Added by software-propertiesdeb http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricteddeb-src http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted multiverse universe #Added by software-propertiesdeb http://mirrors.aliyun.com/ubuntu/ xenial universedeb http://mirrors.aliyun.com/ubuntu/ xenial-updates universedeb http://mirrors.aliyun.com/ubuntu/ xenial multiversedeb http://mirrors.aliyun.com/ubuntu/ xenial-updates multiversedeb http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiversedeb-src http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse #Added by software-propertiesdeb http://archive.canonical.com/ubuntu xenial partnerdeb-src http://archive.canonical.com/ubuntu xenial partnerdeb http://mirrors.aliyun.com/ubuntu/ xenial-security main restricteddeb-src http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted multiverse universe #Added by software-propertiesdeb http://mirrors.aliyun.com/ubuntu/ xenial-security universedeb http://mirrors.aliyun.com/ubuntu/ xenial-security multiverse

```

## 跟新源

```
#普通用户sudo apt-get update#root用户apt-get update
```

## 更新包

```
sudo apt-get -y upgrade
```

## 解决vim安装

* apt-get remove vim-common

* apt-get install vim

  ​

  ​