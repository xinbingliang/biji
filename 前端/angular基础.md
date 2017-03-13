# Angularjs基础

- 简单应用

```html
<!DOCTYPE html>
<html lang="zh-CN" ng-app>
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="js/ng.1.2.30.js"></script>
</head>
<body>
    <ul>
        <li>姓：<input type="text" ng-model="xing"></li>   <!--绑定到姓变量上-->
        <li>名：<input type="text" ng-model="ming"></li>
        <li>Hello <b >{{xing +' '+ming}}</b></li>
    </ul>
</body>
</html>
```

- 绑定事件

```html
<ul>
    <li>姓：<input type="text" ng-model="xing"></li>   <!--绑定到姓变量上-->
    <li>名：<input type="text" ng-model="ming"></li>
    <li>Hello <b >{{xing +' '+ming}}</b></li>
    <li><a href="#" ng-click="xing = '辛';ming = '丙亮'">输出姓名</a></li>
</ul>
```

- 字符串和数字

```html
<!DOCTYPE html>
<html ng-app lang="zh-CN" ng-init="AccountId=1;AccountName='辛丙亮';Location='CHINA'">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="js/ng.1.2.30.js"></script>
</head>
<body>
<b>{{AccountId+'&nbsp;'+AccountName+'&nbsp;'+Location}}</b>
<ul>
    <li>{{AccountId}}</li>
    <li>{{AccountName}}</li>
    <li>{{Location}}</li>
</ul>
</body>
</html>
```

- 日期时间定义

```html
<!DOCTYPE html>
<html ng-app="lesson" ng-controller="lesson2" lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="js/ng.1.2.30.js"></script>
</head>
<body>
{{Now}}
</body>
<script>
    var app = angular.module("lesson", []);
    app.controller("lesson2", function ($scope) {
        var Now = new Date();
        $scope.Now = Now.getHours()+':'+Now.getMinutes()+':'+Now.getSeconds();
    })
</script>
</html>
```

- 数组和对象

```html
<!DOCTYPE html>
<html ng-app lang="zh-CN" ng-init="Week = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', Sun];Account={'AccountId':1, 'AccountName':'Tom', 'AccountLocation':'CHINA'}">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="js/ng.1.2.30.js"></script>
</head>
<body>
{{Account.AccountId}}
</body>
<script>
</script>
</html>
```

- 数据绑定

```javascript
<!DOCTYPE html>
<html ng-app="lesson" lang="zh-CN" >
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="js/ng.1.2.30.js"></script>
</head>
<body>
<b  ng-controller="lesson2">{{Now}}</b>
</body>
<script>
    var app = angular.module("lesson", []);
    app.controller("lesson2", function ($scope) {
        setInterval(function () {

            $scope.$apply(function () { /*手动将变化映射到HTML*/
                var Now = new Date();
                $scope.Now = Now.getHours()+':'+Now.getMinutes()+':'+Now.getSeconds();
                console.log($scope.Now);
            })

        }, 1000);
    })
</script>
</html>
```

- 组合绑定

```html
<!DOCTYPE html>
<html ng-app="lesson" lang="zh-CN" >
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="js/ng.1.2.30.js"></script>
</head>
<body>
<ul ng-controller="lesson3">
    <li>姓: <input type="text" ng-model="xing"></li>
    <li>名: <input type="text" ng-model="ming"></li>
    <li>Hello <b>{{xing||''}}{{ming||''}}</b>
    <li>Hello <b>{{FullName}}</b></li>
</ul>
</body>
<script>
    var app = angular.module("lesson", []);
    app.controller("lesson3", function ($scope) {
        $scope.xing = "";
        $scope.ming = "";


        $scope.$watch("xing", function () { /*对姓的变化做观察*/
            $scope.FullName = $scope.xing+" "+$scope.ming;
        });

        $scope.$watch("ming", function () { /*对名的变化做观察*/
            $scope.FullName = $scope.xing+" "+$scope.ming;
        });
    })
</script>
</html>
```

- 绑定数组数据

```html
<!DOCTYPE html>
<html ng-app="lesson" ng-controller="lesson3" lang="zh-CN" >
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="js/ng.1.2.30.js"></script>
</head>
<body>
<ul>
    <li  ng-repeat="a in UserNameList">{{a}}</li><!--重复-->
</ul>
</body>
<script>
    var app = angular.module("lesson", []);
    app.controller("lesson3", function ($scope) {
        $scope.UserNameList = ['Tom', 'Jerry', 'David', 'Tim'];
    })
</script>
</html>
```

