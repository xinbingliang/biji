# ES6速成

[原文地址](http://www.jianshu.com/p/ebfeb687eb70)

## let、const

`let`和`const`和`var`类似用来声明变量

````javascript
var name = 'zach'

while (true) {
    var name = 'obama'
    console.log(name)  //obama
    break
}

console.log(name)  //obama
````

使用let在`{}`创建局部做作用域

```javascript
let name = 'zach'

while (true) {
    let name = 'obama'
    console.log(name)  //obama
    break
}

console.log(name)  //zach
```

循环中的问题

````javascript
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
````

 使用let

```javascript
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```

当然也可以用闭包解决

定义常量，常量被声明后就不能再变化，常用来做包的导入

```javascript
const PI = Math.PI
PI = 23

const monent = require('moment')
```

## class、extends、super

使用以上语法来打造：原型、构造函数，继承

```javascript
class Animal {
    constructor(){
        this.type = 'animal'
    }
    says(say){
        console.log(this.type + ' says ' + say)
    }
}

let animal = new Animal()
animal.says('hello') //animal says hello

class Cat extends Animal {
    constructor(){
        super()
        this.type = 'cat'
    }
}

let cat = new Cat()
cat.says('hello') //cat says hello
```

## arrow function

就是匿名函数

```javascript
function(i){ return i + 1; } //ES5
(i) => i + 1 //ES6

function(x, y) { 
    x++;
    y--;
    return x + y;
}
(x, y) => {x++; y--; return x+y}
```

this丢失

````javascript
class Animal {
    constructor(){
        this.type = 'animal'
    }
    says(say){
        setTimeout(function(){
            console.log(this.type + ' says ' + say)
        }, 1000)
    }
}

 var animal = new Animal()
 animal.says('hi')  //undefined says hi
````

1. 解决

   ````javascript
    says(say){
        var self = this;
        setTimeout(function(){
            console.log(self.type + ' says ' + say)
        }, 1000)
   }
   ````

2. `bind(this)`

   ````javascript
    says(say){
        setTimeout(function(){
            console.log(self.type + ' says ' + say)
        }.bind(this), 1000)
   }
   ````

3. 使用箭头函数

   ```javascript
   class Animal {
       constructor(){
           this.type = 'animal'
       }
       says(say){
           setTimeout( () => {
               console.log(this.type + ' says ' + say)
           }, 1000)
       }
   }
    var animal = new Animal()
    animal.says('hi')  //animal says hi
   ```

## template string

避免使用+连接字符串

````javascript
'use strict';

let obj = {
  'a': '辛',
  'b': '丙亮'
};

console.log(`
  <h1>${obj.a}</h1>
  <b>${obj.b}</b>
`);
````

## destructuring

解构赋值

```javascript
let cat = 'ken'
let dog = 'lili'
let zoo = {cat, dog}
console.log(zoo)  //Object {cat: "ken", dog: "lili"}
```

反写

```javascript
let dog = {type: 'animal', many: 2}
let { type, many} = dog
console.log(type, many)   //animal 2
```

## default、rest

默认值

```javascript
function animal(type = 'cat'){
    console.log(type)
}
animal()
```

rest语法

```javascript
function animals(...types){
    console.log(types)
}
animals('cat', 'dog', 'fish') //["cat", "dog", "fish"]
```

