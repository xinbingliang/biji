#curl
##步骤
1. 初始化cURL(curl_init())
2. 向服务器发送请求
3. 接受服务器数据(curl_exec())
4. 关闭cURL(curl_close())

##网页爬虫

```php
$curl = curl_init("http://www.runoob.com");
$result = curl_exec($curl);
echo $result;
curl_close($curl)
```
使用参数配置

```php
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, 'http://www.runoob.com');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);	//执行后不打印
$output=curl_exec($curl); //获得数据
curl_close($curl);
echo str_replace("菜鸟", "辛丙亮", $output);
```

##使用WebService

#### 使用GET请求

```php
$host = 'http://www.webxml.com.cn';
$path = '/WebServices/TranslatorWebService.asmx/getEnCnTwoWayTranslator?Word=';
$data = 'world';
$url = $host.$path.$data;
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_HEADER, 0); //不显示header
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); //不直接打印

$result = curl_exec($curl);
file_put_contents('xin.data', $result);
```

#### 使用POST请求

```php
$data = "theCityName=宜昌";//theCityName=宜昌&
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, "http://www.webxml.com.cn/WebServices/WeatherWebService.asmx/getWeatherbyCityName");
curl_setopt($curl, CURLOPT_HEADER, 0); //不显示header
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); //不直接打印
curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.152 Safari/537.36');

curl_setopt($curl, CURLOPT_POST, 1); // 请求方式
curl_setopt($curl, CURLOPT_POSTFIELDS, $data); //post参数
curl_setopt($curl, CURLOPT_HTTPHEADER, array("application/x-www-form-urlencoded;charset=utf-8", "Content-length: ".strlen($data)));

$result = curl_exec($curl);
if(!curl_errno($curl)){
	echo $result;
} else {
	echo "Curl error: ".curl_error($curl);
}
```

```php
$host = 'http://www.webxml.com.cn';
$path = '/WebServices/TranslatorWebService.asmx/getEnCnTwoWayTranslator';
$data = 'Word=hello';
$url = $host.$path;
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_HEADER, 0); //不显示header
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); //不直接打印

curl_setopt($curl, CURLOPT_POST, 1);    //请求方式
curl_setopt($curl, CURLOPT_POSTFIELDS, $data);  //post请求的数据
curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    'application/x-www-form-urlencoded',
    'Content-Length: '.strlen($data)
    ));    //设置头信息

$result = curl_exec($curl);
echo $result;
file_put_contents('xin.data', $result);
```

##登录网站

```php
$data = "username=709464835@qq.com&password=yjfc4883212&remember=1";
$http = 'http://www.imooc.com/user/login';
//初始化
$curlobj = curl_init();

//设置要访问的位置
curl_setopt($curlobj, CURLOPT_URL, $http);
//不直接打印
curl_setopt($curlobj, CURLOPT_RETURNTRANSFER, 1);
/* 设置cookie 以下一般都是如此设置*/
//使用cookie时必须设置时区
date_default_timezone_set('PRC');
//使curl支持cookiesession
curl_setopt($curlobj, CURLOPT_COOKIESESSION, TRUE);
//使用文件保存cookiefile
curl_setopt($curlobj, CURLOPT_COOKIEFILE, "cookiefile");
curl_setopt($curlobj, CURLOPT_COOKIEJAR, "cookiefile");
//设置cookie中保存session
curl_setopt($curlobj, CURLOPT_COOKIE, session_name().'='.session_id());

//不打印头部信息
curl_setopt($curlobj, CURLOPT_HEADER, 0);
//cURL支持页面跳转,跟踪跳转
curl_setopt($curlobj, CURLOPT_FOLLOWLOCATION, 1);

//请求方式
curl_setopt($curlobj, CURLOPT_POST, 1);
//post参数
curl_setopt($curlobj, CURLOPT_POSTFIELDS, $data);
//设置application格式和编码
curl_setopt($curlobj, CURLOPT_HTTPHEADER, array("application/x-www-form-urlencoded;charset=utf-8","Content-length:".strlen($data)));
curl_setopt($curlobj, CURLOPT_USERAGENT, "user-agent:Mozilla/5.0 (Windows NT 5.1; rv:24.0) Gecko/20100101 Firefox/24.0"); //浏览器头信息

//执行
curl_exec($curlobj);
//打开个人中心页面
curl_setopt($curlobj, CURLOPT_URL, "http://www.imooc.com/space/index");
//不是post
curl_setopt($curlobj, CURLOPT_POST, 0);
//设置头
curl_setopt($curlobj, CURLOPT_HTTPHEADER, array("Content-type:text/xml"));

$output = curl_exec($curlobj);//执行
//关闭CURL
curl_close($curlobj);
echo $output;
```

##使用FTP下载

```php
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, "ftp://");
curl_setopt($curl, CURLOPT_HEADER, 0);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_TIMEOUT, 300); 

//git上传时注意去掉
curl_setopt($curl, CURLOPT_USERPWD, ":"); //用户名:密码

$outfile = fopen('data.txt', 'w'); //保存到的本地文件
curl_setopt($curl, CURLOPT_FILE, $outfile);

$result = curl_exec($curl);
fclose($outfile);

if(!curl_errno($curl)){
	echo "RETURN:".$result;
}else{
	echo curl_error($curl);
}

curl_close($curl);
```


##使用FTP上传

```php
$curl = curl_init();
$localfile = 'data.txt';
$fp = fopen($localfile, 'r');

curl_setopt($curl, CURLOPT_URL, "ftp://");
curl_setopt($curl, CURLOPT_HEADER, 0);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_TIMEOUT, 300); 

//git上传时注意去掉
curl_setopt($curl, CURLOPT_USERPWD, ":"); //用户名:密码

curl_setopt($curl, CURLOPT_UPLOAD, 1);
curl_setopt($curl, CURLOPT_INFILE, $fp);
curl_setopt($curl, CURLOPT_INFILESIZE, filesize($localfile));

$result = curl_exec($curl);
fclose($fp);

if(!curl_errno($curl)){
	echo "上传成功";
}else{
	echo curl_error($curl);
}

curl_close($curl);
```

##HTTPS访问

```php
$curl = curl_init(); //初始化
curl_setopt($curl, CURLOPT_URL, "https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_white.png"); //设置要访问的位置
curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);//执行后不打印出来

//设置HTTPS支持
date_default_timezone_set("PRC"); 
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0); //终止服务端进行验证

$output = curl_exec($curl); //执行
curl_close($curl);
echo $output;
```

