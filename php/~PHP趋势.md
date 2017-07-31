# PHP趋势

## Composer

第一点就要提 Composer ，自从 Composer 出现后，PHP 的依赖管理可以变得非常简单。程序内依赖一些类库和框架，直接使用 Composer 引入即可，通过使用 `composer update` 安装依赖的包。解决了过去加载外部库的各种难题。Composer 也有国内镜像，速度非常快。现在绝大部分PHP开源的项目都提供了 Composer 的支持，建议大家在项目中使用 Composer 来解决 PHP 代码包管理的问题，不要再使用下载源码、手工 include 的原始方法。

## PHP7

PHP7 版本对 Zend 引擎做了大量修改，大幅提升了 PHP 语言的性能，使用 PHP7 可以使你的程序性能瞬间翻倍。即使是 WordPress 这样重量级的软件运行在 PHP7 都能有上千 QPS ，相当于一台服务器每天就能处理 8000 万次请求。使用 PHP7 ，做好 MySQL 优化，使用 Memcache 和 Redis 进行加速，这套技术架构完全可以应对相当大规模的系统。除了某些亿级用户的平台之外，一般规模的系统完全没有压力。(相关推荐：[php自学指南，php从入门到精通自学路径](http://www.php.cn/php.html))

## PSR

PSR 是 php-fig.org 组织制定的PHP语言开发规范，约定了很多方面的规则，如命名空间、类名规范、编码风格标准、Autoload、公共接口等。现在已经成为PHP技术社区事实上的标准了。很多知名的 PHP 框架和类库都遵守了 PSR 规范。PHP 开发者应当学习掌握 PSR 规范，在开发程序时应当尽量遵循 PSR 规范。

## Laravel

最近几年最火热的 PHP 框架，官网号称是为 Web 艺术家设计的框架，可见这套框架有多优雅。Laravel 提供的功能模块丰富，API 设计简洁，表达力强。而且它的社区非常活跃，代码贡献者众多，第三方的插件非常多，生态系统相当繁荣。 Laravel 底层使用了很多 symfony2 组件，通过 composer 实现了依赖管理。如果还在纠结使用什么PHP框架，不如选择 Laravel 。 Laravel 提供的命令行工具基于 symfony.console 实现，功能强大，集成了各种项目管理、自动生成代码的功能。（相关推荐：[Laravel5.2博客实战视频教程](http://www.php.cn/course/283.html)）

## Phar

PHP5.3 之后支持了类似 Java 的 jar 包，名为 phar。用来将多个 PHP 文件打包为一个文件。这个特性使得 PHP 也可以像 Java 一样方便地实现应用程序打包和组件化。一个应用程序可以打成一个 Phar 包，直接放到
PHP-FPM 中运行。配合 Swoole ，可以在命令行下执行 `php server.phar` 一键启动服务器。PHP 的代码包可以用 Phar 打包成组件，放到 Swoole 的服务器容器中去加载执行。