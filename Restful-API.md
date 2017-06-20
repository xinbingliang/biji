# Restful API

## WebService

XML格式，增加特定消息头

## 如何设计

### 1.资源路径(URI)

每个网址代表一种资源，在网址中不能含义动词，名词要使用复数

* `https://api.example.com/v1/zoos ` 动物资源
  * 版本有两种做法，加入地址中或加入HTTP的请求头中
* `https://api.example.com/v1/animals`动物园资源
  * 在后面指定动物的id
* `https://api.example.com/v1/employees` 雇员资源

### 2.HTTP动词

CURD

* GET 从服务器取出资源(一项或多项)
* POST 在服务器上新建一资源
* PUT 在服务端更新资源（客户端提供改变后的完整资源）
* PATH 在服务器更新资源(客户端提供改变的属性)，很少用
* DELETE 从服务器上删除资源

**例子**

* POST /zoos 新建一个动物园
* GET /zoos/ID 读取指定动物的信息
* PUT /zoos/ID 更新该动物的信息
* DELETE /zoos/ID 删除某个动物园

### 3.过滤信息

如果记录数量很多，服务器不可能都将他们返回给用户，API应该提供参数，过滤返回结果

* ?offset=10 指定返回记录的开始位置
* ?page=2&per_page=100 指定第几页，以及每一页的记录数
* ?sortby=name&order=asc 指定返回结果排序，以及排序顺序
* ?animal_type_id=1 指定筛选条件

### 4.状态码

* 200 OK 服务器返回用户请求的数据,该操作是幂等的
* 201 CREATED 新建或修改数据成功
* 204 NO CONTENT 删除数据成功
* 400 BAD REQUEST 用户发出的请求有错误，该错误是幂等的
* 401 Unauthorized 表示用户没有认证，无法进行操作
* 403 Forbidden 表示用户访问是被禁止的
* 422 Unprocesable Entity 当创建一个对象,发生一个验证错误（提供验证信息不全）
* 500 INTERNAL SERVER ERROR 服务器发生错误，用户将无法判断发出请求是否成功

### 5. 错误处理

````javascript
{
  "error": "参数错误"
}
````

### 6.返回结果

针对不同的操作，服务端向用户返回的结果应该符合以下规范

* GET /collection: 返回资源对象的列表(数组)
* GET /collections/identity: 返回单个资源对象
* POST/collections 返回新生成的资源对象
* PUT /collections/identity 返回(被更新资源的)完整的资源对象
* PATCH /collections/identity 返回被修改的属性
* DELETE /collections/identity 返回一个空文档 


 **错误处理**

输出JSON格式的错误信息

````
throw new Exception('用户名已经存在', ErrorCode::USERNAME_EXISTS);
````

```
class ErrorCode{
  const USERNAME_EXISTS = 1;	//用户已经存在
}
```



**返回结果**

输出JSON数组或JSON对象




