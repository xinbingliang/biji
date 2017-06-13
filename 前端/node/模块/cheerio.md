# cheerio

## 初始化

### 首选方式

````javascript
var cheerio = require('cheerio'),
$ = cheerio.load('<ul id="fruits">...</ul>');
````

### 加载内容

```javascript
$ = require('cheerio');
$('ul', '<ul id="fruits">...</ul>');
```

### 加入其他.load()

可以传递一个额外的对象给.load()如果你需要更改任何的默认解析选项的话:

```javascript
$ = cheerio.load('<ul id="fruits">...</ul>', {
    ignoreWhitespace: true,
    xmlMode: true
});
```

些解析选项都是直接来自htmlparser ，因此任何在htmlparser里有效的选项在Chreeio里也是行得通的。

```javascript
{
    ignoreWhitespace: false,
    xmlMode: false,
    lowerCaseTags: false
}
```

### 案例

```javascript
const superagent = require('superagent');
const cheerio = require('cheerio');

superagent.get('https://cnodejs.org/')
  .end(function (err, sres) {
    if (err) {
      return next(err);
    }
    
    var $ = cheerio.load(sres.text);
    var items = [];
    $('#topic_list .topic_title').each(function (idx, element) {
      var $element = $(element);
      items.push({
        title: $element.attr('title'),
        href: $element.attr('href')
      });
    });

    console.log(items);
  });
```

### Selectors

### $(selectior,[context],[root])

选择器在 Context 范围内搜索，Context又在Root范围内搜索。selector 和context可是是一个字符串表达式，DOM元素，和DOM元素的数组，或者chreeio对象。root 是通常是HTML 文档字符串。

```javascript
$('.apple', '#fruits').text()
//=> Apple

$('ul .pear').attr('class')
//=> pear

$('li[class=orange]').html()
//=> <li class="orange">Orange</li>
```

### Attributes

**.attr(name,value)**

获得和修改属性。在匹配的元素中只能获得第一元素的属性。如果设置一个属性的值为null，则移除这个属性。你也可以传递一对键值，或者一个函数。

```javascript
$('ul').attr('id')
//=> fruits

$('.apple').attr('id', 'favorite').html()
//=> <li class="apple" id="favorite">Apple</li>
```

