# ubuntu下搭建https

## 购买和下载（略）

## 配置

* `makdir /etc/apache2/cert` 

* 将下载证书都放置在该目录下

* ` sudo a2enmod ssl` 开启ssl模块

* `ln -s /etc/apache2/sites-available/xxxx-ssl.conf /etc/apache2/sites-enabled/`

* 修改上述文件和虚拟主机配置位置一样，修改证书位置

  ```
  	SSLCertificateFile    /etc/apache2/cert/public.pem
  	SSLCertificateKeyFile /etc/apache2/cert/214045773520709.key
  ```

## 测试

## 将`http`重定向到`https`

## 开启rewrite

* sudo a2enmod rewrite


* ln -s /etc/apache2/mods-available/rewrite.load  /etc/apache2/mods-enabled/rewrite.load

  ​

* apache2.4

  ```
  AllowOverride All
  ```

  ​


