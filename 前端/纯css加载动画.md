简约风

````html
<link rel="stylesheet" href="http://tawian.io/text-spinners/spinners.css">
````

or

````javascript
npm install --save text-spinners
````

请在目标元素上添加 aria-hidden="true" 或 role="progressbar" aria-label="Loading…" ，这样能够提供屏幕阅读的友好性。

* 三个点

````html
<span class="loading"></span>
````

* 顺时针正方形

````html
<span class="loading dots"></span>
````

* 8子形

````html
<span class="loading dots2"></span>
````

* 三点线

````html
<span class="loading dots3"></span>
````

* 单线十字架一

````
<span class="loading line"></span>
````

* 单线十字架二

````html
<span class="loading line2"></span>
````

* 加号

````html
<span class="loading plus"></span>
````

* 电梯

````html
<span class="loading lifting"></span>
````

* 汉堡

````html
<span class="loading hamburger"></span>
````

* 横条

````html
<span class="loading bar"></span>
````

* 竖条

````html
<span class="loading bar2"></span>
````

* 时钟

````html
<span class="loading open-circle"></span>
````

* 半圆

````html
<span class="loading arrow"></span>
````

* 三角形

````html
<span class="loading triangle"></span>
````

* 并排多个三角形

````html
<span class="loading triangles"></span>
````

* 等号

````html
<span class="loading beam"></span>
````

* 单球

````html
<span class="loading bullet"></span>
````

* 鱼眼

````html
<span class="loading bullseye"></span>
````

* 菱形鱼眼

````html
<span class="loading fish"></span>
````

* 哑铃

````html
<span class="loading toggle"></span>
````

* 数字倒计时

````html
<span class="loading countdown"></span>
````

## 绿色清新









## 简约动画

[GITHUB](https://github.com/ConnorAtherton/loaders.css)

### 简单使用

* 加载css

  ````css
  //动画是白色的所以使用时要做一些基础设置
  body{
    background: #ed5565;
  }

  main {
    width: 95%;
    max-width: 1000px;
    margin: 4em auto;
    opacity: 0; }
    main.loaded {
      transition: opacity 0.25s linear;
      opacity: 1; }
    main header {
      width: 100%; }
      main header > div {
        width: 50%; }
      main header > .left,
      main header > .right {
        height: 100%; }
    main .loaders {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex: 0 1 auto;
      flex-direction: row;
      flex-wrap: wrap; }
      main .loaders .loader {
        box-sizing: border-box;
        display: flex;
        flex: 0 1 auto;
        flex-direction: column;
        flex-grow: 1;
        flex-shrink: 0;
        flex-basis: 25%;
        max-width: 25%;
        height: 200px;
        align-items: center;
        justify-content: center; }
  ````

* 编写类型

````html
<!DOCTYPE html5>
<head>
  <link rel="stylesheet" type="text/css" href="demo.css"/>
  <link rel="stylesheet" type="text/css" href="../loaders.css"/>
</head>
<body>
  <main>
    <div class="loaders">

      <div class="loader">
        <div class="loader-inner ball-pulse">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div class="loader">
        <div class="loader-inner ball-grid-pulse">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div class="loader">
        <div class="loader-inner ball-clip-rotate">
          <div></div>
        </div>
      </div>


      <div class="loader">
        <div class="loader-inner ball-clip-rotate-pulse">
          <div></div>
          <div></div>
        </div>
      </div>

      <div class="loader">
        <div class="loader-inner square-spin">
          <div></div>
        </div>
      </div>

      <div class="loader">
        <div class="loader-inner ball-clip-rotate-multiple">
          <div></div>
          <div></div>
        </div>
      </div>

      <div class="loader">
        <div class="loader-inner ball-pulse-rise">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div class="loader">
        <div class="loader-inner ball-rotate">
          <div></div>
        </div>
      </div>

      <div class="loader">
        <div class="loader-inner cube-transition">
          <div></div>
          <div></div>
        </div>
      </div>

      <div class="loader">
        <div class="loader-inner ball-zig-zag">
          <div></div>
          <div></div>
        </div>
      </div>

      <div class="loader">
        <div class="loader-inner ball-zig-zag-deflect">
          <div></div>
          <div></div>
        </div>
      </div>

      <div class="loader">
        <div class="loader-inner ball-triangle-path">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div class="loader">
        <div class="loader-inner ball-scale">
          <div></div>
        </div>
      </div>

      <div class="loader">
        <div class="loader-inner line-scale">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div class="loader">
        <div class="loader-inner line-scale-party">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div class="loader">
        <div class="loader-inner ball-scale-multiple">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div class="loader">
        <div class="loader-inner ball-pulse-sync">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>


      <div class="loader">
        <div class="loader-inner ball-beat">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div class="loader">
        <div class="loader-inner line-scale-pulse-out">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div class="loader">
        <div class="loader-inner line-scale-pulse-out-rapid">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div class="loader">
        <div class="loader-inner ball-scale-ripple">
          <div></div>
        </div>
      </div>

      <div class="loader">
        <div class="loader-inner ball-scale-ripple-multiple">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div class="loader">
        <div class="loader-inner ball-spin-fade-loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div class="loader">
        <div class="loader-inner line-spin-fade-loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div class="loader">
        <div class="loader-inner triangle-skew-spin">
          <div></div>
        </div>
      </div>

      <div class="loader">
        <div class="loader-inner pacman">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div class="loader">
        <div class="loader-inner semi-circle-spin">
          <div></div>
        </div>
      </div>


      <div class="loader">
        <div class="loader-inner ball-grid-beat">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div class="loader">
        <div class="loader-inner ball-scale-random">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      
    </div>
  </main>
  <script>
    document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('main').className += 'loaded';
    });
  </script>
</body>
````

### 最小化使用

````html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title></title>
	<link rel="stylesheet" type="text/css" href="./loaders.min.css">
	<style type="text/css">
		body{
			background-color: #ed5565;
		}
	</style>
</head>
<body>	
<main>
	<div class="loaders">
		<div class="loader">
			<div class="loader-inner ball-pulse">
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	</div>
</main>
</body>
<script>
	/*这一不并不是必须的*/
	document.addEventListener('DOMContentLoaded', function () {
		document.querySelector('main').className += 'loaded';
	});
</script>
</html>
````

### 使用jquery简化编写

````html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title></title>
	<link rel="stylesheet" type="text/css" href="./loaders.min.css">
	<script src="jquery.js"></script>
	<script src="loaders.css.js"></script>
	<style type="text/css">
		body{
			background-color: #ed5565;
		}
	</style>
</head>
<body>	
<main>
	<div class="loader-inner ball-pulse"></div>
</main>
</body>
<script>
	//非必须
	document.addEventListener('DOMContentLoaded', function () {
		document.querySelector('main').className += 'loaded';
	});

	$('.loader-inner').loaders()
</script>
</html>
````



