# composer

依赖管理工具，不是包管理器

* `composer-Setup.exe win`操作系统、需要翻墙
* `composer.phar` 通用安装方式不需要翻墙

## 全局安装

* Mac或Linux系统 
  * `sudo mv composer.phar /usr/local/bin/composer`
* Win系统
  * 将`composer.phar`拷贝到`php.exe`同级目录
  * 新建composer.bat文件，并将下面代码保存到该文件
    * `@php "%~dp0composer.phar" %*`

## 镜像切换

* `composer config -g repo.packagist composer https://packagist.phpcomposer.com` 全局配置

* `composer config repo.packagist composer https://packagist.phpcomposer.com` 修改当前项目的 `composer.json` 配置文件，`composer.json` 文件所在目录

  ```
  {
      "name": "laravel/laravel",
      "description": "The Laravel Framework.",
      "keywords": ["framework", "laravel"],
      "license": "MIT",
      "type": "project",
      "require": {
          "php": ">=5.5.9",
          "laravel/framework": "5.2.*"
      },
      "config": {
          "preferred-install": "dist"
      },
      "repositories": {
          "packagist": {
              "type": "composer",
              "url": "https://packagist.phpcomposer.com"
          }
      }
  }
  ```

## 主要命令

* 搜索（search）

  * `composer search monolog`

* 展示（show）

  * `composer --all show monolog/monolog`

    ````json
    {
        "name": "xin/test",
        "description": "辛丙亮测试",
        "type": "library",
        "authors": [
            {
                "name": "xinbingliang",
                "email": "709464835@qq.com"
            }
        ],
        "require": {
            "monolog/monolog":"1.24.*"
        }
    }
    ````

* 申明依赖（require）

  * ` composer require symfony/http-foundation`

* 安装（install）

  * `composer install `

* 更新（update）

  * 配置文件删除后
  * composer update

## 安装Laravel

### 第一种

* `composer create-project laravel/laravel --prefer-dist [别名]`

### 第二种

* `composer global require "laravel/installer"`
* `laravel new blog`