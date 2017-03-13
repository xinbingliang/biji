# Flex布局详解

## 是什么

* 容器指定为flex布局

  ```css
  .box{
  	display: flex;
  }
  ```

* 行内元素使用flex布局

  ```css
  .box{
   	display: inline-flex; 
  }
  ```

* Webkit内核的浏览器使用Flex布局

  ```
  .box{
    	display: -webkit-flex;
    	display: flex;
  }
  ```

## 基本概念

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png)

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做`main start`，结束位置叫做`main end`；交叉轴的开始位置叫做`cross start`，结束位置叫做`cross end`。项目默认沿主轴排列。单个项目占据的主轴空间叫做`main size`，占据的交叉轴空间叫做`cross size`。

## 容器的属性

### flex-direction 

决定主轴的排列方式，当容器规定了高度会在竖直方向上均匀排布

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071005.png)

* row(默认) 主轴为水平方向，起点在左端
* row-reverse 主轴为水平方向，起点在右端
* column 主轴为垂直方向，起点在上沿
* column-reverse 主轴为垂直方向，起点在下沿

### flex-wrap 

定义在水平方向上排布不下时的换行规则

* nowrap(默认) 不换行，内部item的大小会随容器宽度变化而变化

  ![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071007.png)

* wrap 多余的折到下一行

  ![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071008.jpg)

* wrap-reverse 换行，超出的行在下方，即多出部分在上方

  ![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071009.jpg)


### flex-flow

`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`

### justify-content

定义项目在主轴上的对齐方式

* flex-start(默认) 左对齐
* flex-end 右对齐
* center 居中
* space-between 两端对齐，项目之间的间隔都相等
* space-around 每个项目两侧的间隔相等。所以项目之间的间隔与边框间隔大一倍

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071010.png)

### align-items

定义在竖直交叉轴上如何对齐

* flex-start  竖直方向起点对齐
* flex-end 竖直方向终点对齐
* center 竖直方向中点对齐
* baseline 项目文字的基线对齐
* stretch (默认值) 如果项目（item）没有设置高度或者auto，将占满整个容器的高度

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071011.png)

### align-content

多根轴线的对齐方式，只有一根轴线时，该属性不起作用

* flex-start 竖直方向起点对齐
* flex-end 竖直方式向终点对齐
* center 竖直方向上中点对齐
* space-between 竖直方向上两端对齐，间隔平均分布
* space-around 竖直方向上间隔相等，轴线之间的间隔比轴线与边框的间隔大一倍
* stretch (默认值) 竖直方向上充满

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071012.png)

## 项目属性

### order

定义项目排列的顺序，数值越小，排列越靠前，默认为0

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071013.png)

### flex-grow

定义项目的放大比例，默认为0,存在剩余空间也不放大，如果全为1就等分剩余空间，一个为2其他为1，那么前者比后者大一倍

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071014.png)

### flex-shrink

定义项目的缩小比列，默认为1，空间不足，该项目会缩小。设置为0将不缩小，设置为1缩小，数字代表缩小的占比

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071015.jpg)

### flex-basis

定义在分配多余空间之前，项目占据的主轴空间，浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。可以使用百分比也可以

### flex

`flex-grow`，`flex-shrink`，`flex-basis` 简写默认0 1 auto。后两个属性可选。

````
flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
````

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

### align-self

允许单个项目与其他项目有不一样的对齐方式，覆盖align-items属性，默认auto继承父元素

```
align-self: auto | flex-start | flex-end | center | baseline | stretch;
```