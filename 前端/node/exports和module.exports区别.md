# exports和module.exports区别

## 两者相等

```javascript
'use strict';

console.log(exports);
console.log(module.exports);
console.log(exports === module.exports);  //true
console.log(exports === module.exports);  //true

console.log(module);
```

## 两者存在时module.exports为主

````javascript
//1.js
'use strict';

exports.id = 'exports的id';
exports.id2 = 'exports2的id2';
exports.func = function () {
  console.log('exports的函数')
};
exports.func2 = function () {
  console.log('exports的函数2');
};

module.exports = {
  id: 'module.exports的id',
  func: function () {
    console.log('module.exports的函数')
  }
};
````

````javascript
//2.js
var a = require('./1.js');

console.log(a.id); //module.exports的id
a.func();	//module.exports的函数

console.log(a.id2);	//undefined

console.log(a.id); //module.exports的id
a.func2(); //出错
````

module.exports将exports覆盖

## 适合使用的环境

````javascript
'use strict';
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.speak = function () {
  console.log(this.name, '<--->', this.age);
};

module.exports = Person;
````

````javascript
'use strict';
var a = require('./1.js');
var person = new a('Kylin', 20);

person.speak();
````

如果只是单一属性或方法的话，就使用`exports.属性/方法`。要是导出多个属性或方法或使用`对象构造方法`，结合`prototype`等，就建议使用`module.exports = {}`

```javascript
//rocker.js
module.exports = function(name, age) {
    this.name = name;
    this.age = age;
    this.about = function() {
        console.log(this.name +' is '+ this.age +' years old');
    };
}
```

````javascript
var Rocker = require('./rocker.js');
var r = new Rocker('Ozzy', 62);
r.about(); // Ozzy is 62 years old
````













