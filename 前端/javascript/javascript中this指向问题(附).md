#javascript中this指向问题
##在对象方法中调用
在对象方法中this就是指该对象

```javascript
var obj = {
    name: 'xin',
    getName: function () {
        return this.name;
    }
};
console.log(obj.getName());     //xin
```
##作为普通函数调用
作为普通函数调用时指向全局对象，被全局对象调用指向全局对象，当查找不到this也指向全局对象


```javascript
window.name = 'xin';
function getName() {
    console.log(this.name);
}
getName();          //xin
```
上诉过程就是普通函数的调用也可以看作是全局对象对该函数的一次调用`window.getName();`

```javascript
window.name = "xin";
var myObject = {
    name: 'bing',
    getName: function () {
        return this.name;
    }
};

console.log(myObject.getName()); //bing
var newfunc = myObject.getName;
console.log(newfunc());          //xin
```
虽然上述函数是对象的函数，但是被重新赋值后变成了被全局作用域调用

```javascript
<body>
<div id="div1">这是一个div</div>
</body>
<script>
    window.id = "window";
    document.getElementById("div1").onclick = function () {
        console.log(this.id);           //div1
        
        var callback = function () {
            console.log(this.id);       //window
        };
        callback();
    }
</script>
```
在这个例子中，内部函数callback找不到this，就将this指向全局域的window。
##构造器中调用
构造器this指向创建的对象或明确{}返回的对象

```javascript
var myClass = function () {
    this.name = 'xin';
};

var obj = new myClass();
console.log(obj.name);
```
构造器中显示的返回对象

```javascript
var myClass = function () {
    var name = 'xin';
    return {
        name: 'bing'
    };
};

var obj = new myClass();
console.log(obj.name);          //bing
```
构造器中返回的不是{}对象，this将明确指向创建对象

```javascript
var myClass = function () {
    this.name = 'xin';
    return 'bing';
};

var obj = new myClass();
console.log(obj.name);          //xin
```

##call和apply调用
call和apply中的this将指向动态传递过来的对象

```javascript
var obj1 = {
    name: 'xin',
    getName: function () {
        return this.name;
    }
};

var obj2 = {
    name: 'bing'
};

console.log(obj1.getName());            //xin
console.log(obj1.getName.call(obj2));   //bing
```



