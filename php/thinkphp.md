#ThinkPHP视频笔记
##创建项目
在文件夹下创建index.php并引入ThinkPHP核心就能创建基本项目    
`include_once('../ThinkPHP/ThinkPHP.php');`

##控制器访问
当在入口文件，Home模块下，Controller的index控制器中添加Hello方法，访问方式是      
`index.php?m=Home&c=Index&a=Hello`     
注意控制器的名称和类名要一致并有Controller部分，控制器类要继承Controller，并注意命名空间

##路由解析
1. http://域名/index.php?m=xxx&c=xxx&a=xxx(基本的get)

2. http://域名/index.php/模块/控制器/操作方法(路径模式pathinfo)

3. http://域名/模块/控制器/操作方法（rewrite重写）

4. http://域名/index.php?s=/模块/控制器/方法（兼容模式）

规则由配置文件决定，请到自己项目的Common/Conf/ 去修改

在入口文件中调整为debug模式
define("APP_DEBUG", 'True');

运行时的日志信息
Bchavior
配置添加 'SHOW_PAGE_TRACE'       =>  true,

##视图的调用
$this->display(); 调用模版

对css等文件建议建立在入口文件下，位置写绝对路径，但不方便后期维护开发和迁移      
`<link rel="stylesheet" type="text/css" href="/thinkPHP/shop/Public/Css/base.css"/>`        
使用常量进行配置
{$Think.const.常量名}

'URL_CASE_INSENSITIVE'  =>  False, 设置大小写不敏感

##空操作
空操作：访问不存在的操作方法
空控制器:访问不存在的控制器


U() url地址函数     

\Common\Conf\config.php 程序用户定义的配置信息     
\ThinkPHP\Conf\convention.php 框架的配置信息
    
C() 获得配置变量信息     
C(配置量， 值) 对配置变量信息 

L()获得语言信息
E()给页面输出错误信息
A("模块/控制器")实例化控制器对象
         

空方法在父控制器上使用__call上重定向      
\ThinkPHP\Library\Think\Controller.class.php 父控制器中的位置    

常量的封装   
* CONTROLLER_NAME 控制器名称
* ACTION_NAMW 方法名称
* MODULE_NAME 模块名称

控制器对象实例化的位置：\ThinkPHP\Library\Think\App.class.php

index.php 入口文件
ThinkPHP\ThinkPHP.php 框架核心文件   
ThinkPHP\Library\Think\Think.class.php 框架核心文件    
ThinkPHP\Library\Think\App.class.php 框架应用文件，控制器对象的创建，和方法的调用

创建Empty控制器     

get_defind_constants(true) 显示定义的常量， 并分组

指定传统错误信息    
\ThinkPHP\Library\Think\Think.class.php    
将以下三行注释将得到传统报错   

	 // 设定错误和异常处理
	 // register_shutdown_function('Think\Think::fatalError');
	 // set_error_handler('Think\Think::appError');
	 // set_exception_handler('Think\Think::appException');

##跨控制器调用
控制器在执行的时候，可以实例化另外的控制器，并通过对象调用其方法    
\ThinkPHP\Library\Think\Think.class.php autoload方法，自动加载机制   
使用快捷函数$user = A("User")

系统函数库 \ThinkPHP\Common\functions.php        
可跨模块、项目调用     
A("Admin/User")    
A("book://Home/Index")   
简便操作
R("[项目://][模块/]控制器/操作方法")

###启动流程
1. index.php 入口文件
2. ThinkPHP/ThinkPHP.php
在php5.3以后的版本中    
`const name=value;`作用域根据当前的命名空间决定    
`define()`作用域为全局   
	* 定义许多的常量
	* 引入核心文件Think.class.php  Think::start();

3. \ThinkPHP\Library\Think\Think.class.php   
` static public function start()`    
	* 核心文件的引入
	* 引入配置文件
	* 生产模式，生成common~runtime.php
	* 如果首次使用，创建对应应用目录
	`App:run()`

