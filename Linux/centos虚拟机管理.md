# centos虚拟机管理

## 开启网络

```
vi /etc/sysconfig/network-scripts/ifcfg-ens33
service network restart 
```

## yum源管理

```
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
sed -i -e '/mirrors.cloud.aliyuncs.com/d' -e '/mirrors.aliyuncs.com/d' /etc/yum.repos.d/CentOS-Base.repo

yum clean packages
yum clean all
rm -rf /var/cache/yum/*
```

## 代理

`vim /etc/profile`

```
export http_proxy=http://192.168.2.51:1080
export https_proxy=http://192.168.2.51:1080
export ftp_proxy=http://192.168.2.51:1080
```

```
source /etc/profile
```

```
apt-get -o Acquire::http::proxy="http://192.168.2.59:1080" update
```

## 





















