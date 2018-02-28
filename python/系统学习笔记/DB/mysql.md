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

##创建表

* `select version();` 查看数据库版本
* `select now();` 查看当前时间
* `create database 数据库 charset=utf-8;` 创建数据库 
* `drop database 数据库名;` 删除数据库
* `use 数据库名;` 切换数据
* `select database();` 参看当前选择的数据库

## 增加、修改、删除



## 备份恢复