- 表格绑定

```html
<!DOCTYPE html>
<html ng-app="lesson" ng-controller="lesson3" lang="zh-CN" >
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="js/ng.1.2.30.js"></script>
    <link href="//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" href="css/boot.css">
</head>
<body>
<section class="container">
    <table class="table table-bordered">
        <thead>
        <tr>
            <th>姓名</th>
            <th>年龄</th>
            <th>星座</th>
        </tr>
        </thead>
        <tbody>
        <tr ng-repeat="row in UserInfoList">
            <td>{{row[0]}}</td>
            <td>{{row[1]}}</td>
            <td>{{row[2]}}</td>
        </tr>
        </tbody>
    </table>
</section>
</body>
<script>
    var app = angular.module("lesson", []);
    app.controller("lesson3", function ($scope) {
        $scope.UserInfoList = [
                ['Tom', 26, '水平座'],
                ['jerry', 27, '摩羯座'],
                ['Davild', 30, '白羊座']
        ];

    })
</script>
</html>
```

- 数据的排序

```html
<!DOCTYPE html>
<html ng-app="lesson" ng-controller="lesson3" lang="zh-CN" >
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="js/ng.1.2.30.js"></script>
    <link href="//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" href="css/boot.css">
</head>
<body>
<section class="container">
    <div class="container">
        <table class="table">
            <tr ng-repeat="row in UserInfoList | orderBy:'age':true"> <!--倒序排序-->
                <td>{{row.name}}</td>
                <td>{{row.age}}</td>
                <td>{{row.start}}</td>
            </tr>
        </table>
    </div>
</section>
</body>
<script>
    var app = angular.module("lesson", []);
    app.controller("lesson3", function ($scope) {
        $scope.UserInfoList = [
            {'name':'liang', 'age':'30', 'start': '处女'},
            {'name':'bing', 'age': 24, 'start': '白羊'},
            {'name':'xin', 'age': 21, 'start': '摩羯'},
        ];
    })
</script>
</html>
```

- 字符处理

```html
<!DOCTYPE html>
<html ng-app="lesson" ng-controller="lesson3" lang="zh-CN" >
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="js/ng.1.2.30.js"></script>
    <link href="//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" href="css/boot.css">
</head>
<body>
<section class="container">
    <div class="container">
        <table class="table">
            <tr ng-repeat="row in UserInfoList | orderBy: ['age', '-WorkYear']"> <!-- 倒序排序,倒序前加- -->
                <td>{{$index+1}}</td><!--序号-->
                <td>{{row.name | uppercase}}</td>
                <td>{{row.age}}</td>
                <td>{{row.start}}</td>
                <td>{{row.WorkYear}}</td>   <!--针对不止一个字段排序-->
            </tr>
        </table>
    </div>
</section>
</body>
<script>
    var app = angular.module("lesson", []);
    app.controller("lesson3", function ($scope) {
        $scope.UserInfoList = [
            {'name':'liang', 'age':'30', 'start': '处女','WorkYear':19},
            {'name':'bing', 'age': 24, 'start': '白羊', 'WorkYear': 5},
            {'name':'xin', 'age': 21, 'start': '摩羯', 'WorkYear': 7},
        ];
    })
</script>
</html>
```

- 客户端的数据过滤

```html
<!DOCTYPE html>
<html ng-app="lesson" ng-controller="lesson3" lang="zh-CN" >
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="js/ng.1.2.30.js"></script>
    <link href="//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" href="css/boot.css">
</head>
<body>
<section class="container">
    <div class="container">
        <table class="table">
            <tr ng-repeat="row in UserInfoList |filter:{'age':30}"> <!-- 倒序排序,倒序前加- --><!-- <tr ng-repeat="row in UserInfoList |filter: 30"> 用来模糊查询--!>
                <td>{{$index+1}}</td><!--序号-->
                <td>{{row.name | uppercase}}</td>
                <td>{{row.age}}</td>
                <td>{{row.start}}</td>
                <td>{{row.WorkYear}}</td>   <!--针对不止一个字段排序-->
            </tr>
        </table>
    </div>
</section>
</body>
<script>
    var app = angular.module("lesson", []);
    app.controller("lesson3", function ($scope) {
        $scope.UserInfoList = [
            {'name':'liang', 'age':'30', 'start': '处女','WorkYear':19},
            {'name':'bing', 'age': 24, 'start': '白羊', 'WorkYear': 5},
            {'name':'xin', 'age': 21, 'start': '摩羯', 'WorkYear': 7},
        ];
    })
</script>
</html>
```

