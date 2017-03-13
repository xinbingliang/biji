#javascript面向对象
##词法分析阶段
* 变量冲突被忽略
* 函数冲突被覆盖

##闭包的好处
* 减少全局变量
* 减少传递给函数的参数数量
* 封装

>注意:   
>
>1. 闭包中对父变量是引用而不是复制
>2. 父函数每调用时就会创建新的闭包
```javascript
var i = document.getElementsByTagName('i');
for (var n = 0, l = i.length;n < l; n++){
    var ele = i[n];
    ele.onclick = (function (n) {
        return function () {
            console.log(n);
        }
    })(n);
}
```

## 多态

多态指：同一操作作用在不同的对象上，可以产生不同的解释和不同的类。     

```javascript
var googleMap = {
    show: function () {
        console.log("展示谷歌地图");
    }
};

var baiduMap = {
    show: function () {
        console.log("展示百度地图");
    }
};

var sosoMap = {
    show: function () {
        console.log("展示soso地图");
    }
};

function show(map) {
    map.show();
}

show(googleMap);
show(baiduMap);
show(sosoMap);
```

正如我们看到你一样，在JS中我们并不能对对象限制一定拥有某种方法，这是一种鸭子类型的概念，因为javascript若类型语言，并不能限定一个对象必须是某种类型，假如有一只鸡叫声跟鸭子一样，在我们只关注动物叫声的情况下他就是只鸭子。所以导致的结果就是我们对对象拥有的方法并布能做到严格控制，把鸡同鸭讲。

## apply和call

- apply接受两个参数，第一个参数指向指向函数体内的对象，第二个为数组或类数组，将作为被传递给函数的参数

  ```javascript
  var func = function(a, b, c){
      alert([a, b, c]);
  };

  func.apply(null, [1, 2, 3]);
  ```

- call接受的参数不固定，第一个参数和apply中的一样，后面的依次传入

  ```javascript
  var func = function(a, b, c){
      alert([a, b, c]);
  };

  func.call(null, 1, 2, 3);
  ```

第一个参数设置为null时，函数内的this指向默认的数组对象，在浏览器中是window，在ES5的严格模式下为null

##对象

* obj.constructor 查看构造器


```javascript
  function func() {}
  var obj = new func();
  console.log(obj.constructor);  // func
```
* typeof 类型测试
* obj instanceof Object 对象是构造器的实例(父构造器也可)
* 函数.prototype 原型属性      
* obj.prototype对象原型通过constructor 指回构造函数

  ```javascript
  function func() {}
  func.prototype.add = function(){
      a = 1;
  };
  console.log(func.prototype);        // func { add=function()}
  console.log(func.prototype.constructor);    //func

  var obj = new func();
  console.log(obj.constructor);               //func
  console.log(obj.constructor.prototype);     // func { add=function()}
  console.log(obj.__proto__);                 // func { add=function()}
  ```

