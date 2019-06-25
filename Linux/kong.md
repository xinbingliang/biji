# kong

## 安装和启动

### 安装

```shell
 $ sudo apt-get update
 $ sudo apt-get install openssl libpcre3 procps perl
 $ sudo dpkg -i kong-1.2.0.*.deb
```

### 启动

#### 没有数据库

- `kong config init`  生成`kong.yml`

- 配置`kong.conf`

  ```
   database = off
   declarative_config = /path/to/kong.yml
  ```

- 启动

  ```
  kong start [-c /path/to/kong.conf]
  ```


### 安装Postgresql

[官网安装教程](https://www.postgresql.org/download/linux/ubuntu/)

* `apt-get install postgresql-10`

## kong数据库配置

* `psql` `\q`退出提示

  ````
  postgres=# CREATE USER kong; CREATE DATABASE kong OWNER kong;
  postgres=# ALTER USER kong WITH PASSWORD 'password you set';
  ````

* 配置文件增加配置

  ````
  g_user = kong 
  pg_password = password you set 
  pg_database = kong
  ````

* 进行迁移准备

  * `kong migrations bootstrap`

* 进行迁移

  * `sudo kong start -c kong.conf`