- 事件-数据删除

```html
<!DOCTYPE html>
<html ng-app="lesson" ng-controller="lesson3" lang="zh-CN" >
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="js/ng.1.2.30.js"></script>
    <link href="//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" href="css/boot.css">
</head>
<body>
<section class="container">
    <div class="container">
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>姓名</th>
                    <th>年龄</th>
                    <th>星座</th>
                    <th>工作年限</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="row in UserInfoList"> <!-- 倒序排序,倒序前加- -->
                    <td>{{$index+1}}</td><!--序号-->
                    <td>{{row.name | uppercase}}</td>
                    <td>{{row.age}}</td>
                    <td>{{row.start}}</td>
                    <td>{{row.WorkYear}}</td>   <!--针对不止一个字段排序-->
                    <td><button ng-click="DeleteUser(row.name)">删除</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</section>
</body>
<script>
    var app = angular.module("lesson", []);
    app.controller("lesson3", function ($scope) {
        $scope.UserInfoList = [
            {'name':'liang', 'age':'30', 'start': '处女','WorkYear':19},
            {'name':'bing', 'age': 24, 'start': '白羊', 'WorkYear': 5},
            {'name':'xin', 'age': 21, 'start': '摩羯', 'WorkYear': 7},
        ];

        $scope.DeleteUser = function (userName) {
            $scope.UserInfoList.forEach(function (user, i, list) {
                if(user.name == userName){
                    list.splice(i,1);
                }
            });
        }
    })
</script>
</html>
```

- 简单点击

```html
<section class="container">
    点击数: <b>{{Counter || 0}}</b>
    <button ng-click="Counter = Counter + 1">点击</button>
</section>
```

- 事件方法名

```html
<!DOCTYPE html>
<html ng-app="lesson" ng-controller="lesson3" lang="zh-CN" >
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="js/ng.1.2.30.js"></script>
    <link href="//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" href="css/boot.css">
</head>
<body>
<section class="container">
    点击数: <b>{{Counter}}</b>
    <button ng-click="CounterClick()">点击</button>
</section>
</body>
<script>
    var app = angular.module("lesson", []);
    app.controller("lesson3", function ($scope) {
        $scope.Counter = 0;
        $scope.CounterClick = function () {
            $scope.Counter = $scope.Counter + 1;
        }
    })
</script>
</html>
```

- 点击显示和隐藏元素

```html
<!DOCTYPE html>
<html ng-app="lesson" ng-controller="lesson3" lang="zh-CN" >
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="js/ng.1.2.30.js"></script>
    <link href="//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" href="css/boot.css">
</head>
<body>
<section class="container">
    <p ng-show="ContentFlag">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam doloribus harum itaque unde vitae? Accusamus aperiam aut dolore dolorem esse explicabo ipsam, molestias nam quia quod rerum soluta sunt voluptatibus.</p>
    <button ng-click="HideContent()">隐藏</button>
</section>
</body>
<script>
    var app = angular.module("lesson", []);
    app.controller("lesson3", function ($scope) {
        $scope.ContentFlag = true;  /*默认情况下文章内容被显示*/
        $scope.HideContent = function () {
            $scope.ContentFlag = !$scope.ContentFlag;
        };
    })
</script>
</html>
```

- 内容改变事件

```html
<section class="container">
    点击数: <b>{{Counter}}</b>
    <input type="text" ng-change="CounterChange()" ng-model="CounterInput">
</section>
</body>
<script>
    var app = angular.module("lesson", []);
    app.controller("lesson3", function ($scope) {
        $scope.Counter = 0;
        $scope.CounterChange = function () {
            $scope.Counter = $scope.Counter + 1;
        }
    })
</script>
```

- 按键按下事件

```html
<section class="container">
    点击数: <b>{{Counter}}</b>
    <input type="text" ng-keypress="CounterChange()" ng-model="CounterInput1">
</section>
</body>
<script>
    var app = angular.module("lesson", []);
    app.controller("lesson3", function ($scope) {
        $scope.Counter = 0;
        $scope.CounterChange = function () {
          
            $scope.Counter = $scope.Counter + 1;
        }
    })
</script>
```

- 表单提交

