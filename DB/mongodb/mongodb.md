## 概念对照

|    mysql    |   mongodb   |          解释说明           |
| :---------: | :---------: | :---------------------: |
|  database   |  database   |           数据库           |
|    table    | collection  |         数据库表/集合         |
|     row     |  document   |        数据记录行/文档         |
|   column    |    field    |         数据字段/域          |
|    index    |    index    |           索引            |
| table joins |             |     表连接,MongoDB不支持      |
| primary key | primary key | 主键,MongoDB自动将_id字段设置为主键 |

## MongoDB 数据类型

|        数据类型        |                    描述                    |
| :----------------: | :--------------------------------------: |
|       String       | 字符串。存储数据常用的数据类型。在 MongoDB 中，UTF-8 编码的字符串才是合法的。 |
|      Integer       |  整型数值。用于存储数值。根据你所采用的服务器，可分为 32 位或 64 位。  |
|      Boolean       |            布尔值。用于存储布尔值（真/假）。             |
|       Double       |             双精度浮点值。用于存储浮点值。              |
|    Min/Max keys    |   将一个值与 BSON（二进制的 JSON）元素的最低值和最高值相对比。    |
|       Array        |           用于将数组或列表或多个值存储为一个键。            |
|     Timestamp      |           时间戳。记录文档修改或添加的具体时间。            |
|       Object       |                 用于内嵌文档。                  |
|        Null        |                 用于创建空值。                  |
|       Symbol       | 符号。该数据类型基本上等同于字符串类型，但不同的是，它一般用于采用特殊符号类型的语言。 |
|        Date        | 日期时间。用 UNIX 时间格式来存储当前日期或时间。你可以指定自己的日期时间：创建 Date 对象，传入年月日信息。 |
|     Object ID      |            对象 ID。用于创建文档的 ID。             |
|    Binary Data     |             二进制数据。用于存储二进制数据。             |
|        Code        |       代码类型。用于在文档中存储 JavaScript 代码。       |
| Regular expression |            正则表达式类型。用于存储正则表达式。            |

## 连接

```
mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
```

- **mongodb://** 这是固定的格式，必须要指定。
- **username:password@** 可选项，如果设置，在连接数据库服务器之后，驱动都会尝试登陆这个数据库
- **host1** 必须的指定至少一个host, host1 是这个URI唯一要填写的。它指定了要连接服务器的地址。如果要连接复制集，请指定多个主机地址。
- **portX** 可选的指定端口，如果不填，默认为27017
- **/database **如果指定username:password@，连接并验证登陆指定数据库。若不指定，默认打开 test 数据库。
- **?options** 是连接选项。如果不使用/database，则前面需要加上/。所有连接选项都是键值对name=value，键值对之间通过&或;（分号）隔开

## 创建数据库

```
> use runoob
switched to db runoob
> db
runoob
```

## 删除数据库

````
> use runoob
switched to db runoob
> db.dropDatabase()
{ "dropped" : "runoob", "ok" : 1 }
````

## 创建集合

集合可以直接使用，不用提前创建

```
db.createCollection(name, options)
```

## 删除集合

```
db.collection.drop()
>db.mycol2.drop()
true
>
```

## 文档插入

````
db.COLLECTION_NAME.insert(document)
````

## 文档更新

````
db.collection.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>
   }
)
````

- **query **: update的查询条件，类似sql update查询内where后面的。
- **update **: update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
- **upsert **: 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
- **multi **: 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
- **writeConcern **:可选，抛出异常的级别。

`````
>db.col.insert({
    title: 'MongoDB 教程', 
    description: 'MongoDB 是一个 Nosql 数据库',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['mongodb', 'database', 'NoSQL'],
    likes: 100
})
>db.col.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })   # 输出信息
> db.col.find().pretty()
{
        "_id" : ObjectId("56064f89ade2f21f36b03136"),
        "title" : "MongoDB",
        "description" : "MongoDB 是一个 Nosql 数据库",
        "by" : "菜鸟教程",
        "url" : "http://www.runoob.com",
        "tags" : [
                "mongodb",
                "database",
                "NoSQL"
        ],
        "likes" : 100
}
>
`````

