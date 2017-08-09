# LNMP环境搭建

## Nginx安装

* `sudo apt-get install nginx`
* `service nginx start`    `/etc/init.d/nginx restart`
* 用浏览器访问`http://localhost`

### 配置

* `vim /etc/nginx/sites-available/default`

```
#PHP5的配置
#location ~ \.php$ {
#       root /usr/share/nginx/html;
#       fastcgi_split_path_info ^(.+\.php)(/.+)$;

#       fastcgi_pass unix:/var/run/php5-fpm.sock;
#       fastcgi_index index.php;
#       fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
#       include fastcgi_params;
#}

#PHP7的配置
location ~ \.php$ {
       include snippets/fastcgi-php.conf;
       # With php7.0-cgi alone:
       #fastcgi_pass 127.0.0.1:9000;
       # With php7.0-fpm:
       fastcgi_pass unix:/run/php/php7.0-fpm.sock;
}
```

PHP-FPM 与 Nginx 通信方式有两种，一种是TCP方式，一种是unix socket 方式。Unix domain socket 可以使同一台操作系统上的两个或多个进程进行数据通信。Unix domain sockets 的接口和 Internet socket 很像，但它不使用网络底层协议来通信。服务器压力不大的情况下，tcp 和 socket 差别不大，但在压力比较满的时候，用套接字方式，效果确实比较好。

### 配置测试

* `service nginx -t` 测试配置文件
* `service nginx reload` 重读配置文件

## Mysql安装

* `apt-get install mysql-server`

* `apt-get install mysql-client`

* `vim /etc/mysql/my.cnf`

  ```
  #将 bind-address = 127.0.0.1 注释掉
  bind-address = 127.0.0.1
  ```

## PHP安装

* `apt-get install php7.0-cli`
* `apt-get install php7.0-fpm`
* `apt-get install php7.0-mysql`
* `service php7.0-fpm start`

