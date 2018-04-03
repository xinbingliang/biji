# node-mongodb

## 安装

* `npm install mongodb` 安装

## 创建或连接数据库

```js
let mongoClient = require('mongodb').MongoClient;
const url = "mongodb://192.168.2.79:27017/node_test"

mongoClient.connect(url, function(err, db){
    if(err){
        throw err;
    }

    console.log('数据库已经被创建或者已经被连接')
    db.close();
})
```

## 创建集合

````js
let mongoClient = require('mongodb').MongoClient;
const url = "mongodb://192.168.2.79:27017/node_test"

mongoClient.connect(url, function(err, db){
    if(err){
        throw err;
    }

    let dbase = db.db("node_test")
    dbase.createCollection('site', function(err, res){
        if(err){
            throw err;
        }

        console.log('集合创建成功')
        db.close();
    })
})
````

## 增删改查

### 插入数据

####单条数据插入

```js
let mongoClient = require('mongodb').MongoClient;
const url = "mongodb://192.168.2.79:27017/node_test"

mongoClient.connect(url, function(err, db){
    if(err){
        throw err;
    }

    let dbase = db.db("node_test")
   
    let myobj = {_id: '1234' ,name: "xin", url: 'www.xinbingliang.com'}

    dbase.collection('site').insertOne(myobj, (err, res)=>{
        if (err){
            throw err;
        }

        console.log('文档插入成功')
        db.close()
    })
})
```

####多条数据插入

```js
let mongoClient = require('mongodb').MongoClient;
const url = "mongodb://192.168.2.79:27017/node_test"

mongoClient.connect(url, function(err, db){
    if(err){
        throw err;
    }

    let dbase = db.db("node_test")
   
    let myobj = [
        { name: 'xin', url: 'https://xinbingliang.cn', type: 'cn'},
        { name: 'Google', url: 'https://www.google.com', type: 'en'},
        { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
       ];

    dbase.collection('site').insertMany(myobj, (err, res)=>{
        if (err){
            throw err;
        }

        console.log('文档插入成功')
        db.close()
    })
})
```

### 查询数据

#### 普通查询

```js
let mongoClient = require('mongodb').MongoClient;
const url = "mongodb://192.168.2.79:27017/node_test"

mongoClient.connect(url, function(err, db){
    if(err){
        throw err;
    }

    let dbase = db.db("node_test")
   
    dbase.collection('site').find({}).toArray(function(err, result){
        if(err){
            throw err;
        }

        console.log(result);
        db.close();
    })
})
```

#### 条件查询

```javascript
let mongoClient = require('mongodb').MongoClient;
const url = "mongodb://192.168.2.79:27017/node_test"

mongoClient.connect(url, function(err, db){
    if(err){
        throw err;
    }

    let dbase = db.db("node_test")
    let whereStr = {"name": "xin"}
    dbase.collection('site').find(whereStr).toArray(function(err, result){
        if(err){
            throw err;
        }

        console.log(result);
        db.close();
    })
})
```

### 更新数据

####修改一条

````javascript
let mongoClient = require('mongodb').MongoClient;
const url = "mongodb://192.168.2.79:27017/node_test"

mongoClient.connect(url, function(err, db){
    if(err){
        throw err;
    }

    let dbase = db.db("node_test")
    let whereStr = {"name": "xin"}
    let updateStr = {$set: {url: "https://www.xinbingliang.cn"}}

    dbase.collection('site').updateOne(whereStr, updateStr, (err, res)=>{
        if(err){
            throw err;
        }
        console.log('更新文档成功')
        db.close()
    })
})

````

####修改多条

````javascript
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    var whereStr = {"type":'en'};  // 查询条件
    var updateStr = {$set: { "url" : "https://www.xinbingliang.com" }};
    dbo.collection("site").updateMany(whereStr, updateStr, function(err, res) {
        if (err) throw err;
         console.log(res.result.nModified + " 条文档被更新");
        db.close();
    });
});
````

### 删除数据

####删除一条数据

```javascript
let mongoClient = require('mongodb').MongoClient;
const url = "mongodb://192.168.2.79:27017/node_test"

mongoClient.connect(url, function(err, db){
    if(err){
        throw err;
    }

    let dbase = db.db("node_test")
    let whereStr = {"name": "xin"}

    dbase.collection('site').deleteOne(whereStr, (err, obj)=>{
        if(err){
            throw err;
        }

        console.log('文档删除成功')
        db.close()
    })
})
```

####删除多条数据

```javascript
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    var whereStr = { type: "en" };  // 查询条件
    dbo.collection("site").deleteMany(whereStr, function(err, obj) {
        if (err) throw err;
        console.log(obj.result.n + " 条文档被删除");
        db.close();
    });
});
```

### 排序

排序 使用 sort() 方法，该方法接受一个参数，规定是升序(1)还是降序(-1)。

例如：

```
{ type: 1 }  // 按 type 字段升序
{ type: -1 } // 按 type 字段降序
```

````javascript
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    var mysort = { type: 1 };
    dbo.collection("site").find().sort(mysort).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});
````

### 分页查询

#### limit

````javascript
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    dbo.collection("site").find().limit(2).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
  });
});
````

#### skip

````javascript
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    dbo.collection("site").find().skip(2).limit(2).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
  });
});
````

### 连接操作

mongoDB 不是一个关系型数据库，但我们可以使用 $lookup 来实现左连接。

例如我们有两个集合数据分别为：

集合1：orders

```
[
  { _id: 1, product_id: 154, status: 1 }
]
```

集合2：products

```
[
  { _id: 154, name: '笔记本电脑' },
  { _id: 155, name: '耳机' },
  { _id: 156, name: '台式电脑' }
]
```

```javascript
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
 
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    dbo.collection('orders').aggregate([
        { $lookup:
            {
                from: 'products',           # 右集合
                localField: 'product_id',   # 左集合 join字段
                foreignField: '_id',        # 右集合 join字段
                as: 'orderdetails'          # 新生成字段（类型array）
            }
        }
    ], function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    db.close();
});
```

### 删除集合

```javascript
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    // 删除 test 集合
    dbo.collection("test").drop(function(err, delOK) {  // 执行成功 delOK 返回 true，否则返回 false
        if (err) throw err;
        if (delOK) console.log("集合已删除");
        db.close();
    });
});
```