```
db.collection.save(
   <document>,
   {
     writeConcern: <document>
   }
)
```

- **document **: 文档数据。
- **writeConcern **:可选，抛出异常的级别。

```
>db.col.save({
    "_id" : ObjectId("56064f89ade2f21f36b03136"),
    "title" : "MongoDB",
    "description" : "MongoDB 是一个 Nosql 数据库",
    "by" : "Runoob",
    "url" : "http://www.runoob.com",
    "tags" : [
            "mongodb",
            "NoSQL"
    ],
    "likes" : 110
})
```

## 删除文档

````
db.collection.remove(
   <query>,
   {
     justOne: <boolean>,
     writeConcern: <document>
   }
)
````

- **query **:（可选）删除的文档的条件。
- **justOne **: （可选）如果设为 true 或 1，则只删除一个文档。
- **writeConcern **:（可选）抛出异常的级别。

````
>db.col.remove({'title':'MongoDB 教程'})
WriteResult({ "nRemoved" : 2 })           # 删除了两条数据
>db.col.remove({})
>db.col.find() # 删除所有数据


>db.COLLECTION_NAME.remove(DELETION_CRITERIA,1) # 删除第一条找到的记录
````

## 文档查询

```
db.collection.find(query, projection)

>db.col.find().pretty()
```

- **query** ：可选，使用查询操作符指定查询条件
- **projection** ：可选，使用投影操作符指定返回的键。查询时返回文档中所有键值， 只需省略该参数即可（默认省略）。

````
> db.col.find().pretty()
{
        "_id" : ObjectId("56063f17ade2f21f36b03133"),
        "title" : "MongoDB 教程",
        "description" : "MongoDB 是一个 Nosql 数据库",
        "by" : "菜鸟教程",
        "url" : "http://www.runoob.com",
        "tags" : [
                "mongodb",
                "database",
                "NoSQL"
        ],
        "likes" : 100
}
````

|  操作   |            格式            |                    范例                    |     RDBMS中的类似语句     |
| :---: | :----------------------: | :--------------------------------------: | :-----------------: |
|  等于   |    `{<key>:<value>`}     |  `db.col.find({"by":"菜鸟教程"}).pretty()`   | `where by = '菜鸟教程'` |
|  小于   | `{<key>:{$lt:<value>}}`  | `db.col.find({"likes":{$lt:50}}).pretty()` | `where likes < 50`  |
| 小于或等于 | `{<key>:{$lte:<value>}}` | `db.col.find({"likes":{$lte:50}}).pretty()` | `where likes <= 50` |
|  大于   | `{<key>:{$gt:<value>}}`  | `db.col.find({"likes":{$gt:50}}).pretty()` | `where likes > 50`  |
| 大于或等于 | `{<key>:{$gte:<value>}}` | `db.col.find({"likes":{$gte:50}}).pretty()` | `where likes >= 50` |
|  不等于  | `{<key>:{$ne:<value>}}`  | `db.col.find({"likes":{$ne:50}}).pretty()` | `where likes != 50` |

### AND条件

````
>db.col.find({key1:value1, key2:value2}).pretty()
> db.col.find({"by":"菜鸟教程", "title":"MongoDB 教程"}).pretty()
````

### OR条件

```
>db.col.find(
   {
      $or: [
         {key1: value1}, {key2:value2}
      ]
   }
).pretty()

>db.col.find({$or:[{"by":"菜鸟教程"},{"title": "MongoDB 教程"}]}).pretty()
```

### AND 和 OR 联合使用

````
>db.col.find({"likes": {$gt:50}, $or: [{"by": "菜鸟教程"},{"title": "MongoDB 教程"}]}).pretty()
# where likes>50 AND (by = '菜鸟教程' OR title = 'MongoDB 教程')
````

## 条件操作