![原型链](http://i.imgur.com/0F6YFyi.png)

##this指向

- 作为对象方法调用时，this指向该对象
- 作为普通函数调用时，this指向全局对象即window，请注意node平台
- 构造器中的this指向返回的那个对象，显式的返回对象，this指向被返回的对象
- call和apply将动态的传入函数的this
- 运行时决定
- 事件监听时指向触发对象

```javascript
function Person(pname) {
    this.name = pname;
    
    function pm() {		//私有方法
        console.log(this.name)
    }

    this.test = function () {
        console.log('public method')
        /*pm();       //这样调用其内部this指向window*/
        pm.apply(this); //修改pm内部this指向
    };
}

var obj = new Person('xin');
    obj.test();
```
或者

```javascript
function Person(pname) {
    function pm() {
        console.log(self.name);
    }

    var self = {
        name: pname,
        test: function () {
            pm();
        }
    };

    return self;
}

var person = new Person('xin');
person.test();
```
##复制(继承)
* 浅拷贝

  ```javascript
  var person = {
      name: 'xin',
      age: '23',
      address: {
          home: "home address",
          office: "office address"
      }
  };

  var programer = {
      language: 'javascript'
  };

  function extend(c, p) {
      var p = p || {};
      for (var prop in p){
          c[prop] = p[prop];
      }
  }

  extend(programer, person);
  person.address.home = '一个家';
  console.log(programer.address.home);
  ```
* 深拷贝(使用递归)

  ```javascript
  var Person = {
      name: 'xin',
      age: 23,
      address: {
          home: 'HOME ADDRESS',
          office: 'OFFICE ADDRESS'
      }
  };

  var programer = {
      language: '八国语言'
  };
  function Extend(c, p) {
      var p = p || {};

      for(var method in p){
          if(typeof p[method] === typeof {}){
              //容器对象要做相应的准备
              c[method] = (p[method].constructor == Array)?[]:{};
              Extend(c[method], p[method])
          }else {
              c[method] = p[method];
          }
      }
  }
  Extend(programer, Person);
  console.log(programer);
  ```
  使用构造函数

  ```javascript
  function Parent() {
      this.name = 'abc';
      this.address = {home: "home"};
  }

  function Child() {
      Parent.call(this);
      this.language = 'PHP';
  }

  var child = new Child();
  console.log(child.name);
  ```
  修改原型对像


```javascript
  var p = {name: 'cj'};
  function myCreate() {
      var ins;
      ins = {};
      //ins.__proto__ = p;  //指定父对象
      function F() {};
      F.prototype = p;
      ins = new F();
      return ins;
  }

  var obj = myCreate();
  console.log(obj.name);
```
  ES5中的Object.create()


```javascript
  var p = {name: 'cj'};
  var obj = Object.create(p);
  console.log(obj.name);
  //对对象增强
  var p = {name: 'cj'};

  var obj = Object.create(p, {'age': {value: 23}, salary:{value: 5300}});
  console.log(obj.age);
```

##一个对象同时是两个函数的实现
* 使用继承(不推荐使用)


```javascript
function P() {}
function C() {}

C.prototype = P.prototype;

var c1 = new C();
console.log(c1 instanceof C);
console.log(c1 instanceof P);

C.prototype.xxx = 'XXX';
var p1 = new P();
console.log(p1.xxx); 
```

* prototype指向另一构造函数的实例

  ```javascript
  function P () {}
  function C() {}

  C.prototype = new P();	//桥接
  var c1 = new C();

  console.log(c1 instanceof C);   //true
  console.log(c1 instanceof P);   //true

  C.prototype.xx = 'XX';
  var p = new P();
  console.log(p.xx);              //undefined
  ```
  假设P中存在this定义的属性，凭空创建的新的对象将造成内存的浪费

* 构建中间函数

  ```javascript
  function P() {}
  function C() {}

  function F() {}

  F.prototype = P.prototype;

  var f = new F();
  C.prototype = f;
  var c1 = new C();
  console.log(c1 instanceof  C);
  console.log(c1 instanceof  P);
  ```

  ​
  函数封装以上问题

  /*************保证在ES5以下的规范中也能生效**********/

  ```javascript
  function myObjCreate(nfun, fun) {
      if(Object.create){
          nfun.prototype = Object.create(fun.prototype);
      } else {
          function F() {
              
          }
          F.prototype = fun.prototype;
          var f = new F();
          nfun.prototype = f;
      }
  }

  function Person() {}

  Person.prototype.HeadCount = 1;
  Person.prototype.eat = function () {
      console.log('eating...')
  };

  function Programmer() {
  };

  myObjCreate(Programmer, Person);    //原型对象的重写使原来的内容消失
  Programmer.prototype.constructor = Programmer;  //指回构造函数

  Programmer.prototype.language = 'javascript';
  Programmer.prototype.work = function () {
      console.log('码农'+this.language);
  };

  console.log(Programmer.prototype.constructor);
  var phper = new Programmer();
  phper.eat();
  console.log(phper.language);
  ```



##做更好的封装，super，this的实现

```javascript
function Persson(name, age) {
    this.name = name;
    this.age = age;
}

Persson.prototype.headCount = 1;
Persson.prototype.eat = function () {
    console.log('eating...');
};

function Programmer(name, age) {
    Persson.apply(this, arguments);
}

createEx(Programmer, Persson);
Programmer.prototype.language = "javascript";
Programmer.prototype.work = function () {
    console.log('我会:'+this.language);
    Programmer.base.eat();
};

function  createEx(child, parent) {
    function F() {}

    F.prototype = parent.prototype;
    child.prototype = new F();

    child.prototype.constructor = child;

    child.super = child.base = parent.prototype;
}

var phper = new Programmer();
console.log(phper.work());
```

obj.hasOwnProperty('name') 对象是否是自己本身存在某属性
F.prototype.isPrototypeOf(f) f的构造函数是F 
Object.getPrototypeOf(f) 获得Object的构造函数

## 封装

在OOP中我们封装的内容包括:

- 封装数据 我们希望数据在对象创建后就不能被改变
- 封装实现 创建的对象我们并不清楚也不关心具体内部实现方法，只对实现的API感兴趣
- 封装类型 把对象真正的类型隐藏到抽象类和接口之后，典型的代表就是工厂方法
- 封装变化 这是设计模式的目的

这里具体看一下数据封装

```javascript
var obj = (function () {
    var _name = "xin";

    return {getName:function(){
        return _name;
    }};
})();

console.log(obj.getName());     //xin
console.log(obj._name);         //undefined
```


##多态
####方法重载(编译时决定)

```javascript
function Demo(a, b) {
    console.log(Demo.length);   //形参个数
    console.log(arguments.length);  //实参个数

    console.log(arguments[1])
}
```
argument永远要只读
####方法重写(运行时决定)

```javascript
function F() {}
var f = new F();

F.prototype.run = function () {
    console.log('run F');
};

f.run = function () {
    console.log('fun new F');

    //调用父
    F.prototype.run();
};

f.run();
```
另一种

```javascript
function Parent() {
    this.run = function () {
        console.log('Parent Runing');
    }
}

function child() {
    Parent.call(this);              //修改父的this指向

    var parentRun = this.run;       //保存父方法
    this.run = function () {        //新的方法
        console.log('child is running!');
        parentRun();                //最后再调用一次父
    }
}

var c = new child();
c.run();
```
第三种

```javascript
function Parent() {}

Parent.prototype.run = function () {
    console.log('parent run');
};

function Child() {}


Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

Child.super = Parent.prototype;
Child.prototype.run = function () {
    console.log('child is runing!');
    Child.super.run();
}

var c = new Child();
c.run();
```