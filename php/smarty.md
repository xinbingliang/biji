#smarty
##引入

	require_once './libs/Smarty.class.php';
	$smarty = new Smarty();

##配置
* 设置模版的路径
	1. $smarty->addTemplateDir('.'.DIRECTORY_SEPARATOR.'templates'.DIRECTORY_SEPARATOR) 添加模版
	2. $smarty->setTemplateDir() 设置模版，该方式放后面将唯一
	3. $smarty->getTemplateDir() 获得设置的模版路径 
* 设置编译后存放的位置
	1. $smarty->setCompileDir('.'.DIRECTORY_SEPARATOR.'templates_c'.DIRECTORY_SEPARATOR); 设置编译后的路径
	2. $smarty->getTemplateDir(); 获得编译后的路径
* 设置配置文件
	1. $smarty->setConfigDir('.'.DIRECTORY_SEPARATOR.'configs'.DIRECTORY_SEPARATOR); 设置配置文件位置
	2. $smarty->getConfigDir() 获得配置文件的位置
* 设置插件的位置      
	默认在SMARTY_DIR
	1. $smarty->setPluginsDir('.'.DIRECTORY_SEPARATOR.'plugins'.DIRECTORY_SEPARATOR); 将唯一设置
	2. $smarty->addPluginsDir('.'.DIRECTORY_SEPARATOR.'plugins1'.DIRECTORY_SEPARATOR); 将保留原来的，并增加
	3. $smarty->getPluginsDir(); 获得插件位置
* 闭合符号

		$smarty->left_delimiter = "<{";
		$smarty->right_delimiter = "}>";
* 缓存是否开启

		$smarty->caching = false;

* 缓存路径
	1. $smarty->setCacheDir('.'.DIRECTORY_SEPARATOR.'cache'.DIRECTORY_SEPARATOR); 设置缓存路径
	2. $smarty->getConfigDir(); 获得缓存路径
* 缓存时间      
当设置-1将永不过期

	$smarty->cache_lifetime = 3600;

##写公共文件

	define("ROOT", str_replace('\\', '/', dirname(__FILE__)).'/');          //指定项目的根目录
	require_once ROOT.'libs/Smarty.class.php';                              //引入Smarty文件
	$smarty = new Smarty();                                                 //创建smarty实例
	
	
	$smarty->setTemplateDir(ROOT.'templates/')                              //模版存放的位置
	        ->setCompileDir(ROOT.'templates_c/')                            //模版编译后存放的位置
	        ->setConfigDir(ROOT.'config/')                                  //配置文件存放的位置
	        ->addPluginsDir(ROOT.'plugins/');                               //自定义插件存放的位置
	        //->setCacheDir(ROOT.'RUNTIME/')                                //缓存存放的位置
	
	$smarty->caching = false;                                               //关闭缓存
	$smarty->cache_lifetime = 60*60*24;                                     //哈缓存时间
	$smarty->left_delimiter = "<{";                                         //左结束符
	$smarty->right_delimiter = "}>";                                        //右结束符

##Smarty操作
`$smarty->assign()` 传递值

`$smarty->display('index.html')` 指定模版     
`$smarty->display('admin/index.html')` 模版路径子目录下的内容           
`$smarty->display('/usr/local/include/templates/index.html')`使用绝对路径

##注释和变量
<{**}> 注释

变量

	// 数字索引
	$array = array('辛', '丙', '亮');
	$smarty->assign('data', $array);
	<{$data[0]}>

	// 非数字索引
	$array = array('one'=>'辛', 'two'=>'丙', 'three'=>'亮');
	$smarty->assign('data', $array);
	<{$data.one}>

	// 使用表达式
	<{$x + $y}>
	<{$foo = strlen($bar)}>
	<{$foo = myfun(($x + $y)*3)}>
	<{$foo[$x*3]}>

	// 嵌入变量
	<{func var="test $foo test"}>
	<{func var="test $foo[0] test"}>
	<{func var="test $foo[bar] test"}>
	<{func var="test `$foo.bar` test"}>

	// 使用可变变量
	$foo_{$bar}
	$foo_{$x + $y}
	$foo_{$bar}_buh_{$blar}

	//忽略解析
	<{literal}>
	    <div><{name}>会忽略解析</div>
	<{/literal}>

##函数
###普通函数
`<{test()}>`已经定义的函数可以直接调用   
`<{funcname attr1='val1' attr='val2' attr='val3'}>` 函数调用格式     
`<{input type='tesxt' name='username' value='admin'}>` 具体使用

`<{include file="header.tpl nocache"}>` 引入头文件并不缓存
`<{include file=$includefile}>` 引入文件由变量决定
`<{include file="" title=""}>`

###块函数
使用块函数格式
	
	<{blockname attr1='val1' attr2='val2'}>
	
	<{/blockname}>
不缓存

	//不缓存
	<{nocache}>
	    {<>}
	<{/nocache}>

##使用配置文件
配置文件要放在已经定义好的配置文件存放处

	pageTitle="不原创"                 #全局配置
	bodyBgColor = #abcdef
	
	[Customer]                          #用户局部域
	pageTitle="辛丙亮的个人主页"
	
	[Login]                             #定义另外一个域
	pageTitle="Login"
	Intro="""这是跨多行的
	一种字符串
	定义方式"""