- (>) 大于 - $gt
- (<) 小于 - $lt
- (>=) 大于等于 - $gte
- (<= ) 小于等于 - $lte

```
>db.col.insert({
    title: 'PHP 教程', 
    description: 'PHP 是一种创建动态交互性站点的强有力的服务器端脚本语言。',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['php'],
    likes: 200
})

>db.col.insert({title: 'Java 教程', 
    description: 'Java 是由Sun Microsystems公司于1995年5月推出的高级程序设计语言。',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['java'],
    likes: 150
})

>db.col.insert({title: 'MongoDB 教程', 
    description: 'MongoDB 是一个 Nosql 数据库',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['mongodb'],
    likes: 100
})

> db.col.find()
```

````
db.col.find({"likes" : {$gt : 100}}) # Select * from col where likes > 100;
db.col.find({likes : {$gte : 100}}) # Select * from col where likes >=100;
db.col.find({likes : {$lt : 150}}) # Select * from col where likes < 150;
db.col.find({likes : {$lte : 150}}) # Select * from col where likes <= 150;
db.col.find({likes : {$lt :200, $gt : 100}}) # Select * from col where likes>100 AND  likes<200;
````

##  $type 操作符

|         **类型**          | **数字** |      **备注**      |
| :---------------------: | :----: | :--------------: |
|         Double          |   1    |                  |
|         String          |   2    |                  |
|         Object          |   3    |                  |
|          Array          |   4    |                  |
|       Binary data       |   5    |                  |
|        Undefined        |   6    |       已废弃。       |
|        Object id        |   7    |                  |
|         Boolean         |   8    |                  |
|          Date           |   9    |                  |
|          Null           |   10   |                  |
|   Regular Expression    |   11   |                  |
|       JavaScript        |   13   |                  |
|         Symbol          |   14   |                  |
| JavaScript (with scope) |   15   |                  |
|     32-bit integer      |   16   |                  |
|        Timestamp        |   17   |                  |
|     64-bit integer      |   18   |                  |
|         Min key         |  255   | Query with `-1`. |
|         Max key         |  127   |                  |

```
db.col.find({"title" : {$type : 2}})
```

## Limit与Skip方法

```
>db.COLLECTION_NAME.find().limit(NUMBER)

> db.col.find({},{"title":1,_id:0}).limit(2)
{ "title" : "PHP 教程" }
{ "title" : "Java 教程" }
>
```

```
>db.COLLECTION_NAME.find().limit(NUMBER).skip(NUMBER)

>db.col.find({},{"title":1,_id:0}).limit(1).skip(1)
{ "title" : "Java 教程" }
>
```

## 排序

```
>db.COLLECTION_NAME.find().sort({KEY:1})
>db.col.find({},{"title":1,_id:0}).sort({"likes":-1})
```

## 索引

```
>db.collection.createIndex(keys, options)
>db.col.createIndex({"title":1})
>db.col.createIndex({"title":1,"description":-1})
```

| Parameter          | Type          | Description                              |
| ------------------ | ------------- | ---------------------------------------- |
| background         | Boolean       | 建索引过程会阻塞其它数据库操作，background可指定以后台方式创建索引，即增加 "background" 可选参数。 "background" 默认值为**false**。 |
| unique             | Boolean       | 建立的索引是否唯一。指定为true创建唯一索引。默认值为**false**.   |
| name               | string        | 索引的名称。如果未指定，MongoDB的通过连接索引的字段名和排序顺序生成一个索引名称。 |
| dropDups           | Boolean       | 在建立唯一索引时是否删除重复记录,指定 true 创建唯一索引。默认值为 **false**. |
| sparse             | Boolean       | 对文档中不存在的字段数据不启用索引；这个参数需要特别注意，如果设置为true的话，在索引字段中不会查询出不包含对应字段的文档.。默认值为 **false**. |
| expireAfterSeconds | integer       | 指定一个以秒为单位的数值，完成 TTL设定，设定集合的生存时间。         |
| v                  | index version | 索引的版本号。默认的索引版本取决于mongod创建索引时运行的版本。       |
| weights            | document      | 索引权重值，数值在 1 到 99,999 之间，表示该索引相对于其他索引字段的得分权重。 |
| default_language   | string        | 对于文本索引，该参数决定了停用词及词干和词器的规则的列表。 默认为英语      |
| language_override  | string        | 对于文本索引，该参数指定了包含在文档中的字段名，语言覆盖默认的language，默认值为 language. |