```html
<!DOCTYPE html>
<html ng-app="lesson" ng-controller="lesson3" lang="zh-CN" >
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="js/ng.1.2.30.js"></script>
    <link href="//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" href="css/boot.css">
</head>
<body>
    <div class="container">
        <form action="" role="form" ng-submit="SubmitForm()">
            <div class="form-group">
                <label for="InputName">姓名</label>
                <input type="text" class="form-control" ng-model="NewName" id="InputName"  placeholder="输入姓名">
            </div>
            <div class="form-group">
                <label for="AgeInput">年龄</label>
                <input type="test" class="form-control" ng-model="NewAge" id="AgeInput" placeholder="请输入年龄">
            </div>
            <input type="submit" value="提交" class="btn btn-default">
        </form>
    </div>
</body>
<script>
    var app = angular.module("lesson", []);
    app.controller("lesson3", function ($scope) {
        $scope.SubmitForm = function () {
            console.log($scope.NewName + ' ' + $scope.NewAge);
            return false;
        }
    })
</script>
</html>
```

- 定义多个控制器

```html
<!DOCTYPE html>
<html ng-app="lesson" lang="zh-CN" >
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="js/ng.1.2.30.js"></script>
    <link href="//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" href="css/boot.css">
</head>
<body>
<section class="container">
    <div ng-controller="Ctrl1">
        <h1>{{Name}}</h1>
    </div>
    <div ng-controller="Ctrl2">
        <h1>{{Name}}</h1>
    </div>
</section>
</body>
<script>
    var app = angular.module("lesson", []);
    app.controller("Ctrl1", function ($scope) {
        $scope.Name = '控制器1';
    });

    app.controller("Ctrl2", function ($scope) {
        $scope.Name = '控制器2';
    });
</script>
</html>
```

- 控制器间通讯·继承

```html
<!DOCTYPE html>
<html ng-app="lesson" lang="zh-CN" >
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="js/ng.1.2.30.js"></script>
    <link href="//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" href="css/boot.css">
</head>
<body>
<section class="container">
    <div ng-controller="MomCtrl">
        <h1>{{Name}}</h1>
        <h2>{{Location}}</h2>
        <button ng-click="ChangeHouse()">搬地方</button>
        <div ng-controller="MeCtrl">    <!-- 放在内部，就构成继承的关系 -->
            <h1>{{Name}}</h1>
            <h2>{{Location}}</h2>
        </div>
    </div>
</section>
</body>
<script>
    var app = angular.module("lesson", []);
    app.controller("MomCtrl", function ($scope) {
        $scope.Name = '我是大伟他妈';
        $scope.Location = '幸福屯';
        $scope.ChangeHouse = function () {
            $scope.Location = '光荣街';
        }
    });

    app.controller("MeCtrl", function ($scope) {
        $scope.Name = '我是大伟';
    });
</script>
</html>
```

- 控制器间通讯·基于事件(广播，向上传播，向下传播)

```html
<!DOCTYPE html>
<html ng-app="lesson" lang="zh-CN" >
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="js/ng.1.2.30.js"></script>
    <link href="//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" href="css/boot.css">
</head>
<body>
<section class="container">
    <div ng-controller="MomCtrl">
        <h1>{{Name}}</h1>
        <h2>{{Location}}</h2>
        <button ng-click="ChangeHouse()">搬地方</button>
        <div ng-controller="MeCtrl">    <!-- 放在内部，就构成继承的关系 -->
            <h1>{{Name}}</h1>
            <h2>{{Location}}</h2>
            <h2>{{Mobile}}</h2>
        </div>

        <div ng-controller="GfCtrl">    <!-- 放在内部，就构成继承的关系 -->
            <h1>{{Name}}</h1>
            <h2>{{Mobile}}</h2>
            <button class="btn btn-primary" ng-click="Call()">打电话</button>
        </div>
    </div>
</section>
</body>
<script>
    var app = angular.module("lesson", []);
    app.controller("MomCtrl", function ($scope) {
        $scope.Name = '我是大伟他妈';
        $scope.Location = '幸福屯';
        $scope.ChangeHouse = function () {
            $scope.Location = '光荣街';
        };
        $scope.$on('callDaWei', function () {   //监听到callDaWei事件触发
            $scope.$broadcast('yourGfCall');    //进行消息的广播
        });
    });

    app.controller("MeCtrl", function ($scope) {
        $scope.Name = '我是大伟';
        $scope.Mobile = "待机";
        $scope.$on('yourGfCall', function () {    //监听广播事件
            $scope.Mobile = 'GF来电';
        });
    });

    app.controller('GfCtrl', function ($scope) {
        $scope.Name = '女友';
        $scope.Mobile = "待机";
        $scope.Call = function () {
            $scope.Mobile = '呼叫大伟';
            $scope.$emit("callDaWei");   //向父级传递消息，实际上是事件的触发
        };
    })
</script>
</html>
```

