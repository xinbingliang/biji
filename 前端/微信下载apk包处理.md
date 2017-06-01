# 微信下载apk

## js

````javascript
function is_weixin(){
  var ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i)=="micromessenger") {
    return true;
  } else {
    return false;
  }
}

var browser={
  versions:function(){
    var u = navigator.userAgent, app = navigator.appVersion;
    return {
      trident: u.indexOf('Trident') > -1,
      presto: u.indexOf('Presto') > -1,
      webKit: u.indexOf('AppleWebKit') > -1,
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
      mobile: !!u.match(/AppleWebKit.*Mobile.*/),
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
      iPhone: u.indexOf('iPhone') > -1 ,
      iPad: u.indexOf('iPad') > -1,
      webApp: u.indexOf('Safari') == -1
    }
  }(),
  language:(navigator.browserLanguage || navigator.language).toLowerCase()
};

function init(){
  if(is_weixin()){
    //weixin为提示使用浏览器打开的div
    document.getElementById("weixin").style.display="block";
    if(browser.versions.ios || browser.versions.iPhone || browser.versions.iPad){
      document.getElementById("step2").innerHTML="2. 在Safari中打开";
    }else{
      document.getElementById("step2").innerHTML="2. 在浏览器中打开";
    }
   
  }else{
    //下载页div
    document.getElementById("main").style.display="block";
  }
}
init();
````

## php

````php
$file_name = '6.apk';
header('Content-Type: application/vnd.android.package-archive');
header("Content-length: " . filesize($file_name));
header('Content-Disposition: attachment; filename="' . $file_name . '"');
ob_end_flush();
readfile($file_name);
return true;
````