###加载配置文件
|参数|描述|类型|默认值|
|---|---|---|---|
|file|待加载的配置文件名称|字符串||
|section|指定加载的域|字符串||
|scope|local作用当前模版，parent作用当前模版和父模版，global作用所有模版|字符串|local|
|global|全局可见|boolean|False|
`<{config_load file="foo.conf"}>`或`<{config_load "foo.conf"}>`

使用

	<{config_load file="foo.conf"}>
	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <title><{#pageTitle#}></title>
	</head>
	<body bgcolor="<{#bodyBgColor#}>">
	
	
	
	</body>
	</html>
##保留变量
|smarty中|原本写法|
|---|---|
|$smarty.get.pag|$_GET['page']|
|$smarty.post.page|$_POST['page']|
|$smarty.cookies.username|$_COOKIE['username']|
|$smarty.server.SERVER_NAME|$_SERVER['SERVER_NAME']|
|$smarty.env.PATH|$_ENV['PATH']|
|$smarty.session.id|$_SESSION['id']|
|$smarty.request.username|$_REQUEST['username']|

##变量调节器
1.修改器

	<{$var|modifier: "args1":"args2"}>
2.调节器组合使用
	
	<{$var|modifier1|modifier2}>
	<{$var|lower|truncate:30|spacify}>
##自定义调节器插件
###扩充方式

	require_once "./init.smarty.php";
	
	$smarty->registerPlugin("modifier", "mytest", "test");
	function test($var, $color, $size){
	    return "<div style='color:{$color};font-size: {$size}'>$var</div>";
	}
	
	$smarty->assign('var', '应该会有样式的变化');
	$smarty->display('index.html');

	<{$var|mytest:"#fff":"20px"}>

###写文件方式
1. 添加插件路径        
`$smarty->addPluginsDir(ROOT.'plugins/')`   
2. 编写文件   
文件名称`modifier.mytest.php`    
编写函数
   
		function smarty_modifier_mytest($var, $color, $size){
		    return "<div style='color:{$color};font-size: {$size}'>$var</div>";
		}
3. 使用

##函数插件
###扩充方式

	require_once "./init.smarty.php";
	
	$smarty->registerPlugin('function', 'date_now', "print_date");
	function print_date($params, $smarty){
	    if(empty($params['format'])){
	        $str = "Y-m-d H:i:s";
	    }
	    $str = empty($params['format'])?$str:$params['format'];
	    echo date($str, time());
	}
	
	$smarty->assign('var', '应该会有样式的变化');
	$smarty->display('index.html');

	<{date_now}>
	<{date_now format="H:i:s Y-m-d"}>

###写文件方式
* 文件名称`function.函数名.php`
* 函数名`smarty_function_函数名($params, $smarty)`

块函数
* 文件名`block.块函数名.php`
* 函数名称`smarty_block_块函数名($params, $content, $smarty, &$repeat，$content表示当闭合标签时为模版块内容

##smarty内置函数
`<{assign var="name" value="brophp"}>` 变量赋值
`<{assign 'name' 'brophp'}>`
`<{$name='brophp'}>`
`<{assign var='name' value=['y'=>'yellow', 'b'=>'blue']}>`
####if语句

	<{if $name == "FRED"}>
	
	<{/if}>
********************
	<{if $name == "FRED"}>
	
	<{else $name == "xin"}>
	
	<{else}>
	
	<{/if}>
********************
	<{if $name == ''}>
	
	<{elseif $name == ''}>
	
	<{/if}>
####for循环

	<{for $var=$start to $end}>
	
	<{/for}>
********************
	<{for $var=$start to $end step $step}>
	
	<{/for}>
********************
	<{for $var=$start to $end max=$val}>
	
	<{/for}>
####while循环
	<{while $foo > 0}>
	
	<{/while}>
####foreach
	<{foreach $arrayvar as $itemvar}>
	
	<{/foreach}>
********************
	<{foreach $arrayvar as $keyvar=>$itemvar}>
	
	<{/forach}>
********************
	<{foreach $lamp as $value}>
	
	<{foreache}>
	$lamp为空或没有被分配
	<{/foreach}>

|@index|当前数组的下标|
|---|---|
|@iteration|当前迭代的次数，从1开始|
|@first|当前为第一个，boolean|
|@last|当前为最后一个，boolean|
|@show|无数据显示，boolean|
|@total|循环的次数|
$value@index

##模版继承
感觉用不上

##缓存控制
`$smarty->display(, '缓存id')` 一般可以使用`$_SERVER['REQUEST_URL']`

使用缓存来减少开销

	if(!$smarty->isCached('new.tpl', $_SERVER['REQUEST_URL'])){
	
	
	}
	
	$smarty->display('new.tpl', $_SERVER['REQUEST_URL'])

* `$smarty->clearAllCache();` 清除所有缓存    
* `$smarty->clearCache('index.tpl');`清除指定缓存
* `$smarty->clearCache('index.tpl', "CACHEID");` 清除指定缓存id的缓存









