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



### 删除数据



### 排序



### 分页查询



### 连接操作



### 删除集合





