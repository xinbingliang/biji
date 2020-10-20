# flask-nginx部署

````
upstream info_ttfj{
    server 127.0.0.1:9999;
}

server {
    listen 80;
    server_name info.ttfj.com;
    
	add_header 'Access-Control-Allow-Origin' $http_origin;
	add_header 'Access-Control-Allow-Credentials' 'true';
	add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE';
	add_header 'Access-Control-Allow-Headers' 'DNT,web-token,app-token,Authorization,Accept,Origin,Keep-Alive,User-Agent,X-Mx-ReqToken,X-Data-Type,X-Auth-Token,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
	add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';

    #ssl on;
    #SSL_certificate   /etc/nginx/cert/huge.71ydj.com/huge.71ydj.com.pem;
    #ssl_certificate_key  /etc/nginx/cert/huge.71ydj.com/huge.71ydj.com.key;
    #ssl_session_timeout 5m;
    #ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    #ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    #ssl_prefer_server_ciphers on;
     
     location /api {
     	proxy_pass http://info_ttfj/;
     }

    location / {
    	root /var/www/interface/project_-admin/production;
    	index index.html;
    }
}
````