4. \ThinkPHP\Library\Think\App.class.php
	* App::init()
	路由解析,模块，控制器，方法赋予常量

	* App::exec() 
	实例化控制器对象和方法(反射)

函数 

* 核心函数库 \ThinkPHP\Common\functions.php
* 公共函数库 \shop\Common\Common\function.php
* 分组模块 \shop\Home\Common\function.php

####模型的操作
* 链接数据库
\ThinkPHP\Conf\convention.php

		/* 数据库设置 */
		'DB_TYPE'               =>  'mysql',     // 数据库类型
		'DB_HOST'               =>  '127.0.0.1', // 服务器地址
		'DB_NAME'               =>  'tp',          // 数据库名
		'DB_USER'               =>  'root',      // 用户名
		'DB_PWD'                =>  'root',          // 密码
		'DB_PORT'               =>  '3306',        // 端口
		'DB_PREFIX'             =>  'tp_',    // 数据库表前缀
		'DB_FIELDTYPE_CHECK'    =>  false,       // 是否进行字段类型检查
		'DB_FIELDS_CACHE'       =>  true,        // 启用字段缓存
		'DB_CHARSET'            =>  'utf8',      // 数据库编码默认采用utf8

因为前后台将使用公共的数据模型类，建议将模型类放在Home同级位置

非本数据库中数据重写$dbName

表风格不一样，多存在于，多方式登录中，重写数据表名 $trueTableName或修改表前缀$tablePrefix

数据模型的三种方式

* $model = new 命名空间GoodsModel()
* $goods = D("模型标识")   $goods = D("Goods") 
	* 实例化父类，但是父类的属性已经定制化
	* D()实例化父类，同M()
* $obj = M() 实例化父类Model，需要直接调用父模型属性和方法 
	* M('Goods') 同D

####数据操作
* 使用smarty模版引擎     
	* 常见配置位置     
 	* ThinkPHP\Conf\convention.php         
 		* 'TMPL_ENGINE_TYPE'      =>  'Think',     // 默认模板引擎 以下设置仅对使用Think模板引擎有效
 		* 复制到自己配置文件中，修改模版为  'TMPL_ENGINE_TYPE'      =>  'Smarty'
 	* Behavior 行为配置信息
 	* 系统程序中一些零散的配置信息

* select 返回数据表中的全部数据信息
select 字段 from 表名 where 条件 group 字段 having 条件 order 排序 limit 限制条数
	* 查询条件设置
		* $obj->field('字段', '字段') 查询指定的字段
		* $obj->table(数据表) 设置具体数据表
		* $obj->where(参数)  查询条件，可直接使用字符串
		* $obj->group(字段) 根据字段进行分组查询
		* $obj->having(参数条件) having 条件设置
		* $obj->order(‘price desc/asc’) 排序查询
		* $obj->limit([偏移量， ]条数)  
	

<pre>
$goods->where('goods_price > 100')->select();
$goods->where('price > 1000 and name="鞋子"')->select()
$goods->field('name')->where('price > 1000 and name="鞋子"')->select()
$goods->limit(1)->select(2, 5)
$goods->group('price')->select()
$goods->order('price desc')->select()

$goods = D();
$goods->table('goods');
</pre>

having()和where()设置查询条件
	* having在前where在后
	* where字段条件在表中是存在的，having必须是select查询出的字段

均可以使用的情况      
select peice, name, number from goods where prince>1000     
select peice, name, number from goods having prince>1000      

只能使用where 

在分组后查询用having
select id, avg(peice) as ag from goods group by id having a > 1000


直接使用sql语句

* 父类中显示存在的
	* field(),where(),limit()

* 在__call中使用
	* table() group() order() heving()

查询主键
select('30') 主键为30
select("10, 12, 14") 主键值为10, 12, 14

查询一条记录，返回一维数组
find() 和select()使用一样

