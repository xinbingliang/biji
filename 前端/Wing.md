# Wing-Css

极其轻量级`css`响应式框架，只有`4kb`的`CSS`框架，[Wing下载](https://github.com/KingPixil/wing/)，支持IE10+

## 栅格系统

```html
	<section class="container"> 
        <div class="row">
            <div class="col-1">一半</div>
            <div class="col-6">一半</div>
        </div>
	</section>
```

## head标签

使用rems响应式排版，`1rem=10px`

```html
<section class="container"> 
       <h1>一级标题</h1>
       <h2>二级标题</h2>
       <h3>三级标题</h3>
</section>
```

## 按钮

```html
    <style type="text/css">
        section{
            background-color: #00b3ee;
        }
        .self{
            background: #40d5de;
        }
    </style>
</head>
<body>
   <section class="container"> 
        <button>默认按钮</button>
        <button class="btn btn-outline">白色的外边框的按钮</button>
        <button class="btn btn-outline-inverted">反色的外边框按钮</button>

        <button class="btn btn-clear">清除按钮</button>
        <button disabled>禁用按钮</button>

        <button class="self">自定义颜色</button>
   </section>
</body>
```

## 表单

```html
<section class="container">
       <form>
           <div class="row">
               <div class="col-6"><input type="text" placeholder="你的名字"></div>
               <div class="col-6">
                   <select placeholder="选择一个">
                       <option value="1">第一个</option>
                       <option value="2">第二个</option>
                   </select>
               </div>
           </div>

           <div class="row">
               <div class="col-12">
                   <textarea type="text" placeholder="你的信息"></textarea>
               </div>
           </div>

           <input type="submit" value="提交">
       </form>
</section>
```

## 列表

```html
<section class="container">
       <ul>
           <li>Item 1</li>
           <li>Item 2</li>
           <li>Item 3</li>
       </ul>
       <ol>
           <li>Item 1</li>
           <li>Item 2</li>
           <li>Item 3</li>
       </ol>
</section>
```

## 代码块

```html
<section class="container">
       <code>
           console.log("Hello World!');
       </code>

       <pre>
           <code>
               function sayHello() {
                   console.log("Hello Wing");
               }
           </code>
       </pre>
</section>
```

## 布局

```html
<section class="container">
       <!-- 右对齐 -->
       <div class="pull-right"></div>
       <!-- 左对齐 -->
       <div class="pull-left"></div>
       <!-- 文字居中 -->
       <div class="text-center"></div>
       <!-- 居中 -->
       <div class="center"></div>
       <!-- 水平对齐 -->
       <div class="horizontal-align"></div>
       <!-- 竖直对齐 -->
       <div class="vertical-align"></div>
       <!-- 充满 -->
       <div class="full-screen">ewr w4er</div>
</section>
```