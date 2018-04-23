# ES6

## let和const

## 解构赋值

### 变量赋值

```javascript
// 基本解构赋值
> let arr = [1, 2, 3]
> let [x, y, z] = arr

//默认值
> let [x1, x2=21] = [1]
undefined
> x2
21

//省略赋值
> let [,m1, m2] = [1, 2, 3]
undefined
> m1
2

//不定参数
> let [y1, y2, ...y3] = [1, 2, 3, 4]
undefined
> y3
[ 3, 4 ]

//对象解构赋值
//变量名和属性名一致可直接省略
//没有顺序
> {name, age} = {name: 'xinbingliang', age:10}
{ name: 'xinbingliang', age: 10 }
> name
'xinbingliang'

//默认值
> {name, age = 'haha'} = {name: 'xinbingliang'}
{ name: 'xinbingliang' }
> age
'haha'

//嵌套
> let {name, age, list:[a1, a2] } = {name:'xin', age:120, list:['js', 'go']}
undefined
> a1
'js'
```

###函数参数赋值

```javascript
//数组
function getA([a, b, c, ...d]){
    console.log(a)
    console.log(d)
}

getA([1, 2, 3, 4, 5, 6, 7, 8])

//对象
function getB({name, age}){
    console.log(name, age)
}

getB({name: 'xin', age: 120})

//特殊默认值
function getB({name, age} = {}){
    console.log(name, age)
}

getB()

function getB({name, age} = {name: 'xin', age: 10000}){
    console.log(name, age)
}

getB()
```

## 字符串扩展

### 扩展方法

* `includes` 判断字符串中有没有指定字符

  ```javascript
  > str = '123456'
  '123456'
  > str.includes('5', 1)
  true

  ```

* `startsWith` 和`endsWith` 判断是否以指定字符开头

* `repeat` 复制

  ```javascript
  > str = 'abc'
  'abc'
  > str.repeat(12)
  'abcabcabcabcabcabcabcabcabcabcabcabc'
  ```

* `padStart`和`padEnd`  补全字符串

  ```javascript
  > str = 'ab'
  'ab'
  > str.padStart(5, 'j')
  'jjjab'
  ```

### 模板字符串

```javascript
let name = '123'
let str = `-------${name}----------`
console.log(str)
```

## 数组扩展

### 方法扩展

````javascript
//生成一个数组
> Array(1,2,3)
[ 1, 2, 3 ]

//得到7个空位
> Array(7)
[ <7 empty items> ]

//解决空位问题
> Array.of(1, 2, 3)
[ 1, 2, 3 ]
> Array.of(7)
[ 7 ]

//类数组处理
> Array.from([1, 2, 3])
[ 1, 2, 3 ]
> Array.from("123")
[ '1', '2', '3' ]

````

###类扩展

```javascript
//指定位置替换，原数组长度不变
> let arr1 = [1, 2, 3, 4, 5, 6]
undefined
> arr1.copyWithin(4, 2, 4)
[ 1, 2, 3, 4, 3, 4 ]

// 指定字符填充数组
> let arr2 = [1, 2, 3, 4, 5]
undefined
> arr2.fill('12', 3)
[ 1, 2, 3, '12', '12' ]

//过滤
> let arr3 = ['hhh', 1, 2, 3, '22']
undefined
> arr3.filter((item, index)=>{return true})
[ 'hhh', 1, 2, 3, '22' ]

//遍历查找，找到就停止,findIndx()返回索引
> arr3.find((item)=>{return typeof item == "number"})
1

//includes 判断数组中否有某项
//every 表示每一项都满足条件
//some 表示有一项满足

//reduce 跌代
arr4.reduce((prev, item)=>{return prev + item})
//reduceRight

//keys 遍历接口
> for (let key of arr5.keys()){
... console.log(key);
... }

//entries
> for (let [index, item] of arr6.entries()){
... console.log(index);
... }
```

## 函数扩展

### 默认值

````javascript
function fn(x = 1, y = 2) {
}
````

### 解构赋值

````
function fn({name = '1', age = '2'} = {name: 1, age: 2}) {
    
}

fn()
````

### arguments

## 运算符和箭头函数

### 运算符扩展

````javascript
//非数组变成数组
let str = "123"
console.log(...str)

//合并数组
arr1.concat(arr2)
[...arr1, ...arr2]
````

###箭头函数

## 对象扩展

### 对象简洁表达

```javascript
let obj = {
    fn(){},
    [str]: name,
    ["my"+str]: name
}
```

### 方法

```javascript
Object.asign(obj1, obj2) //合并对象
Object.keys()
Object.values()
Object.entries()
```

## symbol

用来当作对象属性，但不能跟其它值进行计算

```javascript
let sym1 = Symbol()
let sym2 = Symbol()
console.log(typeof sym1)
console.log(sym1 === sym2)

//内部描述
let sym3 = Symbol('foo')
let sym4 = Symbol('foo')
console.log(sym3 == sym4)

//作为对想属性
let obj = {
}
obj[sym3] = '123'
obj[sym4] = '123'

console.log(obj)

//显示字符串
console.log(Symbol('121212').toString())

//找到值，没有则创建
console.log(Symbol.for("foo") === Symbol.for('foo'))

//找到描述
console.log(Symbol.keyFor(Symbol.for("foo")))
```

## set

默认去重，有value没有key

```javascript
set1.forEach((item, index, input)=>{
    
})

for (let item of set1.keys()){
    //key也是值
}
```

