# requirejs

## 简单的require组织关系

```javascript
/*mode1.js*/
define(function () {
    return {a:3};
});
```

```javascript
/*mode2.js*/
define([ 'mode1'], function (m1) {
    var a,b = 2, c = 3;
    a = c * m1.a;
    return {
        a: a,
        b: b
    };
});
```

```javascript
/*main.js*/
require([ 'mode2' ], function (m2) {
    console.log(m2.a * m2.b);
});
```

```html
<!--index.html-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>首页</title>
    <script src="js/require.js" data-main="js/main"></script>
</head>
<body>
</body>
</html>
```

## 使用jquery并指定源

```javascript
//windwos.js
define(['jquery'], function ($) {
    function Window() {}

    Window.prototype = {
        alert: function () {

        },
        confirm: function () {},
        prompt: function () {}
    };

    return {
        Window: Window
    }
});
```

```javascript
//目的在于建立新的映射关系
require.config({
    paths: {
        jquery: 'jQuery-v3.1.1'
    }
});

//虽然再写了一次，但是jquery在全局只会加载一次
require(['jquery', 'window'], function ($, w) {
    new w.Window().alert();
});
```