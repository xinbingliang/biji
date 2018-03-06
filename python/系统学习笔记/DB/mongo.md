# mongo

##环境

###安装

* `tar -zxvf mongodb-linux-x86_64-ubuntu1604-3.4.0.tgz` 解压
* `sudo mv -r mongodb-linux-x86_64-ubuntu1604-3.4.0/ /usr/local/mongodb` 移动到/usr/local/目录下
* `export PATH=/usr/local/mongodb/bin:$PATH` 将可执行文件添加到PATH路径中
* `robomongo` 图形化界面

### 管理mongo

* 配置文件在`/etc/mongod.conf`
* 默认端口`27017`
* `mongod` 服务端
* `sudo service mongod start` 启动
* `sudo service mongod stop` 停止
* `mongo`使用终端连接

## 基本

* 数据库
* 集合就是关系数据库中的表
* 文档对应着关系数据库中的行
* 文档，就是一个对象，由键值对构成，是`json`的扩展`Bson`形式
* 数据库：是一个集合的物理容器，一个数据库中可以包含多个文档

### 增删改

* `db` 显示当前正在使用的数据库

* `show dbs;` 显示所有数据库

* `db.dropDatabase()` 删除数据库

* `db.createCollection(name, options)` 创建集合

  * name是要创建的集合的名称
  * options是一个文档，用于指定集合的配置
    * 参数capped：默认值为false表示不设置上限，值为true表示设置上限
    * 参数size：当capped值为true时，需要指定此参数，表示上限大小，当文档达到上限时，会将之前的数据覆盖，单位为字节

* `show collections` 显示集合

* `db.集合名称.drop()` 删除集合

* `db.集合名称.insert()` 插入一条记录，若集合不存在就创建

* `db.集合名称.find()` 查找数据

* `db.集合名称.update(<query>, <update>, {multi: <bollean>})`

  * 参数query:查询条件，类似sql语句update中where部分
  * 参数update:更新操作符，类似sql语句update中set部分
  * 参数multi:可选，默认是false，表示只更新找到的第一条记录，值为true表示把满足条件的文档全部更新

  ```json
  db.stu.update({"name": "辛丙亮"}, {"name": "郭杰"}); # 全文档更新
  db.stu.update({"name": "郭杰"}, {$set:{name:"123"}}); # 更新指定的属性
  db.stu.update({},{$set:{gender:0}},{multi:true}) # 修改所有匹配到的数据
  ```

* `db.集合名称.save(document)`如果文档的_id已经存在则修改，如果文档的_id不存在则添加

  ```json
  db.stu.save({_id:'20160102','name':'yk',gender:1})
  ```

* `db.集合名称.remove(<query>, {justOne: <boolean>})` 删除

  * 参数query:可选，删除的文档的条件
  * 参数justOne:可选，如果设为true或1，则只删除一条，默认false，表示删除多条

#### size

* `db.createCollection("sub", {capped: true, size:10})` 大小超过后会覆盖原有的内容

#### 数据类型

- Object ID：文档ID是一个12字节的十六进制数
  - 前4个字节为当前时间戳
  - 接下来3个字节的机器ID
  - 接下来的2个字节中MongoDB的服务进程id
  - 最后3个字节是简单的增量值
- String：字符串，最常用，必须是有效的UTF-8
- Boolean：存储一个布尔值，true或false
- Integer：整数可以是32位或64位，这取决于服务器
- Double：存储浮点值
- Arrays：数组或列表，多个值存储到一个键
- Object：用于嵌入式的文档，即一个值为一个文档
- Null：存储Null值
- Timestamp：时间戳
- Date：存储当前日期或时间的UNIX时间格式

### 查询

####基本查询

* `db.集合名称.find({条件文档})`查询
* `db.集合名称.findOne({条件文档})`查询，只返回第一个
* `db.集合名称.find({条件文档}).pretty()` 将结果格式化

**运算符** 

- 等于，默认是等于判断，没有运算符
- 小于$lt
- 小于或等于$lte
- 大于$gt
- 大于或等于$gte
- 不等于$ne

```
db.stu.find({age:{$gte:18}})
```

**逻辑运算符**

- 逻辑与：默认是逻辑与的关系

  `````
  db.stu.find({age:{$gte:18},gender:1}) # 查询年龄大于或等于18，并且性别为1的学生
  `````

- 逻辑或：使用$or

  ```
  db.stu.find({$or:[{age:{$gt:18}},{gender:1}]}) # 查询年龄大于18，或性别为0的学生
  ```

- and和or一起使用

  ````
  db.stu.find({$or:[{age:{$gte:18}},{gender:1}],name:'gj'}) # 查询年龄大于18或性别为0的学生，并且学生的姓名为gj
  ````

**范围运算符**

* 使用"$in"，"$nin" 判断是否在某个范围内

  ````
  db.stu.find({age:{$in:[18,28]}}) # 查询年龄为18、28的学生
  ````

**支持正则表达式**

* 使用//或$regex编写正则表达式

  ```
  db.stu.find({name:/^黄/}) # 查询姓黄的学生
  db.stu.find({name:{$regex:'^黄'}}})
  ```

#### 自定义查询

* 使用$where后面写一个函数，返回满足条件的数据

  ````
  db.stu.find({$where:function(){return this.age>20}}) # 查询年龄大于30的学生
  ````

#### limit与Skip



#### 投影



#### 排序



#### 统计个数



#### 消除重复



##高级

###聚合

### 索引

### 安全性

### 集群

### 备份和恢复

##PY交互





