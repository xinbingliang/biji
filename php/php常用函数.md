#PHP常用函数
##PHP加密解密
####函数
	header("Content-type: text/html; charset=utf-8");
	/**
	 * @param $key  加密密钥
	 * @param $string   被加密的数据
	 * @param $decrypt  加密还是解密,0为加密,1为解密
	 */
	function encryptDecrypt($key, $string, $decrypt){
	    if($decrypt){
	        $decrypted = rtrim(mcrypt_decrypt(MCRYPT_RIJNDAEL_256, md5($key), base64_decode($string), MCRYPT_MODE_CBC, md5(md5($key))), "12");
	        return $decrypted;
	    } else {
	        $encrypted = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, md5($key), $string, MCRYPT_MODE_CBC, md5(md5($key))));
	        return $encrypted;
	    }
	}
####函数使用
	//加密
	echo encryptDecrypt('xin', "这是我的加密算法", 0);
	//解密
	echo encryptDecrypt('xin', "cRl2pYLgbwJCvo20JckdMUIcGTWGZJoKWbqopaHQ3aI=", 1);
##PHP生成随机字符串
####函数
	header("Content-type: text/html; charset=utf-8");
	/**
	 * 产生随机字符串
	 * @param int $length 需要产生随机字符串的长度
	 */
	function generateRandomString($length=10){
	    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	    $randomString = '';
	    for ($i = 0; $i < $length; $i++){
	        $randomString .= $characters[rand(0, strlen($characters)-1)];
	    }
	    return $randomString;
	}
####函数使用
	echo generateRandomString(12);
##PHP获取文件扩展名（后缀）
####函数
	header("Content-type: text/html; charset=utf-8");
	/**
	 * @param 要获得后缀的文件名
	 * @return 文件的后缀
	 */
	function getExtension($filename){
	    $myext = substr($filename, strrpos($filename, '.'));
	
	    return str_replace('.', '', $myext);
	}
	
	$filename= '我的文档.doc';
####函数使用
	echo getExtension($filename);


##PHP获取文件大小并格式化
####函数
	header("Content-type: text/html; charset=utf-8");

	/**
	 * @param $size Bytes的文件大小数值
	 * @return 根据数据大小获得合适单位大小的返回值
	 */
	function formatSize($size) {
	    $sizes = array(" Bytes", " KB", " MB", " GB", " TB", " PB", " EB", " ZB", " YB");
	    if ($size == 0) {
	        return('n/a');
	    } else {
	        return (round($size/pow(1024, ($i = floor(log($size, 1024)))), 2) . $sizes[$i]);
	    }
	}

####函数使用
	echo formatSize(102400000000);
##PHP替换标签字符
####函数
	header("Content-type: text/html; charset=utf-8");
	/**
	 * 自定义html标签的替换
	 * @param $string 将要替换的字符串
	 * @param $replacer 替换标签数组定义
	 * @return mixed 替换后的数据
	 */
	function stringParser($string,$replacer){
	    $result = str_replace(array_keys($replacer), array_values($replacer),$string);
	    return $result;
	}

####函数的使用
	$string = 'The {b}anchor text{/b} is the {b}actual word{/b} or words used {br}to describe the link {br}itself';
	$replace_arr = array('{b}' => '<b>','{/b}' => '</b>','{br}' => '<br />');
	
	echo stringParser($string, $replace_arr);
##PHP列出目录下的文件名
##函数
	header("Content-type: text/html; charset=utf-8");
	/**
	 * 获得目录下的所有文件
	 * @param $DirPath 被查找的目录
	 */
	function listDirFiles($DirPath){
	    if($dir = opendir($DirPath)){
	        while(($file = readdir($dir))!== false){
	            if(!is_dir($DirPath.$file))
	            {
	                echo "filename: $file<br />";
	            }
	        }
	    }
	}
####函数使用
	listDirFiles('D:\WWW\weixin');
##PHP获取当前页面URL
####函数
	header("Content-type: text/html; charset=utf-8");
	/**
	 * @return string 当前位置的url
	 */
	function curPageURL() {
	    $pageURL = 'http';
	    if (!empty($_SERVER['HTTPS'])) {$pageURL .= "s";}
	    $pageURL .= "://";
	    if ($_SERVER["SERVER_PORT"] != "80") {
	        $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
	    } else {
	        $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
	    }
	    return $pageURL;
	}
####函数使用
	echo curPageURL();
##PHP强制下载文件
####函数
	header("Content-type: text/html; charset=utf-8");
	/**
	 * @param $filename 将被强制下载的文件，而不是打开
	 */
	function download($filename){
	    if ((isset($filename))&&(file_exists($filename))){
	        header("Content-length: ".filesize($filename));
	        header('Content-Type: application/octet-stream');
	        header('Content-Disposition: attachment; filename="' . $filename . '"');
	        readfile("$filename");
	    } else {
	        echo "Looks like file does not exist!";
	    }
	}
####函数使用
	download('D:\WWW\weixin\shareWx.html');
