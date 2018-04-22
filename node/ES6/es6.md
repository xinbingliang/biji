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

```

```



## proxy



## 类中的construct和name



## 类中执行变量提升和静态方法及可枚举问题



## 类继承



## Promise



## async



## esmodule