## Map

有value也有key

## proxy

对对象的默认操作进行拦截

```javascript
let obj = {
    name: 'xinbingliang'
}
let proxy1 = new Proxy(obj, {
    get(target, key, proxy){
        //target 源对象
        //key 键名
        //proxy 当前实例
        return 'xinxin'
    }
})

//get 只要是获得就会触发
console.log(proxy1.name)
```

- **get(target, propKey, receiver)**：拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`。
- **set(target, propKey, value, receiver)**：拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`，返回一个布尔值。
- **has(target, propKey)**：拦截`propKey in proxy`的操作，返回一个布尔值。
- **deleteProperty(target, propKey)**：拦截`delete proxy[propKey]`的操作，返回一个布尔值。
- **ownKeys(target)**：拦截`Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、`for...in`循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而`Object.keys()`的返回结果仅包括目标对象自身的可遍历属性。
- **getOwnPropertyDescriptor(target, propKey)**：拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。
- **defineProperty(target, propKey, propDesc)**：拦截`Object.defineProperty(proxy, propKey, propDesc）`、`Object.defineProperties(proxy, propDescs)`，返回一个布尔值。
- **preventExtensions(target)**：拦截`Object.preventExtensions(proxy)`，返回一个布尔值。
- **getPrototypeOf(target)**：拦截`Object.getPrototypeOf(proxy)`，返回一个对象。
- **isExtensible(target)**：拦截`Object.isExtensible(proxy)`，返回一个布尔值。
- **setPrototypeOf(target, proto)**：拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
- **apply(target, object, args)**：拦截 Proxy 实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。
- **construct(target, args)**：拦截 Proxy 实例作为构造函数调用的操作，比如`new proxy(...args)`。

## 类中的construct和name

````javascript
let A = class AA{
    constructor(x){
        this.x = x;
        //AA此时只能在内部使用
        console.log(AA.name)
        //return 是基本类型对对象没有影响，若是引用数据类型就会改变对象指向
    }

    getA(){
        console.log(AA.name)        
    }
}

let a = new A(10)
console.log(a.x)
````

## 类中执行、变量提升、静态方法及可枚举问题

### 立即执行

````javascript
let a1 = new class{
    constructor(name){
        console.log(name)
    }
}('xin');
````

### 变量提升

没有变量提示

### 静态方法

````javascript
class AA{
    constructor(){
        this.v = 'aa'
    }
    //同样相当于在原型上
    A(){

    }
    //类本身方法，不能被实例使用，单能被子类继承
    static B(){

    }
}

let aa = new AA()
````

````javascript
class F{
    static getF(){
        console.log("getF");
    }
}

class G extends F{
    constructor(){
        super();
    }

    static getF()(){
        super.getF();
    }
}
````

### 枚举

原型上的方法不能枚举

## 类继承

````javascript
class A{
    constructor(x){
        this.x = x
    }
    getx(){
        console.log(this.x)
    }
    static getY(){
        console.log(this)
    }
}

class B extends A{
    constructor(x){
        //子类没有this, super()执行完成之后才有this
        super(x); //指父类的constructor

        this.y = 100;
    }
    getx(){
        super.getx() //super指父类原型
    }

    //静态方法的继承
    static getY(){
        super.getY(); //super指父类本身
    }
}
````

## Promise

用于处理异步，有pending、Fulfilled、 Rejected三种状态

### 基本语法

````javascript
let pro1 = new Promise((resolve, reject)=>{
    //resolve 函数 
    //reject 函数
    resolve("success"); //成功
    reject("fail"); //失败
})

pro1.then((res)=>{
    //成功的回调
    console.log(res)
},
(e)=>{
    //失败的回调
    console.log(e)
})

console.log('ok') //先执行Promise后直接执行，then是异步的
````

### all

```javascript
//Promise.all([每一项都是Promise对象])
let p1 = new Promise((resolve, reject)=>{
    resolve("ok1")
})

let p2 = new Promise((resolve, reject)=>{
    resolve("ok2")
})

let p3 = new Promise((resolve, reject)=>{
    reject('err2')
})

let p_all = Promise.all([p1, p2, p3])
p_all.then((res)=>{ //每一项都成功才会执行
    console.log(res)
}).catch((e)=>{ //有一个错误就执行
    console.log(e)
})
```

### race

```javascript
let p1 = new Promise((resolve, reject)=>{
    resolve("ok1")
})

let p2 = new Promise((resolve, reject)=>{
    resolve("ok2")
})

let p3 = new Promise((resolve, reject)=>{
    resolve("ok3")
})

Promise.race([p1, p2, p3]).then((res)=>{ //第一个正确被确认,彼此之间的顺序不会等待
    console.log(res)
}).catch((e)=>{
    console.log(e)
})
```

## async

### async

````javascript
// 默认返回一个Promise对象
async function getA() {
    //return 得到成功的回调
    //有错误就会被catch就会被捕捉
    throw new Error("对不起");
    return "aaa";
}

getA().then((res)=>{
    console.log(res)
}).catch((e)=>{
    console.log(e)
})
````

### await

````javascript
let p = new Promise((resolve, reject)=>{
    resolve('aaaa')
})

async function getA(){
    //await 后面是一个promise实例
    await p //先执行异步代码后才能执行后面代码，把异步变成同步
}

getA().then((res)=>{
    console.log(res)
}).catch((e)=>{
    console.log(e)
})
````