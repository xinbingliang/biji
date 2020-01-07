# flask部署

## 不使用docker

### 1. 安装必要包

`````
pip install gunicorn gevent
`````

* 若存在加密库找不到，请安装`pycryptodome`

### 2. 构建必要配置文件

`````
# gunicorn.conf.py
workers = 5 # 定义同时开启的处理请求的进程数量，根据网站流量适当调整
worker_class = "gevent" # 采用gevent库，支持异步处理请求，提高吞吐量
bind = "0.0.0.0:5000" # 监听IP放宽，以便于Docker之间、Docker和宿主机之间的通信
`````

### 3.测试运行

````
gunicorn app:app -c gunicorn.conf.py
````

## 使用docker

### 1. 包文件

````
# piplist.txt
.....
gunicorn
gevent
pycryptodome
````

### 2.编写dockerfile

`````
FROM python:3.6

LABEL maintainer="xinbingliang@gmail.com"
LABEL version="0.0.1"
LABEL description=""

COPY ./ /code/
WORKDIR /code

RUN pip install -r piplist -i https://mirrors.aliyun.com/pypi/simple/

EXPOSE 5000

ENTRYPOINT ["gunicorn", "app:app", "-c", "./gunicorn.conf.py"]
`````

### 3. 构建

````
docker build -t testflask:0.1 .
````

### 4. 测试

`````
docker run -it --rm -p 8888:8888 testflask:0.1
`````

## 安装数据库

`````
docker run --name bank-mysql -v /var/www/bank/data:/data -e MYSQL_ROOT_PASSWORD=root -e TZ=Asia/Shanghai -p 3307:3306 -d  mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci  --default-time_zone='+8:00'
`````

````
docker run --name changle-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=changle@1999 -e MYSQL_DATABASE=changle -e TZ=Asia/Shanghai -v  ./data:/data/ -d mysql:5.6 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --default-time_zone='+8:00'
````

`````
create database xin charset='utf8mb4';
`````

`````
mysql -uroot -P3308 -h192.168.2.23 -p bank < branch.sql
`````

## 整合到nginx

````
server {
	listen 80;

	server_name xin.cloudcpc.com; 

	location /static {
    		alias /var/www/xin.cloudcpc.com/static/;
	}

	location / {
        	proxy_pass http://127.0.0.1:5001; 
        	proxy_set_header Host $host; 
	}

}
````