````
db.values.createIndex({open: 1, close: 1}, {background: true})
````

## 聚合

```
>db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION)


{
   _id: ObjectId(7df78ad8902c)
   title: 'MongoDB Overview', 
   description: 'MongoDB is no sql database',
   by_user: 'runoob.com',
   url: 'http://www.runoob.com',
   tags: ['mongodb', 'database', 'NoSQL'],
   likes: 100
},
{
   _id: ObjectId(7df78ad8902d)
   title: 'NoSQL Overview', 
   description: 'No sql database is very fast',
   by_user: 'runoob.com',
   url: 'http://www.runoob.com',
   tags: ['mongodb', 'database', 'NoSQL'],
   likes: 10
},
{
   _id: ObjectId(7df78ad8902e)
   title: 'Neo4j Overview', 
   description: 'Neo4j is no sql database',
   by_user: 'Neo4j',
   url: 'http://www.neo4j.com',
   tags: ['neo4j', 'database', 'NoSQL'],
   likes: 750
},

db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : 1}}}]) # 计算每个作者所写的文章数  select by_user as _id, count(*) as num_tutorial from mycol group by by_user

```

| 表达式       | 描述                      | 实例                                       |
| --------- | ----------------------- | ---------------------------------------- |
| $sum      | 计算总和。                   | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : "$likes"}}}]) |
| $avg      | 计算平均值                   | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$avg : "$likes"}}}]) |
| $min      | 获取集合中所有文档对应值得最小值。       | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$min : "$likes"}}}]) |
| $max      | 获取集合中所有文档对应值得最大值。       | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$max : "$likes"}}}]) |
| $push     | 在结果文档中插入值到一个数组中。        | db.mycol.aggregate([{$group : {_id : "$by_user", url : {$push: "$url"}}}]) |
| $addToSet | 在结果文档中插入值到一个数组中，但不创建副本。 | db.mycol.aggregate([{$group : {_id : "$by_user", url : {$addToSet : "$url"}}}]) |
| $first    | 根据资源文档的排序获取第一个文档数据。     | db.mycol.aggregate([{$group : {_id : "$by_user", first_url : {$first : "$url"}}}]) |
| $last     | 根据资源文档的排序获取最后一个文档数据     | db.mycol.aggregate([{$group : {_id : "$by_user", last_url : {$last : "$url"}}}]) |

### 管道的概念

- $project：修改输入文档的结构。可以用来重命名、增加或删除域，也可以用于创建计算结果以及嵌套文档。
- $match：用于过滤数据，只输出符合条件的文档。$match使用MongoDB的标准查询操作。
- $limit：用来限制MongoDB聚合管道返回的文档数。
- $skip：在聚合管道中跳过指定数量的文档，并返回余下的文档。
- $unwind：将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。
- $group：将集合中的文档分组，可用于统计结果。
- $sort：将输入文档排序后输出。
- $geoNear：输出接近某一地理位置的有序文档。

#### $project实例

```
db.col.aggregate(
    { $project : {
        title : 1 ,
        author : 1 ,
    }}
 );
```

```
db.col.aggregate(
    { $project : {
        _id : 0 ,
        title : 1 ,
        author : 1
    }});
```

#### $match实例

````
db.col.aggregate( [
                        { $match : { score : { $gt : 70, $lte : 90 } } }, # 第一阶段
                        { $group: { _id: null, count: { $sum: 1 } } } # 第二阶段
                       ] );
````

#### $skip 实例

```
db.article.aggregate(
    { $skip : 5 });
```