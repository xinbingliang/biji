#!/bin/bash

sudo -S passwd

#echo -n "请输入您的root用户密码："
#read root_passwd

sudo apt-get update
sudo apt-get -y upgrade
sudo apt-get -y install net-tools
sudo apt-get -y install vim
sudo apt-get -y install ssh
sudo apt-get -y install docker.io
sudo apt-get -y install python3-pip
sudo apt-get -y install ipython3
pip3 install pipenv

ifconfig

#echo -e "set nu\nset autoindent\nset tabstop=4\nset shiftwidth=4\nsyntax on\nset showmatch \nset ai!" >> /etc/vim/vimrc