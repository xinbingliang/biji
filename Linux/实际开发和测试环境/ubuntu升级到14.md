# 阿里云服务器从Ubuntu 12.04升级到Ubuntu 14.04

阿里云的服务器是			Ubuntu 12.04根据			Canonical发布的支持路线图，可以看到2017年4月份之后就不再提供支持。因此很有升级导致			Ubuntu 14.04的必要，更别说很多软件在			Ubuntu 12.04上已经比较过时了。

​			Ubuntu LTS版本支持路线图如下图：

​			Ubuntu LTS版本支持路线图如下图：
![1_201204291858511OI60](http://www.mobibrw.com/wp-content/uploads/2016/04/1_201204291858511OI60.png)

升级的流程如下所示：(**执行下面操作之前，请务必先备份重要数据，阿里云服务器推荐使用自带的系统快照功能，非常好用**)

#### **1.首先保证当前系统上的软件都是最新的**

------

$sudo apt-get update$sudo apt-get dist-upgrade

| 12   | $sudo apt-get update$sudo apt-get dist-upgrade |
| ---- | ---------------------------------------- |
|      |                                          |

#### **2.安装系统升级模块**

------

$sudo apt-get install update-manager-core$sudo do-release-upgrade -d

| 12   | $sudo apt-get install update-manager-core$sudo do-release-upgrade -d |
| ---- | ---------------------------------------- |
|      |                                          |

![1-do-release-upgrade](http://www.mobibrw.com/wp-content/uploads/2016/04/1-do-release-upgrade.jpg)

#### **3.升级流程**

------

允许系统在升级期间开放

允许系统在升级期间开放
​			1022端口用来处理系统升级异常，当系统升级异常的时候，可以通过这个端口进行某些恢复操作。(**实际上没太大作用，出问题就快照回滚了，更快速安全方便**)

允许系统在升级期间开放
​			1022端口用来处理系统升级异常，当系统升级异常的时候，可以通过这个端口进行某些恢复操作。(**实际上没太大作用，出问题就快照回滚了，更快速安全方便**)
![2-ssh-port-query-yes](http://www.mobibrw.com/wp-content/uploads/2016/04/2-ssh-port-query-yes.jpg)

输入			y，点击回车(			Enter)。

![3-iptables-add-port-press-enter](http://www.mobibrw.com/wp-content/uploads/2016/04/3-iptables-add-port-press-enter.jpg)

点击回车(			Enter)，允许在			iptable上面开放			1022端口出来，这个端口在安装完成后会自动关闭，不需要过多关心。

![4-rewrite-sources-list-yes](http://www.mobibrw.com/wp-content/uploads/2016/04/4-rewrite-sources-list-yes.jpg)

允许升级程序更新			sources.list用来获取升级所需要的文件，输入			y，点击回车(			Enter)。

![5-upgrade-confirm](http://www.mobibrw.com/wp-content/uploads/2016/04/5-upgrade-confirm.jpg)

询问是否确认系统升级,输入			y，点击回车(			Enter)。

![6-disable-ssh-password-no](http://www.mobibrw.com/wp-content/uploads/2016/04/6-disable-ssh-password-no.jpg)

询问是否禁止			root用户通过			ssh访问系统，这个一定要选择			No，否则升级完成后，我们无法远程登陆系统。

![7-restart-services-without-asking-yes](http://www.mobibrw.com/wp-content/uploads/2016/04/7-restart-services-without-asking-yes.jpg)

询问在升级期间是否允许自动重启需要升级的服务，这个一定要选择			Yes，否则会不断的询问你是不是确定重启服务，非常麻烦。

![8-serurity-limits-conf-replace-enter](http://www.mobibrw.com/wp-content/uploads/2016/04/8-serurity-limits-conf-replace-enter.jpg)

询问是否用新系统的文件替换原系统的			/etc/security/limits.conf文件，直接回车(			Enter)，不允许替换，使用原系统的配置。

![9-etc-default-rcS-enter](http://www.mobibrw.com/wp-content/uploads/2016/04/9-etc-default-rcS-enter.jpg)

同上，直接回车(			Enter)。

![9-etc-default-rcS-enter](http://www.mobibrw.com/wp-content/uploads/2016/04/9-etc-default-rcS-enter.jpg)

同上，直接回车(			Enter)。

![10-etc-sysctl-conf-enter](http://www.mobibrw.com/wp-content/uploads/2016/04/10-etc-sysctl-conf-enter.jpg)

同上，直接回车(			Enter)。

![11-etc-vsftpd-conf-enter](http://www.mobibrw.com/wp-content/uploads/2016/04/11-etc-vsftpd-conf-enter.jpg)

同上，直接回车(			Enter)。

![12-etc-php5-fpm-php-fpm-conf-enter](http://www.mobibrw.com/wp-content/uploads/2016/04/12-etc-php5-fpm-php-fpm-conf-enter.jpg)

同上，直接回车(			Enter)。

![13-etc-php5-fpm-php-ini-enter](http://www.mobibrw.com/wp-content/uploads/2016/04/13-etc-php5-fpm-php-ini-enter.jpg)

询问是否替换文件，同上，直接回车(			Enter)，不允许替换。

![14-etc-php5-cgi-php-ini-enter](http://www.mobibrw.com/wp-content/uploads/2016/04/14-etc-php5-cgi-php-ini-enter.jpg)

同上，直接回车(			Enter)。

![15-etc-init-mounted-run-conf-enter](http://www.mobibrw.com/wp-content/uploads/2016/04/15-etc-init-mounted-run-conf-enter.jpg)

同上，直接回车(			Enter)。

![16-etc-apache2-mods-available-fcgid-conf-enter](http://www.mobibrw.com/wp-content/uploads/2016/04/16-etc-apache2-mods-available-fcgid-conf-enter.jpg)

同上，直接回车(			Enter)。

![17-etc-sv-git-daemon-run-enter](http://www.mobibrw.com/wp-content/uploads/2016/04/17-etc-sv-git-daemon-run-enter.jpg)

同上，直接回车(			Enter)。

![18-etc-default-tomcat7-enter](http://www.mobibrw.com/wp-content/uploads/2016/04/18-etc-default-tomcat7-enter.jpg)

同上，直接回车(			Enter)。

![19-upgrade-phpmyadmin-enter](http://www.mobibrw.com/wp-content/uploads/2016/04/19-upgrade-phpmyadmin-enter.jpg)

询问是否升级数据库，此处选择			Yes，回车(			Enter)。

![20-upgrade-phpmyadmin-password-enter](http://www.mobibrw.com/wp-content/uploads/2016/04/20-upgrade-phpmyadmin-password-enter.jpg)

输入数据库的密码，完成后点击回车(			Enter)。

![21-remove-obsolete-packages-yes](http://www.mobibrw.com/wp-content/uploads/2016/04/21-remove-obsolete-packages-yes.jpg)

询问是否删除不再使用的安装包，输入			y后点击回车(			Enter)。

![22-restart-required-yes](http://www.mobibrw.com/wp-content/uploads/2016/04/22-restart-required-yes.jpg)

升级完成，询问是否重启系统，输入			y后点击回车(			Enter)。系统会重启，远程连接会断开，需要稍等几分钟后重新连接服务器。

#### **3.恢复被修改后的系统配置信息**

------

安装			Apache2的			PHP扩展			libapache2-mod-php5,			Ubuntu 12.04版本的库，在升级的过程中被丢弃了，需要重新手动安装。

![23-after-restart-install-libapache2-mod-php5](http://www.mobibrw.com/wp-content/uploads/2016/04/23-after-restart-install-libapache2-mod-php5.jpg)

询问是否替换已经存在的			PHP配置文件，直接点击回车，不允许替换。

![24-after-restart-install-libapache2-mod-php5-php-ini-enter](http://www.mobibrw.com/wp-content/uploads/2016/04/24-after-restart-install-libapache2-mod-php5-php-ini-enter.jpg)

修改			Apache2的配置文件

$sudo vim /etc/apache2/apache2.conf

| 1    | $sudo vim /etc/apache2/apache2.conf |
| ---- | ----------------------------------- |
|      |                                     |

![25-after-restart-vim-apache2-conf](http://www.mobibrw.com/wp-content/uploads/2016/04/25-after-restart-vim-apache2-conf.jpg)

原有			Apache 2.2配置为：

Include sites-enabled/

| 1    | Include sites-enabled/ |
| ---- | ---------------------- |
|      |                        |

发现升级后变更为：

IncludeOptional sites-enabled/*.conf

| 1    | IncludeOptional sites-enabled/*.conf |
| ---- | ------------------------------------ |
|      |                                      |

导致			PHP无法正常工作，因此需要修改回来。

修改前:

修改前:
![26-after-restart-vim-apache2-conf-IncludeOptional](http://www.mobibrw.com/wp-content/uploads/2016/04/26-after-restart-vim-apache2-conf-IncludeOptional.jpg)

修改后：![27-after-restart-vim-apache2-conf-IncludeOptional-modify-complete](http://www.mobibrw.com/wp-content/uploads/2016/04/27-after-restart-vim-apache2-conf-IncludeOptional-modify-complete.jpg)

​			Apache 2.4修改了默认目录位置（这导致			2.2版本设置的禁止目录流量功能失效），并且默认开启了目录浏览功能，会导致潜在的安全问题，需要手工关闭.

修改前：![29-after-restart-apache2-disable-indexs](http://www.mobibrw.com/wp-content/uploads/2016/04/29-after-restart-apache2-disable-indexs.jpg)

修改后：![30-after-restart-apache2-disable-indexs-modify](http://www.mobibrw.com/wp-content/uploads/2016/04/30-after-restart-apache2-disable-indexs-modify.jpg)

重启			Apache2

$sudo service apache2 restart

| 1    | $sudo service apache2 restart |
| ---- | ----------------------------- |
|      |                               |

![28-after-restart-apache2-restart](http://www.mobibrw.com/wp-content/uploads/2016/04/28-after-restart-apache2-restart.jpg)

到此，整个系统升级完成，所有功能恢复正常。

**从升级的效果来看，服务器的响应明显变快，非常值得升级！**

http://www.mobibrw.com/2016/3789