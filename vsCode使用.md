# VsCode使用

## 智能提示的支持

`npm install typings --g`

`npm install -g tsd` 安装tsd

`tsd init`

`tsd query node `查询是否有你需要的语法插件

`tsd query node -v all`加上-v 参数后，可以看到相关版本信息

`tsd install node --save`安装最新的node api提示并保存到tsd.json文件中

`tsd install node -v 0.10.0 --save`安装相应api版本

`tsd query  angular --action install` 安装对对应代码的支持

`/// <reference path="typings/node/node-0.10.d.ts"/>` 在使用的位置进行引用

## 调试

1. 按`f5`生成`launch.json`
2. 修改`lunch.json`的name和program进行调试