### 表单

- 基本使用

```html
<!DOCTYPE html>
<html lang="zh-CN" ng-app="lesson" ng-controller="FormCtrl">
<head>
    <meta charset="UTF-8">
    <title>完善个人信息</title>
    <script src="js/ng.1.2.30.js"></script>
    <link href="//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" href="css/boot.css">
</head>
<body>
<div class="container">
    <form role="form" ng-submit="PostForm()">
        <div class="form-group">
            <label for="InputName">姓名</label>
            <input type="text" class="form-control" id="InputName" placeholder="输入用户名" ng-model="form.Username">
        </div>
        <div class="form-group">
            <label for="InputNickName">昵称</label>
            <input type="text" class="form-control" id="InputNickName" placeholder="输入昵称" ng-model="form.NickName">
        </div>
        <div class="form-group">
            <label for="InputAge">年龄</label>
            <input type="text" class="form-control" id="InputAge" placeholder="输入年龄" ng-model="form.Age">
        </div>
        <div class="checkbox">
            <label>
                <input type="checkbox" ng-model="form.isMaried" value="false"> 已婚
            </label>
        </div>
        <div class="radio">
            <label>
                <input type="radio" ng-model="form.LoveAnimal" name="animal" value="猫">猫<br/>
            </label>
        </div>
        <div class="radio">
            <label>
                <input type="radio" ng-model="form.LoveAnimal" name="animal" value="狗">狗<br/>
            </label>
        </div>
        <!--<div class="select" style="width: 10%">
            现住地:
            <select class="form-control" ng-model="form.LocationCity">
                <option value="北京">北京</option>
                <option value="上海">上海</option>
                <option value="广州">广州</option>
                <option value="武汉">武汉</option>
                <option value="深圳">深圳</option>
            </select>
        </div>-->

        <!--从服务端拉取-->
        <div >
            现住地:
            <select name="city" class="form-control" ng-model="form.LocationCity" ng-options="obj.text as obj.value for obj in form.LocationCityList">
                <option value="">请选择城市</option>
            </select>
        </div>
        <input type="submit" class="btn btn-primary" value="提交"/>
    </form>
    <b>{{form.Username+'<->'+form.NickName+'<->'+form.Age+'<->'+form.isMaried+'<-->'+form.LoveAnimal+'<-->'+form.LocationCity}}</b>
</div>
</body>
<script>
    var app = angular.module('lesson', []);
    app.controller('FormCtrl', function ($scope) {
        $scope.formInitObj = {
            Username:"",
            NickName:"",
            Age:""
        };
        $scope.form = {};
        $scope.form.LocationCityList = [
            {'text': '北京', value: '北京'},
            {'text': '上海', value: '上海'},
            {'text': '广州', value: '广州'},
            {'text': '武汉', value: '武汉'}
        ];
        $scope.PostForm = function () {
            console.log($scope.form);
            $scope.form = angular.copy($scope.formInitObj);
        }
    });
</script>
</html>
```

- 表单验证

```html
<!DOCTYPE html>
<html lang="zh-CN"  ng-app="lesson" ng-controller="FormCtrl">
<head>
    <meta charset="UTF-8">
    <title>Form</title>
    <script src="js/ng.1.2.30.js"></script>
    <link href="//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" href="css/boot.css">
</head>
<body>
<div class="container">
    <form role="form" ng-submit="PostForm()" name="myForm">
        <!--<div class="form-group">
            <label for="InputName">姓名</label>
            <input type="text" class="form-control" id="InputName" placeholder="输入用户名" name="Username" ng-model="Username" required ng-maxlength="18" ng-minlength="8">   &lt;!&ndash;必填&ndash;&gt;
            <b ng-show="myForm.Username.$dirty && myForm.Username.$invalid">    &lt;!&ndash; 有用户操作行为并输入不合法显示b &ndash;&gt;
                <span ng-show="myForm.Username.$error.required">用户名必填</span>    &lt;!&ndash;触发必填错误&ndash;&gt;
                <span>请输入8~18位用户名</span>
            </b>
        </div>-->
        <div class="form-group">
            <label for="UserIndex">编号</label>
            <input type="text" class="form-control" id="UserIndex" name="UserIndex" placeholder="输入编号" ng-model="UserIndex" ng-pattern="/^\d+$/"><!--注意name是必须的-->
            <span style="color: red;" ng-show="myForm.UserIndex.$dirty && myForm.UserIndex.$invalid">
                请输入您的数字编号
            </span>
        </div>

        <div class="form-group">
            <label for="InputName">姓名</label>
            <input type="text" class="form-control" id="InputName" placeholder="输入用户名" name="Username" ng-model="Username" ng-pattern="/^\w{8,18}$/">
            <span style="color: red;" ng-show="myForm.Username.$dirty && myForm.Username.$invalid">
                请输入8-18位用户名
            </span>
        </div>

        <input ng-disabled="myForm.$invalid" type="submit" class="btn btn-primary" value="提交"/> <!--必须通过验证才能提交表单-->
    </form>
</div>
</body>
<script>
    var app = angular.module('lesson', []);
    app.controller('FormCtrl', function ($scope) {

    });
</script>
</html>
```

