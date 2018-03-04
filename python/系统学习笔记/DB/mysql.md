# Mysql

## ER模型、三范式

###ER模型

* E 表示entry，实体
* R 表示relationship 关系
* 一个实体转化为数据库中的一个表
* 关系描述两个实体之间的对应规则
  * 一对一
  * 一对多
  * 多对多

### 三范式

* 第一范式（1NF）：列不可拆分
* 第二范式（2NF）：唯一标识
* 第三范式（3NF）：引用主键

 ## 完整性

### 字段类型

* 数字：`int`、`decimal`
  * `decimal(5, 2)` 其中5位数，2位小数
* 字符串：`char`、`varchar`、`text`
  * 指定的是字符数，不是字节数
  * `char(8)`和`varchar(8)`的区别是前者位数不够会以空格填充，后者不会
* 日期：`datetime`
* 布尔：`bit` 常用户存0, 1
  * bit(3)可以形成`000`， `001`，`010`

### 约束

* 主键：`primary key` 不重复，根据此会很快，只有一个，物理维护以此
* 非空：`not null` 
* 唯一： `unique` 数据不重复
* 默认：default
* 外键：foreign key 

##逻辑删除

* 一般重要数据设置一个is_delete的列，类型为bit，表示逻辑删除

##创建库和表

* `select version();` 查看数据库版本

* `select now();` 查看当前时间

* `create database 数据库 charset=utf8;` 创建数据库 

* `drop database 数据库名;` 删除数据库

* `use 数据库名;` 切换数据

* `select database();` 参看当前选择的数据库

* 创建表

  ````sql
  create table 表名称 (列及类型) ;
  create table students(
  	id int auto_increment primary key, 
  	sname varchar(10) not null
  );
  ````

* 修改表

  ````
  alter table 表名 add|change|drop 列名 类型;
  alter table students add birthday datetime;
  ````

* 查询表结构

  ```
  desc students;
  ```

* 删除表

  ```
  drop table 表名;
  ```

* 更改表名称

  ```
  rename table 原表名 to 新表名;
  ```

* 查看表的创建语句

  ````
  show create table 表名;
  ````

## 增加、修改、删除

* 查询

  ````
  select *  from 表名
  ````

* 增加

  ````
  全列插入：insert into 表名 values(...)
  缺省插入：insert into 表名
  同时插入多条数据： insert into 表名 values(...),(...);
  或insert into 表名(列1， ...) values (值1, ...),(值1， ...);
  ````

* 修改

  ```
  update 表名 set 列1=值1，....where 条件
  update subject set isdelete where title in ('linux', 'redis')
  ```

* 删除

  ```
  delete from 表名 where 条件
  ```



## 备份恢复

### 数据备份

1. 进入超级管理员

   ```
   sudo -s
   ```

2. 进入`mysql`库目录

   ```
   cd /var/lib/mysql
   ```

3. 运行`mysqldump`命令

   ```
   mysqldump -u root -p 数据库名称 > ~/mysql/back.sql
   ```

### 数据恢复

```
mysql -u root -p py31 < ~/mysql/back.sql
```

## 查询

### 消除重复的行

* `select distinct gender from student;`消除重复的行


### 模糊查询

* `like` 
* % 表示任意多个任意字符
* _ 表示任意一个字符

### 范围查询

* in 表示在一个非连续的范围
* `between ... and ...` 表示一个连续的范围
  * `select * from student where id between 3 and 8` 查询数据在3到8之间

### 空判断

* null和''不同
* `is null`判断空
* `is not null` 判断不为空

### 聚合

* `count(*)` 计算总行数
* `max(列)` 表示列最大值
* `min(列)` 表示列最小值
* `sum(列)` 求列和
* `avg(列)` 平均值

### 分组

* `select 列1，列2，列3 聚合.... from 表名 group by 列1， 列2,....` 分组条件可以出现在结果集中
  * `select gender as 性别，count(*) from students group by gender;` 查询男女生人数
* `select 列1， 列2， 聚合... from 表名 group by 列1， 列2，列3... having 列1，...聚合.. ` 分组后的筛选结果集
  * `select gender,count(*) from students group by gender having count(*) > 0;`

### 排序

* `select * from 表名 order by 列1 asc|desc, 列2 asc|desc` `asc`小到大，`desc`大到小

### 分页

* `select * from 表名 limit start, count` start 指开始从0记录，count指记录数

##高级

### 关系表

* 外键约束，会检查数据有效性
* 级联操作
  * `restrict(限制)` 默认值，抛出异常
  * `cascade(级联)` 如果主表记录删除，则从表中相关联的记录都将被删除
  * `set null`  将外键设置为空
  * `no action` 什么都不做

### 连接查询

* `select syudents.name,subjects.title,scores.score from scores inner join students on scores.stuid = students.id inner subjects on scores.subid = subjects.id;` 
* `inner join` 都有的才会出现 
* `left join`左表中的都会出现
* `right join` 右边中的都会出现

### 自关联

* 外键关联到自身某个字段

### 视图

* `create view students as select students.*, scores.score from scores inner join students on  scores.stuid = students.id;` 
* `create view v_stu_so as select syudents.name,subjects.title,scores.score from scores inner join students on scores.stuid = students.id inner subjects on scores.subid = subjects.id;`
* `select * from v_stu_so`

### 事务

* `begin` 开始事务
* `update students set name='小郭' where id=1`
* `commit`
* `rollback` 回滚

### 索引

* `set profilling=1` 设置语句时间查询
* `show profiles` 查看上条语句执行时间
* `show index from areas` 查看索引

##python使用mysql

### 安装和引入模块

* `sudo apt-get install python-mysqldb`
* ​




















