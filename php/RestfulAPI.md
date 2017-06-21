# Restful  

## WebService

XML格式，增加特定消息头

## 如何设计

### 1.资源路径(URI)

每个网址代表一种资源，在网址中不能含义动词，名词要使用复数

- `https://api.example.com/v1/zoos ` 动物资源
  - 版本有两种做法，加入地址中或加入HTTP的请求头中
- `https://api.example.com/v1/animals`动物园资源
  - 在后面指定动物的id
- `https://api.example.com/v1/employees` 雇员资源

### 2.HTTP动词

CURD

- GET 从服务器取出资源(一项或多项)
- POST 在服务器上新建一资源
- PUT 在服务端更新资源（客户端提供改变后的完整资源）
- PATH 在服务器更新资源(客户端提供改变的属性)，很少用
- DELETE 从服务器上删除资源

**例子**

- POST /zoos 新建一个动物园
- GET /zoos/ID 读取指定动物的信息
- PUT /zoos/ID 更新该动物的信息
- DELETE /zoos/ID 删除某个动物园

### 3.过滤信息

如果记录数量很多，服务器不可能都将他们返回给用户，API应该提供参数，过滤返回结果

- ?offset=10 指定返回记录的开始位置
- ?page=2&per_page=100 指定第几页，以及每一页的记录数
- ?sortby=name&order=asc 指定返回结果排序，以及排序顺序
- ?animal_type_id=1 指定筛选条件

### 4.状态码

- 200 OK 服务器返回用户请求的数据,该操作是幂等的
- 201 CREATED 新建或修改数据成功
- 204 NO CONTENT 删除数据成功，和空的响应体
- 400 BAD REQUEST 用户发出的请求有错误，该错误是幂等的,用户传递错误的参数
- 401 Unauthorized 表示用户没有认证，无法进行操作（没有登录注册）
- 403 Forbidden 表示用户访问是被禁止的，权限不合理（A用户读取B用户数据）
- 405 不被允许的请求方式
- 422 Unprocesable Entity 当创建一个对象,发生一个验证错误（提供验证信息不全）
- 500 INTERNAL SERVER ERROR 服务器发生错误，用户将无法判断发出请求是否成功

### 5. 错误处理

配合HTTP状态码实现，ErrorMessage字段，语义化的错误提示

```javascript
{
  "error": "参数错误"
}
```

### 6.返回结果

针对不同的操作，服务端向用户返回的结果应该符合以下规范

- GET /collection: 返回资源对象的列表(数组)
- GET /collections/identity: 返回单个资源对象
- POST/collections 返回新生成的资源对象
- PUT /collections/identity 返回(被更新资源的)完整的资源对象
- PATCH /collections/identity 返回被修改的属性
- DELETE /collections/identity 返回一个空文档 ，204状态码

## 概念和准则

* 网络上所有事务都可以抽象为资源
* 每一个资源都有唯一的标识，对资源的操作不会改变这些标识
* 所有操作都是无状态的

## Http协议

`schema://host["port"]/path[?query-string][#anchor]`

* scheme 指定底层使用的协议(http、https、ftp)
* host 服务器的IP地址或者域名
* port 端口 80/443
* path 访问的资源路径
* query-string 发送给http服务器的数据
* anchor 锚

### 请求

组成格式:  请求行、请求报头、请求正文

**请求行**

* 格式：Method Request-URI HTTP-Version CRLF

**例子**

GET /HTTP/1.1 CRLF

### 请求方法

* GET 请求获取Request-URI 所有标识的资源
* POST 在Request-URI所标识的资源后面附加新的数据
* HEAD 请求获取由Request-URI 所标识的资源的响应消息报头
* PUT 请求服务器存储一个资源，并用Request-URI作为其标识
* DELETE 请求服务器删除Request-URI所标识的资源
* OPTIONS请求查询服务企的性能，或者查询与资源相关的选项和需求

### 响应

组成格式：状态行、消息报头、响应正文

**状态行**

HTTP-Version Status-Code Reason-Phrase CRLF

HTTP/1.1 200 OK

**响应状态码**

* 200 OKn 客户端请求成功,服务端处理成功
* 404 Bad Request 客户端请求有语法错误，不能被服务器理解
* 401 Unauthorized 服务器收到请求，但是拒绝提供服务
* 404 Not Found 请求资源不存在
* 500 Internal Server Error 服务器发生不可预期的错误
* 503 Server Unavailable 服务器当前不能处理客户端的请求


````
<?php
class Restful
{
    private $_user;
    private $_article;


    private $_requestMethod;    //请求方法
    private $_resourceName;     //请求资源名称
    private $_id;               //请求的资源标记

    //允许请求的资源列表
    private $_allowResources = array(
        'user',
        'articles'
    );

    //允许使用的请求方法
    private $_allowRequestMethods = array(
        'GET',
        'POST',
        'PUT',
        'DELETE',
        'OPTIONS'   //Ajax跨域使用
    );

    //HTTP状态码和说明
    private $_statusCode = array(
        200 =>  'ok',
        204 =>  'No Content',
        400 =>  'Bad Request',
        401 =>  'Unauthorized',
        403 =>  'Forbidden',
        404 =>  'Not Found',
        405 =>  'Method Not Allowed',
        500 =>  'Server Internal Error'
    );



    public function __construct($user, $article)
    {
        $this->_user = $user;
        $this->_article = $article;
    }

    /**
     * 唯一的公共入口
     */
    public function run()
    {
        try{
            $this->_setupRequestMethod();
            $this->_setupResource();
            $this->_setupId();
        }catch (Exception $e){
            $this->_json
        }
    }

    /**
     * 初始化请求方法
     */
    public function _setupRequestMethod()
    {

    }

    /**
     * 初始化请求资源
     */
    public function _setupResource()
    {
        $this->_requestMethod = $_SERVER['REQUEST_METHOD'];

        if(!in_array($this->_requestMethod, $this->_allowRequestMethods)) {
            throw new Exception('请求方法不被允许', 405);
        }
    }

    /**
     * 初始化请求资源
     */
    public function _setupId()
    {

    }
}












````




















