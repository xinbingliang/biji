# nps内网穿透

* 网址：[链接](https://github.com/ehang-io/nps)

## 服务端

* 安装

````
mkdir nps && cd nps
wget https://github.com/ehang-io/nps/releases/download/v0.26.6/linux_amd64_server.tar.gz
tar -xvf linux_amd64_server.tar.gz
sudo ./nps install
````

* 配置

  `cd /etc/nps/conf`

  ````
  http_proxy_ip=0.0.0.0
  http_proxy_port=8088
  https_proxy_port=4433
  https_just_proxy=true

  #p2p 大流量传输
  p2p_ip=127.0.0.1
  p2p_port=6000

  #web
  web_host=a.o.com
  web_username=xin
  web_password=yjfc4883212
  web_port = 8089
  ````

* 启动

  `nps start`

* 安全组开放

  ```
  8024
  8089
  ```


9050/9090

## 客户端

[使用教程](https://ehang-io.github.io/nps/#/use?id=%e6%97%a0%e9%85%8d%e7%bd%ae%e6%96%87%e4%bb%b6%e6%a8%a1%e5%bc%8f)

* 安装

 `````
./npc install -server=47.94.128.12:8024 -vkey=xxx
 `````

## 私有网盘

`````
docker run -d -p 8080:80 nextcloud
`````

