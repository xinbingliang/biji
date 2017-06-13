# benchmark性能测试

* 安装benchmark

````javascript
"use strict";

const benchmark = require('benchmark');

let suite = new benchmark.Suite();
var int1 = function(str){
    return +str;
}
var int2 = function(str){
    return parseInt(str, 10);
}
var int3 = function(str){
    return Number(str);
}

var number = '100';
suite
.add('+', function(){
    int1(number);
})
.add('parseInt', function(){
    int2(number);
})
.add('Number', function(){
    int3(number);
})
.on('cycle', function(event){
    console.log(String(event.target));
})
.on('complete', function(){
    console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({
    'async': true
})
````