最后使用的聚合函数    
count()、sum()、avg()、max()、min()     
$goods->count() 获得记录的条数
$good->max('price') 查询最高价格
$good->where('price>100')->count()

* add()数据添加
	* 数组方式实现数据添加
		* $goods = D("Goods")
		* $arr = array('id'=>'10', 'name'=>'iphone', 'price'=>'123')
		* $goods->add($arr)
		* 返回值为新记录主键值，出错返回false

	* AR方式实现数据的添加
		* 定义程序和数据库之间的关系
		* 一个数据表对应一个模型
		* 一条记录对应类的一个对象
		* 每个字段对应对象的属性
		* 伪AR
		* 使用
			* $goods = D("Goods")
			* $goods->name = 'htc'
			* $goods->prince = '3000'
			* $goods->add()
			
I('post') 快捷函数，收集post表单信息      
$goods->create() 收集数据，自动过滤非法字段
数据保存最后要使用add()方法

$this->success("添加成功", U()); 提示页面，定制跳转    
$this->error("添加商品失败", U()); 提示页面，定制跳转    


* save()数据修改
	* 返回受影响记录数
	* 数组方式
		* $goods = D('Goods')
		* $arr = array('id'=>'', 'name'=>'', 'price'=>'')
		* $good->save($arr) 这里也可以指定where()
		* 修改全部数据
		
	*AR方式    
		* $goods = D('Goods')      
		* $goods->name = '三星手机'   
		* $goods->price = 3000    
		* $goods->where(' > ')->save()   	

>全修改的情况将不会允许执行
>指定id
>指定where

* delete()数据删除
	* $goods->delete(30);
	* $goods->delete('10, 12, 20');
	* $goods->where('id>60')-delete() 符合条件删除
	* 返回受影响的记录数目

* 原生sql的执行
	* 查询语句query()
		* $goods = D("Goods");$sql='select * from goods';$rst = $goods->query($sql)
	* 添加、修改、删除execute(),返回受影响记录数目
		* $sql = "update goods set name='' where id= "
		
* 信息接收
	* 在链接上key/value         
	 $_GET()获得   
	* function($name, $age) 在方法中可以直接接收
	
	* POST提交字段和表中对应
		* 使用create()做直接收集

		* 对模型属性重写进行表单验证
<pre>
protected $_validate = array(
	//该字段必须填写
	array('username', 'require', '用户名必须填写')
)
//在create()收集时将给出true/false
//$goods->getError() 将获得定义的错误信息	
//注意不能使用D()要创建自己的模型 
</pre>

重写模型 protected $pathValidate = true //将一次性获取所有错误

* TP验证码
ThinkPHP/Library/Think/Verify.php     
$verify = new NAMESPACE\Verify()     
$verify->entry();生成一个验证码     

new Verify(array('imageH'=>30, 'imageW'=>120, 'fontSize'=>''));     

验证输入是否正确    
$->verify(code) code为用户输入的，返回真为用户输入正确。    

* tp缓存
	smarty页面静态化是，页面缓存       
	thinkPHP的缓存是数据的缓存，可以在file，内存，数据库中       
	* 文件缓存 内存缓存 数据库缓存
	* 框架已经将各种缓存做了封装	
		* S(name, value) 设置缓存
		* S(name) 读取缓存信息
		* S(name, null) 删除缓存变量

* 文件上传
	`$config = array(
		'rootPath' => './public', //根目录
		'savePath' => ''， //保存路径
	)`
	保存位置为 保存根目录/保存目录/日期目录
	1. 判断是否有文件上传
	2. $upload = new \Think\Upload()
	3. $z = $upload->uploadOne($_FILE['good_img'])
	4. 判读$z
	5. $upload->getError() 获得错误信息
	6. $z保存了信息

* 缩略图的制作
	ThinkPHP/Library/Think/Image.class.php
	* $img = new \Think\Image();
	* open() 打开图像资源，图像路径名
	* thumb() 制作缩，设置图像的宽高图
	* save() 保存图像,并指定名称












