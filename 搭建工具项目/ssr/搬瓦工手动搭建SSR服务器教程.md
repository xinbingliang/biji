**搬瓦工手动搭建 SSR 服务器教程**

> 本文旨在为程序员提供帮助，阅读到国外程序员的优秀代码。因搬瓦工近段时间取消了后台一键**搭建 ****Shadowsocks **的选项，下面将分享怎样手动自己**搭建 SS **教程。
>
> 本教程很简单，整个教程分三步：
>
> - 第一步：购买 VPS 服务器
> - 第二步：一键部署 VPS 服务器
> - 第三步：一键加速 VPS 服务器 （[谷歌BBR加速](https://www.bwgblog.org/bandwagonhost-openvz-architecture-solution-one-key-installs-google-bbr-lkl-acceleration-script.html)；对速度要求不高的话，此步骤可省略）

## **第一步：购买VPS服务器**

VPS 服务器需要选择国外的，首选国际知名的主机服务商：[搬瓦工](https://www.bwgblog.org/)，搬瓦工的口碑以及速度、稳定性和性价比都很不错。

 

搬瓦工中文网选购地址：<https://www.bwgblog.org/>

 

### 购买方案推荐：

1.搬瓦工CN2线路（推荐）

https://www.bwgblog.org/bandwagonhost-cn2.html

3.搬瓦工KVM架构（性价比高）

<https://www.bwgblog.org/bandwagonhost-kvm.html>

4.搬瓦工香港机房（土豪专属）

<https://www.bwgblog.org/bandwagonhost-hk.html>

5.搬瓦工19.99传家宝方案（缺货）

<https://www.bwgblog.org/bandwagonhost-annual-payment-of-19-99.html>

 

因搬瓦工官网不支持中文的原因，有些网友不清楚每个 VPS 方案的详细配置信息，建议大家从搬瓦工中文网进行选择方案，选择好后会直接跳转到官方相对应的方案选项。

购买教程请查看：[最新搬瓦工注册购买以及支付宝付款教程](https://www.bwgblog.org/gonglue.html)

 

因节约时间本文不在详细介绍[搬瓦工购买教程，以及支付宝付款教程](https://www.bwgblog.org/gonglue.html)，请大家自行前往以上连接进行查看。

 

下面将介绍如何手动配置搬瓦工 SSR 教程

## 第二步：**搬瓦工手动搭建** SSR 教程

我们要搭建 SS 则需要连接到远程服务器，也就是从我们本地电脑连接到刚刚购买的搬瓦工 VPS 的服务器。这时就需要用到一个远程连接工具，在这里我选择了 Xshell 的软件来进行连接，下面是 Xshell 的下载地址。

 

**windows 版 Xshell 下载地址：**

 

百度软件中心下载：<http://rj.baidu.com/soft/detail/15201.html?ald>

 

如果是苹果电脑操作系统，请自行搜索并下载 Xshell MAC 版或者在 MAC 电脑上安装一个 windows 虚拟机或者其它能远程连接 vps 服务器的软件。

 

### 登录远程服务器

下载 xshell 软件并安装后，打开软件，按照下图进行操作：

**1.选择文件，然后点击“新建”**

[![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](http://s15.sinaimg.cn/mw690/006DImMpzy7j6YHyseq0e&690)](http://photo.blog.sina.com.cn/showpic.html#blogid=16a9d1a610102xflz&url=http://album.sina.com.cn/pic/006DImMpzy7j6YHyseq0e)
![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](https://images2018.cnblogs.com/blog/1303944/201803/1303944-20180322092645344-828563070.png)

**2.在弹出的新建窗口中填入 VPS 信息**

名称：此处可以随便填写（能记住是这个服务器就行）

协议：选择 SSH

主机：填写我们刚刚购买的搬瓦工服务器IP地址（不知道如何查看服务器IP地址请看[这里](https://www.bwgblog.org/bandwagonhost-kiwivm.html)）

端口号：搬瓦工的端口号并不是 22，请到[搬瓦工后台KIWIVM管理面板](https://www.bwgblog.org/bandwagonhost-kiwivm.html)查看端口号。

其它信息不用更改，最后确定即可，如图：

![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](https://images2018.cnblogs.com/blog/1303944/201803/1303944-20180322094452180-549184942.png)

 [![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](http://s13.sinaimg.cn/mw690/006DImMpzy7j6YJLLGsdc&690)](http://photo.blog.sina.com.cn/showpic.html#blogid=16a9d1a610102xflz&url=http://album.sina.com.cn/pic/006DImMpzy7j6YJLLGsdc)

**3.未知主机密钥**

第一次连接会有以下提示，按照下图“接受并保存”

![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](https://images2018.cnblogs.com/blog/1303944/201803/1303944-20180322095216090-1274029031.png)

 [![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](http://s14.sinaimg.cn/mw690/006DImMpzy7j6YMaISF1d&690)](http://photo.blog.sina.com.cn/showpic.html#blogid=16a9d1a610102xflz&url=http://album.sina.com.cn/pic/006DImMpzy7j6YMaISF1d)

4.输入用户名

linux系统用户名默认都是 root，我们在以下输入框填入“root”

![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](https://images2018.cnblogs.com/blog/1303944/201803/1303944-20180322095503518-130066109.png)

 [![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](http://s12.sinaimg.cn/mw690/006DImMpzy7j6YN30U30b&690)](http://photo.blog.sina.com.cn/showpic.html#blogid=16a9d1a610102xflz&url=http://album.sina.com.cn/pic/006DImMpzy7j6YN30U30b)

5.输入密码

这个密码可以在你的搬瓦工账号注册邮箱内查看

（注意：并不是你的搬瓦工账号登录密码，而是 VPS 的密码）

![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](https://images2018.cnblogs.com/blog/1303944/201803/1303944-20180322095705855-1240629939.png)

 [![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](http://s7.sinaimg.cn/mw690/006DImMpzy7j6YPcOyy76&690)](http://photo.blog.sina.com.cn/showpic.html#blogid=16a9d1a610102xflz&url=http://album.sina.com.cn/pic/006DImMpzy7j6YPcOyy76)

6.链接成功后，会出现下图所示，之后就可以输入代码搭建 SS 了

![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](https://images2018.cnblogs.com/blog/1303944/201803/1303944-20180322095837838-1838045758.png)

 [![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](http://s1.sinaimg.cn/mw690/006DImMpzy7j6YQCohy30&690)](http://photo.blog.sina.com.cn/showpic.html#blogid=16a9d1a610102xflz&url=http://album.sina.com.cn/pic/006DImMpzy7j6YQCohy30)

### 搬瓦工手动搭建 SSR 教程：

用下面这个脚本搭建

系统要求：CentOS / Debian / Ubuntu

SSR 单 / 多端口一键管理脚本：

 

**主用下载地址：**

> yum -y install wget
>
> wget -N --no-check-certificate https://softs.fun/Bash/ssr.sh && chmod +x ssr.sh && bash ssr.sh

 

**备用下载地址：**

> yum -y install wget
>
> wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/ssr.sh && chmod +x ssr.sh && bash ssr.sh

 



```
wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/ssr.sh && chmod +x ssr.sh && bash ssr.sh
```

复制上面的主用下载地址的两句代码到 VPS 服务器里，然后按回车，回车后如下图：

输入数字 1 来安装 SSR 服务端。如果输入 1 后不能进入下一步，那么请退出 xshell，重新连接 vps 服务器，然后输入快捷管理命令 bash ssr.sh 再尝试。

![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](https://images2018.cnblogs.com/blog/1303944/201803/1303944-20180322100438400-1854948921.png)

 [![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](http://s16.sinaimg.cn/mw690/006DImMpzy7j6YWTeLZ3f&690)](http://photo.blog.sina.com.cn/showpic.html#blogid=16a9d1a610102xflz&url=http://album.sina.com.cn/pic/006DImMpzy7j6YWTeLZ3f)

依次输入自己想设置的端口和密码 (密码建议用复杂点的字母组合，图中的密码只是作为演示用)，回车键用于确认

![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](https://images2018.cnblogs.com/blog/1303944/201803/1303944-20180322100557986-2121884869.png)

 [![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](http://s9.sinaimg.cn/mw690/006DImMpzy7j6YYzGjK98&690)](http://photo.blog.sina.com.cn/showpic.html#blogid=16a9d1a610102xflz&url=http://album.sina.com.cn/pic/006DImMpzy7j6YYzGjK98)

选择想设置的加密方式，比如 10，按回车键确认

![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](https://images2018.cnblogs.com/blog/1303944/201803/1303944-20180322100642648-706870242.png)

 [![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](http://s1.sinaimg.cn/mw690/006DImMpzy7j6YZAB8sd0&690)](http://photo.blog.sina.com.cn/showpic.html#blogid=16a9d1a610102xflz&url=http://album.sina.com.cn/pic/006DImMpzy7j6YZAB8sd0)

接下来是选择协议插件，如下图：

![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](https://images2018.cnblogs.com/blog/1303944/201803/1303944-20180322100949052-81342960.png)

 [![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](http://s6.sinaimg.cn/mw690/006DImMpzy7j6Z0xBc1d5&690)](http://photo.blog.sina.com.cn/showpic.html#blogid=16a9d1a610102xflz&url=http://album.sina.com.cn/pic/006DImMpzy7j6Z0xBc1d5)

![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](https://images2018.cnblogs.com/blog/1303944/201803/1303944-20180322101004816-1527008195.png)

 [![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](http://s6.sinaimg.cn/mw690/006DImMpzy7j6ZbhzXn75&690)](http://photo.blog.sina.com.cn/showpic.html#blogid=16a9d1a610102xflz&url=http://album.sina.com.cn/pic/006DImMpzy7j6ZbhzXn75)

选择并确认后，会出现上图的界面，提示你是否选择兼容原版，这里的原版指的是SS客户端，可以根据需求进行选择，原则上不推荐使用SS客户端，演示选择n
之后进行混淆插件的设置，如下图

![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](https://images2018.cnblogs.com/blog/1303944/201803/1303944-20180322101141731-1200412712.png)

[![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](http://s10.sinaimg.cn/mw690/006DImMpzy7j6ZcadHr89&690)](http://photo.blog.sina.com.cn/showpic.html#blogid=16a9d1a610102xflz&url=http://album.sina.com.cn/pic/006DImMpzy7j6ZcadHr89)

进行混淆插件的设置后，会依次提示你对设备数、单线程限速和端口总限速进行设置，默认值是不进行限制，个人使用的话，选择默认即可，即直接敲回车键。

![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](https://images2018.cnblogs.com/blog/1303944/201803/1303944-20180322101229762-1504078281.png)

[![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](http://s4.sinaimg.cn/mw690/006DImMpzy7j6Zdhkxd03&690)](http://photo.blog.sina.com.cn/showpic.html#blogid=16a9d1a610102xflz&url=http://album.sina.com.cn/pic/006DImMpzy7j6Zdhkxd03)

之后代码就正式自动部署了，到下图所示的位置，提示你下载文件，输入：y

![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](https://images2018.cnblogs.com/blog/1303944/201803/1303944-20180322101338606-2111179509.png)

![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](http://s2.sinaimg.cn/mw690/006DImMpzy7j6Ze6GMp71&690)

耐心等待一会，出现下面的界面即部署完成：

![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](https://images2018.cnblogs.com/blog/1303944/201803/1303944-20180322101412840-1001857331.png)

![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](https://images2018.cnblogs.com/blog/1303944/201803/1303944-20180322101427533-1846323367.png)

 [![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](http://s5.sinaimg.cn/mw690/006DImMpzy7j6Zf13Kc84&690)](http://photo.blog.sina.com.cn/showpic.html#blogid=16a9d1a610102xflz&url=http://album.sina.com.cn/pic/006DImMpzy7j6Zf13Kc84)

![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](http://s5.sinaimg.cn/mw690/006DImMpzy7j6ZhNixm44&690)

根据上图就可以看到自己设置的 SSR 账号信息，包括 IP、端口、密码、加密方式、协议插件、混淆插件。如果之后想修改账号信息，直接输入快捷管理命令：bash ssr.sh 进入管理界面，选择相应的数字来进行一键修改。例如：
bash ssr.sh

![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](https://images2018.cnblogs.com/blog/1303944/201803/1303944-20180322101518956-339769896.png)

 [![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](http://s13.sinaimg.cn/mw690/006DImMpzy7j6ZjkzqQfc&690)](http://photo.blog.sina.com.cn/showpic.html#blogid=16a9d1a610102xflz&url=http://album.sina.com.cn/pic/006DImMpzy7j6ZjkzqQfc)

![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](https://images2018.cnblogs.com/blog/1303944/201803/1303944-20180322101540501-493757482.png)

 [![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](http://s12.sinaimg.cn/mw690/006DImMpzy7j6ZjYyYrdb&690)](http://photo.blog.sina.com.cn/showpic.html#blogid=16a9d1a610102xflz&url=http://album.sina.com.cn/pic/006DImMpzy7j6ZjYyYrdb)

到这里我们利用**搬瓦工手动搭建** SS 已经配置成功，下面将分享怎样手动安装谷歌 BBR 加速。

不需要安装谷歌 BBR 的可以直接忽略以下教程。

------

## 第三步：安装谷歌 BBR 加速教程

加速教程为谷歌 BBR 加速教程，谷歌BBR加速和[破解版锐速加速教程](https://www.bwgblog.org/bandwagonhost-install-sharp-acceleration-script.html)，两者只能成功装一个，都仅支持KVM架构的 vps 服务器。

按照第二步的步骤，重新连接服务器 ip，登录成功后，在命令栏里粘贴以下代码：

> yum -y install wget
>
> wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh
>
> chmod +x bbr.sh
>
> ./bbr.sh

把上面整个代码复制后粘贴进去，不动的时候按回车，然后耐心等待，最后重启 vps 服务器即可。该方法是开机自动启动，部署一次就可以了。

如图：

![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](https://images2018.cnblogs.com/blog/1303944/201803/1303944-20180322102813580-2090832111.png)

 [![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](http://s1.sinaimg.cn/mw690/006DImMpzy7j6ZmZHCUf0&690)](http://photo.blog.sina.com.cn/showpic.html#blogid=16a9d1a610102xflz&url=http://album.sina.com.cn/pic/006DImMpzy7j6ZmZHCUf0)

出现上面这个图按回车

![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](https://images2018.cnblogs.com/blog/1303944/201803/1303944-20180322102854019-1473332982.png)

 [![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](http://s10.sinaimg.cn/mw690/006DImMpzy7j6ZnLkj749&690)](http://photo.blog.sina.com.cn/showpic.html#blogid=16a9d1a610102xflz&url=http://album.sina.com.cn/pic/006DImMpzy7j6ZnLkj749)

最后输入y重启服务器或者手动输入代码：reboot

------

### SSR 客户端下载：

windows 客户端：<https://nofile.io/f/6Jm7WJCyOVv/ShadowsocksR-4.7.0-win.7z>

安卓客户端 ：<https://nofile.io/f/GRWw7PbADrc>

ios 客户端：某宝上买一个美区 ID，然后去 App Store 下载下面这个软件，如图：

 [![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](http://s6.sinaimg.cn/mw690/006DImMpzy7j6ZoQibj45&690)](http://photo.blog.sina.com.cn/showpic.html#blogid=16a9d1a610102xflz&url=http://album.sina.com.cn/pic/006DImMpzy7j6ZoQibj45)

![搬瓦工后台取消了一键SS功能，最新搬瓦工手动搭建SSR教程](https://images2018.cnblogs.com/blog/1303944/201803/1303944-20180322103246578-1836907986.png)

好了，今天的教程就到这里，如有疑问可以在下面留言。



IP: 

password：QE4BZ2plMVp1
port：29846

++++++

IP：104.36.70.28

密码：ldyphcvlrv

port：5001