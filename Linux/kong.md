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

### 使用docker安装

1. 创建网络

   ````
   docker network create kong-net
   ````

2. 创建数据存储环境

   * 使用cassandra

     ````
     docker run -d --name kong-database --network=kong-net -p 9042:9042 cassandra:3
     ````

   * 使用postgres

     ````
     docker run -d --name kong-database --network=kong-net -p 5432:5432 -e "POSTGRES_USER=kong" -e "POSTGRES_DB=kong" postgres
     ````

3. 使用临时容器进行数据迁移

   ````
   docker run --rm --network=kong-net -e "KONG_DATABASE=postgres" -e "KONG_PG_HOST=kong-database" -e "KONG_CASSANDRA_CONTACT_POINTS=kong-database" kong:latest kong migrations bootstrap
   ````

4. 启动

   ````
   docker run -d --name kong --network=kong-net -e "KONG_DATABASE=postgres" -e "KONG_PG_HOST=kong-database" -e "KONG_CASSANDRA_CONTACT_POINTS=kong-database" -e "KONG_PROXY_ACCESS_LOG=/dev/stdout" -e "KONG_ADMIN_ACCESS_LOG=/dev/stdout" -e "KONG_PROXY_ERROR_LOG=/dev/stderr" -e "KONG_ADMIN_ERROR_LOG=/dev/stderr" -e "KONG_ADMIN_LISTEN=0.0.0.0:8001, 0.0.0.0:8444 ssl" -p 8000:8000 -p 8443:8443 -p 8001:8001 -p 8444:8444 kong:latest
   ````

5. 查看运行状况

   ````
   http://192.168.2.37:8001/
   ````


## 一个基本案例

1. 创建服务

   ````
   curl --url http://localhost:8001/services/ --data 'name=xin-service2' --data "retries=3" --data "protocol=http" --data "host=192.168.232.179" --data "port=80" --data "connect_timeout=70000" --data "path=/1.html"
   ````

2. 添加路由

   ````
   curl -i -X POST http://localhost:8001/services/xin-service2/routes --data "name=1"  --data "paths=/1.html"
   ````

3. 测试

   ````

   ````

   ​







1. <https://github.com/qianyugang/kong-docs-cn>









