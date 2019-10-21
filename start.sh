#!/bin/bash

# 修改apt-get源
echo """
deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
""" > /etc/apt/sources.list

# 关闭防火墙
ufw disable

# 安装一些必要工具
apt-get install ssh docker.io curl wget vim

# 修改docker源
mkdir -p /etc/docker
tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://x2fvikf9.mirror.aliyuncs.com"]
}
EOF
systemctl daemon-reload
systemctl restart docker

# 更新所有软件
apt-get upgrade

# 打印出ip
ifconfig

# 需要修改ssh的配置
echo "补充修改ssh配置"




