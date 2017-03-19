# ubuntu上完全卸载LAMP

## 卸载删除mysql

* `apt-get autoremove --purge mysql-server-5.0`
* `apt-get remove mysql-server`
* `apt-get autoremove mysql-server`
* `apt-get remove mysql-common` (非常重要)

**清理残留数据**

* `dpkg -l |grep ^rc|awk '{print $2}' |sudo xargs dpkg -P`
* `find /etc -name "*mysql*" |xargs  rm -rf ` 

**检查是否干净**

* `dpkg -l | grep mysql`

## 卸载Apache

* `apt-get --purge remove apache-common`
* `apt-get --purge remove apache`

**找到配置清除掉**

* `find /etc -name "*apache*" |xargs  rm -rf`
* `rm -rf /var/www`
* `rm -rf /etc/libapache2-mod-jk`
* `rm -rf /etc/init.d/apache2`
* `rm -rf /etc/apache2`

**删除关联**

* `dpkg -l |grep apache2|awk '{print $2}'|xargs dpkg -P`

**删除SVN**

* `apt-get remove subversion`
* `apt-get remove libapache2-svn`

**检测**

* `dpkg -l | grep apache`
* `dpkg -l | grep apache2`

## 卸载PHP

* `apt-get -–purge remove libapache2-mod-php5`
* `apt-get –-purge remove php5`
* `apt-get –-purge remove php5-gd`
* `apt-get --purge remove php5-mysql`

**删除关联**

* `find /etc -name "*php*" |xargs  rm -rf`

**清除残余**

* `dpkg -l |grep ^rc|awk ’{print $2}’ |sudo xargs dpkg -P`

**检测**

* `dpkg -l | grep php`
* `dpkg -l | grep php5`

