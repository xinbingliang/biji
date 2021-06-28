# v2rayDocker

- 提前安装好docker

```
 curl -fsSL https://get.docker.com -o get-docker.sh  && \
 bash get-docker.sh
```

- 解析好域名 确认 你的域名正确解析到了你安装的这台服务器
- 会占用 443 和 80 端口请提前确认没有跑其他的业务 （ lsof -i:80 和 lsof -i:443 能查看）
- 请将下面命令中的 YOURDOMAIN.COM（域名）替换成自己的域名（此IP解析的域名）！！！

````
sudo docker run -d --rm --name v2ray -p 443:443 -p 80:80 -v $HOME/.caddy:/root/.caddy  pengchujin/v2ray_ws:0.11 YOURDOMAIN.COM V2RAY_WS && sleep 3s && sudo docker logs v2ray
````

- 如果你想指定固定 uuid 的话， 0890b53a-e3d4-4726-bd2b-52574e8588c4 这个 uuid 改为你自己的，<https://www.uuidgenerator.net/> 这个网站可以生成随机 uuid。

```
sudo docker run -d --rm --name v2ray -p 443:443 -p 80:80 -v $HOME/.caddy:/root/.caddy  pengchujin/v2ray_ws:0.11 YOURDOMAIN.COM V2RAY_WS 0890b53a-e3d4-4726-bd2b-52574e8588c4 && sleep 3s && sudo docker logs v2ray
```

````
sudo docker run -d --rm --name v2ray -p 443:443 -p 80:80 -v $HOME/.caddy:/root/.caddy  pengchujin/v2ray_ws:0.11 156.233.252.119 V2RAY_WS 0fc42ae8-d7ac-11eb-b268-005056c00008 && sleep 3s && sudo docker logs v2ray
````

- 命令执行完会显示链接信息，如果想查看链接信息，执行下面命令即可

```
sudo docker logs v2ray
```

- 想停止这个 docker 和服务

```
sudo docker stop v2ray
```