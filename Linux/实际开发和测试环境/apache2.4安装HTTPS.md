# Apache2.4安装HTTPS

前提是已经安装mysql

## 安装apache

* `sudo apt-get install apache`

## 安装证书

- `makdir /etc/apache2/cert` 

- 将下载证书都放置在该目录下

- ` sudo a2enmod ssl` 开启ssl模块

- `ln -s /etc/apache2/sites-available/xxxx-ssl.conf /etc/apache2/sites-enabled/`

- 修改上述文件和虚拟主机配置位置一样，修改证书位置

  ```
  # 添加 SSL 协议支持协议，去掉不安全的协议
  SSLProtocol TLSv1 TLSv1.1 TLSv1.2
  # 修改加密套件如下
  SSLCipherSuite ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4
  # 证书公钥配置
  SSLCertificateFile /etc/apache2/cert/public.pem
  # 证书私钥配置
  SSLCertificateKeyFile /etc/apache2/cert/214045773520709.key
  # 证书链配置，如果该属性开头有 '#'字符，请删除掉
  SSLCertificateChainFile /etc/apache2/cert/chain.pem
  ```

## 配置

* 修改项目目录主配置

  * 修改`/etc/apache2/apache2.conf`

    ````
    <Directory /www>
            Options Indexes FollowSymLinks
            AllowOverride None
            Require all granted
    </Directory>
    ````

  * 注意你的配置后缀，在引入配置时要一致

    ```
    # Include generic snippets of statements
    IncludeOptional conf-enabled/*.conf

    # Include the virtual host configurations:
    IncludeOptional sites-enabled/*.conf
    ```

* 修改子配置的项目位置

  ​



