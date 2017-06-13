# promise

- promise只有三种状态，未完成，完成(fulfilled)和失败(rejected)。
- promise的状态可以由未完成转换成完成，或者未完成转换成失败。
- promise的状态转换只发生一次

promise有一个then方法，then方法可以接受3个函数作为参数。前两个函数对应promise的两种状态fulfilled, rejected的回调函数。第三个函数用于处理进度信息。

```javascript
promiseSomething().then(function(fulfilled){
	//当promise状态变成fulfilled时，调用此函数
},function(rejected){
	//当promise状态变成rejected时，调用此函数
},function(progress){
	//当返回进度信息时，调用此函数
});
```

**简单使用**

`````javascript
var Q = require('q');
var defer = Q.defer();
/**
 * 获取初始promise
 * @private
 */
function getInitialPromise() {
  return defer.promise;
}
/**
 * 为promise设置三种状态的回调函数
 */
getInitialPromise().then(function(success){
    console.log(success);
},function(error){
    console.log(error);
},function(progress){
    console.log(progress);
});
defer.notify('in progress');//控制台打印in progress
defer.resolve('resolve');   //控制台打印resolve
defer.reject('reject');        //没有输出。promise的状态只能改变一次
`````

## promise传递

当function(fulfilled)或者function(rejected)返回一个值，比如一个字符串，数组，对象等等，那么outputPromise的状态就会变成fulfilled。

在下面这个例子中，我们可以看到，当我们把inputPromise的状态通过defer.resovle()变成fulfilled时，控制台输出fulfilled.

**当我们把inputPromise的状态通过defer.reject()变成rejected，控制台输出rejected**

```javascript
var Q = require('q');
var defer = Q.defer();
/**
 * 通过defer获得promise
 * @private
 */
function getInputPromise() {
    return defer.promise;
}

/**
 * 当inputPromise状态由未完成变成fulfil时，调用function(fulfilled)
 * 当inputPromise状态由未完成变成rejected时，调用function(rejected)
 * 将then返回的promise赋给outputPromise
 * function(fulfilled) 和 function(rejected) 通过返回字符串将outputPromise的状态由
 * 未完成改变为fulfilled
 * @private
 */
var outputPromise = getInputPromise().then(function(fulfilled){
    return 'fulfilled';
},function(rejected){
    return 'rejected';
});

/**
 * 当outputPromise状态由未完成变成fulfil时，调用function(fulfilled)，控制台打印'fulfilled: fulfilled'。
 * 当outputPromise状态由未完成变成rejected, 调用function(rejected), 控制台打印'fulfilled: rejected'。
 */
outputPromise.then(function(fulfilled){
    console.log('fulfilled: ' + fulfilled);
},function(rejected){
    console.log('rejected: ' + rejected);
});

/**
 * 将inputPromise的状态由未完成变成rejected
 */
defer.reject(); //输出 fulfilled: rejected

/**
 * 将inputPromise的状态由未完成变成fulfilled
 */
//defer.resolve(); //输出 fulfilled: fulfilled
```

**当function(fulfilled)或者function(rejected)抛出异常时，那么outputPromise的状态就会变成rejected**

`````javascript
var Q = require('q');
var fs = require('fs');
var defer = Q.defer();

/**
 * 通过defer获得promise
 * @private
 */
function getInputPromise() {
    return defer.promise;
}

/**
 * 当inputPromise状态由未完成变成fulfil时，调用function(fulfilled)
 * 当inputPromise状态由未完成变成rejected时，调用function(rejected)
 * 将then返回的promise赋给outputPromise
 * function(fulfilled) 和 function(rejected) 通过抛出异常将outputPromise的状态由
 * 未完成改变为reject
 * @private
 */
var outputPromise = getInputPromise().then(function(fulfilled){
    throw new Error('fulfilled');
},function(rejected){
    throw new Error('rejected');
});

/**
 * 当outputPromise状态由未完成变成fulfil时，调用function(fulfilled)。
 * 当outputPromise状态由未完成变成rejected, 调用function(rejected)。
 */
outputPromise.then(function(fulfilled){
    console.log('fulfilled: ' + fulfilled);
},function(rejected){
    console.log('rejected: ' + rejected);
});

/**
 * 将inputPromise的状态由未完成变成rejected
 */
defer.reject();     //控制台打印 rejected [Error:rejected]

/**
 * 将inputPromise的状态由未完成变成fulfilled
 */
//defer.resolve(); //控制台打印 rejected [Error:fulfilled]
`````

**当function(fulfilled)或者function(rejected)返回一个promise时，outputPromise就会成为这个新的promise.**







[原文](https://www.shiyanlou.com/courses/493/labs/1677/document)







