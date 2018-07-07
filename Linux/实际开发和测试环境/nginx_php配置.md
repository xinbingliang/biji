```ini
server {
	listen 443;

	server_name riji.xinbingliang.cn;
	ssl on;
	root /var/www/riji.xinbingliang.cn;

	# Add index.php to the list if you are using PHP
	index index.php index.html app.php;

	ssl_certificate   /etc/nginx/cert/riji/214437081420556.pem;
    	ssl_certificate_key  /etc/nginx/cert/riji/214437081420556.key;
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

			fastcgi_split_path_info ^(.+\.php)(/?.+)$;

    		fastcgi_param PATH_INFO $1;

    		include        fastcgi_params;
	}
}
```

