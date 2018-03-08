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

**Limit**

* 方法limit()：用于读取指定数量的文档，NUMBER表示要获取文档的条数

  ```
  db.user.find().limit(2)
  ```

**skip**

* 方法skip()：用于跳过指定数量的文档

  ```
  db.stu.find().skip(2)
  ```

**一起使用**

````
for(i=0;i<15;i++){db.t1.insert({_id:i})}

db.stu.find().limit(4).skip(5)
或
db.stu.find().skip(5).limit(4)
````

#### 投影

* 设置为1显示，设置为0不显示

```
db.user.find({},{name:1, gender:1})
db.user.find({},{_id:0, name:1, gender:1})
```

#### 排序

* 1为升序，-1 为降序

```
db.stu.find().sort({gender:-1,age:1}) # 根据性别降序，再根据年龄升序
```

#### 统计个数

* `db.集合名称.find({条件}).count()`
* `db.集合名称.count({条件})`

```
db.stu.find({gender:1}).count()
db.stu.count({age:{$gt:20},gender:1})
```

#### 消除重复

* `db.集合名称.distinct('去重字段',{条件})`方法distinct()对数据进行去重

```
db.stu.distinct('gender',{age:{$gt:18}}) # 即对盖字段类型数据，在此范围内只有两种结果
```

##高级操作

###聚合

* `db.集合名称.aggregate([{管道:{表达式}}])`主要用于计算数据，类似sql中的sum()、avg()

#### 管道

- `$group`：将集合中的文档分组，可用于统计结果
- `$match`：过滤数据，只输出符合条件的文档
- `$project`：修改输入文档的结构，如重命名、增加、删除字段、创建计算结果
- `$sort`：将输入文档排序后输出
- `$limit`：限制聚合管道返回的文档数
- `$skip`：跳过指定数量的文档，并返回余下的文档
- `$unwind`：将数组类型的字段进行拆分

####表达式

- `$sum`：计算总和，$sum:1同count表示计数
- `$avg`：计算平均值
- `$min`：获取最小值
- `$max`：获取最大值
- `$push`：在结果文档中插入值到一个数组中
- `$first`：根据资源文档的排序获取第一个文档数据
- `$last`：根据资源文档的排序获取最后一个文档数据

#### $group

- 将集合中的文档分组，可用于统计结果，_id表示分组的依据，使用某个字段的格式为'$字段'

  ````
  # 统计男生、女生的总人数
  db.stu.aggregate([
      {$group:
          {
              _id:'$gender',
              counter:{$sum:1}
          }
      }
  ])
  ````

  ````
  # 将集合中所有文档分为一组，求学生总人数、平均年龄
  db.stu.aggregate([
      {$group:
          {
              _id:null,
              counter:{$sum:1},
              avgAge:{$avg:'$age'}
          }
      }
  ])
  ````

  ```
  # 统计学生性别及学生姓名
  db.stu.aggregate([
      {$group:
          {
              _id:'$gender',
              name:{$push:'$name'}
          }
      }
  ])
  ```

  ```
  # 使用$$ROOT可以将文档内容加入到结果集的数组中
  db.user.aggregate([
     {$group: {_id: "$gender", counter: {$push: '$$ROOT'}}}
  ])
  ```

#### $match

用于过滤数据，只输出符合条件的文档

````
# 查询年龄大于20的学生
db.stu.aggregate([
    {$match:{age:{$gt:20}}}
])
````

```
# 查询年龄大于20的男生、女生人数
db.stu.aggregate([
    {$match:{age:{$gt:20}}}, # 管道1
    {$group:{_id:'$gender',counter:{$sum:1}}} # 管道2
]) 
```

#### project

修改输入文档的结构，如重命名、增加、删除字段、创建计算结果。筛选出指定的字段

````
db.stu.aggregate([
    {$project:{_id:0,name:1,age:1}}
])
````

```
db.stu.aggregate([
    {$group:{_id:'$gender',counter:{$sum:1}}},
    {$project:{_id:0,counter:1}}
])
```

#### $sort

将输入文档排序后输出

```
# 查询学生信息，按年龄升序
db.stu.aggregate([{$sort:{age:1}}])
```

````
# 查询男生、女生人数，按人数降序
db.stu.aggregate([
    {$group:{_id:'$gender',counter:{$sum:1}}},
    {$sort:{counter:-1}}
])
````

#### `$limit`、$skip

```
db.stu.aggregate([{$limit:2}])

db.stu.aggregate([
    {$group:{_id:'$gender',counter:{$sum:1}}},
    {$sort:{counter:1}},
    {$skip:1},
    {$limit:1}
])
```

#### $unwind

```
db.t2.insert({_id:1,item:'t-shirt',size:['S','M','L']})
db.t2.aggregate([{$unwind:'$size'}]) # 发现对于空数组、无字段、null的文档，都被丢弃了
```

````
db.t3.aggregate([{$unwind:{path:'$sizes',preserveNullAndEmptyArrays:true}}]) # 保留空数组、无字段、null的文档

db.t3.aggregate([
{$group: {_id:'$gender', counter:{$sum:1}, docs: {$push:'$$ROOT'}}},
{$project: {_id:0, counter:1, docs:1}},
{$unwind: {$path: '$docs', preserveNullAndEmptyArrays:true}}
])
````

### 索引

1. 创建大量数据

   ```javascript
   for(i=1;1<100000;i++){
       db.t1.insert({name: 'test'+i, age: i})
   }
   ```

2. 数据查找性能分析

   * `db.t1.find({name: 'test10000'}).explain('executionStats')` 性能分析，executionStats表示整体查询时间,单位是毫秒

3. 建立索引

   * `db.集合.ensureIndex((属性:1))` 1表示升序，-1表示降序

4. 对索引后性能分析

5. 索引的命令

   * `db.t1.ensureIndex({"name":1},{"unique": true})` 建立唯一索引，实现唯一约束
   * `db.t1.ensureIndex({name:1, age:1})` 联合索引，对多个属性建立一个索引,按照find()出现的顺序
   * `db.t1.getIndexs()` 查看文档所有索引
   * `db.t1.dropIndexs('索引名称')` 删除索引 

### 安全性

####超级管理员

* 为了更安全的访问mongodb，需要访问者提供用户名和密码，于是需要在mongodb中创建用户

* 采用了角色-用户-数据库的安全管理方式

* 常用系统角色如下：

  - root：只在admin数据库中可用，超级账号，超级权限
  - Read：允许用户读取指定数据库
  - readWrite：允许用户读写指定数据库

* 创建超级管理用户

  ```
  use admin
  db.createUser({
      user:'admin',
      pwd:'123',
      roles:[{role:'root',db:'admin'}] # db指可操作的数据库
  })
  ```

#### 启用安全认证

* 以上操作还不会进行安全认证

* `sudo vi /etc/mongod.conf`

  ```
  security:
    authorization: enabled
  ```

* `sudo service mongod start`重启服务

* ` mongo -u 'admin' -p '123' --authenticationDatabase 'admin'` 连接到数据库，必须指定要连接的数据库

#### 普通用户管理

* 查看当前数据库的用户

  ```
  use test1
  show users
  ```

* 创建普通用户

  ```
  db.createUser({
      user:'t1',
      pwd:'123',
      roles:[{role:'readWrite',db:'test1'}]
  })
  ```

* 终端连接

  ```
  mongo -u t1 -p 123 --authenticationDatabase test1
  ```

* 修改用户：可以修改pwd、roles属性

  ```
  db.updateUser('t1',{pwd:'456'})
  ```

### 集群



### 备份和恢复



##PY交互





