# 命令集合

## docker

### 镜像加速器

````
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://x2fvikf9.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
````

### 容器总是自动启动

```
docker container update --restart=always 容器名称
```

## 数据库相关

### ubuntu修改密码

```
select User,plugin,authentication_string,Host from user;
update mysql.user set authentication_string=password('root') where user='root' and Host ='localhost';
update user set plugin="mysql_native_password";
flush privileges;
quit;
GRANT ALL PRIVILEGES ON *.* TO 'xin'@'%' IDENTIFIED BY '1ahNQ7US' WITH GRANT OPTION;
```

### 取消外键约束控制

```
SET foreign_key_checks = 0;
```

### 导出部分数据

```
select user.name as "姓名", user.phone as "手机号", user.organization as "组织名", paper_answer.time as "答题用时", paper_answer.score as "得分"  from paper_answer left join user on paper_answer.uid=user.id where paper_answer.paper_id=13 into outfile "/var/lib/mysql-files/answer_2020_11_02.xls";
select id, _c_time, name, phone, organization from user where id=4 into outfile "/var/lib/mysql-files/user_2020_11_02.xls";
```

### docker启动的数据库操作

#### 启动docker数据库

```
docker run --name mysql-server -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql:5.7 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```

#### docker启动数据库的数据操作

````
# mysql数据存放位置
cd /var/lib/mysql
mysqldump -u root party_learn -p > party_learn.sql;
CREATE DATABASE mic_user CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

source /var/lib/mysql/point_11-20.sql

truncate table table_name;  # 清空数据表
````

## wsgi

````
pstree -ap|grep gunicorn
gunicorn index:app -c gunicorn.conf.py
````

## proto

### python

````
pipenv install grpclib
pipenv install grpcio
pipenv install grpcio-tools
````

一般生成

- `python -m grpc_tools.protoc --python_out=. --grpc_python_out=. -I. *.proto`

asyncio生成

- `python -m grpc_tools.protoc --python_out=. --grpclib_python_out=. -I. *.proto`

### go

```
docker pull znly/protoc
```

生成

- `docker run --rm -v \$(pwd):\$(pwd) -w \$(pwd) znly/protoc -I. --go_out=plugins=grpc:. *.proto`

## pipenv

避免windows下的问题

````
pip3 install pipenv==2018.10.13
````

