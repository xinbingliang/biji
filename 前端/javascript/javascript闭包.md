#javascript闭包
## 闭包的好处

- 减少全局变量
- 减少传递给函数的参数数量
- 封装

##闭包生存周期

```javascript
<body>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
</body>
<script>
    var nodes = document.getElementsByTagName('div');

    for (var i=0, l = nodes.length; i < l; i++){
        nodes[i].onclick = function () {
            console.log(i);
        }
    }
</script>
```
以上代码不论点击第几个都会返回5，原因是i在内存中只有一份,一旦for循环执行完成i就变成了5。我们需要的是每次循环都能自己记住i的值。利用闭包可以作为记住i值的手段，各个i将拥有更长的生存周期。

```javascript
    var nodes = document.getElementsByTagName('div');

    for (var i=0, l = nodes.length; i < l; i++){
        nodes[i].onclick = (function (i) {
            var func = function () {
                console.log(i);
            };
            return func;
        })(i);
    }
```
* 返回的是一个函数
* 希望一进来就自动
* 记得传递变化的值

##变量封装

我们希望对每次计算调用做一次缓存，以便重复计算的时候能提高效率。

```javascript
var mult = (function () {
    var cache = {};

    //用来做计算，计算方法将只会被创建一次
    var calculate = function () {
        var a = 1;
        for (var i = 0, l = arguments.length; i < l; i++){
            a = a * arguments[i];
        }
        return a;
    };

    return function (arguments) {
        var args = Array.prototype.join.call(arguments, ',');
        if(args in cache){
            return cache[args];
        }
        return cache[args] = calculate.apply(null, arguments);
    }
})();
```
当我们面对这样的问题时一定首先想到是使用全局变量，但是全局变量存在被后续代码修改的风险。
##在面向对象中的使用
javascript中并不存在定义私有变量的方法，这样是没有必要的。在一般的OOP编程中我们会这么干：

```javascript
var extent = {
    value: 0,
    callFunc: function () {
        this.value += 1;
        console.log(this.value);
    }
};

extent.callFunc();
extent.callFunc();
extent.callFunc();
```
或者使用原型继承这么写:

```javascript
var Extent = function () {
    this.value = 0;
};
Extent.prototype.callFunc = function () {
    this.value += 1;
    console.log(this.value);
};

var extent = new Extent();

extent.callFunc();
extent.callFunc();
extent.callFunc();
```
实际上原型继承还是不错的，至少降低value值被修改的风险，但是阅读起来还是不够顺畅，改用闭包实现

```javascript
var Extent = function () {
    var value = 0;

    return{
        callfunc: function () {
            value++;
            console.log(value);
        }
    }
};

var extent = Extent();
extent.callfunc();
extent.callfunc();
extent.callfunc();
extent.callfunc();
```