- 指令的基本使用

```html
<!DOCTYPE html>
<html lang="zh-CN"  ng-app="lesson" ng-controller="MainCtrl">
<head>
    <meta charset="UTF-8">
    <title>Form</title>
    <script src="js/ng.1.2.30.js"></script>
    <link href="//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" href="css/boot.css">
</head>
<body>
<section class="container">
    <div>
        <b>指令</b>
    </div>

    <div>
        <b>今天天气不错</b>
    </div>

    <ul div="">
        <li>232323</li>
    </ul>
</section>
</body>
<script>
    var app = angular.module('lesson', []);
    app.controller('MainCtrl', function ($scope) {

    });

    app.directive('div', function () { /*指令的名称,匿名方法*/
        var direction = {};
        /*direction.restrict = 'E';*/   /*是依靠指令的名称*/
        /*direction.restrict = 'A';*/ /*匹配指令属性*/
        direction.restrict = 'AE';  /*匹配属性和名称*/
        /*direction.template = '第一个指令';*/    /*指令的模版内容*/
        direction.templateUrl = "template/lesson.html"; //从html文件中加载指令模版的数据
        return direction;
    }) 
</script>
</html>
```

- 指令的使用

```html
<!DOCTYPE html>
<html lang="zh-CN" ng-app="lesson" ng-controller="MainCtrl">
<head>
    <meta charset="UTF-8">
    <script src="js/ng.1.2.30.js"></script>
    <link href="//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" href="css/boot.css">
    <title>赞</title>
</head>
<body>
<div class="container">
    <ul>
        <li ng-repeat="title in UserTitleList">
            <label>{{title.UserName}}</label>
            <h4>{{title.Title}}</h4><span>{{title.LikeAmount}}</span><like content="title"></like><br/>
            <label>{{title.Time}}</label>
            <ul>    <!-- 注意包含关系 -->
                <li ng-repeat="LikeList in title.LikeList">
                    <span>{{LikeList.Text}}</span>
                </li>
            </ul>
        </li>
    </ul>
</div>
</body>
<script>
    var app = angular.module('lesson', []);
    app.controller('MainCtrl', function ($scope) {
        $scope.UserTitleList =[
            {UserName: 'Tom', Title: '今天天气不错7', time:'2016-03-07', LikeAmount: 0, LikeList: []},
            {UserName: 'Tom', Title: '今天天气不错6', time:'2016-03-06', LikeAmount: 0, LikeList: []},
            {UserName: 'Tom', Title: '今天天气不错5', time:'2016-03-05', LikeAmount: 0, LikeList: []},
            {UserName: 'Tom', Title: '今天天气不错4', time:'2016-03-04', LikeAmount: 0, LikeList: []},
            {UserName: 'Tom', Title: '今天天气不错3', time:'2016-03-03', LikeAmount: 0, LikeList: []},
            {UserName: 'Tom', Title: '今天天气不错2', time:'2016-03-02', LikeAmount: 0, LikeList: []},
            {UserName: 'Tom', Title: '今天天气不错1', time:'2016-03-02', LikeAmount: 0, LikeList: []},
        ];
    });

    app.directive('like', function () {
        var direction = {};
        direction.restrict = 'AE';
        direction.template = "<button ng-click='like()'>赞</button>";

        direction.scope = { /*指令接受外部参数*/
            content:"="
        };
        direction.link = function ($scope, element) {
            $scope.like = function () {
                $scope.content.LikeAmount = $scope.content.LikeAmount + 1;  /*改变传递进来的对象的属性值*/
                $scope.content.LikeList.push({Text:'Jerry'})
            };
        };
        return direction;
    })
</script>
</html>
```
