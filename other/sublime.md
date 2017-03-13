## 快捷键

* CTRL+D多词选择
* CTRL+K 越过当前单词


## sublime制作微信小程序快速补全

- 工具->插件开发->新建代码片段

```xml
<snippet>
	<content><![CDATA[
<view>${1:view}</view>
]]></content>
	<!-- Optional: Set a tabTrigger to define how to trigger the snippet -->
	<tabTrigger>view</tabTrigger>
	<!-- Optional: Set a scope to limit where the snippet will trigger -->
	<!-- <scope>source.python</scope> -->
</snippet>
```

保存文件名为`xxxxx.sublime.snippet`

[插件库](https://github.com/Abbotton/weapp-snippet-for-sublime-text-2-3)安装到/Packages/User下

