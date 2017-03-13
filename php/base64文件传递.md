# base64文件传递在前端将base64数据源传递到后端

```html
<form action="https://localhost/index.php" method="POST">
		<input type="" name="data" value="data:image/png;base64,iVBORw0KGgoAAAANSUhEcYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pCDAgfg1/x8Ate1CIJg9Qs4AAAAASUVORK5CYII=">
		<button type="submit">提交</button>
	</form>
```

```php
<?php
echo '<img src="'.$_POST['data'].'"/>';
```

## 前端读取图片为base64数据

````html
<body>
<!-- <img src="1.png" alt="placeholder+image"> -->
<input type="file" name="img" id="img">
<textarea id="result" rows="30" cols="300"></textarea>
<p id="img_area"></p>
</body>
<script type="text/javascript">
	$(function(){
		var $input = $('#img');
		var result = $('#result');
		var area = $('#img_area');

		if(typeof(FileReader) == undefined){
			result.html('对不起您的浏览器不支持');
			$input.attr('disabled', 'disabled');
		} else {
			result.html('请选择图片');
		}

		$input.on('change', function(){
			//获得图片相关的属性
			var file = this.files[0];
			console.log(file);

			if(!/image\/\w+/.test(file.type)){
				console.log('请选择图片');
				return false;
			}

			//读取数据
			var reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = function(e){
				console.log(this.result);

				//存储在一个环境中做ajax请求提交
			}
		})
	});
</script>
````

## 前端提交和后端保存

```html
<form action="https://localhost/index.php" method="POST">
	<input type="" name="data" value="iVBORw0KGgoAAAANSUhEUgAAAhwAAAECCAMAAACCFP44AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyl5nUt2pz86ND7HvDhwIcCDAgQAHAhwIcCDAgQAHAhwIcCDAgSDAgQAHAhwIcCDAgQAHAhwIcCDAgQAHggAHAhwIcCDAgfg1/x8Ate1CIJg9Qs4AAAAASUVORK5CYII=">
	<button type="submit">提交</button>
</form>
```
```php
<?php
$data = $_POST['data'];
//`data:image/png;base64,`部分是不能被写入的
file_put_contents('1.png', base64_decode($data));
```
