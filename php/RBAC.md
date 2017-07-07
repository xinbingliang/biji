# RBAC(基于角色的权限控制)

## 权限模型

* ACL 访问控制列表
* RBAC 基于角色的权限控制
* ABAC 基于属性的权限控制
* PBAC 基于策略的权限控制

## 优势

* 简化用户和权限的关系
* 易扩展、易维护

## RBAC模块

### 用户管理

* 用户管理
* 添加用户
* 编辑角色
* 设置角色

### 角色管理

* 角色列表
* 添加角色
* 编辑角色
* 设置权限


### 权限管理

* 添加权限
* 删除权限
* 编辑权限
* 修改权限

### 用户操作日志

## 表设计

* user

  ```
  id int(11)
  name varchar(20)
  emial varchar(30)
  is_admin TINYINT(1)
  status TINYINT(1)
  updated_time TIMESTAMP
  created_time TIMEESTAMP
  ```

* user_role

  ````
  id int(11)
  uid int(11)
  role_id INT(11)
  created_time TIMESTAMP
  ````

* role

  ````
  id INT(11)
  name VARCHAR(50)
  status TINYINT(1)
  updated_time TIMESTAMP
  created_time TIMESTAMP
  ````

* role_access

  ````
  id INT(11)
  role_id INT(11)
  access_id INT(11)
  created_time TIMESTAMP
  ````

* access

  ````
  id INT(11)
  title VARCHAR(50)
  urls VARCHAR(1000)
  states TINYINT(1)
  updated_time TIMESTAMP
  created_time TIMESTAMP
  ````

  ​