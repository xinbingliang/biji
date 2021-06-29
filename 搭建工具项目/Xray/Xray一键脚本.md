# Xray一键脚本

> 本文转载自：<https://v2raytech.com/xray-one-click-script/>，如文中内容有错误请到原文查看原始版(最新版)

> 使用过程中遇到问题，欢迎到 [网络跳越论坛](https://hijk.club/) 或 tg群组<https://t.me/hijkclub> 交流，或关注Youtube频道：[网络跳越](https://youtube.com/channel/UCYTB--VsObzepVJtc9yvUxQ)

Xray项目已经确定独自运作，目前最新版是1.1.2版本。根据测试数据，服务端direct+客户端使用splice后性能比VLESS裸奔还要强上一倍，已经远超trojan/trojan-go，非常推荐使用。

本文的Xray一键脚本可以配置常规VMESS协议、VMESS+KCP、VMESS+websocket+TLS+Nginx、VLESS+TCP+XTLS、VLESS+TCP+TLS、trojan、trojan+XTLS等多种组合，支持CentOS 7/8、Ubuntu 16.04、Debian 8及新版系统。

## Xray一键脚本使用方法

[Xray一键脚](https://v2xtls.org/tag/xray%E4%B8%80%E9%94%AE%E8%84%9A%E6%9C%AC/)本使用步骤如下：

\1. 准备一个境外服务器，想服务器速度快请参考 [搬瓦工VPS购买教程](https://v2xtls.org/%e6%90%ac%e7%93%a6%e5%b7%a5vps%e8%b4%ad%e4%b9%b0%e6%95%99%e7%a8%8b/) 或从  [CN2 GIA VPS商家推荐](https://v2xtls.org/cn2-gia-vps%e5%92%8c%e5%95%86%e5%ae%b6%e6%8e%a8%e8%8d%90/) 选购，想ip被封后免费换请参考：[购买vultr服务器超详细图文教程](https://v2xtls.org/%e8%b4%ad%e4%b9%b0vultr%e6%9c%8d%e5%8a%a1%e5%99%a8%e8%b6%85%e8%af%a6%e7%bb%86%e5%9b%be%e6%96%87%e6%95%99%e7%a8%8b/)。

如果用VMESS+WS+TLS或者VLESS系列协议，则还需一个域名。对域名没有要求，国内/国外注册的都可以，**不需要备案**，不会影响使用，也不会带来安全/隐私上的问题。购买域名可参考：[Namesilo购买域名详细教程](https://v2xtls.org/namesilo%e5%9f%9f%e5%90%8d%e6%b3%a8%e5%86%8c%e5%92%8c%e4%bd%bf%e7%94%a8%e6%95%99%e7%a8%8b/)。

值得一提的是本Xray一键脚本支持ipv6 only服务器，但是不建议用只有ipv6的VPS用来科学上网。

\2. 如果vps运营商开启了防火墙（阿里云、Ucloud、腾讯云、AWS、GCP等商家默认有，搬瓦工/hostdare/vultr等商家默认关闭），请先登录vps管理后台放行80和443端口，否则可能会导致获取证书失败。此外，**本脚本支持上传自定义证书**，可跳过申请证书这一步，也可用在[NAT VPS](https://v2raytech.com/tag/nat-vps/)上。

\3. ssh连接到服务器。Windows系统请参考 [Bitvise连接Linux服务器教程](https://v2xtls.org/bitvise%e8%bf%9e%e6%8e%a5linux%e6%9c%8d%e5%8a%a1%e5%99%a8%e6%95%99%e7%a8%8b/)，mac用户请参考 [Mac电脑连接Linux教程](https://v2xtls.org/mac%e7%94%b5%e8%84%91%e8%bf%9e%e6%8e%a5linux%e6%95%99%e7%a8%8b/)。

\4. 复制（或手动输入）下面命令到终端：

```
bash <(curl -sL https://s.hijk.art/xray.sh)
```

按回车键，将出现如下操作菜单。如果菜单没出现，CentOS系统请输入 `yum install -y curl`，Ubuntu/Debian系统请输入 `sudo apt install -y curl`，然后再次运行上面的命令：

[![Xray一键安装脚本](https://v2xtls.org/wp-content/uploads/2020/12/Xray%E4%B8%80%E9%94%AE%E5%AE%89%E8%A3%85%E8%84%9A%E6%9C%AC.jpg)](https://v2xtls.org/wp-content/uploads/2020/12/Xray%E4%B8%80%E9%94%AE%E5%AE%89%E8%A3%85%E8%84%9A%E6%9C%AC.jpg)

Xray一键安装脚本

本Xray一键脚本目前支持以下组合方式：

- **VMESS**，即最普通的V2ray服务器，没有伪装，也不是VLESS
- **VMESS**+KCP，传输协议使用mKCP，VPS线路不好时可能有奇效
- **VMESS**+TCP+TLS，带伪装的V2ray，不能过[CDN中转](https://v2xtls.org/v2ray%e4%bd%bf%e7%94%a8cloudflare%e4%b8%ad%e8%bd%ac%e6%b5%81%e9%87%8f%ef%bc%8c%e6%8b%af%e6%95%91%e8%a2%ab%e5%a2%99ip/)
- **VMESS**+WS+TLS，即最通用的V2ray伪装方式，能过[CDN中转](https://v2xtls.org/v2ray%e4%bd%bf%e7%94%a8cloudflare%e4%b8%ad%e8%bd%ac%e6%b5%81%e9%87%8f%ef%bc%8c%e6%8b%af%e6%95%91%e8%a2%ab%e5%a2%99ip/)，推荐使用
- **VLESS**+KCP，传输协议使用mKCP
- **VLESS**+TCP+TLS，通用的VLESS版本，不能过[CDN中转](https://v2xtls.org/v2ray%e4%bd%bf%e7%94%a8cloudflare%e4%b8%ad%e8%bd%ac%e6%b5%81%e9%87%8f%ef%bc%8c%e6%8b%af%e6%95%91%e8%a2%ab%e5%a2%99ip/)，但比VMESS+TCP+TLS方式性能更好
- **VLESS**+WS+TLS，基于websocket的V2ray伪装VLESS版本，能过[CDN中转](https://v2xtls.org/v2ray%e4%bd%bf%e7%94%a8cloudflare%e4%b8%ad%e8%bd%ac%e6%b5%81%e9%87%8f%ef%bc%8c%e6%8b%af%e6%95%91%e8%a2%ab%e5%a2%99ip/)，有过CDN情况下推荐使用
- **VLESS**+TCP+XTLS，目前最强悍的VLESS+XTLS组合，强力推荐使用（但是支持的客户端少一些）
- **trojan**，轻量级的伪装协议
- **trojan**+XTLS，trojan加强版，使用XTLS技术提升性能

> 注意：目前一些客户端不支持VLESS协议，或者不支持XTLS，请按照自己的情况选择组合

\5. 按照自己的需求选择一个方式。例如6，然后回车。接着脚本会让你输入一些信息，也可以直接按回车使用默认值。需要注意的是，对于要输入伪装域名的情况，**如果服务器上有网站在运行**，请联系运维再执行脚本，否则可能导致原来网站无法访问！

[![xray一键脚本输入](https://v2xtls.org/wp-content/uploads/2020/12/xray%E4%B8%80%E9%94%AE%E8%84%9A%E6%9C%AC%E8%BE%93%E5%85%A5-1024x792-1.jpg)](https://v2xtls.org/wp-content/uploads/2020/12/xray%E4%B8%80%E9%94%AE%E8%84%9A%E6%9C%AC%E8%BE%93%E5%85%A5-1024x792-1.jpg)

xray一键脚本输入

\6. 脚本接下来会自动运行，一切顺利的话结束后会输出配置信息：

[![Xray一键脚本运行成功输出信息](https://v2xtls.org/wp-content/uploads/2020/12/Xray%E4%B8%80%E9%94%AE%E8%84%9A%E6%9C%AC%E8%BF%90%E8%A1%8C%E6%88%90%E5%8A%9F%E8%BE%93%E5%87%BA%E4%BF%A1%E6%81%AF.jpg)](https://v2xtls.org/wp-content/uploads/2020/12/Xray%E4%B8%80%E9%94%AE%E8%84%9A%E6%9C%AC%E8%BF%90%E8%A1%8C%E6%88%90%E5%8A%9F%E8%BE%93%E5%87%BA%E4%BF%A1%E6%81%AF.jpg)

Xray一键脚本运行成功输出信息

**到此服务端配置完毕**，服务器可能会自动重启（**没提示重启则不需要**），windows终端出现“disconnected”，mac出现“closed by remote host”说明服务器成功重启了。

对于VLESS协议、VMESS+WS+TLS的组合，网页上输入伪装域名，**能正常打开伪装站**，说明服务端已经正确配置好。如果运行过程中出现问题，请在本页面下方查找解决方法或留言。

## Xray一键脚本其他事项

服务端配置好后，如果想使用CloudFlare等CDN中转（必须是WS版才可以），请参考：[使用cloudflare中转流量，拯救被墙ip](https://v2xtls.org/v2ray%e4%bd%bf%e7%94%a8cloudflare%e4%b8%ad%e8%bd%ac%e6%b5%81%e9%87%8f%ef%bc%8c%e6%8b%af%e6%95%91%e8%a2%ab%e5%a2%99ip/)。

本脚本默认使用的加速技术是BBR，换成魔改BBR/BBR Plus/锐速清参考：[安装魔改BBR/BBR](https://v2xtls.org/%e5%ae%89%e8%a3%85%e9%ad%94%e6%94%b9bbr-bbr-plus-%e9%94%90%e9%80%9flotserver/)[ Plus/锐速(](https://v2xtls.org/%e5%ae%89%e8%a3%85%e9%ad%94%e6%94%b9bbr-bbr-plus-%e9%94%90%e9%80%9flotserver/)[Lotserver)](https://v2xtls.org/%e5%ae%89%e8%a3%85%e9%ad%94%e6%94%b9bbr-bbr-plus-%e9%94%90%e9%80%9flotserver/)。

如果伪装站类型没有你满意的，比如你想搭建WordPress博客，请参考：[V2ray伪装建站教程](https://v2xtls.org/v2ray%e4%bc%aa%e8%a3%85%e5%bb%ba%e7%ab%99%e6%95%99%e7%a8%8b/)。

对于使用TLS的方式，脚本默认会申请域名证书，证书存放在和xray配置文件同一个文件夹内（即`/usr/local/etc/xray`目录下）。证书会自动更新，如果客户端突然无法使用，请打开伪装网站查看是否能正常打开。如果证书已过期，请再次运行上面的脚本重新配置。

最后，刚搭建好Xray后不要猛上流量，否则会导致被限速、端口被墙，严重可能导致ip被墙。

接下来是配置客户端，下载客户端和配置教程请参考：

- [V2ray Windows客户端下载](https://v2xtls.org/v2ray-windows%e5%ae%a2%e6%88%b7%e7%ab%af%e4%b8%8b%e8%bd%bd/)
- [V2ray 安卓客户端下载](https://v2xtls.org/v2ray%e5%ae%89%e5%8d%93%e5%ae%a2%e6%88%b7%e7%ab%af%e4%b8%8b%e8%bd%bd/)
- [V2ray Mac客户端下载](https://v2xtls.org/v2ray-mac%e5%ae%a2%e6%88%b7%e7%ab%af%e4%b8%8b%e8%bd%bd/)
- [V2ray苹果客户端下载](https://v2xtls.org/v2ray-ios%e5%ae%a2%e6%88%b7%e7%ab%af%e4%b8%8b%e8%bd%bd/)

祝大家使用愉快。如有问题请在页面下方留言，也欢迎到 [网络跳越论坛](https://hijk.club/) 或 tg群组<https://t.me/hijkclub> 交流，或关注Youtube频道：[网络跳越](https://youtube.com/channel/UCYTB--VsObzepVJtc9yvUxQ)。

## 参考

1. [V2ray一键脚本](https://v2xtls.org/v2ray%e5%a4%9a%e5%90%88%e4%b8%80%e8%84%9a%e6%9c%ac%ef%bc%8c%e6%94%af%e6%8c%81vmesswebsockettlsnginx%e3%80%81vlesstcpxtls%e3%80%81vlesstcptls%e7%ad%89%e7%bb%84%e5%90%88/)
2. [V2ray带伪装一键脚本](https://v2xtls.org/v2ray%e5%b8%a6%e4%bc%aa%e8%a3%85%e4%b8%80%e9%94%ae%e8%84%9a%e6%9c%ac/)
3. [V2ray的VLESS协议介绍和使用教程](https://v2xtls.org/v2ray%e7%9a%84vless%e5%8d%8f%e8%ae%ae%e4%bb%8b%e7%bb%8d%e5%92%8c%e4%bd%bf%e7%94%a8%e6%95%99%e7%a8%8b/)
4. [VLESS协议的fallback参数详解](https://v2xtls.org/vless%e5%8d%8f%e8%ae%ae%e7%9a%84fallback%e5%8f%82%e6%95%b0%e4%bb%8b%e7%bb%8d/)

【加速器推荐】 [搬瓦工官方代理服务Just My Socks，高速CN2 GIA线路访问，被墙自动更换IP](https://v2xtls.org/just-my-socks%e8%b4%ad%e4%b9%b0%e5%92%8c%e4%bd%bf%e7%94%a8%e6%95%99%e7%a8%8b/)