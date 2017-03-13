# js插件

## [singlepagenav](https://github.com/jeroenweustink/single-page-nav)全屏滚动插件

1. 引入文件编写连接
2. 编写要跳转到的位置
3. 获得连接位置进行配置

```javascript
$(selector).singlepagenav({
    offset: 0,                  // Offset from top
    currentClass: 'current',    // Class added to menu link when section is active
    currentThreshold: 0,        // Threshold for triggering current section action
    duration: 500,              // Duration of scroll animation in milliseconds 
    effect: 'swing',            // Effect for scroll animation
    started: function (){},     // Callback at start of animation
    finished: function (){}     // Callback after animation is finished
});
```



## 使用[wow.min.js](http://mynameismatthieu.com/WOW/index.html)和[animate.css](https://daneden.github.io/animate.css/)组合，制作区块进入动画

1. 引入相关文件

2. 进行初始化

   ````javascript
   new WOW().init();
   ````

   ​

3. 在块元素上添加wow和动画效果

### 可用属性

- data-wow-duration(动画持续时间) `data-wow-duration="2s"`
- data-wow-delay(动画延时) `data-wow-delay="5s"`
- data-wow-offset(偏移量) `data-wow-offset="10"` 距离可视区域多远开始执行动画
- data-wow-iteration="10"(重复次数) `data-wow-iteration="10"


## [Chart.js](http://www.bootcss.com/p/chart.js/docs/) 前端图标绘制

具体使用查看文档即可






