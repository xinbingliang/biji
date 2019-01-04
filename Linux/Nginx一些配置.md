# Nginx一些配置

## django 配置

````
server {
	listen 443;
	server_name dati.co-links.com;

	ssl on;
	ssl_certificate   /var/django_space/cert/214888364790124.pem;
    ssl_certificate_key  /var/django_space/cert/214888364790124.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;

	location / {
		include uwsgi_params;
		uwsgi_pass 127.0.0.1:8080;
	}
	
	location /static {
       	 alias /var/django_space/dati/xadmin/static/;
    }
    
	location /media {
    	alias /var/django_space/dati/media/;
    }
}
````

## HTTPS跳转配置

````
server {
	listen 80;
        server_name www.cloudcpc.com;
        return 301 https://$server_name$request_uri;
}
````

## PHP配置

````
server {
	listen 443;

	server_name www.cloudcpc.com;
	ssl on;
	root /var/www/www.cloudcpc.com;

	# Add index.php to the list if you are using PHP
	index index.php index.html app.php;

	ssl_certificate   /etc/nginx/cert/www.cloudcpc.com/214992213610124.pem;
    ssl_certificate_key  /etc/nginx/cert/www.cloudcpc.com/214992213610124.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;

	location / {
		index index.php;
		try_files $uri $uri/ =404;
          if (!-e $request_filename) {
          	rewrite ^/(.*)$ /index.php/$1 last;
          }
	}

	location ~ .php(.*)$ {
        fastcgi_pass   unix:/run/php/php5.6-fpm.sock;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  $DOCUMENT_ROOT$fastcgi_script_name;

		#fastcgi_split_path_info ^(.+\.php)(/.+)$; 
		#fastcgi_param   PATH_INFO   $fastcgi_path_info;  
		#fastcgi_param   SCRIPT_FILENAME $document_root$fastcgi_script_name; 

		fastcgi_split_path_info ^(.+\.php)(/?.+)$;
    		fastcgi_param PATH_INFO $1;
    		include fastcgi_params;
	}
}
````

## uwsgi.ini

```
[uwsgi]
socket=127.0.0.1:8080
chdir=/var/django_space/dati/dati
wsgi-file=dati/wsgi.py
processes=4
threads=2
master=True
pidfile=/var/django_space/dati/dati/uwsgi.pid
daemonize=/var/django_space/dati/dati/uswgi.log
```