更多信息请看[这里](http://api.jquery.com/attr/)

**value([value])**

获得和修改input,select,textarea的value.注意: 对于传递键值和函数的支持还没有被加进去。

```javascript
$('input[type="text"]').val()
=> input_text

$('input[type="text"]').val('test').html()
=> <input type="text" value="test"/>
```

**.removeAttr(name)**

通过name删除属性

```javascript
$('.pear').removeAttr('class').html()
//=> <li>Pear</li>
```

**.hasClass( className )**

检查匹配的元素是否有给出的类名

```javascript
$('.pear').hasClass('pear')
//=> true

$('apple').hasClass('fruit')
//=> false

$('li').hasClass('pear')
//=> true
```

**.addClass(className)**

增加class(es)给所有匹配的elements.也可以传函数。

```javascript
$('.pear').addClass('fruit').html()
//=> <li class="pear fruit">Pear</li>

$('.apple').addClass('fruit red').html()
//=> <li class="apple fruit red">Apple</li>
```

更多信息看[这里](http://api.jquery.com/addClass/)

**.removeClass([className])**

从选择的elements里去除一个或多个有空格分开的class。如果className 没有定义，所有的classes将会被去除，也可以传函数。

```javascript
$('.pear').removeClass('pear').html()
//=> <li class="">Pear</li>

$('.apple').addClass('red').removeClass().html()
//=> <li class="">Apple</li>
```

更多信息看[这里](http://api.jquery.com/removeClass/)

**.is(selector)**

**.is(function(index))**

有任何元素匹配selector就返回true。如果使用判定函数，判定函数在选中的元素中执行，所以this指向当前的元素。

## Traversing

****.find(selector)**

获得一个在匹配的元素中由选择器滤过的后代。

```
$('#fruits').find('li').length
//=> 3
```

**.parent([selector])**

获得每个匹配元素的parent,可选择性的通过selector筛选。

```
$('.pear').parent().attr('id')
//=> fruits
```

**.parents([selector])**

获得通过选择器筛选匹配的元素的parent集合。

```
$('.orange').parents().length
// => 2
$('.orange').parents('#fruits').length
// => 1
```

**.closest([selector])**

对于每个集合内的元素，通过测试这个元素和DOM层级关系上的祖先元素，获得第一个匹配的元素

```
$('.orange').closest()
// => []
$('.orange').closest('.apple')
// => []
$('.orange').closest('li')
// => [<li class="orange">Orange</li>]
$('.orange').closest('#fruits')
// => [<ul id="fruits"> ... </ul>]
```

**.next()**获得第一个本元素之后的同级元素

```
$('.apple').next().hasClass('orange')
//=> true
```

**.nextAll()**

获得本元素之后的所有同级元素

```
$('.apple').nextAll()
//=> [<li class="orange">Orange</li>, <li class="pear">Pear</li>]
```

**.prev()**

获得本元素之前的第一个同级元素

```
$('.orange').prev().hasClass('apple')
//=> true
```

**.preAll()**

```
$('.pear').prevAll()
//=> [<li class="orange">Orange</li>, <li class="apple">Apple</li>]
```

获得本元素前的所有同级元素

**.slice(start,[end])**

获得选定范围内的元素

```
$('li').slice(1).eq(0).text()
//=> 'Orange'

$('li').slice(1, 2).length
//=> 1
```

**.siblings(selector)**

获得被选择的同级元素，除去自己??

```
$('.pear').siblings().length
//=> 2

$('.pear').siblings('.orange').length
//=> 1
```

**.children(selector)**

获被选择元素的子元素

```
$('#fruits').children().length
//=> 3

$('#fruits').children('.pear').text()
//=> Pear
```

**.each(function(index,element))**

迭代一个cheerio对象，为每个匹配元素执行一个函数。When the callback is fired, the function is fired in the context of the DOM element, so this refers to the current element, which is equivalent to the function parameter element.要提早跳出循环，返回false.

```
var fruits = [];

$('li').each(function(i, elem) {
  fruits[i] = $(this).text();
});

fruits.join(', ');
//=> Apple, Orange, Pear
```

**.map(function(index,element))**

迭代一个cheerio对象，为每个匹配元素执行一个函数。Map会返回一个迭代结果的数组。the function is fired in the context of the DOM element, so this refers to the current element, which is equivalent to the function parameter element

```
$('li').map(function(i, el) {
  // this === el
  return $(this).attr('class');
}).join(', ');
//=> apple, orange, pear
```

**.filter(selector)**

**.filter(function(index))**

迭代一个cheerio对象，滤出匹配选择器或者是传进去的函数的元素。如果使用函数方法，这个函数在被选择的元素中执行，所以this指向的手势当前元素。

Selector:

```
$('li').filter('.orange').attr('class');
//=> orange
```

Function:

```
$('li').filter(function(i, el) {
  // this === el
  return $(this).attr('class') === 'orange';
}).attr('class')
//=> orange
```

**.first()**

会选择chreeio对象的第一个元素

```
$('#fruits').children().first().text()
//=> Apple
```

**.last()**

```
$('#fruits').children().last().text()
//=> Pear
```

会选择chreeio对象的最后一个元素

**.eq(i)**

通过索引筛选匹配的元素。使用.eq(-i)就从最后一个元素向前数。

```
$('li').eq(0).text()
//=> Apple

$('li').eq(-1).text()
//=> Pear
```

\###Manipulation

改变DOM结构的方法

**.append(content,[content…])**

在每个元素最后插入一个子元素

```
$('ul').append('<li class="plum">Plum</li>')
$.html()
//=>  <ul id="fruits">
//      <li class="apple">Apple</li>
//      <li class="orange">Orange</li>
//      <li class="pear">Pear</li>
//      <li class="plum">Plum</li>
//    </ul>
```

**.prepend(content,[content,…])**

在每个元素最前插入一个子元素

```
$('ul').prepend('<li class="plum">Plum</li>')
$.html()
//=>  <ul id="fruits">
//      <li class="plum">Plum</li>
//      <li class="apple">Apple</li>
//      <li class="orange">Orange</li>
//      <li class="pear">Pear</li>
//    </ul>
```

**.after(content,[content,…])**

在每个匹配元素之后插入一个元素

```
$('.apple').after('<li class="plum">Plum</li>')
$.html()
//=>  <ul id="fruits">
//      <li class="apple">Apple</li>
//      <li class="plum">Plum</li>
//      <li class="orange">Orange</li>
//      <li class="pear">Pear</li>
//    </ul>
```

**.before(content,[content,…])**

在每个匹配的元素之前插入一个元素

```
$('.apple').before('<li class="plum">Plum</li>')
$.html()
//=>  <ul id="fruits">
//      <li class="plum">Plum</li>
//      <li class="apple">Apple</li>
//      <li class="orange">Orange</li>
//      <li class="pear">Pear</li>
//    </ul>
```

**.remove( [selector] )**

从DOM中去除匹配的元素和它们的子元素。选择器用来筛选要删除的元素。

```
$('.pear').remove()
$.html()
//=>  <ul id="fruits">
//      <li class="apple">Apple</li>
//      <li class="orange">Orange</li>
//    </ul>
```

**.replaceWith( content )**

替换匹配的的元素

```
var plum = $('<li class="plum">Plum</li>')
$('.pear').replaceWith(plum)
$.html()
//=> <ul id="fruits">
//     <li class="apple">Apple</li>
//     <li class="orange">Orange</li>
//     <li class="plum">Plum</li>
//   </ul>
```

**.empty()**

清空一个元素，移除所有的子元素

```
$('ul').empty()
$.html()
//=>  <ul id="fruits"></ul>
```

**.html( [htmlString] )**

获得元素的HTML字符串。如果htmlString有内容的话，将会替代原来的HTML

```
$('.orange').html()
//=> Orange

$('#fruits').html('<li class="mango">Mango</li>').html()
//=> <li class="mango">Mango</li>
```

**.text( [textString] )**

获得元素的text内容，包括子元素。如果textString被指定的话，每个元素的text内容都会被替换。

```
$('.orange').text()
//=> Orange

$('ul').text()
//=>  Apple
//    Orange
//    Pear
```

\###Rendering

如果你想呈送document，你能使用html多效用函数。

```
$.html()
//=>  <ul id="fruits">
//      <li class="apple">Apple</li>
//      <li class="orange">Orange</li>
//      <li class="pear">Pear</li>
//    </ul>
```

如果你想呈送outerHTML,你可以使用 $.html(selector)

```
$.html('.pear')
//=> <li class="pear">Pear</li>
```

默认的,html会让一些标签保持开标签的状态.有时候你想呈现一个有效的XML文档.例如下面这个:

```
$ = cheerio.load('<media:thumbnail url="http://www.foo.com/keyframe.jpg" width="75" height="50" time="12:05:01.123"/>');
```

然后为了呈现这个XML,你需要使用`xml`这个函数:

```
$.xml()
//=>  <media:thumbnail url="http://www.foo.com/keyframe.jpg" width="75" height="50" time="12:05:01.123"/>
```

\###Miscellaneous

不属于其它地方的DOM 元素方法

**.toArray()**

取得所有的在DOM元素，转化为数组、

```
$('li').toArray()
//=> [ {...}, {...}, {...} ]
```

**.clone()**

克隆cheerio对象

```
var moreFruit = $('#fruits').clone()
```

\###Utilities

**$.root**有时候你想找到最上层的root元素,那么`$.root()`就能获得:

```
$.root().append('<ul id="vegetables"></ul>').html();
//=> <ul id="fruits">...</ul><ul id="vegetables"></ul>
```

**$.contains( container, contained )**

查看cotained元素是否是container元素的子元素

**$.parseHTML( data [, context ] [, keepScripts ] )**

将字符串解析为DOM节点数组。context参数对chreeio没有意义，但是用来维护APi的兼容性。