##PHP截取字符串长度
####函数
	header("Content-type: text/html; charset=utf-8");
	/**
	 * 截取字符串
	 * @param $string 被截取的支付串
	 * @param $sublen 被截取的长度
	 * @param int $start 开始位置
	 * @param string $code 编码方式
	 * @return string 返回截取后的数据
	 */
	function cutStr($string, $sublen, $start = 0, $code = 'UTF-8'){
	    if($code == 'UTF-8'){
	        $pa = "/[\x01-\x7f]|[\xc2-\xdf][\x80-\xbf]|\xe0[\xa0-\xbf][\x80-\xbf]|[\xe1-\xef][\x80-\xbf][\x80-\xbf]|\xf0[\x90-\xbf][\x80-\xbf][\x80-\xbf]|[\xf1-\xf7][\x80-\xbf][\x80-\xbf][\x80-\xbf]/";
	        preg_match_all($pa, $string, $t_string);
	
	        if(count($t_string[0]) - $start > $sublen) return join('', array_slice($t_string[0], $start, $sublen))."...";
	        return join('', array_slice($t_string[0], $start, $sublen));
	    }else{
	        $start = $start*2;
	        $sublen = $sublen*2;
	        $strlen = strlen($string);
	        $tmpstr = '';
	
	        for($i=0; $i<$strlen; $i++){
	            if($i>=$start && $i<($start+$sublen)){
	                if(ord(substr($string, $i, 1))>129){
	                    $tmpstr.= substr($string, $i, 2);
	                }else{
	                    $tmpstr.= substr($string, $i, 1);
	                }
	            }
	            if(ord(substr($string, $i, 1))>129) $i++;
	        }
	        if(strlen($tmpstr)<$strlen ) $tmpstr.= "...";
	        return $tmpstr;
	    }
	}echo getIp();
####函数使用
	echo cutStr('常会遇到需要截取字符串(含中文汉字)长度的情况，比如标题显示不能超过多少', 10, 5);
##PHP获取客户端真实IP
####函数
```php
/**
 * @return 获取客户端的ip
 */
function getIp() {
    if (getenv("HTTP_CLIENT_IP") && strcasecmp(getenv("HTTP_CLIENT_IP"), "unknown"))
        $ip = getenv("HTTP_CLIENT_IP");
    else
        if (getenv("HTTP_X_FORWARDED_FOR") && strcasecmp(getenv("HTTP_X_FORWARDED_FOR"), "unknown"))
            $ip = getenv("HTTP_X_FORWARDED_FOR");
        else
            if (getenv("REMOTE_ADDR") && strcasecmp(getenv("REMOTE_ADDR"), "unknown"))
                $ip = getenv("REMOTE_ADDR");
            else
                if (isset ($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], "unknown"))
                    $ip = $_SERVER['REMOTE_ADDR'];
                else
                    $ip = "unknown";
    return ($ip);
}
```
####函数使用
	echo getIp();
##PHP防止SQL注入
####函数
	header("Content-type: text/html; charset=utf-8");
	/**
	 * 防止sql注入
	 * @param $sql_str 被处理的字符串
	 * @return 处理后的字符串
	 */
	function injCheck($sql_str) {
	    $check = preg_match('/select|insert|update|delete|\'|\/\*|\*|\.\.\/|\.\/|union|into|load_file|outfile/', $sql_str);
	    if ($check) {
	        echo '非法字符！！';
	        exit;
	    } else {
	        return $sql_str;
	    }
	}
####
	echo injCheck('1 or 1=1');
##PHP页面提示与跳转
####函数
	header("Content-type: text/html; charset=utf-8");
	/**
	 * 页面跳转提示
	 * @param $msgTitle 提示头信息
	 * @param $message 提示信息
	 * @param $jumpUrl 跳转到的位置
	 */
	function message($msgTitle,$message,$jumpUrl){
	    $str = '<!DOCTYPE HTML>';
	    $str .= '<html>';
	    $str .= '<head>';
	    $str .= '<meta charset="utf-8">';
	    $str .= '<title>页面提示</title>';
	    $str .= '<style type="text/css">';
	    $str .= '*{margin:0; padding:0}a{color:#369; text-decoration:none;}a:hover{text-decoration:underline}body{height:100%; font:12px/18px Tahoma, Arial,  sans-serif; color:#424242; background:#fff}.message{width:450px; height:120px; margin:16% auto; border:1px solid #99b1c4; background:#ecf7fb}.message h3{height:28px; line-height:28px; background:#2c91c6; text-align:center; color:#fff; font-size:14px}.msg_txt{padding:10px; margin-top:8px}.msg_txt h4{line-height:26px; font-size:14px}.msg_txt h4.red{color:#f30}.msg_txt p{line-height:22px}';
	    $str .= '</style>';
	    $str .= '</head>';
	    $str .= '<body>';
	    $str .= '<div>';
	    $str .= '<h3>'.$msgTitle.'</h3>';
	    $str .= '<div>';
	    $str .= '<h4>'.$message.'</h4>';
	    $str .= '<p>系统将在 <span style="color:blue;font-weight:bold">3</span> 秒后自动跳转,如果不想等待,直接点击 <a href="{$jumpUrl}">这里</a> 跳转</p>';
	    $str .= "<script>setTimeout('location.replace(\'".$jumpUrl."\')',2000)</script>";
	    $str .= '</div>';
	    $str .= '</div>';
	    $str .= '</body>';
	    $str .= '</html>';
	    echo $str;
	}
####函数使用
	message('操作提示','操作成功！','http://www.helloweba.com/');
