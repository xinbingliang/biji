# less

## webstorm设置Less环境

* `npm install less -g` 
* file>settings>tool>file Watchers>+>less

## 设置字符编码

```css
@charset "utf-8";
```

## 对其他less文件的引用

````css
@import "index";
````

## 使用考拉编译的特点

* `//` 会被忽略


* `/**/` 会被保留

## 使用变量

```css
@bgcolor: #abcdef;
body{
  background-color: @bgcolor;
}
```

## 使用简单的混合

```css
.box{
  border: 1px solid #cccccc;
  background-color: #dddddd;
  border-radius: 8px;
  box-shadow: 0 0 3px #cccccc;
}

div{
  width: 250px;
  height: 250px;
  .box;
}
```

## 带参数的混合

多个值使用`,`隔开

```css
.box(@border-color, @bgcolor, @radius, @box-shadow-color){
  border: 1px solid @border-color;
  background-color: @bgcolor;
  border-radius: @radius;
  box-shadow: 0 0 3px @box-shadow-color;
}

div{
  width: 250px;
  height: 250px;
  .box(#cccccc, #dddddd, 8px, #cccccc);
}
```

先组装后使用

```css
.mix{
  .box(#cccccc, #dddddd, 8px, #cccccc);
}
div{
  width: 250px;
  height: 250px;
  .box(#cccccc, #dddddd, 8px, #cccccc);
  .mix;
}
```

## 使用默认值

```css
.box(@border-color, @bgcolor, @radius, @box-shadow-color: #cccccc){
  border: 1px solid @border-color;
  background-color: @bgcolor;
  border-radius: @radius;
  box-shadow: 0 0 3px @box-shadow-color;
}
div{
  width: 250px;
  height: 250px;
  .box(#cccccc, #dddddd, 8px);
  .box(#cccccc, #dddddd, 8px, #cccccc);
}
```

**.border()和.border是不一样的**

```css
.box(@border-color, @bgcolor, @radius, @box-shadow-color: #cccccc){
  border: 1px solid @border-color;
  background-color: @bgcolor;
  border-radius: @radius;
  box-shadow: 0 0 3px @box-shadow-color;
}
.box{
  border: 1px solid red;
}
div{
  width: 250px;
  height: 250px;
  .box(#cccccc, #dddddd, 8px);
  .box;
}
```

## 匹配模式

```css
@charset "utf-8";

//向下
.sanjiao(bottom, @width, @color){
  border-width: @width;
  border-color: @color transparent transparent transparent;
  border-style: solid dashed dashed dashed;
}

//向左
.sanjiao(left, @width, @color ){
  border: @width;
  border-color: transparent @color transparent transparent;
  border-style: dashed solid dashed dashed;
}

//向上
.sanjiao(top, @width, @color){
  border: @width;
  border-color: transparent transparent @color transparent;
  border-style: dashed dashed solid dashed;
}

//向右
.sanjiao(right, @width, @color){
  border: @width;
  border-color: transparent transparent transparent @color;
  border-style: dashed dashed dashed solid;
}

div{
  width: 0;
  height: 0;
  .sanjiao(right, 10px, #abcd00);
}
```

**每一个都要被引用**

```css
//会被自动调用
.sanjiao(@_, @width, @color){
  width: 0;
  padding: 0;
  overflow: hidden;
}

div{
  .sanjiao(right, 10px, #abcd00);
}
```

## 使用运算符

```less
@width: 200px;
@height: 200px;

div{
  width: @width - 10;
  height: @height - 50;
  background-color: aquamarine;
}
```

## 嵌套使用

```css
ul{
  background-color: aquamarine;
  list-style: none;
  padding: 10px;

  li{
    margin-top: 5px;
    background-color: aliceblue;
    float: left;
    &:last-child a{	//&代表父级标签
     
    }
  }
}
```

## 使用argument

```css
.border(@width:1px,@color:#ccc,@style:solid){
    border: @arguments;
}
```

## 拒绝编译

~''中的内容将不会被编译

```css
div{
  width: ~'cale(300 - 20s)';
}
```

## !import

```css
.border(@width:1px,@color:#ccc,@style:solid){
  border: @arguments;
}

div{
  .border() !important;
}
```































