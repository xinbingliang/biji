# shave

用于截断文本的现代`JS`框架，没有任何`js`依赖，`15kb`，截断文本以适应max-height设置的html元素，并将截断的文本放置在隐藏的span中保障文本完整性。[托管位置](https://github.com/dollarshaveclub/shave)

## 使用

```javascript
//shave('selector', maxheight);
shave('p', "30")
```

### 自定义类

用来控制被隐藏部分

```javascript
shave('selector', maxheight, {classname: 'classname'});
```

### 自定义字符

不使用引号，而是其它字符

```javascript
shave('selector', maxheight, {character: '✁'});
```

### 使用jQuery或者Zepto

```javascript
$('selector').shave(maxheight);
$('selector').shave(maxheight, { classname: 'your-css-class', character: '✁'  });
```